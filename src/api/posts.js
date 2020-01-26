import request from '@/utils/request'

export function getPost({ page = 1, size = 10 } = {}) {
  return request({
    method: 'GET',
    url: '/posts',
    params: {
      page,
      size
    }
  })
}
