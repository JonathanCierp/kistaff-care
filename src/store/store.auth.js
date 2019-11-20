import { makeAuthPlugin } from '../lib/feathersClient'

export default makeAuthPlugin({ userService: 'users' })
