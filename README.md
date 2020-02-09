# calendar.js
Generate calendar data with javascript 📅

## Using
```javascript

import Calendar form 'calendar-js'

let currentDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: new Date().getDate(),
    firstDayOfWeek: 'monday' // 'sunday' or 'monday',
  },

let dateFormat = { day: '2-digit', month: 'long', year: 'numeric' }

let  disabledStartDate = {
  to: new Date(new Date().getTime() - ( 20 * 24 * 60 * 60 * 1000)),
  from: new Date(new Date().getTime() - ( 1 * 24 * 60 * 60 * 1000))
},

const pickerdata = new Calendar(
 currentDate,
 language,
 dateFormat, // date format
 textFormat, // short or long
 disabledRange // disabled datas
)
```

`currentDate` is the value of the first data in months, years, and days. 
  In addition, the first day of the week is determined here with the `firstDayOfWeek` key.

`Language` of the data to be generated

`Date format` is in which format the result of the selected data will be generated.

`TextFormat` is for generating long or short versions of day & month texts.

`disabledRange` is for determine unavailable data. This is an object formed "to" and "from" keys.
