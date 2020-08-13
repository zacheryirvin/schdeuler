import React from 'react'
import {PropTypes} from 'prop-types'

import '../../styles/calendar.scss'

import DaysOfWeek from './daysOfWeek.js'
import CellDays from './cellDays.js'

const Calender = (props) => {

  return (
    <div className="calendarContainer">
      <DaysOfWeek/>
      <CellDays data={props.data} admin={props.admin}/>
    </div>
  )
}

export default Calender;

Calender.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.array
  ),
  admin: PropTypes.bool,
}
