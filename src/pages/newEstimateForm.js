import React, {useState} from 'react'
import {connect} from 'react-redux'
import {v4 as uuidv4} from 'uuid'
import {PropTypes} from 'prop-types'

import {
  addEstimateAppointment,
  confirmEstimateAppointment,
  editEstimateAppoinment,
  addWorkingAppointment,
  confirmWorkingAppointment,
  editWorkingAppointment
} from '../state/actions/appointmentActions.js'

const NewEstimateForm = (props) => {

  const [userInput, setUserInput] = useState({user_id: uuidv4(), scheduled_date: "", confirmed: false});
  const [tempId, setTempId] = useState("")

  const gatherInput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const copy = {...userInput, scheduled_date: value}
    setUserInput(copy);
  }

  const submit = (e) => {
    e.preventDefault();
    props.addEstimateAppointment(userInput);
    setUserInput({user_id: uuidv4(), scheduled_date: "", confirmed: false})
  }

  const edit = (e) => {
    e.preventDefault();
    props.confirmWorkingAppointment(tempId);
  }

  const changeDate = (e) => {
    e.preventDefault();
    props.editWorkingAppointmentAppoinment(tempId, userInput.scheduled_date)
  }

  const addWorkApp = (e) => {
    e.preventDefault();
    const toSend = {estimate_id: tempId,
      user_id: '3a6b7cff-f6ca-4af5-9553-2cef57ab542b',
      scheduled_date: userInput.scheduled_date,
      confirmed: false
    }
    props.addWorkingAppointment(toSend)
  }

  const tempChange = (e) => {
    const value = e.target.value
    setTempId(value)
  }

  return (
    <form className="newEstimateForm">
      <div className="fieldContainer">
        <label className="textInputLabel" htmlFor="date">Date: </label>
        <input id="date" className="dateInputField" type="date" value={userInput.scheduled_date} onChange={gatherInput}/>
      </div>
    <input type="text" onChange={tempChange}/>
    <button className="submit" onClick={submit}>Submit</button>
    <button onClick={edit}>confirm</button>
    <button onClick={changeDate}>Change</button>
    <button onClick={addWorkApp}>Add Work</button>
    </form>
  )
}

const mstp = state => ({
  appointments: state.appointments
})

NewEstimateForm.propTypes = {
  addEstimateAppointment: PropTypes.func.isRequired,
  confirmEstimateAppointment: PropTypes.func.isRequired,
  editEstimateAppoinment: PropTypes.func.isRequired
}

export default connect(mstp,
  {
    addEstimateAppointment, 
    confirmEstimateAppointment,
    editEstimateAppoinment,
    addWorkingAppointment
  })(NewEstimateForm);
