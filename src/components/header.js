import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import '../styles/header.scss'

const Header = ({ siteTitle }) => (
  <header>
    <div className="leftContainer">
      <Link to="/">Home</Link>
      <Link to="/scheduleAppointment">Scheduler</Link>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
