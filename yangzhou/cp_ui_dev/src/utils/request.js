import fetch from 'dva/fetch';
import moment from 'moment';
import crypto from 'crypto';
import config from './config';

const STATUS_SUCCESS = 200;
const STATUS_REDIRECT = 302;

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.code = response.status;
  error.response = response;
  throw error;
}

function getQueryString(params) {
  return Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
}

const JSON_HEADER = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

const URLENCODE_HEADER = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/x-www-form-urlencoded'
};

function request(url, options) {
  const noAutoJson = options.noAutoJson;
  const header = options.header;

  const opts = Object.assign(options, {
    headers: (noAutoJson ? URLENCODE_HEADER : JSON_HEADER),
    credentials: 'include'
  });

  let finalUrl = url;

  if (config.mock) {
    finalUrl = '/mock' + finalUrl;
  }

  const method = options.method;
  const body = options.body;

  if (method == 'GET' || method == 'DELETE') {
    if (body) {
      finalUrl = `${finalUrl}?${getQueryString(body)}`;
      delete opts.body;
    }
  } else {
    opts.body = noAutoJson ? getQueryString(body) : JSON.stringify(body);
  }

  Object.keys(header).map(key => {
    if (header[key]) {
      opts.headers[key] = header[key];
    }
  });

  const p = Promise.race([
    fetch(finalUrl, opts).then(checkStatus).then(parseJSON),
    new Promise(function (resolve, reject) {
      setTimeout(() => resolve({code: 500, msg: '请求超时'}), config.timeout)
    })
  ]);

  return p.then(data => data)
    .catch(error => { error });
}

function getTimestamp() {
  return Math.floor(new Date().getTime() / 1000);
}

function timestamp() {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

function HmacSign(data, key) {
  const hmac = crypto.createHmac('sha256', key);
  hmac.update(Buffer.from(data));
  return hmac.digest('base64');
}

export default {
  STATUS_SUCCESS, STATUS_REDIRECT, timestamp, HmacSign,
  Get: (url, body, options) => request(url, { method: 'GET', body, ...options }),
  Post: (url, body, options) => request(url, { method: 'POST', body, ...options })
};
