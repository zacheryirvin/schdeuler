const startOfMonth = require("date-fns/startOfMonth")
const getDaysInMonth = require("date-fns/getDaysInMonth")
const getDay = require("date-fns/getDay")
const addMonths = require("date-fns/addMonths")
const getMonth = require("date-fns/getMonth")
const getYear = require("date-fns/getYear")
const uuid = require("uuid")

const monthConvert = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
}

const daysConvert = {
  0: "Sun",
  1: "Mon",
  2: "Teus",
  3: "Wed",
  4: "Thurs",
  5: "Fri",
  6: "Sat"
}

const currentMonth = new Date()
const startMonth = addMonths(currentMonth, -6)
const endMonth = addMonths(currentMonth, 6)
let tempMonth = startMonth

const monthsData = []

while(tempMonth < endMonth) {
  let numOfDays = getDaysInMonth(tempMonth)
  let calCells = []
  let nullCells = 0
  let j = 0
  let monthObj = {}
  
  for(let i = 0; i < numOfDays; i++) {
    if(i >= getDay(startOfMonth(tempMonth))) {
      j++
    } else {
      numOfDays++
      nullCells = i
    }
    calCells.push(j)
  }

  monthObj.monthNumber = getMonth(tempMonth)
  monthObj.monthYear = getYear(tempMonth)
  monthObj.name = monthConvert[(getMonth(tempMonth))]
  monthObj.calendarCells = calCells
  monthObj.nullCells = nullCells
  monthObj.nextMonth = getMonth(addMonths(tempMonth, 1))
  monthObj.previousMonth = getMonth(addMonths(tempMonth, -1))
  
  monthsData.push(monthObj)
  tempMonth = addMonths(tempMonth, 1)
}

exports.sourceNodes = ({actions, createNodeId, createContentDigest}) => {
  monthsData.forEach(x => {
    const node = {
      id: createNodeId(uuid.v4()),
      month_number: x.monthNumber,
      month_year: x.monthYear,
      month_name: x.name,
      month_calendar_cells: x.calendarCells,
      month_calendar_null_cells: x.nullCells,
      month_next: x.nextMonth,
      month_prev: x.previousMonth,
      internal: {
        type: "Month",
        contentDigest: createContentDigest(x),
      },
    }
    actions.createNode(node)
  })
}

