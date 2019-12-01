import feathersClient,
{
  makeServicePlugin,
  BaseModel
} from '../../lib/feathersClient'

class Organization extends BaseModel {
  constructor (data, options) {
    super(data, { idField: 'Id' })
  }

  static modelName = 'Organization'

  get label () {
    return this.Account.Name
  }

  get color () {
    if (this.xStatus__c === 'Accepted') {
      return 'light-green'
    }
    return 'grey-5'
  }
}

const servicePath = 'organizations'
const servicePlugin = makeServicePlugin({
  Model: Organization,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
