const moment = require('./moment.js')
// const db = uniCloud.database();
exports.main = async (event, context) => {
	let code = event.code
	let result
	let res
	// res = await db.collection('temp').doc(code).get()
	// if(res.affectedDocs){
	// 	result = res.data[0]
	// 	let flag
	// 	let last = new Date(result.expectWorthDate)
	// 	let lm = last.getMonth()
	// 	let ld = last.getDate()
	// 	let current = new Date()
	// 	let cm = current.getMonth()
	// 	let cd = current.getDate()
	// 	flag = lm == cm && ld == cd
	// 	if(flag){
	// 		return result
	// 	}
	// }
	
	
	let url = 'https://fund.eastmoney.com/pingzhongdata/' + code + '.js?v=' + Date.now();
	let url2 = 'https://fundgz.1234567.com.cn/js/' + code + '.js?rt=' + Date.now();
	res = await uniCloud.httpclient.request(url, {
		contentType: 'json',
		dataType: 'text'
	});
	res = res.data
	let res2 = await uniCloud.httpclient.request(url2, {
		contentType: 'json',
		dataType: 'text'
	});
	res2 = res2.data
	let text = res;
	let preval =
		'{' +
		text
		.substring(text.indexOf('var'), text.length - 1)
		.replace(/\/\*[^*]*\*\//g, '')
		.replace(/=/g, ':')
		.replace(/var/g, '')
		.replace(/;/g, ',') +
		'}';
	let eres = {};
	eval('eres=' + preval);
	let {
		Data_netWorthTrend,
		fund_minsg,
		fS_name,
		fund_Rate,
		fS_code,
		fund_sourceRate,
		Data_ACWorthTrend
	} = eres;
	let one = JSON.parse(res2.replace(/jsonpgz\((.*)\);/g, (ori, a) => a));
	let {
		dwjz,
		fundcode,
		gsz,
		gztime,
		jzrq,
		name,
		gszzl
	} = one;
	let temp = 1;
	let atemp = 1;
	let netWorth = Data_netWorthTrend[Data_netWorthTrend.length - 1].y;
	let netWorthData = Data_netWorthTrend.map(one => {
		if (one.unitMoney.indexOf('拆分') != -1) {
			temp *= one.unitMoney.replace(/拆分：每份基金份额折算(\d*\.?\d*)份/, (a, b) => b);
		}
		if (one.unitMoney.indexOf('分红') != -1) {
			atemp *= (one.y - -one.unitMoney.replace(/分红：每份派现金(\d*\.?\d*)元/, (a, b) => b))/one.y
		}
		return [moment(one.x+8*60*60*1000).format('YYYY-MM-DD'), one.y * temp * atemp, one.equityReturn, one.unitMoney];
	});
	let newWorth = netWorthData[netWorthData.length - 1][1];
	netWorthData.map(one => {
		one[1] = (one[1] * netWorth) / newWorth;
	});
	result = {
		// buyMin:fund_minsg,
		// buyRate:fund_Rate,
		// buySourceRate:fund_sourceRate,
		expectGrowth: gszzl,
		netWorthData,
		netWorth: dwjz,
		name: name,
		code: fundcode,
		expectWorth: gsz,
		expectWorthDate: gztime,
		netWorthDate: jzrq
	};
	// await db.collection('temp').doc(code).set(result)
	return result;


}
