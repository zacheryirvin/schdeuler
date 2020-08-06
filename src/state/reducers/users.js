import User from "../../classes/Users.js"
import {EstimateAppointment} from '../../classes/Appointments.js' 
import {PropTypes} from 'prop-types'
import withPropTypes from '../../helpers/withPropTypes.js'

import {
  ADDUSER,
  DELETEUSER
} from '../constants.js'

const initialState = {
  users: {},
}

const userSchema = {
  id: PropTypes.string.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  phone_number: PropTypes.string.isRequired,
  address: PropTypes.shape({
    address_line_one: PropTypes.string.isRequired,
    address_line_two: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired
  })
}

const stateSchema = PropTypes.objectOf(
  PropTypes.objectOf(
    PropTypes.shape(userSchema).isRequired
  )
)

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADDUSER:
      const newUserId = action.payload.id
      state.users[newUserId] = action.payload.temp
    default:
      return {...state};
  }
}

export default withPropTypes(
  'userReducer',
  stateSchema,
)(userReducer);
