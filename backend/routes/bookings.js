const express=require('express');
const router=express.Router();
const Booking=require('../models/Booking');
router.get('/',(req,res)=>{
    Booking.getAll((err,results)=>{
        if(err) return res.status(500).send(err);
        res.json(results);
    })
})

router.post('/',(req,res)=>{
    Booking.writeNew(req.body,(err,results)=>{
        if(err) return res.status(500).send(err);
        res.json(results);
    }
    );
}
);
router.put('/:id',(req,res)=>{
    Booking.update([req.body,req.params.id],(err,results)=>{
        if(err) return res.status(500).send(err);
        res.json(results);
    }
    );
}
);
router.delete('/:id',(req,res)=>{
    Booking.delete(req.params.id,(err,results)=>{
        if(err) return res.status(500).send(err);
        res.json(results);
    });
})
module.exports=router;