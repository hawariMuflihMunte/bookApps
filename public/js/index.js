import Theme from './theme/theme.js'
import Utils from './utils/utils.js'
import Views from './views/views.js'

/*
 * Sweetalert (swal) is imported in HTML file using CDN links
 */

function main () {
  /**
   * Run theme switcher first then the main app business logic
   */
  Theme()

  // eslint-disable-next-line no-unused-vars
  const _data = []
  // eslint-disable-next-line no-unused-vars
  const DATA_KEY = +new Date()

  const containerUnread = document.querySelector('.container-unread')
  const containerRead = document.querySelector('.container-read')

  // Empty content first
  containerUnread.innerHTML = ''
  containerRead.innerHTML = ''

  const cardData = [
    {
      id: Utils._id(),
      title: 'Hawari Muflih Munte',
      writer: 'Muflih Munte',
      year: 20,
      isRead: false
    },
    {
      id: Utils._id(),
      title: 'Hawari #2',
      writer: 'Muflih #2',
      year: 25,
      isRead: false
    },
    {
      id: Utils._id(),
      title: 'Hawari #3',
      writer: 'Muflih #3',
      year: 30,
      isRead: false
    },
    {
      id: Utils._id(),
      title: 'Hawari Muflih Munte',
      writer: 'Muflih Munte',
      year: 20,
      isRead: true
    },
    {
      id: Utils._id(),
      title: 'Hawari #2',
      writer: 'Muflih #2',
      year: 25,
      isRead: true
    },
    {
      id: Utils._id(),
      title: 'Hawari #3',
      writer: 'Muflih #3',
      year: 30,
      isRead: true
    }
  ]

  for (const _card_ of cardData) {
    const card = Views.card(_card_)
    console.log(_card_)
    containerUnread.appendChild(card)
  }
}

main()
