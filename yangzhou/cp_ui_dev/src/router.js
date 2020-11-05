import React from 'react';
import { Router, Route } from 'dva/router';
import { RegisterPage, MainPage, BalancePage, RechargePage, RecordPage,
		LinePage, CertAuthPage, RegisterResultPage, ErrorPage, PayResult,
    PayRecordPage, PayDetailPage, TravelRecordPage, TravelDetailPage, 
    LoadingPage, RevokeCardPage, FaqPage, VerifyPage, FailurePage, WrongAgent } from './routes';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/">
        <Route path="loading" component={LoadingPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="main" component={MainPage} />
        <Route path="balance" component={BalancePage} />
        <Route path="recharge" component={RechargePage} />
        <Route path="record" component={RecordPage} />
        <Route path="line" component={LinePage} />
        <Route path="certAuth" component={CertAuthPage} />
        <Route path="registerResult" component={RegisterResultPage} />
        <Route path="payResult" component={PayResult} />
        <Route path="payRecord" component={PayRecordPage} />
        <Route path="payDetail" component={PayDetailPage} />
        <Route path="travelRecord" component={TravelRecordPage} />
        <Route path="travelDetail" component={TravelDetailPage} />
        <Route path="revokeCard" component={RevokeCardPage} />
        <Route path="help" component={FaqPage} />
        <Route path="verify" component={VerifyPage} />
        <Route path="error" component={ErrorPage} />
        <Route path="failure" component={FailurePage} />
        <Route path="wrongAgent" component={WrongAgent} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
