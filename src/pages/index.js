import React from "react"
import { Link } from "gatsby"
import {connect} from 'react-redux'
import {PropTypes} from 'prop-types'

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import {setViewing} from '../state/actions/appointmentActions.js'

const IndexPage = (props) => {
  props.setViewing(false)
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <h2>Dont forget to change the meta data info before deploy</h2>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/newUserForm">New User</Link>
      <Link to="/newEstimateForm">New Estimate</Link>
      <Link to="/scheduleAppointment"> App </Link>
    </Layout>
  )
}

export default connect(null, {setViewing})(IndexPage)

IndexPage.propTypes = {
  setViewing: PropTypes.func,
}
