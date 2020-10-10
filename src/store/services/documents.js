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

  get title () {
    let result = this.Name
    if (this.Description) {
      result += ' - ' + this.Description
    }

    return result
  }
}

const servicePath = 'documents'
const servicePlugin = makeServicePlugin({
  Model: Document,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
