function addHours(date, hours) {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours);
  return newDate;
}

export default function (date, options) {
  if (!date || !Date.parse(date)) return;
  date = addHours(date, 9);
  return Intl.DateTimeFormat("en", options).format(new Date(date));
}
