import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/master/login',
    method: 'post',
    data
  })
}

export function getInfo(id) {
  return request({
    url: '/master/' + id,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/master/logout',
    method: 'get'
  })
}

export function checkLogged() {
  return request({
    url: '/master/check_logged',
    method: 'get'
  })
}
