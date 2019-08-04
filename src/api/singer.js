import axios from 'axios'
import {baseUrl} from './config'

// 第二屏歌手列表
export function getSingerList() {
  return axios.get(baseUrl + '/singer').then((res) => {
    return Promise.resolve(res.data)
  })
}

// 第二屏，歌手里面的歌曲详情
export function getSingerDetail(dissid) {
  let params = new URLSearchParams();
  params.append('id', dissid);
  return axios.post(baseUrl + '/singerDetail', params).then((res) => {
    return Promise.resolve(res.data)
  })
}
