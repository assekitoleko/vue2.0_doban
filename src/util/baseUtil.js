export function getDateFormat () {
  let d = new Date()
  let year = d.getFullYear() + '-'
  let month = d.getMonth() + 1
  let day = d.getDate()
  month = (month >= 1 && month <= 9) ? '0' + month + '-' : month + '-'
  day = (day >= 1 && day <= 9) ? '0' + day : day
  return year + month + day
}
