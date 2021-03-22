/** ios品项配置 */

import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/transactionApplepayProduct',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/transactionApplepayProduct',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/transactionApplepayProduct',
    method: 'put',
    data
  })
}

export default { add, edit, del }
