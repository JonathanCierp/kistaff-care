import feathersClient,
{
  makeServicePlugin,
  BaseModel
} from '../../lib/feathersClient'

class Organization extends BaseModel {
  // eslint-disable-next-line no-useless-constructor
  constructor (data, options) {
    super(data, options)
  }

  static modelName = 'Organization'

  get label () {
    return this.Account.Name
  }

  get color () {
    if (this.xStatus__c === 'Accepted') {
      return 'positive'
    }
    return 'grey-5'
  }

  get geoLink () {
    let orgAddress = `${this.Account.BillingStreet} ${this.BillingCity} ${this.BillingPostalCode}`
    return `http://maps.google.com/maps?q=${orgAddress}`
  }
}

const servicePath = 'organizations'
const servicePlugin = makeServicePlugin({
  Model: Organization,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
