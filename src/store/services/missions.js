import feathersClient,
{
  makeServicePlugin,
  BaseModel
} from '../../lib/feathersClient'

import { date } from 'quasar'

class Mission extends BaseModel {
  // eslint-disable-next-line no-useless-constructor
  constructor (data, options) {
    super(data, options)
  }

  static modelName = 'Mission'

  get apiKey () {
    return 'AIzaSyC4i-pG8Fws9BIp5ZFlqMNF7Il28yuK8I0'
  }

  get fromDate () {
    return date.formatDate(
      this.xFromDate__c,
      'DD MMM YYYY à hh:mm'
    )
  }

  get toDate () {
    return date.formatDate(
      this.xToDate__c,
      'DD MMM YYYY à hh:mm'
    )
  }

  get label () {
    return `${this.xOrganization__r.Name} | \
              ${this.xSubject__c}`
  }

  get icon () {
    if (this.upcoming) {
      return 'event'
    }
    return 'event_available'
  }

  get iconColor () {
    if (this.upcoming) {
      return 'positive'
    }
    return 'grey-5'
  }

  get message () {
    return this.xAssignmentMsg__c
  }

  get upcoming () {
    return new Date(this.xFromDate__c) >= new Date()
  }

  get geoLink () {
    if (this.xAddress__c) {
      return `http://maps.google.com/maps?q=${this.xAddress__c}`
    }

    return null
  }

  get geoImage () {
    if (this.xAddress__c) {
      return `https://maps.googleapis.com/maps/api/staticmap?` +
        `center=${this.xAddress__c}&` +
        `markers=size:mid%7Ccolor:0xff0000%7Clabel:%7C${this.xAddress__c}&` +
        `zoom=11&scale=1&size=500x750&maptype=roadmap&format=png&` +
        `visual_refresh=true&key=${this.apiKey}`
    }

    return null
  }
}

const servicePath = 'missions'
const servicePlugin = makeServicePlugin({
  Model: Mission,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
