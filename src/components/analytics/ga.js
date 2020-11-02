import axios from 'axios'
import { uid } from 'quasar'

export default {
  logEvent (category, action, label, value) {
    axios.get('https://www.google-analytics.com/collect', { params: {
      v: 1,
      tid: process.env.GA_TRACKING_ID,
      ds: 'website',
      t: 'event',
      cid: this.getCid(),
      ec: category,
      ea: action,
      el: label,
      ev: value,
      an: 'Kistaff',
      aid: 'vacataire.kistaff.fr',
      av: 'v1.0'
    } })
  },

  logPage (path, name) {
    axios.get('https://www.google-analytics.com/collect', { params: {
      v: 1,
      tid: process.env.GA_TRACKING_ID,
      ds: 'app',
      t: 'pageview',
      cid: this.getCid(),
      dl: path,
      an: 'Kistaff',
      aid: 'vacataire.kistaff.fr',
      av: 'v1.0'
    } })
  },

  getCid () {
    if (!localStorage.cid) {
      localStorage.cid = uid()
    }
    return localStorage.cid
  }
}
