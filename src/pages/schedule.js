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

const Scheduler = ({location, initialMonthLoad}) => {
  console.log(location)

  const viewMonth = 
    location.state.allMonth.edges.find(edge => {
      return edge.node.month_number === getMonth(new Date())
    })
   

  useEffect(() => {
    initialMonthLoad(true, location.state.allMonth.edges, viewMonth)
  },[])

  return (
    <>
      <Layout>
        <Calendar data={location.state.allMonth.edges} admin={true}/> 
      </Layout>
    </>
  )
}

// export default CustomerScheduler;
export default connect(null,{initialMonthLoad})(Scheduler)

Scheduler.propTypes = {
  location: PropTypes.object,
  initialMonthLoad: PropTypes.func.isRequired
}
