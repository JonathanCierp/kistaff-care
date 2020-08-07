import feathersClient,
{
  makeServicePlugin,
  BaseModel
} from '../../lib/feathersClient'

import { date } from 'quasar'

class Request extends BaseModel {
  // eslint-disable-next-line no-useless-constructor
  constructor (data, options) {
    super(data, options)
  }

  static modelName = 'Request'

  get apiKey () {
    return 'AIzaSyCjtHK1cIgw5-pdQxPJos96lPH3V6uXSA4'
  }

  get fromDate () {
    return date.formatDate(
      this.xService_Request__r.xFromDate__c,
      'DD MMM YYYY à hh:mm'
    )
  }

  get toDate () {
    return date.formatDate(
      this.xService_Request__r.xToDate__c,
      'DD MMM YYYY à hh:mm'
    )
  }

  get geoLink () {
    if (this.xService_Request__r.xAddress__c) {
      return `http://maps.google.com/maps?q=${this.xService_Request__r.xAddress__c}`
    }

    return null
  }

  get geoImage () {
    if (this.xService_Request__r.xAddress__c) {
      return `https://maps.googleapis.com/maps/api/staticmap?` +
      `center=${this.xService_Request__r.xAddress__c}&` +
      `markers=size:mid%7Ccolor:0xff0000%7Clabel:%7C${this.xService_Request__r.xAddress__c}&` +
      `zoom=11&scale=1&size=500x750&maptype=roadmap&format=png&` +
      `visual_refresh=true&key=${this.apiKey}`
    }

    return null
  }

  get message () {
    if (this.xStatus__c === 'Requested') {
      if (this.xService_Request__r.xDetails__c) {
        return this.xService_Request__r.xDetails__c
      } else {
        return this.xNewJobMsg__c
      }
    } else {
      return this.xAssignmentMsg__c
    }
  }

  get label () {
    return `${this.xService_Request__r.xOrganization__r.Name} | \
            ${this.xService_Request__r.xSubject__c}`
  }

  get icon () {
    if (this.xStatus__c === 'Requested') {
      return 'insert_invitation'
    } else {
      return 'event_available'
    }
  }

  get iconColor () {
    if (this.xStatus__c === 'Requested') {
      return 'positive'
    } else {
      return 'secondary'
    }
  }

  get title () {
    if (this.xStatus__c === 'Requested') {
      return 'Êtes-vous intéressé(e)?'
    } else {
      return 'Êtes-vous toujours disponible?'
    }
  }
  get upcoming () {
    return new Date(this.xService_Request__r.xFromDate__c) >= new Date()
  }
}

const servicePath = 'requests'
const servicePlugin = makeServicePlugin({
  Model: Request,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
