function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord)
  }
  
  function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    })
    return employeeRecord
  }
  
  function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    })
    return employeeRecord
  }
  
  function hoursWorkedOnDate(employeeRecord, specificDate) {
    let timeIn = employeeRecord.timeInEvents.find(e => e.date === specificDate)
    let timeOut = employeeRecord.timeOutEvents.find(e => e.date === specificDate)
    return (timeOut.hour - timeIn.hour) / 100
  }
  
  function wagesEarnedOnDate(employeeRecord, specificDate) {
    return hoursWorkedOnDate(employeeRecord, specificDate) * employeeRecord.payPerHour
  }
  
  function allWagesFor(employeeRecord) {
    let datesWorked = employeeRecord.timeInEvents.map(e => e.date)
    return datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0)
  }
  
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => total + allWagesFor(record), 0)
  }