import { Link } from "gatsby"
import {connect} from 'react-redux'
import PropTypes from "prop-types"
import React from "react"

import {
  setMonth 
} from '../state/actions/appointmentActions.js'

import '../styles/header.scss'

const Header = ({ siteTitle,
  viewMonth,
  currentMonth,
  allMonths,
  setMonth,
}) => {
  
  const goToNextMonth = () => {
    const next_month = allMonths.find(edge => {
      return edge.node.month_number === currentMonth.node.month_next
    })
    setMonth(next_month)
  }
  const goToPrevMonth = () => {
    const prev_month = allMonths.find(edge => {
      return edge.node.month_number === currentMonth.node.month_prev
    })
    setMonth(prev_month)
  }

  return (
    <header>
      <div className="leftContainer">
        <Link to="/">Home</Link>
        <Link to="/scheduleAppointment">Scheduler</Link>
      </div>
    {viewMonth
      ?(
      <div className="rightContainer">
        <p className="changeMonth"onClick={goToPrevMonth}>{"<"}</p>
        <p className="currentMonth">{currentMonth.node.month_name}</p>
        <p className="changeMonth" onClick={goToNextMonth}>{">"}</p>
      </div>
      ) : null
    }
    </header>
  )
}

const mstp = state => ({
  currentMonth: state.appointments.monthObj,
  viewMonth: state.appointments.viewMonth,
  allMonths: state.appointments.allMonths,
})

// export default Header
export default connect(mstp, {setMonth})(Header)

Header.propTypes = {
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
  viewMonth: PropTypes.bool,
  allMonths: PropTypes.array,
  siteTitle: PropTypes.string,
  setMonth: PropTypes.func.isRequired,
}
