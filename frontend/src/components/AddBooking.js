import React, { useState, useEffect } from 'react';
import seatImg from '../Assets/SeatTopVeiw.png';
import './SeatTable.css'; // Ensure this CSS file is created

const AddBooking = () => {
  const [bookingData, setBookingData] = useState({
    trip_id: '',
    passenger_id: '',
    seat_number: '',
    booking_date: '',
  });

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatStatus, setSeatStatus] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showSeats, setShowSeats] = useState(false);
  const [trips, setTrips] = useState([]);
  
  const url = process.env.REACT_APP_ENDPOINT + 'api/bookings';
  const tripsUrl = process.env.REACT_APP_ENDPOINT + 'api/trips';

  const seats = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ];

  useEffect(() => {
    // Fetch trips for the dropdown
    const fetchTrips = async () => {
      try {
        const response = await fetch(tripsUrl);
        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, []);

  const handleSeatClick = (seat) => {
    if (seat === '1') return; // Driver's seat cannot be selected

    setSeatStatus((prev) => {
      const isSelected = prev[seat]?.selected;
      return {
        ...prev,
        [seat]: {
          selected: !isSelected,
          booked: prev[seat]?.booked || false,
        },
      };
    });

    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handlePayNow = () => {
    setShowModal(true);
  };

  const handlePayment = async () => {
    // Call Daraja API to send STK push
    try {
      // Example API call (replace with actual implementation)
      await fetch('https://example.com/daraja-api/confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, seats: selectedSeats }),
      });

      // After successful payment
      setSeatStatus((prev) => {
        const updatedSeats = { ...prev };
        selectedSeats.forEach((seat) => {
          updatedSeats[seat] = { selected: false, booked: true };
        });
        return updatedSeats;
      });
      setSelectedSeats([]);
      setShowModal(false);

      // Add bookings to the database
      await Promise.all(selectedSeats.map(seat =>
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...bookingData, seat_number: seat }),
        }).then((response) => response.json())
      ));
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <button onClick={() => setShowSeats(!showSeats)}>
        {showSeats ? 'Hide Seats' : 'Show Seats'}
      </button>

      {showSeats && (
        <div className="seat-table">
          {seats.map((seat, index) => (
            <div
              key={seat}
              className={`seat ${index === 0 ? 'driver-seat' : ''}`}
              onClick={() => handleSeatClick(seat)}
              style={{
                backgroundColor: seatStatus[seat]?.selected ? 'orange' : 'transparent',
                opacity: seatStatus[seat]?.booked ? 0.5 : 1,
              }}
            >
              <input
                type="checkbox"
                checked={seatStatus[seat]?.selected || false}
                readOnly
                style={{ position: 'absolute', top: '5px', left: '5px' }}
              />
              <img
                src={seatImg}
                alt={`Seat ${seat}`}
                className="seat-image"
              />
              <span className="seat-number">{seat}</span>
              {seatStatus[seat]?.booked && <span style={{ color: 'red' }}>Booked</span>}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <select
          name="trip_id"
          value={bookingData.trip_id}
          onChange={handleChange}
        >
          <option value="">Select Trip</option>
          {trips.map((trip) => (
            <option key={trip.id} value={trip.id}>
              {trip.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="passenger_id"
          placeholder="Passenger ID"
          onChange={handleChange}
        />
        <input
          type="text"
          name="seat_number"
          placeholder="Seat Number"
          value={selectedSeats.join(', ')}
          readOnly
        />
        <input
          type="date"
          name="booking_date"
          placeholder="Booking Date"
          onChange={handleChange}
        />
        <button type="button" onClick={handlePayNow}>
          Pay Now
        </button>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Enter your phone number</h3>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
            />
            <button onClick={handlePayment}>Confirm Payment</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBooking;
