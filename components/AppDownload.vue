<template>
    <div>
        <x-dialog :show="show" class="dialog-demo">
            <div style="padding:15px;">
                <p>正在下载更新包</p>
                <p>包大小：{{ size }}</p>

                <x-progress :percent="percent" :show-cancel="false"></x-progress>
            </div>
            <div @click="closeDownload">
                <span class="vux-close"></span>
            </div>
        </x-dialog>
    </div>
</template>
<script>
import { XDialog, XProgress } from "vux"
import { getAppUpdateData } from "@/api/common"

export default {
  components: {
    XDialog,
    XProgress
  },
  data() {
    return {
      confirm: true,
      dtask: null,
      show: false,
      percent: 0,
      size: 0,
      keyUpdate: 'updateCheck', //取消升级键名
      checkInterval: 1 //升级检查间隔，单位为ms,7天为7*24*60*60*1000=604800000, 如果每次启动需要检查设置值为0
    };
  },
  methods: {
    // 判断升级检测是否过期
    checkUpdate() {
      let lastcheck = plus.storage.getItem(this.keyUpdate)
      if (lastcheck) {
        let dc = parseInt(lastcheck)
        let dn = new Date().getTime()
        if (dn < dc) {
          //console.log(`自动更新未到期  还有${dn - dc}`)
          // 未超过上次升级检测间隔，不需要进行升级检查
          return false
        }
        // 取消已过期，删除取消标记
        plus.storage.removeItem(this.keyUpdate)
      }

      return true
    },
    // 设置下次检测时间
    setKeyUpadate(){
        let cTime = new Date().getTime() + this.checkInterval
        plus.storage.setItem(this.keyUpdate, cTime.toString() )
    },
    // 初始化更新
    initAppUpdate(version, auto = false) {
      // 如auto==true 需判断升级检测是否过期
      if (auto && !this.checkUpdate()) return

      // 防止多次弹框
      if (!this.confirm) return
      this.confirm = false

      getAppUpdateData(version).then((response) => {
        const { success, data: inf } = response
        // alert(JSON.stringify(response))
        if (!success) {
          if(inf.force!=1){
            plus.nativeUI.toast("已经是最新版本")
          }
          return
        }

        if (inf instanceof Object) {
          if(inf.force==1){
            if (inf.type == 2) {
              return this.downWgt(inf)
            }
            if (plus.os.name == "iOS") {
              this.downloadIos(inf)
            }
            if (plus.os.name == "Android") {
              this.downloadAndroid(inf)
            }
          }else{
            plus.nativeUI.confirm(inf.desc, i => {
                this.confirm = true
                if (0 == i.index) {
                  if (inf.type == 2) {
                    return this.downWgt(inf)
                  }
                  //立即更新
                  if (plus.os.name == "iOS") {
                    this.downloadIos(inf)
                  }
                  if (plus.os.name == "Android") {
                    this.downloadAndroid(inf)
                  }
                } else {
                  // 设置下次检测时间
                  this.setKeyUpadate()
                }
              },
              inf.app_name,
              ["立即更新", "下次再说"]
            )
          }

        } else {
          if(!auto){
            plus.nativeUI.toast("已经是最新版本")
            this.confirm = true
          }
        }
      }).catch(error=> {
        if(!auto){
          plus.nativeUI.toast("已经是最新版本")
          this.confirm = true
        }
      })
    },
    downloadAndroid(inf) {

      this.size = inf.package_size
      let url = inf.download_url
      let options = { method: "GET" }
      this.dtask = plus.downloader.createDownload(url, options)
      this.dtask.addEventListener( "statechanged", (task, status) => {
          let progress = 0
          if (!this.dtask) return
          switch (task.state) {
            case 1: // 开始
            // console.log( "开始下载..." )
            case 2: // 已连接到服务器
              this.percent = 0
              this.show = true
              // console.log( "链接到服务器..." )
              break
            case 3: // 已接收到数据
              // console.log( "下载数据更新:" )
              progress = parseInt(task.downloadedSize / task.totalSize * 10000)
              if (progress % 400 == 0) {
                this.percent = progress / 100
              }
              if (progress % 2000 == 0) {
                console.log( "下载数据更新:" + progress/100 + "%" + "; 已下载:" + task.downloadedSize )
              }
              break
            case 4: // 下载完成
              this.show = false
              console.log( "下载完成:" + task.totalSize + "; 保存文件名:" + task.filename )
              // 设置下次检测时间
              this.setKeyUpadate()
              plus.runtime.install(task.filename)
              break
          }
        }
      );
      this.dtask.start()
    },
    downloadIos(inf) {
      // console.log('type:' + inf.type)

      plus.runtime.openURL(inf.download_url)
    },
    //关闭弹窗,取消下载操作
    closeDownload() {
      this.dtask.abort()
      this.show = false
    },
    downWgt(inf){
      // const wgtUrl="https://lvhegou001.oss-cn-hangzhou.aliyuncs.com/app_upgrade/H5ABED97F.wgt"
      // console.log('正在升级中...')
      plus.nativeUI.showWaiting("资源正在加载")
      // console.log('inf.download_url:' + inf.download_url)
      //return
      plus.downloader.createDownload(inf.download_url, {filename:"_doc/update/"}, (d,status) => {

          if ( status == 200 ) {
              console.log("下载wgt成功："+ d.filename);
              console.log('d.filename', d.filename)
              this.installWgt(d.filename) // 安装wgt包
          } else {
              console.log("下载wgt失败！");
              plus.nativeUI.alert("下载wgt失败！");
          }
          plus.nativeUI.closeWaiting()
      }).start()
    },
    installWgt(path){
      console.log('path', path)
      plus.nativeUI.showWaiting("安装wgt文件...");
      plus.runtime.install(path, {}, ()=>{
          plus.nativeUI.closeWaiting()
          // console.log("安装wgt文件成功！");
          plus.nativeUI.alert("更新完成！", ()=>{
              plus.runtime.restart()
          })
          plus.runtime.restart()
      }, (e)=>{
          // plus.nativeUI.toast("资源更新失败，请稍后再试！")
          // console.log("安装wgt文件失败["+e.code+"]："+e.message);
          plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
          plus.nativeUI.closeWaiting()
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/less/variable.less";

.dialog-demo {
  .weui-dialog {
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: 350px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
</style>
