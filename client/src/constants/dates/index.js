// This const defines months for use in following function
const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]
// This function takes a date string as an argument and returns a string in the format
// [mon] [year]
export const getDate = date => {
  if (date === null) return 'Current'

  const initDate = new Date(date.toString())
  return `${monthNames[initDate.getMonth()]} ${initDate.getFullYear()}`
}

export default {
  getDate
}
