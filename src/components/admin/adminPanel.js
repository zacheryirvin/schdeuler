import React from 'react'
import {Link} from 'gatsby'
import {PropTypes} from 'prop-types'

const AdminPanel = (props) => {
  console.log(props)
  return (
    <div className="optionsContainer">
      <div className="schedule">
        <Link to="/schedule" className="adminLink" state={props.data}>Schedule</Link>
      </div>
      <div className="schedule">
        <Link to="#" className="adminLink">Database</Link>
      </div>
    </div>
  )
}

export default AdminPanel

AdminPanel.propTypes = {
  data: PropTypes.object,
}

