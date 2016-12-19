if (module.hot) {
  module.hot.accept()
}

import './style.scss'

import {groupBy} from 'lodash'
import people from './people'

const managerGroups = groupBy(people, 'manager')

const root = document.querySelector('#root')
root.innerHTML = `<pre>${JSON.stringify(managerGroups, null, 2)}</pre>`

const routes = {
  dashboard: () => {
    require.ensure([], (require) => {
      require('./dashboard')
    })
  }
}

// demo async loading with a timeout
setTimeout(routes.dashboard, 1000)
