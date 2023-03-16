import Data from '../data/data.js'
import Utils from '../utils/utils.js'

import Models from '../models/models.js'
import Views from '../views/views.js'

class Controller_ {
  constructor () {
    Views.render()
    this.#render()
  }

  #render () {
    const addBookForm = document.getElementById('add-data')

    addBookForm.addEventListener('submit', (e) => {
      e.preventDefault()

      this.#addBook()
      Views.render()

      console.log(Data)
    })
  }

  #addBook () {
    const title = document.getElementById('titleForm').value
    const writer = document.getElementById('writerForm').value
    const year = document.getElementById('yearForm').value
    const isRead = document.getElementById('isReadForm').checked

    if (
      title === '' &&
        writer === '' &&
        year === ''
    ) {
      // eslint-disable-next-line no-undef
      swal({
        title: 'Warning!',
        text: 'No data was inputted. Please input data first',
        icon: 'warning'
      })

      console.error('No data')

      return false
    }

    if (title === '') {
      // eslint-disable-next-line no-undef
      swal({
        title: 'Warning!',
        text: 'No title was inputted. Please input data first',
        icon: 'warning'
      })

      console.error('No title')

      return false
    }

    if (writer === '') {
      // eslint-disable-next-line no-undef
      swal({
        title: 'Warning!',
        text: 'No writer was inputted. Please input data first',
        icon: 'warning'
      })

      console.error('No Writer')

      return false
    }

    if (year === '') {
      // eslint-disable-next-line no-undef
      swal({
        title: 'Warning!',
        text: 'No year was inputted. Please input data first',
        icon: 'warning'
      })

      console.error('No Year')

      return false
    }

    const id = Utils._id()
    const data = Utils._bookCreate(
      id,
      title,
      writer,
      year,
      isRead
    )

    Data.push(data)
    Views.render()
  }
}

const Controller = new Controller_()

export default Controller
