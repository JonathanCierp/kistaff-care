import feathersClient,
{
  makeServicePlugin,
  BaseModel
} from '../../lib/feathersClient'

class Contact extends BaseModel {
  // eslint-disable-next-line no-useless-constructor
  constructor (data, options) {
    super(data, options)
  }

  static modelName = 'Contact'
}

const servicePath = 'contacts'
const servicePlugin = makeServicePlugin({
  Model: Contact,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
