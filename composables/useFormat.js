export default function () {
  return (date, options) => {
    if (!Date.parse(date)) return;
    return Intl.DateTimeFormat("en", options).format(new Date(date));
  };
}
