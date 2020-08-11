import React, {useState} from 'react'
import {connect} from 'react-redux'
import {EstimateAppointment} from '../../classes/Appointments.js'
import {
  startOfMonth,
  getDaysInMonth,
  getDay,
} from 'date-fns'

import {v4 as uuidv4} from 'uuid'
import InnerSchedule from './innerSchedules.js'

const CellDays = (props) => {
  // for(const prop in props.estimateAppointments) {
    // console.log(props.estimateAppointments[prop].scheduled_date);
  // }

  const [toExpand, setToExpand] = useState({id: "", expanded: false})

  const updateExpand = (id) => {
    let copy = {...toExpand};
    if(copy.id === id && copy.expanded) {
      copy.expanded = false;
      setToExpand(copy);
    } else {
      setToExpand({id: id, expanded: true});
    }
  }

  console.log("toExpand", toExpand)

  const eAppointments = []
  for (const prop in props.estimateAppointments) {
    const day = props.estimateAppointments[prop]
    eAppointments.push(props.estimateAppointments[prop]);
  }

  eAppointments.sort((a, b) => a.scheduled_date - b.scheduled_date)
  // eAppointments.forEach(x => console.log(x.scheduled_date.getDate()))
  // console.log(getDay(startOfMonth(new Date())))
  let numOfDays = getDaysInMonth( new Date());
  let calCels = []
  let nullCells = 0;
  let j = 0;
  for(let i = 0; i < numOfDays; i++) {
    if(i >= getDay(startOfMonth(new Date()))) {
      j++;
    } else {
      numOfDays++
      nullCells = i
    }
    calCels.push(j);
  }

  const checkVal = (e) => {
    console.log(new Date(e.target.innerHTML));
  }

  return (
  <>
    {calCels.map((x, i) => {
      const id = i; 
      return (
        <div key={id} className="outerContainer">
          <div className="appointmentContainer">
            <div id={id} className={((x > 0 && String(id) != toExpand.id) 
              || ( x > 0 && String(id) === toExpand.id && toExpand.expanded === false))
              ? "cells" 
              : (x > 0 && String(id) === toExpand.id && toExpand.expanded === true) 
              ? "expanded" 
              : null
            }>
            {x > 0 ? (
              <> 
                <p className="date">{x}</p> 
                <InnerSchedule eAppointments={eAppointments} index={i}
                nullCells={nullCells}
                passExpand={updateExpand}
                expanded={toExpand.expanded ? true : false}
                />
              </>
            ): null}
            </div>
        </div>
      </div>)}
    )}
  </>
  )
}

const mstp = state => ({
  estimateAppointments: state.appointments.estimateAppointments
})

export default connect(
  mstp,
  null
)(CellDays);
