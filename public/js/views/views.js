import Data from '../data/data.js'
import Utils from '../utils/utils.js'

class Views_ {
  constructor () {
    this.render()
  }

  render () {
    const containerUnread = document.querySelector('.container-unread')
    const containerRead = document.querySelector('.container-read')

    containerUnread.innerHTML = ''
    containerRead.innerHTML = ''

    if (!Utils._emptyArray(Data)) {
      for (const _card_ of Data[0]) {
        const card = this.card(_card_)
        console.log(_card_)

        if (!_card_.isRead) {
          containerUnread.appendChild(card)
        } else {
          containerRead.appendChild(card)
        }
      }
    } else {
      containerUnread.innerHTML = '<div class="p-4 text-slate-600 dark:text-slate-400">## No Data ##</div'
      containerRead.innerHTML = '<div class="p-4 text-slate-600 dark:text-slate-400">## No Data ##</div'
    }
  }

  card (data) {
    const {
      id,
      title,
      writer,
      year,
      isRead
    } = data

    const cardElement = document.createElement('div')
    cardElement.setAttribute('id', id)
    cardElement.classList.add('container-item')

    if (isRead) {
      cardElement.innerHTML = `
        <div class="bg-slate-100 dark:bg-slate-300 rounded-lg p-4 shadow-lg overflow-hidden flex flex-col content-center items-center pb-5">
            <div class="content-item-header mb-2 break-keep min-w-200">
                <h4 class="text-2xl max-w-xs text-slate-600 text-center">${title}</h4>
                <p class="text-base text-slate-500 text-center">${writer}</p>
                <p class="text-sm text-slate-500 text-center">${Number(year)}</p>
            </div>
            <div class="content-item-button inline-flex dark:shadow-lg">
                <button class="card-edit bg-amber-500 hover:bg-amber-600 dark:bg-slate-200 dark:hover:bg-slate-300 text-gray-800 dark:text-amber-600 dark:hover:text-amber-800 font-bold py-1 px-2 flex place-content-center place-items-center transition-all duration-150 rounded-l">
                    <i class="material-symbols-outlined">edit_note</i>
                </button>
                <button class="card-unread bg-blue-500 hover:bg-blue-600 dark:bg-slate-200 dark:hover:bg-slate-300 text-slate-200 dark:text-blue-600 dark:hover:text-blue-800 font-bold py-1 px-2 flex place-content-center place-items-center transition-all duration-150">
                    <i class="material-symbols-outlined">close</i>
                </button>
                <button class="card-delete bg-red-500 hover:bg-red-600 dark:bg-slate-200 dark:hover:bg-slate-300 text-gray-800 dark:text-red-600 dark:hover:text-red-800 font-bold py-1 px-2 flex place-content-center place-items-center transition-all duration-150 rounded-r">
                    <i class="material-symbols-outlined">delete</i>
                </button>
            </div>
        </div>
    `

      return cardElement
    }

    cardElement.innerHTML = `
        <div class="bg-slate-100 dark:bg-slate-300 rounded-lg p-4 shadow-lg overflow-hidden flex flex-col content-center items-center pb-5">
            <div class="content-item-header mb-2 break-keep min-w-200">
                <h4 class="text-2xl max-w-xs text-slate-600 text-center">${title}</h4>
                <p class="text-base text-slate-500 text-center">${writer}</p>
                <p class="text-sm text-slate-500 text-center">${Number(year)}</p>
            </div>
            <div class="content-item-button inline-flex dark:shadow-lg">
                <button class="card-edit bg-amber-500 hover:bg-amber-600 dark:bg-slate-200 dark:hover:bg-slate-300 text-gray-800 dark:text-amber-600 dark:hover:text-amber-800 font-bold py-1 px-2 flex place-content-center place-items-center transition-all duration-150 rounded-l">
                    <i class="material-symbols-outlined">edit_note</i>
                </button>
                <button class="card-read bg-green-500 hover:bg-green-600 dark:bg-slate-200 dark:hover:bg-slate-300 text-gray-800 dark:text-green-600 dark:hover:text-green-800 font-bold py-1 px-2 flex place-content-center place-items-center transition-all duration-150">
                    <i class="material-symbols-outlined">check</i>
                </button>
                <button class="card-delete bg-red-500 hover:bg-red-600 dark:bg-slate-200 dark:hover:bg-slate-300 text-gray-800 dark:text-red-600 dark:hover:text-red-800 font-bold py-1 px-2 flex place-content-center place-items-center transition-all duration-150 rounded-r">
                    <i class="material-symbols-outlined">delete</i>
                </button>
            </div>
        </div>
    `

    return cardElement
  }
}

const Views = new Views_()

export default Views
