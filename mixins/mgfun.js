

let baseurl = 'v1'
// let baseurl = ''
import axios from '@/utils/axios.js'
import storage from '@/utils/storage.js'


let request = async ({url, method, data})=> {
	let params = {url, method, data, params: data}
	let result = await axios(params).catch(err=>{
		if(err)err.message = (err.data||{}).message
		return Promise.reject(err)
	})
	return Promise.resolve(result)
}

export default {
	data(){
		return {
		}
	},
	computed:{
		storage(){
			return storage
		}
	},
	filters:{
		m(x){
			return Math.round(x*10000)/10000
		}
	},
	methods: {
		mround(x){
			return Math.round(x*1000000)/1000000
		},
		goto(params){
			uni.navigateTo({
				url:params
			})
		},
		post(url,params={}){
			return  request({
			    url:baseurl + url,
			    method: 'post',
			    data: params
			  })
		},
		put(url,params={}){
			return  request({
			    url:baseurl + url,
			    method: 'put',
			    data: params
			  })
		},
		get(url,params={}){
			return  request({
			    url:baseurl + url,
			    method: 'get',
			    data: params
			  })
		},},

	onShow() {},
	onLoad(options){
		window.that = this
	}

}