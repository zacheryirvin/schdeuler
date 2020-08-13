import {EstimateAppointment, WorkingAppointment} from "../../classes/Appointments.js"
import {PropTypes} from 'prop-types'
import {v4 as uuidv4} from 'uuid'; 
import withPropTypes from '../../helpers/withPropTypes.js'

import {
  ADDESTIMATEAPPOINTMENT,
  CONFIRMESTIMATEAPPOINTMENT,
  REGISTERESTIMATEAPPOINTMENT,
  DENYESTIMATEAPPOINTMENT,
  EDITESTIMATEAPPOINTMENT,
  ADDWORKINGAPPOINTMENT,
  CONFIRMWORKINGAPPOINTMENT,
  DENYWORKINGAPPOINTMENT,
  EDITWORKINGAPPOINTMENT,
  SETMONTH,
  SETVIEWMONTH,
  INITALMONTHLOAD,
} from '../constants.js'


const initialState = {
  estimateAppointments: {},
  workingAppointments: {},
  viewMonth: false,
  allMonths: [],
  monthObj: {},
}

for (let i = 0; i < 5; i++) {
  let date = new Date();
  let friday = new Date(2020, 8, 14)
  date.setHours(i)
  friday.setHours(i)
  const temp = (new EstimateAppointment(uuidv4(), null, date, null));  
  const tempTwo = (new EstimateAppointment(uuidv4(), null, friday, null));  
  initialState.estimateAppointments[temp.id] = temp;
  initialState.estimateAppointments[tempTwo.id] = tempTwo;
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
      acopy.estimateAppointments[newEstimateAppoitmentId] = action.payload.eappointment
      return acopy;
    case CONFIRMESTIMATEAPPOINTMENT:
      const cestimateId = action.payload.id;
      const ccopy = {...state}
      ccopy.estimateAppointments[cestimateId].confirmed = action.payload.confirmed
      return ccopy
    case REGISTERESTIMATEAPPOINTMENT:
      const restimateId = action.payload.id;
      const rcopy = {...state}
      rcopy.estimateAppointments[restimateId].user_id = action.payload.user_id
      rcopy.estimateAppointments[restimateId].confirmed = action.payload.confirmed
      return rcopy
    case EDITESTIMATEAPPOINTMENT:
      const eestimateId = action.payload.id;
      const neweestimateId = action.payload.newId;
      const ecopy = {...state}
      ecopy.estimateAppointments[eestimateId].confirmed = null 
      ecopy.estimateAppointments[eestimateId].user_id = null
      ecopy.estimateAppointments[neweestimateId].user_id = action.payload.user_id
      ecopy.estimateAppointments[neweestimateId].confirmed = action.payload.confirmed
      return ecopy;
    case ADDWORKINGAPPOINTMENT:
      const newWorkingAppointmentId = action.payload.id;
      const awcopy = {...state}
      awcopy.workingAppointments[newWorkingAppointmentId] = action.payload.wappointment;
      return awcopy;
    case CONFIRMWORKINGAPPOINTMENT:
      const cworkingId = action.payload.id;
      const cwcopy = {...state};
      cwcopy.workingAppointments[cworkingId].confirmed = action.payload.confirmed
      return cwcopy;
    case EDITWORKINGAPPOINTMENT:
      const eworkingId = action.payload.id
      const ewcopy = {...state}
      ewcopy.workingAppointments[eworkingId].scheduled_date = action.payload.scheduled_date
      return ewcopy;
    case SETMONTH:
      return {...state, monthObj: action.payload.month}
    case SETVIEWMONTH:
      return {...state, viewMonth: action.payload.view}
    case INITALMONTHLOAD:
      return {...state, viewMonth: action.payload.view,
        allMonths: action.payload.data,
        monthObj: action.payload.month
      }
    default:
      return {...state}
  }
}

export default withPropTypes(
  'appointmentReducer',
  stateSchema,
)(appointmentReducer)
