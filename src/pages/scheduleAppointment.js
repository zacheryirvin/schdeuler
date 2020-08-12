import React from 'react'
import {PropTypes} from 'prop-types'
import {graphql} from 'gatsby'

import Layout from '../components/layout.js'
import Calendar from '../components/calendar/calendar.js' 

export const query = graphql`
  query CalendarQuery {
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

const CustomerScheduler = ({data}) => {
  return (
    <>
      <Layout>
        <Calendar data={data.allMonth.edges}/> 
      </Layout>
    </>
  )
}

export default CustomerScheduler;

CustomerScheduler.propTypes = {
  data: PropTypes.object
}
