import React, {useEffect} from 'react'
import {PropTypes} from 'prop-types'
import {graphql} from 'gatsby'
import {connect} from 'react-redux'

import Layout from '../components/layout.js'
import Calendar from '../components/calendar/calendar.js' 

import {initialMonthLoad} from '../state/actions/appointmentActions.js'

import {
  getMonth
} from 'date-fns'

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

const CustomerScheduler = ({data, initialMonthLoad}) => {

  const viewMonth = 
    data.allMonth.edges.find(edge => {
      return edge.node.month_number === getMonth(new Date())
    })
   

  useEffect(() => {
    initialMonthLoad(true, data.allMonth.edges, viewMonth)
  },[])

  return (
    <>
      <Layout>
        <Calendar data={data.allMonth.edges}/> 
      </Layout>
    </>
  )
}

// export default CustomerScheduler;
export default connect(null,{initialMonthLoad})(CustomerScheduler)

CustomerScheduler.propTypes = {
  data: PropTypes.object,
  initialMonthLoad: PropTypes.func.isRequired
}
