import feathersClient,
{
  makeServicePlugin,
  BaseModel
} from '../../lib/feathersClient'

class Layout extends BaseModel {
  // eslint-disable-next-line no-useless-constructor
  constructor (data, options) {
    super(data, { idField: 'Id' })
  }

  static modelName = 'Layout'
}

const servicePath = 'layouts'
const servicePlugin = makeServicePlugin({
  Model: Layout,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
