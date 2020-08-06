import { Plugins } from '@capacitor/core'

const { PushNotifications } = Plugins

/* eslint-disable no-console */
export default ({ app, router, store, Vue }) => {
  PushNotifications.register()

  PushNotifications.addListener('registration',
    (token) => {
      console.log('Push registration success, token: ' + token.value)
    }
  )

  PushNotifications.addListener('registrationError',
    (error) => {
      console.log('Error on registration: ' + JSON.stringify(error))
    }
  )

  PushNotifications.addListener('pushNotificationReceived',
    (notification) => {
      console.log('Push received: ' + JSON.stringify(notification))
    }
  )

  PushNotifications.addListener('pushNotificationActionPerformed',
    (notification) => {
      let data = notification.notification.data

      switch (data.type) {
        case 'New Job':
          router.push('/requests')
          break

        case 'Job Assignment':
          router.push('/requests')
          break

        case 'Assignment Confirmation':
          router.push('/missions')
          break
      }
    }
  )
}
