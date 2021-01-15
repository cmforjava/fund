const moment = require('./moment.js')
exports.main = async (event, context) => {
	let code = event.code
	let url2 = 'https://fundgz.1234567.com.cn/js/' + code + '.js?rt=' + (Date.now()+8*60*60*1000);
	let res2 = await uniCloud.httpclient.request(url2, {
		contentType: 'json',
		dataType: 'text'
	});
	res2 = res2.data
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

}