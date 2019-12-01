import feathersClient,
{
  makeServicePlugin,
  BaseModel
} from '../../lib/feathersClient'

import { date } from 'quasar'

class Message extends BaseModel {
  // eslint-disable-next-line no-useless-constructor
  constructor (data, options) {
    super(data, { idField: 'Id' })
  }

  static modelName = 'Message'

  get publishedAt () {
    return date.formatDate(this.CreatedDate, 'MMM DD, YYYY, hh:mm a.')
  }

  get title () {
    let typeToLabel = {
      'New Job': 'Nouvelle mission',
      'Job Assignment': 'Affectation de mission',
      'Job Cancellation': 'Annulation de mission',
      'Assignment Confirmation': 'Confirmation de mission',
      'Checkin': 'Check In',
      'Checkout': 'Check Out'
    }

    return typeToLabel[this.xType__c]
  }
}

const servicePath = 'messages'
const servicePlugin = makeServicePlugin({
  Model: Message,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
