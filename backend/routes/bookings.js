// const express=require('express');
// const router=express.Router();
// const Booking=require('../models/Booking');
// router.get('/',(req,res)=>{
//     Booking.getAll((err,results)=>{
//         if(err) return res.status(500).send(err);
//         res.json(results);
//     })
// })

// router.post('/',(req,res)=>{
//     Booking.writeNew(req.body,(err,results)=>{
//         if(err) return res.status(500).send(err);
//         res.json(results);
//     }
//     );
// }
// );
// router.put('/:id',(req,res)=>{
//     Booking.update([req.body,req.params.id],(err,results)=>{
//         if(err) return res.status(500).send(err);
//         res.json(results);
//     }
//     );
// }
// );
// router.delete('/:id',(req,res)=>{
//     Booking.delete(req.params.id,(err,results)=>{
//         if(err) return res.status(500).send(err);
//         res.json(results);
//     });
// })
// module.exports=router;








const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Route to create a new booking
router.post('/book', (req, res) => {
    const { trip_id, ticket_value, passenger_id, seat_number } = req.body;

    // Default payment status is 'pending'
    Booking.create(trip_id, ticket_value, passenger_id, seat_number, 'pending', null, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }
        res.status(201).json({ message: 'Booking created successfully', booking_id: result.insertId });
    });
});

// Route to update payment status
router.post('/update-payment', (req, res) => {
    const { booking_id, payment_status, transaction_id } = req.body;

    Booking.updatePaymentStatus(booking_id, payment_status, transaction_id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }
        res.status(200).json({ message: 'Payment status updated successfully' });
    });
});

module.exports = router;
