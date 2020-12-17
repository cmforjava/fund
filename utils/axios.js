import axios from "axios";
import qs from "qs";
// 创建axios实例
const service = axios.create({
  baseURL: 'https://api.doctorxiong.club/', // api的base_url
  timeout: 10000 // 请求超时时间
});

service.defaults.adapter = function (config) {
    return new Promise((resolve, reject) => {
        // console.log(config)
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		var buildFullPath = require('axios/lib/core/buildFullPath');
		let baseURL = ''
		let fullurl = buildFullPath(config.baseURL,config.url)
		uni.request({
			method: config.method.toUpperCase(),
			url: buildURL(fullurl, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete:function complete(response){
				response = {
				  data: response.data,
				  status: response.statusCode,
				  errMsg: response.errMsg,
				  header: response.header,
				  config: config
				};
				
			settle(resolve, reject, response);
			}
		})
    })
}



// respone拦截器
service.interceptors.response.use(
  response => {
	  if(!response.data){
		  uni.hideLoading()
		  uni.showToast({
		  	title:'接口异常',
		  	icon:'none'
		  })
		  return Promise.reject(response.data)
	  }
	if(response.data.code==400){
		uni.hideLoading()
		uni.showToast({
			title:'免费查询每小时仅限100次',
			icon:'none'
		})
		return Promise.reject(response.data);
	}
	uni.hideLoading()
    return Promise.resolve(response.data)
  },
  error => {
	  uni.hideLoading()
    return Promise.reject(error.response);
  }
);

export default service;
