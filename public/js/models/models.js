class ModelsClass {
  constructor () {
    if (!this.checkAvailability()) {
      console.error('Your web browser do not support web storage system. Try using different web browser to get the latest features with this app')
      return false
    }

    this._data = []
  }

  checkAvailability () {
    if (typeof (Storage) === 'undefined') {
      return false
    }
    return true
  }

  saveBook (key, object) {
    if (!this.checkAvailability()) return false

    const data = JSON.stringify(object)

    localStorage.setItem(key, data)
  }

  loadBook (key) {
    if (!this.checkAvailability()) return false

    const dataJson = localStorage.getItem(key)
    const data = JSON.parse(dataJson)

    return data
  }
}

const Models = new ModelsClass()

export default Models
