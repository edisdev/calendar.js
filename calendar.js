export default class Calendar {
  constructor (selectedDate = {}, lang, textFormat, dateFormat, disabledRange = {
    from: null,
    to: null
  }) {
    this.currentDate = {
      year: selectedDate.year,
      month: selectedDate.month,
      date: selectedDate.date,
      firstDayOfWeek: selectedDate.firstDayOfWeek
    }
    this.textFormat = textFormat
    this.formatOptions = dateFormat
    this.currentYear = new Date().getFullYear()
    this.lang = lang
    this.disabledRange = disabledRange
    this.years = [...Array(11)].map((i, index) => this.currentDate.year + index)
    this.months = this.getMonths()
    this.days = this.getDays()
    this.firstDayOfMonth = this.getFirstDayOfMonth()
    this.dates = this.getDates()
    this.daysOfMonth = this.showDates()
    this.weeksOfMonth = this.getWeekOfMonth()
  }

  getDays () {
    const days = []
    let dayNumber
    let name
    for (let index = 1; index <= 7; index++) {
      name = new Date(this.currentDate.year, '00', index).toLocaleString(this.lang, { weekday: this.textFormat })
      dayNumber = parseInt(new Date(this.currentDate.year, '00', index).getDay())
      if (this.currentDate.firstDayOfWeek === 'monday') {
        dayNumber = ((dayNumber - 1) + 7) % 7
      }
      days.push({ name, dayNumber })
    }
    this.sortDays(days)
    return days
  }

  getMonths () {
    const months = []
    for (let index = 0; index < 12; index++) {
      const name = new Date(this.currentDate.year, index).toLocaleString(this.lang, { month: this.textFormat })
      months.push({ index, name })
    }
    return months
  }

  getDates () {
    const dates = []
    const dayCount = this.currentDate.year % 4 === 0 ? 367 : 366
    for (let index = 1; index < dayCount; index++) {
      const date = new Date(this.currentDate.year, '00', index)
      dates.push(date)
    }
    return dates
  }

  showDates () {
    const countDateYears = this.dates.findIndex(item => new Date(item).getMonth() === this.currentDate.month)
    let daysOfMonth = this.dates.filter(item => new Date(item).getMonth() === this.currentDate.month)
    let dates = []
    let prevDay = this.firstDayOfMonth
    const prevYearLastOfMount = new Date(this.currentDate.year, '00', 1).getDate()
    if (this.currentDate.month === 0) {
      while (prevDay > 0) {
        const date = new Date(this.currentDate.year, '00', prevYearLastOfMount - prevDay)
        dates.push({
          date: date,
          isDayInMouth: false
        })
        prevDay -= 1
      }
    } else {
      while (prevDay > 0 && countDateYears - prevDay > 0) {
        const date = this.dates[countDateYears - prevDay]
        dates.push({
          date,
          isDayInMouth: false
        })
        prevDay -= 1
      }
    } // for will list of days prev month for blank days.
    daysOfMonth = daysOfMonth.map(item => ({
      date: item,
      isDayInMouth: true
    }))
    dates = dates.concat(daysOfMonth) // all days of the month.
    let nextDay = 0
    let totalCount
    while (dates.length % 7) {
      totalCount = countDateYears + daysOfMonth.length + nextDay
      const date = totalCount < 365 ? this.dates[countDateYears + daysOfMonth.length + nextDay] : new Date(this.currentDate.year + 1, '00', nextDay + 1)
      dates.push({
        date,
        isDayInMouth: false
      })
      nextDay += 1
      // for will list of days next month for blank days.
    }
    dates = dates.map(item => ({
      mouth: new Date(item.date).getMonth(),
      day: new Date(item.date).getDate(),
      date: new Date(item.date).toLocaleDateString(this.lang, { ...this.formatOptions }),
      fullDate: new Date(item.date),
      isDayInMouth: item.isDayInMouth,
      isUsable: (!this.disabledRange.from ? true : this.dateCompare(this.disabledRange.from, item.date, 'small')) && (!this.disabledRange.to ? true : this.dateCompare(this.disabledRange.to, item.date, 'big'))
    }))
    return dates
  }

  dateCompare (date1, date2, compare) {
    date1 = new Date(date1)
    date2 = new Date(date2)

    date1.setHours(0, 0, 0, 0)
    date2.setHours(0, 0, 0, 0)
    switch (compare) {
      case 'small':
        return date1.getTime() >= date2.getTime()
      case 'big':
        return date2.getTime() >= date1.getTime()
      default:
        break
    }
  }

  getFirstDayOfMonth () {
    /*
      start of week is by default sunday. 
      if user choose this value as monday, so that's must calculate days of week.
    */
    let firstDay = new Date(this.currentDate.year, this.currentDate.month, '01').getDay() // the first day in month
    if (this.currentDate.firstDayOfWeek.toLowerCase() === 'monday') {
      firstDay = ((firstDay - 1) + 7) % 7
    }
    return parseInt(firstDay)
  }

  sortDays (days) {
    return days.sort((a, b) => {
      return a.dayNumber - b.dayNumber
    })
  }

  getWeekOfMonth () {
    let weeks = []
    //  for find out how many lines the calendar consists of,  divide all the month data count by days of week count
    const rows = Math.round(this.daysOfMonth.length / 7) 
    for (let index = 0; index < rows; index++) {
      const countDateYears = this.dates.findIndex(item => new Date(item).getMonth() === this.currentDate.month)
      const weekNo = Math.floor(countDateYears / 7) + index + 1
      weeks.push({
        index: weekNo,
        name: weekNo
      })
    }
    return weeks
  }
}
