import React, {useState} from 'react'
import {PropTypes} from 'prop-types' 
import {connect} from 'react-redux'
import actions from '../state/actions/index.js'
const addUser = actions.addUser
const deleteUser = actions.deleteUser

const emptyAddress = {
  address_line_one: "",
  address_line_two: "",
  city: "",
  state: "",
  zip: "",
}
const NewUserForm = (props) => {

  const [userInfo, setUserInfo] = useState({first_name: "", last_name: "", phone_number: "", address: {...emptyAddress}})

  const gatherInput = (e) => {
    let copy = {...userInfo}
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    copy[id] != undefined ? copy[id] = value : copy.address[id] = value;
    setUserInfo(copy);
  }

  const submitInput = (e) => {
    e.preventDefault();
    props.addUser(userInfo);
    const reset = {first_name: "", last_name: "", phone_number: "", address: {...emptyAddress}}
    setUserInfo(reset);
  }

  return (
    <form>
      <div className="fieldContainer">
        <label className="textInputLabel" htmlFor="first_name">First Name: </label>
        <input id="first_name" className="textInput" type="text" value={userInfo.first_name} onChange={gatherInput}/>
      </div>
      <div className="fieldContainer">
        <label className="textInputLabel" htmlFor="last_name">Last Name: </label>
        <input id="last_name" className="textInput" type="text" value={userInfo.last_name} onChange={gatherInput}/>
      </div>
      <div className="fieldContainer">
        <label className="textInputLabel" htmlFor="phone_number">Phone Number: </label>
        <input id="phone_number" className="telephoneInput" type="tel" value={userInfo.phone_number} onChange={gatherInput}/>
      </div>
      <div className="fieldContainer">
        <div className="addressContainer">
          <label className="textInputLabel" htmlFor="address_line_one">Address Line One: </label>
          <input id="address_line_one" className="textInput" type="text" value={userInfo.address.address_line_one} onChange={gatherInput}/>
        </div>
        <div className="addressContainer">
          <label className="textInputLabel" htmlFor="address_line_two">Address Line Two: </label>
          <input id="address_line_two" className="textInput" type="text" value={userInfo.address.address_line_two} onChange={gatherInput}/>
        </div>
        <div className="addressContainer">
          <label className="textInputLabel" htmlFor="city">City: </label>
          <input id="city" className="textInput" type="text" value={userInfo.address.city} onChange={gatherInput}/>
        </div>
        <div className="addressContainer">
          <label className="textInputLabel" htmlFor="state">State: </label>
          <input id="state" className="textInput" type="text" value={userInfo.address.state} onChange={gatherInput}/>
        </div>
        <div className="addressContainer">
          <label className="textInputLabel" htmlFor="zip">Zip Code: </label>
          <input id="zip" className="textInput" type="text" value={userInfo.address.zip} onChange={gatherInput}/>
        </div>
      </div>
      <button className="submit" onClick={submitInput}>Submit</button>
    </form>
  )
}

const mstp = state => ({
  users: state.users.state
})

NewUserForm.propTypes = {
  addUser: PropTypes.func,
}

export default connect(mstp, {addUser, deleteUser})(NewUserForm);
