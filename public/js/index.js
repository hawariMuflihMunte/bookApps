import Theme from './theme/theme.js'
import Views from './views/views.js'
import Controller from './controller/controller.js'

/*
 * Sweetalert (swal) is imported in HTML file using CDN links
 */

function main () {
  /**
   * Run theme switcher first then the main app business logic
   */
  Theme()

  // App logic
}

main()
