import React from 'react'

import { Link } from "gatsby"
import {connect} from 'react-redux'
import {PropTypes} from 'prop-types'
import Layout from '../components/layout.js'

import {setViewing} from '../state/actions/appointmentActions.js'

const SuccessRequest = (props) => {
  props.setViewing(false)
  return (
    <>
      <Layout>
        <article className="successContainer">
          <h2 className="success">Success!!!</h2>
          <p className="content">
            Your request to schedual a free estimate on {props.location.state.date} was successfully sent.
          </p>
          <p className="content">??? Will call you shorty to confirm time and date.</p>
        </article>
      </Layout>
    </>
  ) 
}

export default connect(null, {setViewing})(SuccessRequest)
