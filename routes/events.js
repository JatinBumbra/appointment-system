const router = require('express').Router();
const db = require('../config/firebase');
const slots = require('../slots');
const convert_time = require('../utilities/timezone');

// @route   POST /createevent
// @desc    Book a slot
router.post('/createevent', async (req, res) => {
  try {
    // Check if document already exists or not
    const snapshot = await db
      .collection('events')
      .doc(req.body.selected_date)
      .get();
    const data = await snapshot.data();
    // If not, create a brand new document
    if (data === undefined) {
      await db
        .collection('events')
        .doc(req.body.selected_date)
        .set({ events: [req.body.selected_time] });

      return res.json({ msg: 'Slot has been booked' });
    }
    // If document already exists, check if the slot is already booked or not
    if (data.events.includes(req.body.selected_time)) {
      return res.status(422).json({ msg: 'Time slot already booked' });
    }
    // Finally, create the new event if existing document is found
    await db
      .collection('events')
      .doc(req.body.selected_date)
      .set({ events: [req.body.selected_time, ...data.events] });
    res.json({ msg: 'Slot has been booked' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route     POST /freeslots
// @desc      Return free slots
router.post('/freeslots', async (req, res) => {
  try {
    // Get the events in the database
    const snapshot = await db
      .collection('events')
      .doc(req.body.selected_date)
      .get();
    const data = snapshot.data();
    // If document is not found, return the entire slots array
    if (data === undefined) {
      return res.json({ data: slots });
    }
    // Generate free slots by filtering the events from total slots
    const free_slots = slots.filter(slot => !data.events.includes(slot));
    res.json({ data: free_slots });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route     POST /freeslots
// @desc      Return free slots
router.post('/settimezone', async (req, res) => {
  const timezone = req.body.selected_timezone;
  const selected_date = req.body.selected_date;
  try {
    // Get the events in the database
    const snapshot = await db
      .collection('events')
      .doc(req.body.selected_date)
      .get();
    const data = snapshot.data();
    // If document is not found, then first convert the slots array and then return the entire slots array
    let all_slots = convert_time(timezone, selected_date, slots);
    if (data === undefined) {
      return res.json({ data: all_slots });
    }
    // Else, generate free slots by filtering the events from total slots
    const free_slots = all_slots.data.filter(
      slot => !data.events.includes(slot)
    );
    res.json({ data: free_slots });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
