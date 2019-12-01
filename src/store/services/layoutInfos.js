import feathersClient,
{
  makeServicePlugin,
  BaseModel
} from '../../lib/feathersClient'

class LayoutInfo extends BaseModel {
  // eslint-disable-next-line no-useless-constructor
  constructor (data, options) {
    super(data, options)
  }

  static modelName = 'LayoutInfo'
}

const servicePath = 'layoutInfos'
const servicePlugin = makeServicePlugin({
  Model: LayoutInfo,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
