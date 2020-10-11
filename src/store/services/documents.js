import feathersClient,
{
  makeServicePlugin,
  BaseModel
} from '../../lib/feathersClient'

class Document extends BaseModel {
  // eslint-disable-next-line no-useless-constructor
  constructor (data, options) {
    super(data, options)
  }

  static modelName = 'Document'
}

const servicePath = 'documents'
const servicePlugin = makeServicePlugin({
  Model: Document,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
