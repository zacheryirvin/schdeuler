import React from 'react'
import {graphql} from 'gatsby'
import {PropTypes} from 'prop-types'

import AdminPanel from '../components/admin/adminPanel.js'

export const adminquery = graphql`
  query AdminCalendarQuery {
    allMonth {
      edges {
        node {
          id
          month_name
          month_calendar_cells
          month_calendar_null_cells
          month_next
          month_number
          month_prev
        }
      }
    }
  }
`

const Admin = ({data}) => {
  console.log(data)
  return (
    <>
      <AdminPanel data={data}/>
    </>
  )
}

export default Admin

Admin.propTypes = {
  data: PropTypes.object,
}
