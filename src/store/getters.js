const getters = {
  sidebar: state => state.app.sidebar,
  menus: state => state.app.menus,
  title: state => state.app.title,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  profile: state => {
    const user = Object.assign({}, state.user)
    delete user.token
    return user
  }
}
export default getters
