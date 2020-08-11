import React from 'react'
import {PropTypes} from 'prop-types'

const ErrorPop = ({msg, changeErrorPop}) => {
  return (
    <>
      <p className="errorHead">Error</p>
      <p className="errorMsg">{msg}</p>
      <div className="buttonC">
        <button className="confirm" onClick={changeErrorPop}>OK</button>
      </div>
    </>
  )
}

export default ErrorPop;

ErrorPop.propTypes = {
  msg: PropTypes.string.isRequired,
  changeErrorPop: PropTypes.func.isRequired
}

