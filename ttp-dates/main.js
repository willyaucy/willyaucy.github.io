const url = 'https://ttp.cbp.dhs.gov/schedulerapi/slots?orderBy=soonest&limit=20&locationId=6480&minimum=1';

(async () => {
  while (true) {
    console.log(`[${new Date()}] Fetching appointment times`);
    
    const appointmentTimes = await fetchAppointmentTimes();

    document.getElementById('appointment-times').innerText = 
        `Appointment times available\n${appointmentTimes.map(slot => toString(slot)).join('\n')}`;
    
    const matchingSlots = appointmentTimes.filter(time => time.year === 2021 && time.month < 11 && time.hour < 9);
    
    if (matchingSlots.length > 0) {
      document.getElementById('matches').innerText = 
          `New match\n${matchingSlots.map(slot => toString(slot)).join('\n')}`;
      notify(`New appointment time available at ${toString(matchingSlots[0])}`);
      return;
    }
    
    await sleep(5000);
  }
})();

function toString(dateTime) {
  return `${dateTime.year}-${dateTime.month}-${dateTime.day}T${dateTime.hour}:${dateTime.minute}`;
} 

async function fetchAppointmentTimes() {
  const response = await fetch(url);
  const rawAppointmentTimes = await response.json();
  return rawAppointmentTimes.map(slot => mapToDateTime(slot.startTimestamp));
}

function mapToDateTime(stringDateTime) {
  const [year, month, day, hour, minute] =
       stringDateTime.match(/^(\d+)-(\d+)-(\d+)T(\d+):(\d+)$/).splice(1).map(s => Number(s));
  return {year, month, day, hour, minute};
}

async function notify(message) {
  if (!('Notification' in window)) {
    console.error("This browser does not support desktop notification");
    return;
  }
  
  if (Notification.permission !== 'granted') {
    await Notification.requestPermission();
  }
    
  if (Notification.permission !== 'granted') {
    console.warn('User denied notification permission request');
  } else {
    new Notification(message);
  }
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(() => resolve(), milliseconds));
}
