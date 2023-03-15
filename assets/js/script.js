const books = []
const searchContent = []
const RENDER_PROG = 'RENDER_PROG'
const SEARCH_DATA = 'SEARCH_DATA'
const DATA_KEY = 'DATA_BOOK'

const addData = document.getElementById('add-data')

addData.addEventListener('click', (e) => {
  const addDataForm = document.getElementById('add-data-form')
  addDataForm.classList.add('show-add-data-form')
  document.querySelector('body').style.overflow = 'hidden'

  document.getElementsByClassName('back')[0].addEventListener('click', () => {
    addDataForm.classList.remove('show-add-data-form')
    document.querySelector('body').style.overflow = 'auto'
  })
})

// StorageAPI
const checkStorageAPI = () => {
  if (typeof (Storage) === 'undefined') {
    alert('Your web browser does not support Web Storage API')
    return false
  }
  return true
}

const saveToLocalStorage = () => {
  if (checkStorageAPI()) {
    const data_ = JSON.stringify(books)
    localStorage.setItem(DATA_KEY, data_)
    document.dispatchEvent(new Event(RENDER_PROG))
  }
}

const loadFromLocalStorage = () => {
  const data_ = localStorage.getItem(DATA_KEY)
  const data = JSON.parse(data_)

  if (data !== null) {
    for (const book of data) {
      books.push(book)
    }
  }

  document.dispatchEvent(new Event(RENDER_PROG))
}
// End StorageAPI

// Book Methods
const emptyArray = (array) => {
  if (!Array.isArray(array)) return false
  if (array.length === 0) return true
  return false
}

const createBookObject = (id, title, author, year, isRead) => {
  return {
    id, title, author, year, isRead
  }
}

const findBook = (id) => {
  for (const book of books) {
    if (book.id === id) {
      return book
    }
  }
  return null
}

const findBookByTitle = (title) => {
  for (const book of books) {
    if (book.title === title) {
      return book
    }
  }
  return null
}

const moveToRead = (id) => {
  const target = findBook(id)
  if (target == null) return

  target.isRead = true

  saveToLocalStorage()
  document.dispatchEvent(new Event(RENDER_PROG))
}

const moveToUnread = (id) => {
  const target = findBook(id)
  if (target == null) return

  target.isRead = false

  saveToLocalStorage()
  document.dispatchEvent(new Event(RENDER_PROG))
}

const moveToDeletion = (id) => {
  const target = findBook(id)
  if (target == null) return

  const targetIndex = books.findIndex((object) => {
    return object.id === id
  })

  books.splice(targetIndex, 1)

  saveToLocalStorage()
  document.dispatchEvent(new Event(RENDER_PROG))
}

const moveToEditing = (id) => {
  const book = findBook(id)

  const bookTitle = document.getElementById('edit-name').value
  const bookAuthor = document.getElementById('edit-writer').value
  const bookYear = document.getElementById('edit-year').value
  const isRead = book.isRead

  const target = books.findIndex((object) => {
    return object.id === id
  })
  if (target === -1) return

  swal({
    title: 'Change Value ?',
    text: 'Are you sure want to change this value ?',
    icon: 'warning',
    buttons: true
  })
    .then((OK) => {
      if (OK) {
        swal({
          title: 'Changed Successfully',
          text: 'Value has been updated',
          icon: 'success',
          button: true
        })
          .then((OK) => {
            if (OK) {
              const temp = {}

              temp.id = id
              temp.title = bookTitle
              temp.author = bookAuthor
              temp.year = bookYear
              temp.isRead = isRead

              books.splice(target, 1, temp)

              const editDataForm = document.getElementById('edit-data-form')
              editDataForm.classList.remove('show-edit-data-form')
              document.querySelector('body').style.overflow = 'auto'

              saveToLocalStorage()
              location.reload()
              document.dispatchEvent(new Event(RENDER_PROG))
              document.dispatchEvent(new Event(SEARCH_DATA))
            }
          })
      }
    })
}

