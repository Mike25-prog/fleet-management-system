import React, { useState, useEffect } from 'react';
import ComboBox from 'react-responsive-combo-box';
import seatImg from '../Assets/SeatTopVeiw.png';

const AddBooking = () => {
  const [bookingData, setBookingData] = useState({
    trip_id: '',
    passenger_id: '',
    seat_number: '',
    booking_date: '',
  });

  const [selectedSeat, setSelectedSeat] = useState(null);
  const [seatStatus, setSeatStatus] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const seatOptions = ['1','1x', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  const handleSeatClick = (seat) => {
    if (!seatStatus[seat]?.booked) {
      setSelectedSeat(seat);
      setSeatStatus((prev) => ({
        ...prev,
        [seat]: { selected: true, booked: false },
      }));

      setTimeout(() => {
        setSeatStatus((prev) => ({
          ...prev,
          [seat]: { selected: false, booked: false },
        }));
        setSelectedSeat(null);
      }, 15000);
    }
  };

  const handlePayNow = () => {
    setShowModal(true);
  };

  const handlePayment = () => {
    // Call Daraja API to send STK push
    // After successful payment
    setSeatStatus((prev) => ({
      ...prev,
      [selectedSeat]: { selected: false, booked: true },
    }));
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      }).then((response) => response.json());
    } catch (error) {
      console.error('Error:', error);
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="trip_id"
          placeholder="Trip ID"
          onChange={handleChange}
        />
        <input
          type="text"
          name="passenger_id"
          placeholder="Passenger ID"
          onChange={handleChange}
        />
        <div>
          {seatOptions.map((seat) => (
            <div key={seat} onClick={() => handleSeatClick(seat)}>
              <input
                type="checkbox"
                checked={seatStatus[seat]?.selected || false}
                readOnly
                style={{ position: 'absolute', top: '5px', left: '5px' }}
              />
              <img
                src={seatImg}
                alt={`Seat ${seat}`}
                style={{
                  opacity: seatStatus[seat]?.booked ? 0.5 : 1,
                  position: 'relative',
                }}
              />
              {seatStatus[seat]?.selected && (
                <span>Selected</span>
              )}
              {seatStatus[seat]?.booked && (
                <span style={{ color: 'red' }}>Booked</span>
              )}
            </div>
          ))}
          <input
            type="text"
            name="seat_number"
            placeholder="Seat Number"
            value={selectedSeat || ''}
            readOnly
          />
        </div>
        <input
          type="date"
          name="booking_date"
          placeholder="Booking Date"
          onChange={handleChange}
        />
        <button type="submit">Add Booking</button>
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
