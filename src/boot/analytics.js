import ga from '../components/analytics/ga'

export default ({ router }) => {
  router.afterEach((to, from) => {
    ga.logPage(to.path, to.name)
  })
}
