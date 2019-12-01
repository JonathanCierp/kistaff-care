// eslint-disable-next-line no-unused-vars
import feathersClient, { makeAuthPlugin } from '../lib/feathersClient'

export default makeAuthPlugin({ userService: 'users' })
