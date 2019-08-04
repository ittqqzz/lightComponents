import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {commonParams, options} from './config'
import {baseUrl} from './config'

/* 获取推荐数据的方法 */
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  // 这里是模仿视频，通过 jsonp 实现跨域
  // 之后将使用 axios 来获取数据，同时换一个 url,新的 url 语义会更加明确
  return jsonp(url, data, options)
}


export function getDiscList() {
  return axios.get(baseUrl + '/singList').then((res) => {
    return Promise.resolve(res.data)
  })
}

