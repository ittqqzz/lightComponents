import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {commonParams, options} from './config'

/* 获取推荐数据的方法 */
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}


export function getDiscList() {
  return axios.get('http://apimusic.leanapp.cn/singList').then((res) => {
    return Promise.resolve(res.data)
  })
}

