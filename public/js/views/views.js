class ViewsClass {
  createCard (cardData) {
    const {
      title,
      writer,
      year
    } = cardData

    // This card styling is integrated with tailwindcss
    const cardElement = `
        <div class="content-item">
            <div class="bg-slate-100 dark:bg-slate-300 rounded-lg p-4 shadow-lg overflow-hidden flex flex-col">
                <div class="content-item-header mb-2">
                    <h4 class="text-2xl text-slate-600 text-center">${title}</h4>
                    <p class="text-base text-slate-500 text-center">${writer}</p>
                    <p class="text-sm text-slate-500 text-center">${Number(year)}</p>
                </div>
                <div class="inline-flex">
                    <button class="bg-amber-500 hover:bg-amber-600 dark:bg-slate-200 dark:hover:bg-slate-300 text-gray-800 dark:text-amber-600 dark:hover:text-amber-800 font-bold py-1 px-2 flex place-content-center place-items-center transition-all duration-150 rounded-l">
                        <i class="material-symbols-outlined">edit_note</i>
                    </button>
                    <button class="bg-green-500 hover:bg-green-600 dark:bg-slate-200 dark:hover:bg-slate-300 text-gray-800 dark:text-green-600 dark:hover:text-green-800 font-bold py-1 px-2 flex place-content-center place-items-center transition-all duration-150">
                        <i class="material-symbols-outlined">check</i>
                    </button>
                    <button class="bg-red-500 hover:bg-red-600 dark:bg-slate-200 dark:hover:bg-slate-300 text-gray-800 dark:text-red-600 dark:hover:text-red-800 font-bold py-1 px-2 flex place-content-center place-items-center transition-all duration-150 rounded-r">
                        <i class="material-symbols-outlined">delete</i>
                    </button>
                </div>
            </div>
        </div>
    `

    return cardElement
  }

  themeSwitcher () {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon')
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon')

    // Change the icons inside the button based on previous settings
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      themeToggleLightIcon.classList.remove('hidden')
    } else {
      themeToggleDarkIcon.classList.remove('hidden')
    }

    const themeToggleBtn = document.getElementById('theme-toggle')

    themeToggleBtn.addEventListener('click', function () {
      // toggle icons inside button
      themeToggleDarkIcon.classList.toggle('hidden')
      themeToggleLightIcon.classList.toggle('hidden')

      // if set via local storage previously
      if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
          document.documentElement.classList.add('dark')
          localStorage.setItem('color-theme', 'dark')
        } else {
          document.documentElement.classList.remove('dark')
          localStorage.setItem('color-theme', 'light')
        }

        // if NOT set via local storage previously
      } else {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark')
          localStorage.setItem('color-theme', 'light')
        } else {
          document.documentElement.classList.add('dark')
          localStorage.setItem('color-theme', 'dark')
        }
      }
    })
  }
}

const Views = new ViewsClass()

export default Views
