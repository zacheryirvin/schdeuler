import React, {useState} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {addUser} from '../../state/actions/usersActions.js'
import {registerEstimateAppointment} from '../../state/actions/appointmentActions.js'

const ScheduleForm = (props) => {
  const emptyObj = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address_one: "",
    address_two: "",
    city: "",
    state: "",
    zip: ""
  }

  const [userInfo, setUserInfo] = useState({...emptyObj})

  const getInput = e => {
    e.preventDefault();
    const id = e.target.id
    let copy = {...userInfo}
    copy[id] = e.target.value
    setUserInfo(copy)
  }

  const setNewUser = e => {
    e.preventDefault();
    const newUser = {
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      email: userInfo.email,
      phone_number: userInfo.phone_number,
      address: {
        address_line_one: userInfo.address_one,
        address_line_two: userInfo.address_two,
        city: userInfo.city,
        state: userInfo.state,
        zip: userInfo.zip
      }
    }

    props.addUser(newUser)
    setUserInfo({...emptyObj})
    props.changeConfirm()
  }

  return (
    <form className="customerInfo">
      <div className="labelInputContainer">
        <label className="textLabel" htmlFor="first_name">First Name: </label>
        <input id="first_name" className="textInput" type="text" value={userInfo.first_name} required onChange={getInput}/>
      </div>
      <div className="labelInputContainer">
        <label className="textLabel" htmlFor="last_name">Last Name: </label>
        <input id="last_name" className="textInput" type="text" value={userInfo.last_name} required onChange={getInput}/>
      </div>
      <div className="labelInputContainer">
        <label className="textLabel" htmlFor="phone_number">Phone Number: </label>
        <input id="phone_number" className="textInput" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={userInfo.phone_number} required onChange={getInput}/>
      </div>
      <div className="labelInputContainer">
        <label className="textLabel" htmlFor="email">Email: </label>
        <input id="email" className="textInput" type="email" value={userInfo.email} required onChange={getInput}/>
      </div>
      <div className="labelInputContainer">
        <label className="textLabel" htmlFor="address_one">Address Line One: </label>
        <input id="address_one" className="textInput" type="text" value={userInfo.address_one} required onChange={getInput}/>
      </div>
      <div className="labelInputContainer">
        <label className="textLabel" htmlFor="address_two">Address Line Two: </label>
        <input id="address_two" className="textInput" type="text" value={userInfo.address_two} onChange={getInput}/>
      </div>
      <div className="labelInputContainer">
        <label className="textLabel" htmlFor="city">City: </label>
        <input id="city" className="textInput" type="text" value={userInfo.city} required onChange={getInput}/>
      </div>
      <div className="labelInputContainer">
        <label className="textLabel" htmlFor="state">State: </label>
        <select id="state" className="statesInput" name="" onChange={getInput}>
          <option value="NM">NM</option>
          <option value="OK">OK</option>
          <option value="TX" selected>TX</option>
        </select>
      </div>
      <div className="labelInputContainer">
        <label className="textLabel" htmlFor="zip">Zip: </label>
        <input id="zip" className="textInput" type="text" value={userInfo.zip} required onChange={getInput}/>
      </div>
      <div className="labelInputContainer">
        <button onClick={setNewUser}>Submit</button>
        <button onClick={props.cancel}>Cancel</button>
      </div>
    </form>
  )
}

export default connect(null,
  {addUser, registerEstimateAppointment}
)(ScheduleForm)

ScheduleForm.propTypes = {
  cancel: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  changeConfirm: PropTypes.func.isRequired
}
