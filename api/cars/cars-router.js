const express = require("express")
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require("./cars-middleware")
const router = express.Router()

const Cars = require("./cars-model")

router.get("/", (req,res) => {
    Cars.getAll()
        .then(cars => {
            res.status(200).json(cars)
        })  
        .catch(err => {
            res.status(500).json({message:err})
        })
})

router.get("/:id", checkCarId, async (req, res) => {
    try{
        res.status(200).json(req.car)
    }catch(err){
        res.status(500).json({message:err})
    }
})

router.post("/", checkCarPayload, checkVinNumberValid, checkVinNumberUnique,(req,res) =>{
    Cars.create(req.body)
        .then(car => {
            res.status(201).json(car)
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
})


module.exports = router