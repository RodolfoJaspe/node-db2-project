const Cars = require("./cars-model")
var vinValidator = require('vin-validator');


const checkCarId = async (req, res, next) => {
    const car = await Cars.getById(req.params.id)
    if(!car){
        res.status(404).json({message: "car not found"})
    }else{
        req.car = car
        next()
    }
}

const checkCarPayload = (req, res, next) => {
    const {vin,make,model,mileage} = req.body    
    if(!vin){
        res.status(400).json({message: `vin is missing`})
    }else if (!make){
        res.status(400).json({message:`make is missing`})
    } else if (!model){
        res.status(400).json({message:`model is missing`})
    } else if (!mileage){
        res.status(400).json({message: `mileage is missing`})
    } else {
        next()
    }
}

const checkVinNumberValid = (req, res, next) => {
    const {vin} = req.body
    const isVinValid = vinValidator.validate(vin)
    if(!isVinValid){
        res.status(400).json({message:`vin ${vin} is invalid`})
    }else {
        next()
    }
}

const checkVinNumberUnique = async (req, res, next) => {
    const {vin} = req.body
    const cars = await Cars.getAll()
    const existingCarVin = cars.find(car => car.vin == vin)
    if(existingCarVin){
        res.status(400).json({message:`vin ${vin} already exists` })
    } else {
        next()
    }
}
module.exports = {checkCarId,checkCarPayload,checkVinNumberUnique,checkVinNumberValid}