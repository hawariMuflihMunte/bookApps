import Utils from '../utils/utils.js'
import Data from '../data/data.js'

class Models_ {
  constructor () {
    if (!this.#checkAvailability()) {
      console.error('Your web browser do not support web storage system. Try using different web browser to get the latest features with this app')
      return false
    }

    const DATA_KEY = +new Date()

    this.key = DATA_KEY
  }

  #checkAvailability () {
    if (typeof (Storage) === 'undefined') {
      return false
    }
    return true
  }

  saveBook () {
    const data = JSON.stringify(Data)

    localStorage.setItem(this.key, data)
  }

  loadBook () {
    const dataJson = localStorage.getItem(this.key)
    const data = JSON.parse(dataJson)

    return data
  }
}

const Models = new Models_()

export default Models
