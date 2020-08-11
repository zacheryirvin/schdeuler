import React from 'react'
import {v4 as uuidv4} from 'uuid'

const DaysOfWeek = () => {
  const days = ["Sun", "Mon", "Teus", "Wed", "Thurs", "Fri", "Sat"]
  return (
    <>
    {days.map(x => <div key={uuidv4()} className="daysOfWeek">{x}</div>)}
    </>
  )
}

export default DaysOfWeek;
