// Date Format 2018-06-07T00:00
const start = '10:30';
const end = '17:30';
const duration = '30';

const slots = [];
let temp = start;

// Setup the total slots
while (true) {
  if (temp >= end) {
    break;
  }
  // Check if the mins are 30
  if (temp.slice(temp.length - 2) == '30') {
    slots.push(temp);
    // Then pull out the hours
    let hr = parseInt(temp.slice(temp.length - 5, temp.length - 3));
    // Set new value of temp
    temp = `${temp.slice(0, temp.length - 5)}${hr + 1}:00`;
    // Else if the minutes are 00
  } else {
    slots.push(temp);
    // Set new value of temp
    temp = temp.slice(0, temp.length - 2) + duration;
  }
}

module.exports = slots;
