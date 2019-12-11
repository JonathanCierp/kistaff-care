import feathersClient,
{
  makeServicePlugin,
  BaseModel
} from '../../lib/feathersClient'

class Password extends BaseModel {
  // eslint-disable-next-line no-useless-constructor
  constructor (data, options) {
    super(data, options)
  }

  static modelName = 'Password'
}

const servicePath = 'passwords'
const servicePlugin = makeServicePlugin({
  Model: Password,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
