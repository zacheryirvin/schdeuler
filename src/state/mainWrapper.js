import React from 'react'
import {Provider} from 'react-redux'
import {createStore as rCreateStore} from 'redux'
import rootReducer from './reducers'

const createStore = () => rCreateStore(rootReducer)

export default ({element}) => (
  <Provider store={createStore()}>{element}</Provider>
)
