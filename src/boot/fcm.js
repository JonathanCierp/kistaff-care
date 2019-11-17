export default ({ app }) => {
  window.FCMPlugin.getToken(function (token) {
    alert(token)
  })
}
