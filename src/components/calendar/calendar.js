import React from 'react'

import '../../styles/calendar.scss'

import DaysOfWeek from './daysOfWeek.js'
import CellDays from './cellDays.js'

const Calender = (props) => {
  const columns = new Array(7).fill(0)
  const rows = new Array(6).fill(0)

  return (
    <div className="calendarContainer">
      <DaysOfWeek/>
      <CellDays/>
    </div>
  )
}

export default Calender;
