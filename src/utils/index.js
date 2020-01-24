export * from './auth'
export { default as buildMenus } from './build-menus'
export { default as getPageTitle } from './get-page-title'
export { default as request } from './request'

export const isMobile = () => /mobile/i.test(window.navigator.userAgent)
export const debounce = (fn, wait) => {
  let timeout = null
  return function() {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(fn, wait)
  }
}
export const throttle = (fn, gapTime) => {
  let _lastTime = null

  return () => {
    const _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn()
      _lastTime = _nowTime
    }
  }
}
