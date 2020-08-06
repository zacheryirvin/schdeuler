import {EstimateAppointment, WorkingAppointment} from "../../classes/Appointments.js"
import {PropTypes} from 'prop-types'
import withPropTypes from '../../helpers/withPropTypes.js'

import {
  ADDESTIMATEAPPOINTMENT,
  CONFIRMESTIMATEAPPOINTMENT,
  DENYESTIMATEAPPOINTMENT,
  EDITESTIMATEAPPOINTMENT,
  ADDWORKINGAPPOINTMENT,
  CONFIRMWORKINGAPPOINTMENT,
  DENYWORKINGAPPOINTMENT,
  EDITWORKINGAPPOINTMENT,
} from '../constants.js'


const initialState = {
  estimateAppointments: {},
  workingAppointments: {}
}

const estimateAppointmentSchema = {
  id: PropTypes.string.isRequired,
  user_id: PropTypes.string.isRequired,
  scheduled_date: PropTypes.string.isRequired,
  confirmed: PropTypes.bool.isRequired,
}

const workingAppointmentSchema = {
  id: PropTypes.string.isRequired,
  estimate_id: PropTypes.string.isRequired,
  user_id: PropTypes.string.isRequired,
  scheduled_date: PropTypes.string.isRequired,
  confirmed: PropTypes.bool.isRequired,
}

const stateSchema = PropTypes.shape({
  estimateAppointments: PropTypes.objectOf(
    PropTypes.shape(estimateAppointmentSchema).isRequired
  ),
  workingAppointments: PropTypes.objectOf(
    PropTypes.shape(workingAppointmentSchema).isRequired
  )
})

const appointmentReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADDESTIMATEAPPOINTMENT:
      const newEstimateAppoitmentId = action.payload.id;
      const acopy = {...state}
      acopy.estimateAppointments[newEstimateAppoitmentId] = action.payload.temp
      return acopy;
    case CONFIRMESTIMATEAPPOINTMENT:
      const cestimateId = action.payload.id;
      const ccopy = {...state}
      ccopy.estimateAppointments[cestimateId].confirmed = action.payload.confirmed
      return ccopy
    case EDITESTIMATEAPPOINTMENT:
      const eestimateId = action.payload.id;
      const ecopy = {...state}
      ecopy.estimateAppointments[eestimateId].scheduled_date = action.payload.scheduled_date
      return ecopy;
    default:
      return {...state}
  }
}

export default withPropTypes(
  'appointmentReducer',
  stateSchema,
)(appointmentReducer)