const searchBook = (title) => {
  const book = findBookByTitle(title)
  if (book == null) {
    swal({
      title: 'Failed',
      text: 'Data is not found !',
      icon: 'error',
      button: 'OK'
    })
    return
  }

  const temp = {}
  temp.id = book.id
  temp.title = book.title
  temp.author = book.author
  temp.year = book.year
  temp.isRead = book.isRead

  if (emptyArray(searchContent)) {
    searchContent.push(temp)
  } else {
    searchContent.shift()
    searchContent.push(temp)
  }

  const temp_ = searchContent[0]

  const bookContainer = document.createElement('tr')
  bookContainer.setAttribute('id', `${temp_.id}`)

  const bookTitle = document.createElement('td')
  bookTitle.innerText = temp_.title

  const bookAuthor = document.createElement('td')
  bookAuthor.innerText = temp_.author

  const bookYear = document.createElement('td')
  bookYear.innerText = temp_.year

  const buttonContainer = document.createElement('td')

  const changeButton = document.createElement('button')
  changeButton.setAttribute('type', 'button')
  changeButton.setAttribute('class', 'bttn-unite bttn-md bttn-warning edit-data')
  changeButton.setAttribute('style', 'border-radius: 6px; margin-left: 10px;')

  const changeButtonIcon = document.createElement('i')
  changeButtonIcon.setAttribute('class', 'bi-pencil-square')
  changeButton.append(changeButtonIcon)

  changeButton.addEventListener('click', (e) => {
    const editDataForm = document.getElementById('edit-data-form')

    const name_ = document.getElementById('edit-name')
    const author_ = document.getElementById('edit-writer')
    const year_ = document.getElementById('edit-year')

    name_.value = temp_.title
    author_.value = temp_.author
    year_.value = temp_.year

    editDataForm.classList.add('show-edit-data-form')
    document.querySelector('body').style.overflow = 'hidden'

    document.getElementsByClassName('back')[1].addEventListener('click', () => {
      editDataForm.classList.remove('show-edit-data-form')
      document.querySelector('body').style.overflow = 'auto'
    })

    const editData_ = document.getElementById('edit')
    editData_.addEventListener('submit', (e) => {
      e.preventDefault()

      moveToEditing(temp_.id)
    })
  })

  const deleteButton = document.createElement('button')
  deleteButton.setAttribute('type', 'button')
  deleteButton.setAttribute('class', 'bttn-unite bttn-md bttn-danger')
  deleteButton.setAttribute('style', 'border-radius: 6px; margin-left: 10px;')

  const deleteButtonIcon = document.createElement('i')
  deleteButtonIcon.setAttribute('class', 'bi-trash2')
  deleteButton.append(deleteButtonIcon)

  deleteButton.addEventListener('click', (e) => {
    swal({
      title: 'Are you sure ?',
      text: 'Delete book',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
      .then((OK) => {
        if (OK) {
          swal('Book has been deleted', {
            icon: 'success'
          })

          moveToDeletion(temp_.id)
          location.reload()
        }
      })
  })

  buttonContainer.append(changeButton, deleteButton)
  bookContainer.append(bookTitle, bookAuthor, bookYear, buttonContainer)

  return bookContainer
}

const addBook = () => {
  const bookTitle = document.getElementById('name').value
  const bookAuthor = document.getElementById('writer').value
  const bookYear = document.getElementById('year').value
  const bookIsRead = document.getElementById('isread')

  let _isRead_ = false
  if (bookIsRead.checked === 'true' || bookIsRead.checked === true) {
    _isRead_ = true
  } else {
    _isRead_ = false
  }

  const uniqueId = +new Date()
  const bookObject = createBookObject(uniqueId, bookTitle, bookAuthor, bookYear, _isRead_)

  // Check availability of data insertion
  for (const book of books) {
    // Title, Author and Year cannot have same value at once,
    // prevent user from inputting the value
    if (book.title === bookObject.title &&
            book.author === bookObject.author &&
            book.year === bookObject.year) {
      swal({
        title: 'Failed',
        text: 'Failed to add data, data is already exists!',
        icon: 'error',
        button: 'OK'
      })
      return
    }
  }

  swal({
    title: 'Success',
    text: 'Data added successfully',
    icon: 'success',
    button: true
  })
    .then((OK) => {
      if (OK) {
        const addDataForm = document.getElementById('add-data-form')
        addDataForm.classList.remove('show-add-data-form')
        document.querySelector('body').style.overflow = 'auto'
      }
    })

  books.push(bookObject)

  saveToLocalStorage()
  document.dispatchEvent(new Event(RENDER_PROG))
}

const createBook = (bookObject) => {
  const {
    // eslint-disable-next-line no-unused-vars
    id, title, author, year, isRead
  } = bookObject

  const bookContainer = document.createElement('tr')
  bookContainer.setAttribute('id', `${id}`)

  const bookTitle = document.createElement('td')
  bookTitle.innerText = title

  const bookAuthor = document.createElement('td')
  bookAuthor.innerText = author

  const bookYear = document.createElement('td')
  bookYear.innerText = year

  const buttonContainer = document.createElement('td')

  if (bookObject.isRead) {
    const unreadButton = document.createElement('button')
    unreadButton.setAttribute('type', 'button')
    unreadButton.setAttribute('class', 'bttn-unite bttn-md bttn-default')
    unreadButton.setAttribute('style', 'border-radius: 6px;')

    const unreadButtonIcon = document.createElement('i')
    unreadButtonIcon.setAttribute('class', 'bi-x-circle')
    unreadButton.append(unreadButtonIcon)

    unreadButton.addEventListener('click', (e) => {
      swal({
        title: 'Are you sure ?',
        text: 'Move book to [unread]',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((OK) => {
          if (OK) {
            swal('Book has moved to [unread]', {
              icon: 'success'
            })

            moveToUnread(id)
          }
        })
    })

    buttonContainer.append(unreadButton)
  } else {
    const readButton = document.createElement('button')
    readButton.setAttribute('type', 'button')
    readButton.setAttribute('class', 'bttn-unite bttn-md bttn-success')
    readButton.setAttribute('style', 'border-radius: 6px;')

    const readButtonIcon = document.createElement('i')
    readButtonIcon.setAttribute('class', 'bi-check-circle')
    readButton.append(readButtonIcon)

    readButton.addEventListener('click', (e) => {
      swal({
        title: 'Are you sure ?',
        text: 'Move book to [read]',
        buttons: true
      })
        .then((OK) => {
          if (OK) {
            swal('Book has moved to [read]', {
              icon: 'success'
            })

            moveToRead(id)
          }
        })
    })

    buttonContainer.append(readButton)
  }

  const changeButton = document.createElement('button')
  changeButton.setAttribute('type', 'button')
  changeButton.setAttribute('class', 'bttn-unite bttn-md bttn-warning edit-data')
  changeButton.setAttribute('style', 'border-radius: 6px; margin-left: 10px;')

  const changeButtonIcon = document.createElement('i')
  changeButtonIcon.setAttribute('class', 'bi-pencil-square')
  changeButton.append(changeButtonIcon)

  changeButton.addEventListener('click', (e) => {
    const editDataForm = document.getElementById('edit-data-form')

    const name_ = document.getElementById('edit-name')
    const author_ = document.getElementById('edit-writer')
    const year_ = document.getElementById('edit-year')

    name_.value = title
    author_.value = author
    year_.value = year

    editDataForm.classList.add('show-edit-data-form')
    document.querySelector('body').style.overflow = 'hidden'

    document.getElementsByClassName('back')[1].addEventListener('click', () => {
      editDataForm.classList.remove('show-edit-data-form')
      document.querySelector('body').style.overflow = 'auto'
    })

    const editData_ = document.getElementById('edit')
    editData_.addEventListener('submit', (e) => {
      e.preventDefault()
      moveToEditing(id)
    })
  })

  const deleteButton = document.createElement('button')
  deleteButton.setAttribute('type', 'button')
  deleteButton.setAttribute('class', 'bttn-unite bttn-md bttn-danger')
  deleteButton.setAttribute('style', 'border-radius: 6px; margin-left: 10px;')

  const deleteButtonIcon = document.createElement('i')
  deleteButtonIcon.setAttribute('class', 'bi-trash2')
  deleteButton.append(deleteButtonIcon)

  deleteButton.addEventListener('click', (e) => {
    swal({
      title: 'Are you sure ?',
      text: 'Delete book',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
      .then((OK) => {
        if (OK) {
          swal('Book has been deleted', {
            icon: 'success'
          })

          moveToDeletion(id)
        }
      })
  })

  buttonContainer.append(changeButton, deleteButton)
  bookContainer.append(bookTitle, bookAuthor, bookYear, buttonContainer)
  return bookContainer
}
// End Book Methods

// Render program
document.addEventListener(RENDER_PROG, () => {
  const unreadBookContainer = document.getElementById('unread-book-container')
  const readBookContainer = document.getElementById('read-book-container')

  // Clearing any HTML inside
  unreadBookContainer.innerHTML = ''
  readBookContainer.innerHTML = ''

  if (!emptyArray(books)) {
    for (const temp of books) {
      const book = createBook(temp)
      if (temp.isRead) {
        readBookContainer.append(book)
      } else {
        unreadBookContainer.append(book)
      }
    }
  } else {
    const tableRowUnread = document.createElement('tr')
    const tableRowRead = document.createElement('tr')
    const tableDataUnread = document.createElement('td')
    const tableDataRead = document.createElement('td')

    tableDataUnread.setAttribute('colspan', '5')
    tableDataUnread.innerText = '-- No Data --'

    tableDataRead.setAttribute('colspan', '5')
    tableDataRead.innerText = '-- No Data --'

    tableRowUnread.append(tableDataUnread)
    tableRowRead.append(tableDataRead)

    unreadBookContainer.append(tableRowUnread)
    readBookContainer.append(tableRowRead)
  }
})

document.addEventListener(SEARCH_DATA, () => {
  const searchContent = document.getElementById('search-content')

  const searchForm = document.getElementById('search-form')
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const title = document.getElementById('search').value
    const data = searchBook(title)
    searchContent.innerHTML = ''

    if (data !== undefined) {
      const searchResultTable = document.getElementById('search-content-table')
      searchResultTable.style.display = 'table'
      searchContent.append(data)
    } else {
      swal({
        title: 'Failed',
        text: 'Data is not found !',
        icon: 'error',
        button: 'OK'
      })
    }
    document.getElementById('search').value = ''
  })
})

document.addEventListener('DOMContentLoaded', () => {
  // Insert book
  const addData_ = document.getElementById('add')
  addData_.addEventListener('submit', (e) => {
    e.preventDefault()
    addBook()

    // Clear input value after adding data
    document.getElementById('name').value = ''
    document.getElementById('writer').value = ''
    document.getElementById('year').value = `${+new Date().getFullYear()}`
    document.getElementById('isread').checked = false
  })

  document.dispatchEvent(new Event(RENDER_PROG))
  document.dispatchEvent(new Event(SEARCH_DATA))

  if (checkStorageAPI()) {
    loadFromLocalStorage()
  }
})
// End render program
