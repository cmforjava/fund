<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.mcr{
		color:red
	}
	.mcg{
		color: green
	}
	
	.mcircle{
	  border-radius: 50%;
	}
	.mbr5{
	  border-radius: 5px;
	}
	.main {
	  background: #f3f4f5;
	  min-height: 100vh;
	}
	.mbw {
	  background: white
	}
	.mbg {
	  background: #F3F4F5
	}
	.mbd{
	  background: #666666;
	}
	.mbo{
	  background: #FF5F00;
	}
	.mblo{
	  background: #FFF8EC;
	}
	.mrow {
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	}
	.mcol {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	}
	.mstart{
	  align-items: flex-start;
	}
	.mend{
	  align-items: flex-end;
	}
	.maround{
	  justify-content: space-around;
	}
	
	.maw{
	  width:100%
	}
	.mfw{
	  width:100vw;
	}
	.mmw{
	  width: 91.6vw;
	}
	.mw311{
	  width: 311px
	}
	.mw223{
	  width: 223px;
	}
	
	.mc{
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	.mre{
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  justify-content: flex-end;
	}
	.mrs{
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  justify-content: flex-start;
	}
	.m3p{
	  display: flex;
	  flex-direction: row;
	}
	.m3p>div {
	  flex:1
	}
	.mf1{
	  flex:1
	}
	
	
	//边距
	.mlauto{
	  margin-left: auto;
	}
	.mtauto{
	  margin-top: auto;
	}
	
	
	//颜色
	.mco{
	  color: #FF5F00
	}
	.mcb{
	  color: #2487FC
	}

	.mcw{
	  color:white
	}
	
	.mbco{
	  border: 1px solid #FF5F00;
	}
	
	
	//特效
	//点击
	.mclk:active {
	  opacity: 0.7;
	}
	
	.mbtn:active {
	  opacity: 0.7;
	}
	
	.mol{
	 white-space: nowrap;
	}
	
	//分割线
	.msl{
	  width:1px;
	  height:24px;
	  background:#EEEEEE;
	}
	
	.mhl{
	  width: 311px;
	  height: 1px;
	  background: #DDDDDD;
	}
	
	.mbbg{
	  border-bottom: solid 1px #f2f2f2;
	}
	
	
	
	
	
	
	
	
	
	
	//字体
	
	.mf10 {
	  font-size: 10px;
	}
	
	.mf11 {
	  font-size: 11px;
	}
	
	.mf12 {
	  font-size: 12px;
	}
	
	.mf13 {
	  font-size: 13px;
	}
	
	.mf14 {
	  font-size: 14px;
	}
	
	.mf15 {
	  font-size: 15px;
	}
	
	.mf16 {
	  font-size: 16px;
	}
	
	.mf17 {
	  font-size: 17px;
	}
	
	.mf18 {
	  font-size: 18px;
	}
	
	.mf19 {
	  font-size: 19px;
	}
	
	.mf20 {
	  font-size: 20px;
	}
	
	.mf21 {
	  font-size: 21px;
	}
	
	.mf22 {
	  font-size: 22px;
	}
	
	.mf23 {
	  font-size: 23px;
	}
	
	.mf24 {
	  font-size: 24px;
	}
	
	.mf25 {
	  font-size: 25px;
	}
	
	.mf26 {
	  font-size: 26px;
	}
	
	.mf27 {
	  font-size: 27px;
	}
	
	.mf28 {
	  font-size: 28px;
	}
	
	.mf29 {
	  font-size: 29px;
	}
	
	.mf30 {
	  font-size: 30px;
	}
		
	.mwe1 {
	  width: 1em;
	}

	.mhe1 {
	  height: 1em;
	}

	.mwe2 {
	  width: 2em;
	}

	.mhe2 {
	  height: 2em;
	}

	.mwe3 {
	  width: 3em;
	}

	.mhe3 {
	  height: 3em;
	}

	.mwe4 {
	  width: 4em;
	}

	.mhe4 {
	  height: 4em;
	}

	.mwe5 {
	  width: 5em;
	}

	.mhe5 {
	  height: 5em;
	}

	.mwe6 {
	  width: 6em;
	}

	.mhe6 {
	  height: 6em;
	}

	.mwe7 {
	  width: 7em;
	}

	.mhe7 {
	  height: 7em;
	}

	.mwe8 {
	  width: 8em;
	}

	.mhe8 {
	  height: 8em;
	}

	.mwe9 {
	  width: 9em;
	}

	.mhe9 {
	  height: 9em;
	}

	.mwe10 {
	  width: 10em;
	}

	.mhe10 {
	  height: 10em;
	}

	.mw4 {
	  width: 4rpx;
	}

	.mh4 {
	  height: 4rpx;
	}

	.ml4 {
	  margin-left: 4rpx;
	}

	.mt4 {
	  margin-top: 4rpx;
	}

	.mr4 {
	  margin-right: 4rpx;
	}

	.mb4 {
	  margin-bottom: 4rpx;
	}

	.mw8 {
	  width: 8rpx;
	}

	.mh8 {
	  height: 8rpx;
	}

	.ml8 {
	  margin-left: 8rpx;
	}

	.mt8 {
	  margin-top: 8rpx;
	}

	.mr8 {
	  margin-right: 8rpx;
	}

	.mb8 {
	  margin-bottom: 8rpx;
	}

	.mw12 {
	  width: 12rpx;
	}

	.mh12 {
	  height: 12rpx;
	}

	.ml12 {
	  margin-left: 12rpx;
	}

	.mt12 {
	  margin-top: 12rpx;
	}

	.mr12 {
	  margin-right: 12rpx;
	}

	.mb12 {
	  margin-bottom: 12rpx;
	}

	.mw16 {
	  width: 16rpx;
	}

	.mh16 {
	  height: 16rpx;
	}

	.ml16 {
	  margin-left: 16rpx;
	}

	.mt16 {
	  margin-top: 16rpx;
	}

	.mr16 {
	  margin-right: 16rpx;
	}

	.mb16 {
	  margin-bottom: 16rpx;
	}

	.mw20 {
	  width: 20rpx;
	}

	.mh20 {
	  height: 20rpx;
	}

	.ml20 {
	  margin-left: 20rpx;
	}

	.mt20 {
	  margin-top: 20rpx;
	}

	.mr20 {
	  margin-right: 20rpx;
	}

	.mb20 {
	  margin-bottom: 20rpx;
	}

	.mw24 {
	  width: 24rpx;
	}

	.mh24 {
	  height: 24rpx;
	}

	.ml24 {
	  margin-left: 24rpx;
	}

	.mt24 {
	  margin-top: 24rpx;
	}

	.mr24 {
	  margin-right: 24rpx;
	}

	.mb24 {
	  margin-bottom: 24rpx;
	}

	.mw28 {
	  width: 28rpx;
	}

	.mh28 {
	  height: 28rpx;
	}

	.ml28 {
	  margin-left: 28rpx;
	}

	.mt28 {
	  margin-top: 28rpx;
	}

	.mr28 {
	  margin-right: 28rpx;
	}

	.mb28 {
	  margin-bottom: 28rpx;
	}

	.mw32 {
	  width: 32rpx;
	}

	.mh32 {
	  height: 32rpx;
	}

	.ml32 {
	  margin-left: 32rpx;
	}

	.mt32 {
	  margin-top: 32rpx;
	}

	.mr32 {
	  margin-right: 32rpx;
	}

	.mb32 {
	  margin-bottom: 32rpx;
	}

	.mw36 {
	  width: 36rpx;
	}

	.mh36 {
	  height: 36rpx;
	}

	.ml36 {
	  margin-left: 36rpx;
	}

	.mt36 {
	  margin-top: 36rpx;
	}

	.mr36 {
	  margin-right: 36rpx;
	}

	.mb36 {
	  margin-bottom: 36rpx;
	}

	.mw40 {
	  width: 40rpx;
	}

	.mh40 {
	  height: 40rpx;
	}

	.ml40 {
	  margin-left: 40rpx;
	}

	.mt40 {
	  margin-top: 40rpx;
	}

	.mr40 {
	  margin-right: 40rpx;
	}

	.mb40 {
	  margin-bottom: 40rpx;
	}

	.mw44 {
	  width: 44rpx;
	}

	.mh44 {
	  height: 44rpx;
	}

	.ml44 {
	  margin-left: 44rpx;
	}

	.mt44 {
	  margin-top: 44rpx;
	}

	.mr44 {
	  margin-right: 44rpx;
	}

	.mb44 {
	  margin-bottom: 44rpx;
	}

	.mw48 {
	  width: 48rpx;
	}

	.mh48 {
	  height: 48rpx;
	}

	.ml48 {
	  margin-left: 48rpx;
	}

	.mt48 {
	  margin-top: 48rpx;
	}

	.mr48 {
	  margin-right: 48rpx;
	}

	.mb48 {
	  margin-bottom: 48rpx;
	}

	.mw52 {
	  width: 52rpx;
	}

	.mh52 {
	  height: 52rpx;
	}

	.ml52 {
	  margin-left: 52rpx;
	}

	.mt52 {
	  margin-top: 52rpx;
	}

	.mr52 {
	  margin-right: 52rpx;
	}

	.mb52 {
	  margin-bottom: 52rpx;
	}

	.mw56 {
	  width: 56rpx;
	}

	.mh56 {
	  height: 56rpx;
	}

	.ml56 {
	  margin-left: 56rpx;
	}

	.mt56 {
	  margin-top: 56rpx;
	}

	.mr56 {
	  margin-right: 56rpx;
	}

	.mb56 {
	  margin-bottom: 56rpx;
	}

	.mw60 {
	  width: 60rpx;
	}

	.mh60 {
	  height: 60rpx;
	}

	.ml60 {
	  margin-left: 60rpx;
	}

	.mt60 {
	  margin-top: 60rpx;
	}

	.mr60 {
	  margin-right: 60rpx;
	}

	.mb60 {
	  margin-bottom: 60rpx;
	}

	.mw64 {
	  width: 64rpx;
	}

	.mh64 {
	  height: 64rpx;
	}

	.ml64 {
	  margin-left: 64rpx;
	}

	.mt64 {
	  margin-top: 64rpx;
	}

	.mr64 {
	  margin-right: 64rpx;
	}

	.mb64 {
	  margin-bottom: 64rpx;
	}

	.mw68 {
	  width: 68rpx;
	}

	.mh68 {
	  height: 68rpx;
	}

	.ml68 {
	  margin-left: 68rpx;
	}

	.mt68 {
	  margin-top: 68rpx;
	}

	.mr68 {
	  margin-right: 68rpx;
	}

	.mb68 {
	  margin-bottom: 68rpx;
	}

	.mw72 {
	  width: 72rpx;
	}

	.mh72 {
	  height: 72rpx;
	}

	.ml72 {
	  margin-left: 72rpx;
	}

	.mt72 {
	  margin-top: 72rpx;
	}

	.mr72 {
	  margin-right: 72rpx;
	}

	.mb72 {
	  margin-bottom: 72rpx;
	}

	.mw76 {
	  width: 76rpx;
	}

	.mh76 {
	  height: 76rpx;
	}

	.ml76 {
	  margin-left: 76rpx;
	}

	.mt76 {
	  margin-top: 76rpx;
	}

	.mr76 {
	  margin-right: 76rpx;
	}

	.mb76 {
	  margin-bottom: 76rpx;
	}

	.mw80 {
	  width: 80rpx;
	}

	.mh80 {
	  height: 80rpx;
	}

	.ml80 {
	  margin-left: 80rpx;
	}

	.mt80 {
	  margin-top: 80rpx;
	}

	.mr80 {
	  margin-right: 80rpx;
	}

	.mb80 {
	  margin-bottom: 80rpx;
	}

	.mw84 {
	  width: 84rpx;
	}

	.mh84 {
	  height: 84rpx;
	}

	.ml84 {
	  margin-left: 84rpx;
	}

	.mt84 {
	  margin-top: 84rpx;
	}

	.mr84 {
	  margin-right: 84rpx;
	}

	.mb84 {
	  margin-bottom: 84rpx;
	}

	.mw88 {
	  width: 88rpx;
	}

	.mh88 {
	  height: 88rpx;
	}

	.ml88 {
	  margin-left: 88rpx;
	}

	.mt88 {
	  margin-top: 88rpx;
	}

	.mr88 {
	  margin-right: 88rpx;
	}

	.mb88 {
	  margin-bottom: 88rpx;
	}

	.mw92 {
	  width: 92rpx;
	}

	.mh92 {
	  height: 92rpx;
	}

	.ml92 {
	  margin-left: 92rpx;
	}

	.mt92 {
	  margin-top: 92rpx;
	}

	.mr92 {
	  margin-right: 92rpx;
	}

	.mb92 {
	  margin-bottom: 92rpx;
	}

	.mw96 {
	  width: 96rpx;
	}

	.mh96 {
	  height: 96rpx;
	}

	.ml96 {
	  margin-left: 96rpx;
	}

	.mt96 {
	  margin-top: 96rpx;
	}

	.mr96 {
	  margin-right: 96rpx;
	}

	.mb96 {
	  margin-bottom: 96rpx;
	}

	.mw100 {
	  width: 100rpx;
	}

	.mh100 {
	  height: 100rpx;
	}

	.ml100 {
	  margin-left: 100rpx;
	}

	.mt100 {
	  margin-top: 100rpx;
	}

	.mr100 {
	  margin-right: 100rpx;
	}

	.mb100 {
	  margin-bottom: 100rpx;
	}

</style>
