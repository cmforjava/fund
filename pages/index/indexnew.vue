<template>
	<div class="mf12">
		<div class="mcol mfw">
			<div class="mrow mmw">
				<input placeholder="基金代码 多个空格隔开" v-model="codes" />
				<button size="mini" @click="addfunds()">添加</button>
				<button size="mini" @click="goto('/pages/index/index')">实时(有限)</button>
			</div>
			<div class="mrow mmw">
				<input type="number" class="mwe3" v-model="x" />
				日
				<button size="mini" @click="update">更新</button>
				<button size="mini" @click="filter = !filter">过滤</button>
			</div>
			<div class="mmw">
				<slider @change="change" :value="x" :min="1" :max="60" show-value/>
			</div>
			<div :key="item.code" class="mcol mstart mmw mt16" v-for="item in list">
				<div class="mrow mmw" :class="{ mcr: percent(item, maxworth(item, x)) > 0, mcg: percent(item, minworth(item, x)) < 0 }">
					<div class="mf12">{{ item.name }}</div>
					<div class="mf10 ml32">{{ item.code }}</div>
					<div class="mf10 mlauto">时间:{{ item.expectWorthDate.substring(5, 16) }}</div>
				</div>
				<div class="mrow mmw">
					{{ x }}日最低: {{ minworth(item, x) }}
					<div class="mlauto mwe8">幅度: {{ percent(item, minworth(item, x)) }}</div>
				</div>
				<div class="mrow mmw">
					{{ x }}日最高: {{ maxworth(item, x) }}
					<div class="mlauto mwe8">幅度: {{ percent(item, maxworth(item, x)) }}</div>
				</div>
				<div class="mrow mmw">
					当前估值: {{ item.expectWorth }}
					<div class="mlauto mwe8">幅度: {{ percent(item, item.netWorth) }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from '@/utils/request.js';
import moment from 'moment';
import storage from '@/utils/storage.js';
export default {
	data() {
		return {
			x: 7,
			codes: '',
			codelist: [],
			templist: [],
			newlist: [],
			filter: false,
			sort: 1
		};
	},
	computed: {
		list() {
			let { codelist, newlist, filter, percent, minworth, maxworth, x, sort } = this;
			let result = newlist.map(one => {
				let temp = { ...storage.get(one.code), ...one }
				return temp;
			});
			if (filter) {
				result = result.filter(item => {
					return percent(item, maxworth(item, x)) > 0 || percent(item, minworth(item, x)) < 0;
				});
			}
			if (sort == 1) {
				result = result.sort((a, b) => percent(a, minworth(a, x)) - percent(b, minworth(b, x)));
			}
			if (sort == 2) {
				result = result.sort((a, b) => percent(b, maxworth(b, x)) - percent(a, maxworth(a, x)));
			}
			if (sort == 3) {
				result = result.sort((a, b) => percent(a, a.netWorth) - percent(b, b.netWorth));
			}
			if (sort == 4) {
				result = result.sort((a, b) => percent(b, b.netWorth) - percent(a, a.netWorth));
			}
			return result;
		}
	},
	methods: {
		change({detail:{value}}){
			this.x = value
		},
		percent(item, base = item.netWorth) {
			let { expectWorth } = this;
			return Math.round(((item.expectWorth - base) / base) * 10000) / 100;
		},
		update() {
			let { codelist } = this;
			uni.showLoading();
			Promise.all(
				codelist.map(async one => {
					return await this.pregetfund(one);
				})
			).then(res => {
				uni.hideLoading();
				this.newlist = res;
			}).catch(err=>{
				uni.hideLoading()
			})
		},
		minworth(item, n) {
			let worthdata = [...item.netWorthData].reverse();
			let minworth = Math.min(...worthdata.slice(0, n).map(one => one[1]));
			return minworth;
		},
		maxworth(item, n) {
			let worthdata = [...item.netWorthData].reverse();
			let maxworth = Math.max(...worthdata.slice(0, n).map(one => one[1]));
			return maxworth;
		},
		async addfunds(aim) {
			let { codes } = this;
			if (aim) {
				codes = aim;
			}
			if (!codes) {
				return;
			}
			uni.showLoading();
			let arr = codes.split(' ');
			Promise.all(
				arr.map(async one => {
					return await this.addfund(one);
				})
			).then(res => {
				uni.hideLoading();
				this.codelist = this.templist;
				this.newlist = res;
			});
		},
		async addfund(code) {
			code += '';
			if (code.length != 6) {
				return;
			}
			let { get, codelist, templist } = this;
			if (templist.includes(code)) {
				// return;
			} else {
				templist.push(code);
			}
			let temp = storage.get(code)
			if(temp){
				storage.set('codelist', templist);
				return Promise.resolve(temp)
			}
			let res = await this.getfund(code);
			storage.set(code, res, (Math.floor(Date.now()/(1000*60*60*24))+1)*(1000*60*60*24));
			storage.set('codelist', templist);
			return res;
		},
		async getfund(code) {
			let url = 'https://fund.eastmoney.com/pingzhongdata/' + code + '.js?v='+Date.now();
			let url2 = 'https://fundgz.1234567.com.cn/js/' + code + '.js?rt='+Date.now();
			let res = await axios(url);
			let res2 = await axios(url2);
			let text = res;
			let preval =
				'{' +
				text
					.substring(51, text.length - 1)
					.replace(/\/\*[^*]*\*\//g, '')
					.replace(/=/g, ':')
					.replace(/var/g, '')
					.replace(/;/g, ',') +
				'}';
			let eres = {};
			eval('eres=' + preval);
			let { Data_netWorthTrend, fund_minsg, fS_name, fund_Rate, fS_code, fund_sourceRate } = eres;
			let one = JSON.parse(res2.replace(/jsonpgz\((.*)\);/g, (ori, a) => a));
			let { dwjz, fundcode, gsz, gztime, jzrq, name } = one;
			let result = {
				// buyMin:fund_minsg,
				// buyRate:fund_Rate,
				// buySourceRate:fund_sourceRate,
				netWorthData: Data_netWorthTrend.map(one => {
					return [moment(one.x).format('YYYY-MM-DD'), one.y, one.equityReturn, one.unitMoney];
				}),
				netWorth: dwjz,
				name: name,
				code: fundcode,
				expectWorth: gsz,
				expectWorthDate: gztime,
				netWorthDate: jzrq
			};
			return result;
		},
		async pregetfund(code) {
			let url2 = 'https://fundgz.1234567.com.cn/js/' + code + '.js?rt='+Date.now();
			let res2 = await axios(url2);
			try{
			let one = JSON.parse(res2.replace(/jsonpgz\((.*)\);/g, (ori, a) => a));
			let { dwjz, fundcode, gsz, gztime, jzrq, name } = one;
			let result = {
				name: name,
				code: fundcode,
				expectWorth: gsz,
				expectWorthDate: gztime,
				netWorthDate: jzrq,
				netWorth: dwjz
			};
			return result;
			}catch(e){
			}
		},
		async init() {
			let { get, storage } = this;
			this.codelist = storage.get('codelist', []);
			this.templist = storage.get('codelist', []);
			if(this.codelist.length){
			await this.addfunds(this.codelist.join(' '));
			}
		}
	},
	onLoad() {
		this.init();
	}
};
</script>

<style scoped></style>
