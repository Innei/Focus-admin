const model = (item) => ({
  title: item.meta?.title || item.name || item.path,
  path: item.path && /^\//.test(item.path) ? item.path : '/' + item.path,
  icon: item.meta?.icon,
  subItems: buildSubMenus(item),
})

function buildSubMenus(route) {
  if (Array.isArray(route.children)) {
    return route.children.map((item) => {
      return model(item)
    })
  }
}

const buildMenus = (routes) =>
  routes
    .find((item) => item.name === 'home' && item.path === '/')
    .children.filter((item) => item.path !== '*')
    .map((item) => {
      return model(item)
    })

export default buildMenus
