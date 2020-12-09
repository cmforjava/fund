<template>
	<div class="mf12">
		<div class="mcol mfw">
			<div class="mrow mmw">
				<input placeholder="基金代码 多个空格隔开" v-model="codes" /><button size="mini" @click="addfunds">添加</button>
			</div>
			<div class="mrow mmw">
				<input type="number" class="mwe3" v-model="x">日
				<button size="mini" @click="update">更新</button>
			</div>
			<div class="mcol mstart mmw mt16" v-for="item in list">
				<div class="mrow mmw" :class="{mcr:percent(item, maxworth(item, x))>0, mcg:percent(item, minworth(item, x))<0}">
					<div class="mf12">{{item.name}}</div>
					<div class="mf10 ml32">
						{{item.code}}
					</div>
					<div class="mf10 mlauto">时间:{{item.expectWorthDate.substring(5, 16)}}</div>
				</div>
				<div class="mrow mmw">
					{{x}}日最低: {{minworth(item, x)}} <div class="mlauto mwe8">幅度: {{percent(item, minworth(item, x))}}</div>
				</div>
				<div class="mrow mmw">
					{{x}}日最高: {{maxworth(item, x)}} <div class="mlauto mwe8">幅度: {{percent(item, maxworth(item, x))}}</div>
				</div>
				<div class="mrow mmw">
					当前估值: {{item.expectWorth}} <div class="mlauto mwe8">幅度: {{percent(item, item.netWorth)}}</div>
					
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
import storage from '@/utils/storage.js'
export default {
	data() {
		return {
			x: 7,
			codes: '',
			codelist: [],
			templist: [],
			newlist: []
		};
	},
	computed: {
		list(){
			let { codelist, newlist} = this
			return newlist.map(one=>{
				return {...storage.get(one.code), ...one}
			})
		}
	},
	methods: {
		percent(item, base){
			let {expectWorth} = this
			return Math.round((item.expectWorth-base)/base*10000)/100
		},
		update(){
			let {codelist, get} = this
			get('/fund', {code: codelist.join(',')}).then(res=>{
				this.newlist = res.data
			})
		},
		minworth(item, n){
			let worthdata = item.netWorthData.reverse()
			let minworth = Math.min(...worthdata.slice(0,n).map(one=>one[1]))
			item.netWorthData.reverse()
			return minworth
		},
		maxworth(item, n){
			let worthdata = item.netWorthData.reverse()
			let maxworth = Math.max(...worthdata.slice(0,n).map(one=>one[1]))
			item.netWorthData.reverse()
			return maxworth
		},
		async addfunds(){
			let {codes} = this
			uni.showLoading()
			let arr = codes.split(' ')
			Promise.all(
				arr.map(async one=>{
					return await this.addfund(one)
				})
			).then(res=>{
				uni.hideLoading()
				this.codelist = this.templist
			})
			
		},
		async addfund(code) {
			code += ''
			if(code.length!=6){
				return
			}
			let { get, storage, codelist, templist } = this;
			if (templist.includes(code)) {
				return;
			} else {
				templist.push(code);
			}
			let res = await get('/fund/detail', { code, startDate: "2020-01-01" })
				storage.set(code, res.data);
				storage.set('codelist', templist);
				return res
		},
		init() {
			let { get, storage } = this;
			this.codelist = storage.get('codelist', []);
			this.update()
		}
	},
	onLoad() {
		this.init();
	}
};
</script>

<style scoped></style>
