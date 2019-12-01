import feathersClient,
{
  makeServicePlugin,
  BaseModel
} from '../../lib/feathersClient'

class ListView extends BaseModel {
  // eslint-disable-next-line no-useless-constructor
  constructor (data, options) {
    super(data, { idField: 'Id' })
  }

  static modelName = 'ListView'
}

const servicePath = 'listviews'
const servicePlugin = makeServicePlugin({
  Model: ListView,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
