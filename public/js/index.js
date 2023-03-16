import Theme from './theme/theme.js'
import Views from './views/views.js'
// eslint-disable-next-line no-unused-vars
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
  Views.render()
}

main()
