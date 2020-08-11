import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = (props) => {
  console.log(props)
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

export default IndexPage
