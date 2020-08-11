import User from "../../classes/Users.js" 
import {v4 as uuidv4} from 'uuid'
import {connect} from 'react-redux'

import {
  ADDUSER,
  EDITUSER,
  DELETEUSER
} from '../constants.js'

export const addUser = (user) => {
  const temp = new User(uuidv4(), user.first_name, user.last_name, user.email, user.phone_number, user.address); 
  return {type: ADDUSER, payload: {id: temp.Id, temp}};
}

export const deleteUser = (userId, users) => {
  const updatedUsers = users.filter(user => userId !== user.id);
  return {type: DELETEUSER, users: updatedUsers};
}
