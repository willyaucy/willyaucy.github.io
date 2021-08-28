const url = 'https://ttp.cbp.dhs.gov/schedulerapi/slots?orderBy=soonest&limit=20&locationId=6480&minimum=1';
requestPermission();

(async () => {
  let latestMatchingTime = null;
  
  while (true) {
    console.log(`[${new Date()}] Fetching appointment times`);
    
    const appointmentTimes = await fetchAppointmentTimes();

    document.getElementById('appointment-times').innerText = 
        `Appointment times available\n${appointmentTimes.map(slot => slot.toString()).join('\n')}`;
    
    const matchingSlots = appointmentTimes.filter(time => time.year === 2021 && time.month < 11 && time.hour < 9);
    
    if (matchingSlots.length > 0) {
      document.getElementById('matches').innerText = 
          `New match\n${matchingSlots.map(slot => slot.toString()).join('\n')}`;
      
      if (!matchingSlots[0].equalsTo(latestMatchingTime)) {
        latestMatchingTime = matchingSlots[0];
        notify(`New appointment time available at ${latestMatchingTime.toString()}`);
      }
    }
    
    document.getElementById('last-updated').innerText = `Last Updated: ${new Date()}`;
    await sleep(5000);
  }
})();

function mapToDateTime(dhsDateTime) {
  const [year, month, day, hour, minute] =
       dhsDateTime.match(/^(\d+)-(\d+)-(\d+)T(\d+):(\d+)$/).splice(1).map(s => Number(s));
  return new DateTime({year, month, day, hour, minute});
}

class DateTime {
  constructor({year, month, day, hour, minute} = {}) {
    this.year = Number(year);
    this.month = Number(month);
    this.day = Number(day) || 0;
    this.hour = Number(hour) || 0;
    this.minute= Number(minute) || 0;

    if (!this.year || !this.month || !this.day) {
      throw new Error('Must specify date');
    }
  }

  toString() {
    return `${this.year}-${zeroPad(this.month)}-${zeroPad(this.day)}`
        + `T${zeroPad(this.hour)}:${zeroPad(this.minute)}`;
  }

  equalsTo(other) {
    return other instanceof DateTime
      && this.year === other.year
      && this.month === other.month
      && this.day === other.day
      && this.hour === other.hour
      && this.minute === other.minute;
  }

  static now() {
    const date = new Date();

    return new DateTime({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes()
    });
  }
}

function zeroPad(number) {
  return number < 10 ? '0' + String(number) : String(number);
}

async function fetchAppointmentTimes() {
  const response = await fetch(url);
  const rawAppointmentTimes = await response.json();
  return rawAppointmentTimes.map(slot => mapToDateTime(slot.startTimestamp));
}

async function requestPermission() {
  if (!('Notification' in window)) {
    console.error("This browser does not support desktop notification");
    return;
  }
  
  if (Notification.permission !== 'granted') {
    await Notification.requestPermission();
  }
    
  if (Notification.permission !== 'granted') {
    console.warn('User denied notification permission request');
  }
}

async function notify(message) {
  if (!('Notification' in window)) {
    console.error("This browser does not support desktop notification");
    return;
  }
  
  await requestPermission();
    
  if (Notification.permission === 'granted') {
    new Notification(message);
  }
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(() => resolve(), milliseconds));
}
