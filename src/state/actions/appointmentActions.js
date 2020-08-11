import {EstimateAppointment, WorkingAppointment} from '../../classes/Appointments.js'
import {v4 as uuidv4} from 'uuid'
import {connect} from 'react-redux'

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
} from '../constants.js'

export const addEstimateAppointment = (app) => {
  const temp = new EstimateAppointment(uuidv4(), uuidv4(), app.scheduled_date, app.confirmed)
  return {type: ADDESTIMATEAPPOINTMENT, payload: {id: temp.appointmentId, eappointment: temp} };
}

export const confirmEstimateAppointment = (id) => {
  return {type: CONFIRMESTIMATEAPPOINTMENT, payload: {id: id, confirmed: true}}
}

export const registerEstimateAppointment = (id, user_id) => {
  return {type: REGISTERESTIMATEAPPOINTMENT, payload: {id: id, confirmed: false, user_id}}
}

export const editEstimateAppoinment = (id, scheduled_date) => {
  return {type: EDITESTIMATEAPPOINTMENT, payload: {id: id, scheduled_date}}
}

export const addWorkingAppointment = (app) => {
  const temp = new WorkingAppointment(uuidv4(), app.estimate_id, app.user_id, app.scheduled_date, app.confirmed)
  return {type: ADDWORKINGAPPOINTMENT, payload: {id: temp.appointmentId, wappointment: temp}}
}

export const confirmWorkingAppointment = (id) => {
  return {type: CONFIRMWORKINGAPPOINTMENT, payload: {id: id, confirmed: true}}
}

export const editWorkingAppointment = (id, scheduled_date) => {
  return {type: EDITWORKINGAPPOINTMENT, payload: {id: id, scheduled_date}}
}
