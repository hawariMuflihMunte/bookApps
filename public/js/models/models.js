import Data from '../data/data.js'
import DATA_KEY from './key.js'

class Models_ {
  constructor () {
    if (!this.#checkAvailability()) {
      console.log('Your web browser do not support web storage system. Try using different web browser to get the latest features with this app')
      return false
    }

    const key = DATA_KEY
    this.key = key
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
    const data = localStorage.getItem(this.key)
    return JSON.parse(data)
  }
}

const Models = new Models_()

export default Models
