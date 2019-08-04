<template>
  <!--
    过程：
    1. 编写 singer.vue 的骨架
    2. 编写获取歌手数据的 js 并 export 和 import
    3. 在 singer.vue 里面使用该 js 并组装自己想要的数据格式
    4. 导入 listview 组件（该组件类似于通讯录组件，可复用）
    5. 将自己组装好的数据的数组传给 listview 组件（:data="singers"）即可

    可以发现在 listview 组件里面又复用了其他组件！这就是分析代码结构将组件拆的足够细的好处
  -->
  <div class="singer" ref="singer">
    <list-view :data="singers" ref="list"></list-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getSingerList} from "api/singer"
  import Singer from 'common/js/singer'
  import ListView from 'base/listview/listview'
  const HOT_SINGER_LEN = 10
  const HOT_NAME = '热门'
  export default {
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      _getSingerList() {
        getSingerList().then((res) => {
          this.singers = this._normalizeSinger(res.data.list)
        }).catch()
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        })
        // 为了得到有序列表，我们需要处理 map
        let ret = []
        let hot = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
    },
    components: {
      ListView
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
