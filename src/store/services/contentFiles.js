import feathersClient,
{
  makeServicePlugin,
  BaseModel
} from '../../lib/feathersClient'

class ContentFile extends BaseModel {
  // eslint-disable-next-line no-useless-constructor
  constructor (data, options) {
    super(data, options)
  }

  static modelName = 'ContentFile'
}

const servicePath = 'contentfiles'
const servicePlugin = makeServicePlugin({
  Model: ContentFile,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
