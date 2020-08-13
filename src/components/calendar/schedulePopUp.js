import React, {useState} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {navigate} from '@reach/router'
import {Link} from 'gatsby'

import {
  registerEstimateAppointment,
  editEstimateAppoinment,
  } from '../../state/actions/appointmentActions.js'

import ScheduleForm from './scheduleForm.js'
import ErrorPop from './errorPop.js'


const SchedulePopup = ({popLocation,
  check_id,
  cancel,
  registerEstimateAppointment,
  editEstimateAppoinment,
  appointments,
  updateRerenderId,
  current_user,
}) => {
  const id = popLocation.id
  const errorMsg = "Only one appointment is allowed at a time per user.If you would like to reschedule click the reschedule button"

  const [viewConfirm, setViewConfirm] = useState(
    current_user.id
    ? true
    : false
  )
  const [reschedual, setReschedual] = useState(false)
  const [errorPop, setErrorPop] = useState(false)

  const changeConfirm = () => {
    const check = viewConfirm;
    setViewConfirm(!check)
  }

  const changeReschedual = e => {
    setReschedual(true)
    changeErrorPop()
  }

  const setAppointmentCheck = () => {
    let returnBool = true
    for(const key in appointments) {
      if(appointments[key].user_id === current_user.id) {
        returnBool = false
      }
    }
    return returnBool
  }


  const innercancel = (e) => {
    cancel()
  }

  const confirm = (e) => {
    e.preventDefault()
    const outerParentId = e.target.parentElement.parentElement.parentElement.parentElement.id
    let date;
    if(reschedual) {
      let oldId
      for(const key in appointments) {
        if(appointments[key].user_id === current_user.id) {
          oldId = key
          break
        }
        date=appointments[id].scheduled_date.toLocaleString()
      }
      editEstimateAppoinment(oldId, id, current_user.id)
      setReschedual(false)
      updateRerenderId(outerParentId)
      cancel()
      navigate('/successRequest', {state:{date}})
    }else if(setAppointmentCheck()) {
      date = appointments[id].scheduled_date.toLocaleString()
      registerEstimateAppointment(id, current_user.id)
      cancel();
      navigate('/successRequest', {state:{date}})
    } else {
      setErrorPop(true)
    }
  }

  const changeErrorPop = () => {
    const currentState = errorPop
    setErrorPop(!currentState)
  }

  const rightstyling = {
    position: "absolute",
    fontSize: "1rem",
    width: 300,
    border: "1px solid lightgray",
    left: popLocation.width + 5,
    backgroundColor: "white",
    zIndex: 1000,
    marginTop: -22,
    padding: 3,
    borderRadius: 5,
  } 

  const leftstyling = {
    position: "absolute",
    fontSize: "1rem",
    width: 300,
    border: "1px solid lightgray",
    right: popLocation.width + 5,
    backgroundColor: "white",
    zIndex: 1000,
    marginTop: -24,
    padding: 3,
    borderRadius: 5,
  }

  return (
    <>
    {id === check_id
      ?
      <div className={
        popLocation.left > popLocation.outWidth * 4
        ? "leftschedualPopupContainer"
        : "rightschedualPopupContainter"
      } style={
        popLocation.left > popLocation.outWidth * 4 
        ? leftstyling
        : rightstyling
      }>
        <article className="schedualPopup">
          <p className="dateMsg">Schedule Estimate on {popLocation.date} </p>
          {viewConfirm && !errorPop
            ? (
              <div className="buttonContainer">
                <button className="request" onClick={confirm}>Request</button>
                <button className="cancel" onClick={innercancel}>Cancel</button>
              </div>
            )
            : errorPop
            ? <ErrorPop changeErrorPop={changeErrorPop}
              changeReschedual={changeReschedual} msg={errorMsg}/>
            : <ScheduleForm cancel={innercancel} changeConfirm={changeConfirm} id={id}/>
          }
        </article>
      </div>
      : null
    }
    </>
  )
}

const mstp = state => ({
  current_user: state.users.current_user, 
  appointments: state.appointments.estimateAppointments
})

export default connect(mstp,
  {
    registerEstimateAppointment,
    editEstimateAppoinment,
  }
)(SchedulePopup)

SchedulePopup.propTypes = {
  popLocation: PropTypes.shape({
    id: PropTypes.string,
    checked: PropTypes.bool,
    top: PropTypes.number,
    left: PropTypes.number,
    width: PropTypes.number,
    outWidth: PropTypes.number,
    date: PropTypes.string,
  }),
  check_id: PropTypes.number,
  cancel: PropTypes.func.isRequired,
  current_user: PropTypes.object,
  registerEstimateAppointment: PropTypes.func.isRequired,
  appointments: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user_id: PropTypes.string,
      scheduled_date: PropTypes.object,
      confirmed: PropTypes.bool
    })
  ),
  editEstimateAppoinment: PropTypes.func.isRequired,
  updateRerenderId: PropTypes.func.isRequired

}

