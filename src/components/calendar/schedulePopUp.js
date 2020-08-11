import React, {useState} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'

import {registerEstimateAppointment} from '../../state/actions/appointmentActions.js'

import ScheduleForm from './scheduleForm.js'
import ErrorPop from './errorPop.js'


const SchedulePopup = ({popLocation,
  check_id,
  cancel,
  registerEstimateAppointment,
  appointments,
  current_user,
}) => {
  const id = popLocation.id
  const errorMsg = "Only one appointment is allowed at a time per user."

  const [viewConfirm, setViewConfirm] = useState(
    current_user.id
    ? true
    : false
  )

  const [errorPop, setErrorPop] = useState(false)

  const changeConfirm = () => {
    const check = viewConfirm;
    setViewConfirm(!check)
  }

  const setAppointmentCheck = () => {
    for(const key in appointments) {
      if(appointments[key].user_id === current_user.id) {
        return false
      }
      console.log(appointments[key].user_id, current_user.id)
      return true
    }
  }


  const innercancel = (e) => {
    cancel()
  }

  const confirm = (e) => {
    e.preventDefault()
    if(setAppointmentCheck()) {
      registerEstimateAppointment(id, current_user.id)
      cancel();
    } else {
      setErrorPop(true)
    }
  }

  const changeErrorPop = () => {
    const currentState = errorPop
    setErrorPop(!currentState)
  }

  const styling = {
    position: "absolute",
    fontSize: "1rem",
    width: 300,
    border: "1px solid lightgray",
    // top: popLocation.top - popLocation.top,
    left: popLocation.width + 5,
    backgroundColor: "white",
    zIndex: 1000,
    marginTop: -22,
    padding: 3,
    borderRadius: 5,
  } 

  return (
    <>
    {id === check_id
      ?
      <div className="schedualPopupContainter" style={styling}>
        <article className="schedualPopup">
          <p className="dateMsg">Schedule Estimate on {popLocation.date} </p>
          {viewConfirm && !errorPop
            ? (
              <div className="buttonContainer">
                <button className="confirm" onClick={confirm}>Confirm</button>
                <button className="cancel" onClick={innercancel}>Cancel</button>
              </div>
            )
            : errorPop
            ? <ErrorPop changeErrorPop={changeErrorPop} msg={errorMsg}/>
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
  {registerEstimateAppointment}
)(SchedulePopup)

SchedulePopup.propTypes = {
  popLocation: PropTypes.shape({
    id: PropTypes.string,
    checked: PropTypes.bool,
    top: PropTypes.number,
    left: PropTypes.number,
    width: PropTypes.number,
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
  )
}

