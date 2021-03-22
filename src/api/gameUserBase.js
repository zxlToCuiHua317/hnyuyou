/** 会员账户列表 */

import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/gameUserBase',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/gameUserBase',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/gameUserBase',
    method: 'put',
    data
  })
}

export default { add, edit, del }
