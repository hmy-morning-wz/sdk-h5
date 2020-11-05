import dva from 'dva';
import './index.css';
import CPService from './services/cpService';
import config from './utils/config';

// 0. global conf
CPService.init(global.csConf.cityId, global.csConf.appid);
config.cdnHost = global.csConf.cdnHost;

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/card'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
