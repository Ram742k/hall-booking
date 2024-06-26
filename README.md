# Hall Booking API

This is a hall booking API built with Node.js and Express. It allows users to create rooms, book rooms, and retrieve booking information.

## API Endpoints

Base URL: `https://hall-booking-yot9.onrender.com`

### 1. Create a Room

**Endpoint:** `POST /rooms`

**Description:** Create a new room with specified details.

**Request Body:**

-   `roomName`: Name of the room (string)
-   `seatsAvailable`: Number of seats available in the room (number)
-   `amenities`: List of amenities available in the room (array)
-   `pricePerHour`: Price for booking the room per hour (number)

**Response:**

-   Details of the created room.

### 2. Book a Room

**Endpoint:** `POST /bookings`

**Description:** Book a room with specified details.

**Request Body:**

-   `customerName`: Name of the customer (string)
-   `date`: Booking date (YYYY-MM-DD) (string)
-   `startTime`: Start time of the booking (HH
    
    ) (string)
-   `endTime`: End time of the booking (HH
    
    ) (string)
-   `roomId`: ID of the room to be booked (number)

**Response:**

-   Details of the created booking.

### 3. List All Rooms with Booked Data

**Endpoint:** `GET /rooms`

**Description:** List all rooms along with their booking details.

**Response:**

-   List of rooms with their booking details.

### 4. List All Customers with Booked Data

**Endpoint:** `GET /customers`

**Description:** List all customers along with their booking details.

**Response:**

-   List of customers with their booking details.

### 5. List Bookings for a Specific Customer

**Endpoint:** `GET /customers/:customerName/bookings`

**Description:** List all bookings made by a specific customer.

**Response:**

-   List of bookings for the specified customer.


### **Deploy Link** 

[**https://hall-booking-yot9.onrender.com**](https://hall-booking-yot9.onrender.com)

### **API Documentation** 

[**https://documenter.getpostman.com/view/26564023/2sA3XWcyUn**](https://documenter.getpostman.com/view/26564023/2sA3XWcyUn)