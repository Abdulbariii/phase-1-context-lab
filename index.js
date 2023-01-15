const createEmployeeRecord = (profile) => {
  return {
    firstName: profile[0],
    familyName: profile[1],
    title: profile[2],
    payPerHour: profile[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

const createEmployeeRecords = (profiles) => {
  return profiles.map((profile) => createEmployeeRecord(profile));
};

const createTimeInEvent = function (dateStamp) {
  // split dateStamp into date and hour
  let [date, hour] = dateStamp.split(" ");

  // push the date and hour into timeInEvents
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });

  // return this to allow for chaining
  return this;
};

const createTimeOutEvent = function (dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });
  return this;
};

const hoursWorkedOnDate = function (date) {
  // find the timeIn event for the given date
  let timeIn = this.timeInEvents.find((event) => event.date === date);

  // find the timeOut event for the given date
  let timeOut = this.timeOutEvents.find((event) => event.date === date);

  // return the hours worked by subtracting the timeIn hour from the timeOut hour
  return (timeOut.hour - timeIn.hour) / 100;
};

const wagesEarnedOnDate = function (date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
};

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!
 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

const findEmployeeByFirstName = function (srcArray, firstName) {
  return srcArray.find((employee) => employee.firstName === firstName);
};

const calculatePayroll = function (employees) {
  return employees.reduce(
    (total, employee) => total + allWagesFor.call(employee),
    0
  );
};
