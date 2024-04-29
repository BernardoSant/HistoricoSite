
export function dateFormat(dateEntry) {
var date = new Date(dateEntry);
  var day = date.getDate() + 1;
  var month = (date.getMonth() + 1).toString().padStart(2, "0");
  var year = date.getFullYear();

  return day + "/" + month + "/" + year;
}