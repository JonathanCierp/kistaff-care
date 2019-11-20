import feathersClient,
{
  makeServicePlugin,
  BaseModel
} from '../../lib/feathersClient'

class SObject extends BaseModel {
  // eslint-disable-next-line no-useless-constructor
  constructor (data, options) {
    options = Object.assign(options, { idField: 'name' })
    super(data, options)
  }

  static modelName = 'SObject'
}

const servicePath = 'sobjects'
const servicePlugin = makeServicePlugin({
  Model: SObject,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
