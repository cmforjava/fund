import axios from "axios";
import qs from "qs";
// 创建axios实例
const service = axios.create({
  baseURL: 'https://api.doctorxiong.club/', // api的base_url
  timeout: 50000 // 请求超时时间
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
    //Vue.$vux.loading.hide()
    return Promise.resolve(response.data)
  },
  error => {
    return Promise.reject(error.response);
  }
);

export default service;
