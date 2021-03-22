/** 游戏列表 */

import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/gameRoom',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/gameRoom',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/gameRoom',
    method: 'put',
    data
  })
}

export function getAll() {
  return request({
    url: '/api/gameRoom/getAll',
    method: 'get'
  })
}

export default { add, edit, del, getAll }
