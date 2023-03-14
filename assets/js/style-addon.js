document.addEventListener('DOMContentLoaded', () => {
  const inputAddon = document.getElementById('input-addon')

  inputAddon.addEventListener('click', (e) => {
    inputAddon.classList.add('move-input-addon')

    document.getElementById('search').addEventListener('blur', (e) => {
      inputAddon.classList.remove('move-input-addon')
    })
  })

  const year = document.getElementById('year')
  year.setAttribute('max', `${+new Date().getFullYear()}`)
  year.setAttribute('value', `${+new Date().getFullYear()}`)

  const editYear = document.getElementById('edit-year')
  editYear.setAttribute('max', `${+new Date().getFullYear()}`)

  const searchResultTable = document.getElementById('search-content-table')
  searchResultTable.style.display = 'none'
})
