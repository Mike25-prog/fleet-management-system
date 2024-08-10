import React,{useState} from 'react'
import ComboBox from 'react-responsive-combo-box';
import seatImg from '../Assets/SeatTopVeiw.png'
const [bookingData, setBookingData] = useState({
  trip_id:'',
  passenger_id:'',
  seat_number:'',
  booking_date:'',
});
const url = 'http://4.221.79.76:5000/api/bookings';
const VehicleUrl  = 'http://4.221.79.76:5000/api/vehicles/';
const PassengerUrl = 'http://4.221.79.76:5000/api/passengers/'; 
const TripUrl = 'http://4.221.79.76:5000/api/trips/';
//get vehivles data,passenger data and trip data
const [vehicleData, setVehicleData] = useState({
    number_plate: '',
    make: '',
    model: '',
    year: 0,
    status: '',
    image: '',
    type:''
});
const [passengerData, setPassengerData] = useState({
    first_name: '',
    last_name: '',
    contact_number: '',
    email: '',
    });
const [tripData, setTripData] = useState({
    trip_id:'',
    vehicle_id: '',
    driver_id:'',
})
const handleSubmit = async (e) => {
 e.preventDefault();
 try {
    fetch(url, {method: 'POST',headers:{'Content-Type':'application/json'},
    body: JSON.stringify(bookingData)})
    .then(response => response.json())
 } catch (error) {
    
 }
}
const handleChange = (e) => {
    setBookingData({
        ...bookingData,
        [e.target.name]: e.target.value
    });
    
}
const seatOptions = ['1','1x','2','3','4','5','6','7','8','9','10'];
const AddBooking = () => {
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name="trip_id" placeholder="Trip ID" onChange={handleChange} />
            <input type="text" name="passenger_id" placeholder="Passenger ID" onChange={handleChange} />
            <div>
               {seatOptions.map(()=>{
                return (
                  <div>
                    <img 
                     src={seatImg}
                    />
                  </div>
                )
               })}
            <input type="text" name="seat_number" placeholder="Seat Number" onChange={handleChange} />
            </div>
            <input type="date" name="booking_date" placeholder="Booking Date" onChange={handleChange} />
            <button type="submit">Add Booking</button>
          </form>
    </div>
  )
}

export default AddBooking