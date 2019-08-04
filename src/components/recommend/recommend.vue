<template>
  <div class="recommend">
    <!-- 这里的:data是必要的，scroll 内部会 watch 这个变量来重新计算 scroll 的高度 -->
    <scroll class="recommend-content" :data="disLists" ref="scroll">
      <div>
        <!-- 这里v-if是必要的，因为只有recmmends里有数据时才会去计算scroll内部的高度 -->
        <div class="slider-wrapper" v-if="recommends.length">
          <slider>
            <div v-for="(item, index) in recommends" :key="index">
              <a :href="item.linkUrl">
                <!-- 使用 class="needsclick" 让 fastclick 放行点击事件，不然点击图片无法跳转-->
                <img :src="item.picUrl" @load="loadImage" class="needsclick">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item, index) in disLists" :key="index" class="item">
              <div class="icon">
                <img v-lazy="item.imgurl" height="60" width="60">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-if="!disLists.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getRecommend, getDiscList} from "api/recommend";
  import {ERR_OK} from "api/config";
  import Slider from "base/slider/slider"
  import Scroll from "base/scroll/scroll"
  import Loading from "base/loading/loading"

  export default {
    data() {
      return {
        recommends: [],
        disLists: []
      }
    },
    created() {
      // 如果轮播加载比歌单推荐还要慢的话，会导致 scroll 异常，无法滑到最底部
      // 解决办法是当 轮播加载出来后，触发某个事件，刷新 scroll
      this._getRecommend()
      this._getDiscList()
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      _getDiscList() {
        getDiscList().then((res) => {
          this.disLists = res.data.list
        }).catch(function (err) {
          console.log(err)
        })
      },
      loadImage() {
        // 图片加载完成后，让 scroll 组件重新计算高度，由于图片高度都是一样的，所以仅需调用一次
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }

      }
    },
    components: {
      Slider,
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
