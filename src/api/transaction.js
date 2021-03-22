/** 交易流水列表 */

import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/transaction',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/transaction',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/transaction',
    method: 'put',
    data
  })
}

export default { add, edit, del }
