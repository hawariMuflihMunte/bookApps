import _data from './data/data.js'

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
  const DATA_KEY = +new Date()

  const containerUnread = document.querySelector('.container-unread')
  const containerRead = document.querySelector('.container-read')

  // Empty content first
  containerUnread.innerHTML = ''
  containerRead.innerHTML = ''

  for (const _card_ of _data) {
    const card = Views.card(_card_)
    console.log(_card_)

    if (!_card_.isRead) {
      containerUnread.appendChild(card)
    } else {
      containerRead.appendChild(card)
    }
  }
}

main()
