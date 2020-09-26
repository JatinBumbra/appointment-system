const slots = require('../slots');

// Function to convert slots based in incoming timezone
const moment = require('moment-timezone');

module.exports = (timezone, date, slots) => {
  const data = slots.map(slot =>
    moment(`${date}T${slot}`).tz(timezone).format('ddd DD MMM, hh:mm A')
  );
  return { data };
};
