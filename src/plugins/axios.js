"use strict";

import Vue from 'vue';
import axios from "axios";
import { Base64 } from 'js-base64'

import websiteManageAPI from "../api/websiteManageAPI"
import {deconstruct} from "../utils"
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control,
  headers:{
    get:{
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      // 将普适性的请求头作为基础配置。当需要特殊请求头时，将特殊请求头作为参数传入，覆盖基础配置
    },
    post:{
      'Content-Type': 'application/json;charset=utf-8'
      // 将普适性的请求头作为基础配置。当需要特殊请求头时，将特殊请求头作为参数传入，覆盖基础配置
    }
  }
}
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      // 跳转登录页
      break;
    // 403 token过期
    case 403:
      console.log('token 失效')
      // 如果不需要自动刷新token，可以在这里移除本地存储中的token，跳转登录页
      break;
    // 404请求不存在
    case 404:
      // 提示资源不存在
      break;
    default:
  }
}
const _axios = axios.create(config);
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
const get = function(url, params){
  return new Promise((resolve, reject) =>{
    _axios.get(url, {
      params: params
    }).then(res => {
      if (!res.code) {
        resolve(res.data)
      } else {
        reject(res)
      }
    }).catch(err =>{
      reject(err)
    })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
const post = function (url, params) {
  return new Promise((resolve, reject) => {
    _axios.post(url, params)
      .then(res => {
        if (!res.code) {
          resolve(res.data)
        } else {
          reject(res)
        }
      })
      .catch(err =>{
        reject(err)
      })
  });
}
_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    // 从vuex里获取token
    if (window.localStorage.getItem('token')) {
      config.headers['Authorization'] = _encode()
    }
    // 如果token存在就在请求头里添加
    // token && (config.headers.token = token);
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    // if(response.data.code===401){
    //   localStorage.removeItem("token");
    // }
    // 只返回response中的data数据
    return response.data;
  },
  function(error) {
    // Do something with response error
    const res = error.response
    errorHandle(res.status,res.data.msg);
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

function _encode() {
  const token = window.localStorage.getItem('token')
  const base64 = Base64.encode(token+':')
  return 'Basic '+base64
}

Vue.use(Plugin)

export default {
  get,
  post
}
