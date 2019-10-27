import React from 'react'
import { BASE_URL } from '@env'
import init from 'startupjs/init'
import Todos from './components/Todos'
import orm from './model'
import { observer } from 'startupjs'
init({ baseUrl: BASE_URL, orm })

export default observer(function App () {
  return pug`Todos`
})
