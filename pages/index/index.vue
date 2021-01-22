<template>
	<div class="mf12" style="white-space: nowrap;">
		<div class="mcol mfw">
			<div class="mfw mc" @click="show = !show">{{ show ? '隐藏' : '设置' }}</div>
			<div v-show="show" class="mcol mfw">
				<div class="mrow mmw">
					<input placeholder="基金代码 多个空格隔开" v-model="codes" @keypress.enter="addfunds()" />
					<button size="mini" @click="addfunds()">添加</button>

					<button @click="sortchange" size="mini">{{ range[sort].label }}</button>
				</div>
				<div class="mcol mstart mmw">
					<div class="mrow mmw">
						<input type="number" class="mwe3" style="text-align:right" v-model="x" />
						日
						<input type="number" class="mwe3" style="text-align:right" v-model="t0" />
						秒
						<button class="ml16 mr4" size="mini" @click="update">{{ rest == t0 ? '正在' : rest + 's后' }}更新</button>
						<button class="mlauto mr4" size="mini" @click="filter = !filter">过滤</button>
					</div>
				</div>
				<div class="mmw mrow">
					<div class="mmw"><slider @change="change" :value="x" :min="1" :max="x > 60 ? x : 60" show-value /></div>
					<div>日</div>
				</div>
				<div class="mmw mrow">
					<div class="mmw"><slider @change="change2" :value="t0" :min="5" :max="t0 > 60 ? t0 : 60" show-value /></div>
					<div>秒</div>
				</div>
				<div class="mmw mrow">
					<div>选定:</div>
					<picker mode="date" :value="certain" @change="pick">
						<button class="ml16" size="mini">{{ certain }}</button>
					</picker>
				</div>
			</div>
			<uni-swipe-action :key="item.code" v-for="item in list">
				<uni-swipe-action-item>
					<div class="mcol mstart mmw mt16" @click="openchart(item)">
						<div class="mrow mmw" :class="{ mcr: percent(item, maxworth(item, x)) > 0, mcg: percent(item, minworth(item, x)) < 0 }">
							<div class="mf12">{{ item.name }}</div>
							<div style="width:4em;" class="mf10 ml32">{{ item.code }}</div>
							<div class="mf10 mlauto">起始:{{ item.netWorthData[item.netWorthData.length < x ? 0 : item.netWorthData.length - x][0] }}</div>
						</div>
						<div class="mrow mmw">
							<span style="width:5em">{{ x > 999 ? '多' : x }}日最低:</span>
							<span style="width:6em">{{ minworth(item, x) | m }}</span>
							<span style="width:10em">{{ minDay(item, x)[0] }}</span>
							<div class="mlauto mwe8">幅度: {{ percent(item, minworth(item, x)) }}</div>
						</div>
						<div class="mrow mmw">
							<span style="width:5em">{{ x > 999 ? '多' : x }}日最高:</span>
							<span style="width:6em">{{ maxworth(item, x) | m }}</span>
							<span style="width:10em">{{ maxDay(item, x)[0] }}</span>
							<div class="mlauto mwe8">幅度: {{ percent(item, maxworth(item, x)) }}</div>
						</div>
						<div class="mrow mmw">
							<span style="width:5em">{{ item.expectWorthDate.substring(0, 10) == (certainDay(item)[0] || certain) ? '误差' : '选定' }}:</span>
							<span style="width:6em">{{ certainDay(item)[1] | m }}</span>
							<span style="width:10em">{{ certainDay(item)[0] }}</span>
							<div class="mlauto mwe8">幅度: {{ percent(item, certainDay(item)[1]) }}</div>
						</div>
						<div class="mrow mmw">
							<span style="width:5em">当前估值:</span>
							<span style="width:6em">{{ item.expectWorth }}</span>
							<span style="width:10em">{{ item.expectWorthDate.substring(5, 16) }}</span>
							<div class="mlauto mwe8">幅度: {{ percent(item, item.netWorth) }}</div>
						</div>
					</div>
					<template v-slot:right>
						<view @click="delone(item.code)" class="mbo mc mcw mwe6" style="height: 100%">删除</view>
					</template>
				</uni-swipe-action-item>
			</uni-swipe-action>
			
			<uni-popup ref="popup" type="bottom">
				<div class="mbw">
					<div class="mfw mt16 mb16 ml16">{{chartData.title}}</div>
			    	<view class="qiun-columns">
			    		<view class="qiun-charts"><canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas></view>
			    	</view>
				</div>
			</uni-popup>
			
		</div>
	</div>
</template>

