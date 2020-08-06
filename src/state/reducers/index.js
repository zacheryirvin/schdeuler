import {combineReducers} from 'redux'

import users from './users.js'
import appointments from './appointments.js'

export default combineReducers({users, appointments});
