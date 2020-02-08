import router from './router'
import store from './store'
import { message as Message } from 'ant-design-vue'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { checkLogged } from '@/api'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken().token

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      // check token valid and not outdate
      const { logged } = await checkLogged()
      if (!logged) {
        await store.dispatch('user/resetToken')
        NProgress.done()
        return
      }
      next({ path: '/' })
      NProgress.done()
    } else {
      // check token valid and not outdate
      const { logged } = await checkLogged()
      if (!logged) {
        await store.dispatch('user/resetToken')
        Message.error('身份信息已过期')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
        return
      }
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
