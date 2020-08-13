import React, {useState, useEffect} from 'react'
import {PropTypes} from 'prop-types';
import {v4 as uuidv4} from 'uuid'
import SchedulePopup from './schedulePopUp.js'

const InnerSchedule = (props) => {
  const [expanded, setExpanded] = useState({id: null, ex: false});
  const [popUp, setPopUp] = useState({id: null, clicked: false, left: null, width: null, date:""});

  useEffect(() => {
    props.id !== expanded.id && expanded.id !== null
    ? setExpanded({...expanded, ex: false})
    : null
  },[props.id, props.rerender])
  
  const expand = (e) => {
    e.preventDefault();
    const parentClass = e.target.parentElement.className
    const id = e.target.parentElement.id
    parentClass === "cells" ? setExpanded({id, ex: true})
      : setExpanded({id, ex: false})
    // expanded === false ? setExpanded(true) : setExpanded(false)
    props.passExpand(id);
  }

  const cancel = () => {
    setPopUp({...popUp, clicked:false})
  }

  const getData = (e) => {
    const data = e.target.getBoundingClientRect()
    const outData = e.target.parentElement.parentElement.parentElement.getBoundingClientRect()
    // console.log(data)
    const id = e.target.id
    const date = e.target.innerHTML
    const parentId = e.target.parentElement.id
    popUp.clicked === false
      ? setPopUp({
        id,
        clicked: true,
        left: data.left,
        width: data.width,
        outWidth: outData.width,
        date
      })
    : setPopUp({...popUp, clicked: false});
  }


  let counter = 0
  return (
    <>
      {expanded.ex
        ? 
          <>
            {props.eAppointments.map((y, ind) => {
              if(y.scheduled_date.getDate() === (props.index - props.nullCells)) {
                counter++
                return (
                  <>
                    <div key={y.id} id={y.id} 
                    className={y.confirmed !== true ? "schdate" : "pending"}
                    onClick={y.confirmed !== true ? getData : null}
                    >{y.scheduled_date.toLocaleString()} </div> 
                    {popUp.clicked
                      ? <SchedulePopup popLocation={popUp}
                      check_id={y.id} cancel={cancel}
                      updateRerenderId={props.updateRerenderId}
                      />
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
              onClick={y.confirmed !== true ? getData : null}
              className={y.confirmed !== true ? "schdate" : "pending"}
              >{y.scheduled_date.toLocaleString()}</div>
                {popUp.clicked
                  ? <SchedulePopup popLocation={popUp}
                  check_id={y.id}
                  cancel={cancel}
                  updateRerenderId={props.updateRerenderId}
                  />
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
  id: PropTypes.number.isRequired,
  rerender: PropTypes.number,
  updateRerenderId: PropTypes.func
}

export default InnerSchedule;
