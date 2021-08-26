const url = 'https://ttp.cbp.dhs.gov/schedulerapi/slots?orderBy=soonest&limit=20&locationId=6480&minimum=1';

(async () => {
  const response = await fetch(url);
  const appointmentTimes = await response.json();
  
  console.log(appointmentTimes);
  const dateTimes = appointmentTimes.map(slot => mapToDateTime(slot.startTimestamp));
  console.log(dateTimes);
})();

function mapToDateTime(stringDateTime) {
  const [input, year, month, date, hour, minute] = stringDateTime.match(/^(\d+)-(\d+)-(\d+)T(\d+):(\d+)$/);
  return {year, month, date, hour, minute};
}
