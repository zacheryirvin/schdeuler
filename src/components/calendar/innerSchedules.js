import React, {useState} from 'react'
import {PropTypes} from 'prop-types';
import {v4 as uuidv4} from 'uuid'
import SchedulePopup from './schedulePopUp.js'

const InnerSchedule = (props) => {
  const expanded = props.expanded
  const [popUp, setPopUp] = useState({id: null, clicked: false, left: null, width: null, date:""});
  console.log(props.expanded)

  const expand = (e) => {
    e.preventDefault();
    const parentId = e.target.parentElement.id
    props.passExpand(parentId);
  }

  const cancel = () => {
    setPopUp({...popUp, clicked:false})
  }

  const getData = (e) => {
    const data = e.target.getBoundingClientRect()
    const id = e.target.id
    const date = e.target.innerHTML
    popUp.clicked === false
    ? setPopUp({id, clicked: true, left: data.left, width: data.width, date})
    : setPopUp({...popUp, clicked: false});
  }


  let counter = 0
  return (
    <>
      {expanded
        ? 
          <>
            {props.eAppointments.map((y, ind) => {
              if(y.scheduled_date.getDate() === (props.index - props.nullCells)) {
                counter++
                return (
                  <>
                    <div key={y.id} id={y.id} 
                    className={y.confirmed === null ? "schdate" : "pending"}
                    onClick={y.confirmed === null ? getData : null}
                    >{y.scheduled_date.toLocaleString()} </div> 
                    {popUp.clicked
                    ? <SchedulePopup popLocation={popUp} check_id={y.id} cancel={cancel}/>
                    : null
                    }
                  </>
                )
              }
            })}
            <div className="numberMore" onClick={expand}>...close</div>
          </>
        : 
      <>
      {props.eAppointments.map((y, ind) => {
        if(y.scheduled_date.getDate() === (props.index - props.nullCells)) {
          counter++
          return (counter > 4)
            ? (
              <div key={uuidv4()} className="numberMore" onClick={expand}>...{counter - 4} More</div> 
            )
            : (
              <>
                <div key={y.id} id={y.id} 
              onClick={y.confirmed === null ? getData : null}
              className={y.confirmed === null ? "schdate" : "pending"}
              >{y.scheduled_date.toLocaleString()}</div>
                {popUp.clicked
                ? <SchedulePopup popLocation={popUp} check_id={y.id} cancel={cancel}/>
                : null
                }
              </>
            )
        }
      })}
      </>
      }
    </>
  )
}

InnerSchedule.propTypes = {
  eAppointments: PropTypes.array,
  index: PropTypes.number,
  nullCells: PropTypes.number,
  passExpand: PropTypes.func.isRequired,
}

export default InnerSchedule;
