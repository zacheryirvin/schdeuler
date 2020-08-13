import React, {useState, useEffect} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {EstimateAppointment} from '../../classes/Appointments.js'
import {
  startOfMonth,
  getDaysInMonth,
  getDay,
  addMonths,
  getMonth
} from 'date-fns'

import {v4 as uuidv4} from 'uuid'
import InnerSchedule from './innerSchedules.js'

import {
  initialMonthLoad
} from '../../state/actions/appointmentActions.js'

const CellDays = (props) => {
  const viewMonth = 
    props.currentMonth.node !== undefined
    ? props.currentMonth 
    : props.data.find(edge => {
      return edge.node.month_number === getMonth(new Date())
    })

  const [toExpand, setToExpand] = useState({id: "",
    rerenderId: "",
    expanded: false})

  const updateExpand = (id) => {
    let copy = {...toExpand};
    if(copy.id === id && copy.expanded) {
      copy.expanded = false;
      setToExpand(copy);
    } else {
      setToExpand({id: id, expanded: true});
    }
  }

  const updateRerenderId = (id) => {
    setToExpand({...toExpand, rerenderId: id})
  }

  const eAppointments = []
  for (const prop in props.estimateAppointments) {
    const day = props.estimateAppointments[prop]
    eAppointments.push(props.estimateAppointments[prop]);
  }

  eAppointments.sort((a, b) => a.scheduled_date - b.scheduled_date)
  // eAppointments.forEach(x => console.log(x.scheduled_date.getDate()))
  const appointmentsToShow = eAppointments.filter(x => {
    return getMonth(x.scheduled_date) === viewMonth.node.month_number
  })
  const checkVal = (e) => {
    console.log(new Date(e.target.innerHTML));
  }

  return (
  <>
    {viewMonth.node.month_calendar_cells.map((x, i) => {
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
                <InnerSchedule eAppointments={appointmentsToShow} index={i}
                nullCells={viewMonth.node.month_calendar_null_cells}
                passExpand={updateExpand}
                id={toExpand.id}
                updateRerenderId={updateRerenderId} 
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
  estimateAppointments: state.appointments.estimateAppointments,
  currentMonth: state.appointments.monthObj,
  allMonths: state.appointments.allMonths
})

export default connect(
  mstp,
  {initialMonthLoad} 
)(CellDays);

CellDays.propTypes = {
  estimateAppointments: PropTypes.array,
  currentMonth: PropTypes.shape({
    node: PropTypes.shape({
      id: PropTypes.string,
      month_calendar_cells: PropTypes.arrayOf(PropTypes.number),
      month_calendar_null_cells: PropTypes.number,
      month_name: PropTypes.string,
      month_next: PropTypes.number,
      month_number: PropTypes.number,
      month_prev: PropTypes.number,
    })
  }),
  allMonths: PropTypes.array,
  data: PropTypes.array
}
