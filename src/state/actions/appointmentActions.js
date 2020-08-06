import {EstimateAppointment, WorkingAppointment} from '../../classes/Appointments.js'
import {v4 as uuidv4} from 'uuid'
import {connect} from 'react-redux'

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

export const addEstimateAppointment = (app) => {
  const temp = new EstimateAppointment(uuidv4(), app.user_id, app.scheduled_date, app.confirmed)
  return {type: ADDESTIMATEAPPOINTMENT, payload: {id: temp.appointmentId, temp} };
}

export const confirmEstimateAppointment = (id) => {
  return {type: CONFIRMESTIMATEAPPOINTMENT, payload: {id: id, confirmed: true}}
}

export const editEstimateAppoinment = (id, scheduled_date) => {
  return {type: EDITESTIMATEAPPOINTMENT, payload: {id: id, scheduled_date}}
}
