const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let rooms = [];
let bookings = [];

// 1. Creating a Room
app.post('/rooms', (req, res) => {
    const { roomName, seatsAvailable, amenities, pricePerHour } = req.body;
    const roomId = rooms.length + 1;
    const newRoom = { roomId, roomName, seatsAvailable, amenities, pricePerHour };
    rooms.push(newRoom);
    res.status(201).send(newRoom);
});




// 2. Booking a Room
app.post('/bookings', (req, res) => {
    const { customerName, date, startTime, endTime, roomId } = req.body;
    const isRoomAvailable = bookings.every(booking => 
        booking.roomId !== roomId || booking.date !== date || 
        (booking.endTime <= startTime || booking.startTime >= endTime)
    );
    if (!isRoomAvailable) {
        return res.status(400).send({ error: 'Room is already booked for the specified time.' });
    }
    const bookingId = bookings.length + 1;
    const newBooking = { bookingId, customerName, date, startTime, endTime, roomId, bookingDate: new Date(), bookingStatus: 'Confirmed' };
    bookings.push(newBooking);
    res.status(201).send(newBooking);
});




// 3. List all Rooms with Booked Data
app.get('/rooms', (req, res) => {
    const result = rooms.map(room => {
        const roomBookings = bookings.filter(booking => booking.roomId === room.roomId);
        return { ...room, bookings: roomBookings };
    });
    res.send(result);
});




// 4. List all customers with booked Data
app.get('/customers', (req, res) => {
    const result = bookings.map(booking => {
        const room = rooms.find(room => room.roomId === booking.roomId);
        if (room) {
            return {
                customerName: booking.customerName,
                roomName: room.roomName,
                date: booking.date,
                startTime: booking.startTime,
                endTime: booking.endTime
            };
        }
    }).filter(booking => booking !== undefined);
    res.send(result);
});





// 5. List how many times a customer has booked the room
app.get('/customers/:customerName/bookings', (req, res) => {
    const { customerName } = req.params;
    const customerBookings = bookings.filter(booking => booking.customerName === customerName);
    
    if (customerBookings.length === 0) {
        return res.status(404).send({ error: 'No bookings found for the specified customer.' });
    }

    const result = customerBookings.map(booking => {
        const room = rooms.find(room => room.roomId === booking.roomId);
        if (room) {
            return {
                customerName: booking.customerName,
                roomName: room.roomName,
                date: booking.date,
                startTime: booking.startTime,
                endTime: booking.endTime,
                bookingId: booking.bookingId,
                bookingDate: booking.bookingDate,
                bookingStatus: booking.bookingStatus
            };
        }
    }).filter(booking => booking !== undefined);
    res.send(result);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
