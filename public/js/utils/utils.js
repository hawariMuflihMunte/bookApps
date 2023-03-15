class Utils {
  static _id () {
    return Number(`${+new Date().getFullYear()}${+new Date().getMinutes().toPrecision()}${+new Date().getMilliseconds()}${Math.round(Math.random() * 99999999) + 1}`)
  }

  static _emptyArray (_array) {
    if (!Array.isArray(_array)) return false
    if (_array.length === 0) return false
    return false
  }

  static _book (
    id,
    title,
    writer,
    year,
    isRead
  ) {
    return {
      id,
      title,
      writer,
      year,
      isRead
    }
  }

  static _findBook (id, _arrayBook) {
    for (const book of _arrayBook) {
      if (book.id === id) return book
    }
    return null
  }

  static _findBookByTitle (title, _arrayBook) {
    for (const book of _arrayBook) {
      if (book.title === title) return book
    }
    return null
  }
}

export default Utils
