export default ({ app }, inject) => {
  const saveError = (error, componentName) => {
    const errorObj = {
      website: window.location.href,
      component: componentName,
      err: error,
      date: new Date()
    }
    app.$axios.$post(`${app.$config.localAPI}/error`, errorObj)
  }

  inject('saveError', saveError)
}