<script>
import axios from '@/utils/request.js';
import moment from 'moment';
import storage from '@/utils/storage.js';
import uCharts from '@/components/u-charts/u-charts.js';
var _self;
var canvaLineA = null;
export default {
	data() {
		return {
			showchart: false,
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			chartData: {
				title: '',
				categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
				series: [
					{
						name: '历史净值',
						data: [3.5, 2.0, 2.5, 3.7, 4, 2.0],
						color: '#5555ff'
					}
				]
			},
			show: true,
			t: 0,
			t0: 10,
			x: 7,
			codes: '',
			certain: moment()
				.add(-1, 'day')
				.format('YYYY-MM-DD'),
			codelist: [],
			templist: [],
			newlist: [],
			filter: false,
			range: [
				{
					label: '最低升序'
				},
				{
					label: '最高降序'
				},
				{
					label: '当日升序'
				},
				{
					label: '当日降序'
				},
				{
					label: '选定升序'
				},
				{
					label: '选定降序'
				}
			],
			sort: 0
		};
	},
	watch: {
		show(val) {
			storage.set('show', val);
		},
		filter(val) {
			storage.set('filter', val);
		},
		sort(val) {
			storage.set('sort', val);
		},
		x(val) {
			if (val) {
				storage.set('x', val);
			}
		},
		t0(val) {
			if (val) {
				storage.set('t0', val);
			}
		}
	},
	computed: {
		rest() {
			let { t0, t } = this;
			return t0 - (t % t0);
		},
		list() {
			let { codelist, newlist, filter, percent, minworth, maxworth, certainDay, x, sort } = this;
			let result = newlist.map(one => {
				let temp = { ...storage.get(one.code), ...one };
				return temp;
			});
			if (filter) {
				result = result.filter(item => {
					return percent(item, maxworth(item, x)) > 0 || percent(item, minworth(item, x)) < 0;
				});
			}
			if (sort == 0) {
				result = result.sort((a, b) => percent(a, minworth(a, x)) - percent(b, minworth(b, x)));
			}
			if (sort == 1) {
				result = result.sort((a, b) => percent(b, maxworth(b, x)) - percent(a, maxworth(a, x)));
			}
			if (sort == 2) {
				result = result.sort((a, b) => percent(a, a.netWorth) - percent(b, b.netWorth));
			}
			if (sort == 3) {
				result = result.sort((a, b) => percent(b, b.netWorth) - percent(a, a.netWorth));
			}
			if (sort == 4) {
				result = result.sort((b, a) => percent(b, certainDay(b)[1]) - percent(a, certainDay(a)[1]));
			}
			if (sort == 5) {
				result = result.sort((a, b) => percent(b, certainDay(b)[1]) - percent(a, certainDay(a)[1]));
			}
			return result;
		}
	},
	methods: {
		openchart(item){
			let {x:n, maxworth, minworth, mround, chartData} = this
			let worthdata = [...item.netWorthData].reverse();
			chartData.title = item.name
			chartData.max = maxworth(item, n)
			chartData.min = minworth(item, n)
			let categories = worthdata.slice(0, n).map(one => one[0]).reverse()
			categories.push('估值')
			chartData.categories = categories
			let data = worthdata.slice(0, n).map(one => one[1]).reverse()
			data.push(item.expectWorth)
			chartData.series= [{name: '净值', data: data, color: '#5555ff'}]
			this.$refs.popup.open()
			_self.showLineA('canvasLineA', chartData);
		},
		pick({ target: { value } }) {
			this.certain = value;
		},
		delone(code) {
			uni.showActionSheet({
				itemList: ['删除'],
				success: ({ tapIndex }) => {
					this.newlist = this.newlist.filter(one => one.code != code);
					this.codelist = this.codelist.filter(one => one != code);
					this.templist = this.codelist.filter(one => one != code);
					storage.set('codelist', this.codelist);
					storage.remove(code + '');
				}
			});
		},
		sortchange() {
			let { range } = this;
			uni.showActionSheet({
				itemList: range.map(one => one.label),
				success: ({ tapIndex }) => {
					this.sort = tapIndex;
				}
			});
		},
		change({ detail: { value } }) {
			this.x = value;
		},
		change2({ detail: { value } }) {
			this.t0 = value;
		},
		percent(item, base) {
			let { expectWorth } = this;
			if (!base) {
				return '无数据';
			}
			return Math.round(((item.expectWorth - base) / base) * 10000) / 100;
		},
		update() {
			let { codelist } = this;
			uni.showLoading();
			Promise.all(
				codelist.map(async one => {
					return await this.pregetfund(one);
				})
			)
				.then(res => {
					uni.hideLoading();
					this.newlist = res;
					this.t = 0;
				})
				.catch(err => {
					uni.hideLoading();
				});
		},
		certainDay(item) {
			let worthdata = [...item.netWorthData].reverse();
			let certainDay = worthdata.find(one => {
				return one[0] == this.certain;
			});
			return certainDay || {};
		},
		minDay(item, n) {
			let worthdata = [...item.netWorthData].reverse();
			let minworth = Math.min(...worthdata.slice(0, n).map(one => one[1]));
			let minDay = worthdata.find(one => one[1] == minworth);
			return minDay || {};
		},
		maxDay(item, n) {
			let worthdata = [...item.netWorthData].reverse();
			let maxworth = Math.max(...worthdata.slice(0, n).map(one => one[1]));
			let maxDay = worthdata.find(one => one[1] == maxworth);
			return maxDay || {};
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
			let that = this;
			let { codes } = this;
			if (aim) {
				codes = aim;
			}
			if (!codes) {
				return;
			}
			uni.showLoading();
			let arr = codes.split(' ').filter(one => one);
			Promise.all(
				arr.map(async one => {
					try {
						return await this.addfund(one);
					} catch (e) {
						return Promise.reject(e);
					}
				})
			)
				.then(res => {
					uni.hideLoading();
					this.codelist = this.templist;
					let temp = [...this.newlist, ...res];
					this.newlist = temp.filter((one, idx) => {
						return (
							idx ==
							temp.findIndex(two => {
								return two.code == one.code;
							})
						);
					});
				})
				.catch(err => {
					uni.showToast({
						title: err + '获取异常',
						icon: 'none'
					});
					that.codes = that.codes.replace(err, '');
					that.addfunds();
				});
		},
		async addfund(code) {
			code += '';
			if (code.length != 6) {
				return Promise.reject(code);
			}
			let { get, codelist, templist } = this;
			let res;
			try {
				res = await this.getfund(code);
			} catch (e) {
				console.log(e)
				return Promise.reject(code);
			}
			if (templist.includes(code)) {
				// return;
			} else {
				templist.push(code);
			}
			let temp = storage.get(code);
			if (temp) {
				storage.set('codelist', templist);
				return Promise.resolve(temp);
			}
			storage.set(code, res, (Math.floor(Date.now() / (1000 * 60 * 60 * 24)) + 1) * (1000 * 60 * 60 * 24));
			storage.set('codelist', templist);
			return res;
		},
		async getfund(code){
			let res =  await uniCloud.callFunction({
					name: 'getbycode',
					data: {
						code
					}
				})
				return res.result
		},
		async pregetfund(code){
			let res =  await uniCloud.callFunction({
					name: 'getprebycode',
					data: {
						code
					}
				})
				return res.result
		},
		async init() {
			let { get, update, rest, t0 } = this;
			this.show = storage.get('show', true);
			this.filter = storage.get('filter');
			this.sort = storage.get('sort') || 0;
			this.x = storage.get('x') || this.x;
			this.t0 = storage.get('t0') || this.t0;
			this.codelist = storage.get('codelist', []);
			this.templist = storage.get('codelist', []);
			if (this.codelist.length) {
				await this.addfunds(this.codelist.join(' '));
			}
			setInterval(() => {
				this.t++;
				if (this.rest == this.t0) {
					update();
				}
			}, 1 * 1000);
		},
		updateapp(){
			uniCloud.callFunction({
			  name: 'chb-check-update',
			  data: {
			    appid: plus.runtime.appid,
			    version: plus.runtime.version
			  },
			  success(e) {
			    if (e.result.isUpdate) {//需要更新
			      // 提醒用户更新
			      uni.showModal({
			        title: '更新提示',
			        content: e.result.note ? e.result.note : '是否选择更新',
			        success: (ee) => {
			          if (ee.confirm) {
			            plus.runtime.openURL(e.result.url);
			          }
			        }
			      })
			    }
			  }
			})
		},
		showLineA(canvasId, chartData) {
			canvaLineA = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'line',
				fontSize: 11,
				legend: { show: true },
				dataLabel: false,
				dataPointShape: true,
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				categories: chartData.categories,
				series: chartData.series,
				animation: true,
				xAxis: {
					labelCount: 4,
					type: 'grid',
					gridColor: '#CCCCCC',
					gridType: 'dash',
					dashLength: 8
				},
				yAxis: {
					gridType: 'dash',
					gridColor: '#CCCCCC',
					dashLength: 8,
					splitNumber: 5,
					min: chartData.min,
					max: chartData.max,
					format: val => {
						return val;
					}
				},
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {
					line: {
						type: 'straight'
					}
				}
			});
		},
		touchLineA(e) {
			canvaLineA.showToolTip(e, {
				format: function(item, category) {
					return category + ' ' + item.name + ':' + _self.mround(item.data);
				}
			});
		}
	},
	onLoad() {
		this.updateapp()
		this.init();
		_self = this;
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(500);
	}
};
</script>

<style scoped>
.qiun-charts {
	width: 750rpx;
	height: 500rpx;
	background-color: #ffffff;
}

.charts {
	width: 750rpx;
	height: 500rpx;
	background-color: #ffffff;
}
</style>
