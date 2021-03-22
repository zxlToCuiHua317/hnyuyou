/** 平台兑换储值流水 */

import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/gamePointPaygame',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/gamePointPaygame',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/gamePointPaygame',
    method: 'put',
    data
  })
}

export default { add, edit, del }
