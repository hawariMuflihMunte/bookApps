class Utils {
  makeId () {
    return Number(`${+new Date().getFullYear()}${+new Date().getMinutes().toPrecision()}${+new Date().getMilliseconds()}${Math.round(Math.random() * 99999999) + 1}`)
  }
}

const utils = new Utils()

export default utils
