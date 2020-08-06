import React, {useState} from 'react'
import {connect} from 'react-redux'
import {v4 as uuidv4} from 'uuid'
import {PropTypes} from 'prop-types'

import {addEstimateAppointment, confirmEstimateAppointment} from '../state/actions/appointmentActions.js'

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
    console.log(props.appointments)
  }

  const edit = (e) => {
    e.preventDefault();
    props.confirmEstimateAppointment(tempId);
    console.log(props.appointments)
  }
  const tempChange = (e) => {
    const value = e.target.value
    console.log(value)
    setTempId(value)
  }

  return (
    <form className="newEstimateForm">
      <div className="fieldContainer">
        <label className="textInputLabel" htmlFor="date">Date: </label>
        <input id="date" className="dateInputField" type="date" value={userInput.scheduled_date} onChange={gatherInput}/>
      </div>
    <input type="test" onChange={tempChange}/>
    <button className="submit" onClick={submit}>Submit</button>
    <button onClick={edit}>test</button>
    </form>
  )
}

const mstp = state => ({
  appointments: state.appointments
})

NewEstimateForm.propTypes = {
  addEstimateAppointment: PropTypes.func.isRequired
}

export default connect(mstp, {addEstimateAppointment, confirmEstimateAppointment})(NewEstimateForm);
