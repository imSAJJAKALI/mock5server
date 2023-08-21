const express = require('express');
require("dotenv").config()
const { AppointmentModel }=require("../model/appointment.model")
const AppointRouter = express.Router();

AppointRouter.post("/appointments", async (req, res) => {
    try {
        const { name, image, specialization, experience, location, date, slots, fee } = req.body;
        const appointPresent = await AppointmentModel.findOne({ name });
        if (appointPresent) {
            return res.status(200).json({ msg: "Appointment already present" });
        }
        const newAppont = new AppointmentModel({
            name, image, specialization, experience, location, date, slots, fee  
        })
        await AppointmentModel.save();
        return res.status(200).json({ msg:"Appointment saved successfully"})
    } catch (error) {
        console.error("Error while creating")
        res.status(500).json({ msg: "Something went wrong" });
    }
})

AppointRouter.get("/dashboard", async (req, res) => { 
    try {
        const { page, offset } = req.query;
        const pageSize = 5;

        const totalappoint = await EmployModel.countDocuments();

        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;

        const appoint = await EmployModel.find().skip(startIndex).limit(pageSize);

        return res.json({ appoint, totalappoint });
    } catch (error) {
        console.error("Error while updating")
        res.status(500).json({ msg: "Something went wrong" });
    }
})

AppointRouter.patch("/appointments/:id", async (req, res) => {
    try {
        const id = req.params.id;
        let data = req.body;
        const appiont = await AppointmentModel.findByIdAndUpdate({ _id: id }, data);
        if (!appiont) {
            res.status(404).json({ message: "Appointment not found" });
        }
        return res.json({ message:"Appointment updated successfully"})
    } catch (error) {
        console.error("Error while updating")
        res.status(500).json({ msg: "Something went wrong" });
    }
})
AppointRouter.delete("/appointments/:id", async (req, res) => {
    try {
        const id = req.params.id;
        
        const appiont = await AppointmentModel.findByIdAndDelete({ _id: id });
        if (!appiont) {
            res.status(404).json({ message: "Appointment not found" });
        }
        return res.json({ message: "Appointment deleted successfully" })
    } catch (error) {
        console.error("Error while deleting")
        res.status(500).json({ msg: "Something went wrong" });
    }
})

AppointRouter.get("/dashboard/filter", async (req, res) => { 
    try {
        const { specialization, page } = req.query;
        const pagesize = 5;
        const filtered = await AppointmentModel.find({ specialization: specialization }).skip((page - 1) * pagesize).limit(pagesize);
        const total = filtered.length;
        return res.json({Appointment:filtered,total})
    } catch (error) {
        console.error("Error while filtering")
        res.status(500).json({ msg: "Something went wrong" }); 
    }
})

AppointRouter.get("/dashboard/sorting", async (req, res) => {
    try {
        const { sortBY, page } = req.query;
        const pagesize = 5;
        const filtered = await AppointmentModel.find().sort({ date :sortBY=="asc"?1:-1}).skip((page - 1) * pagesize).limit(pagesize);
        const total = filtered.length;
        return res.json({ Appointment: filtered, total })
    } catch (error) {
        console.error("Error while sortting")
        res.status(500).json({ msg: "Something went wrong" });
    }
})
AppointRouter.get("/dashboard/searching", async (req, res) => {
    try {
        const { search, page } = req.query;
        const pagesize = 5;
        const searchQuery={name:{$regrex:search,$options:'i'}}
        const filtered = await AppointmentModel.find(searchQuery).skip((page - 1) * pagesize).limit(pagesize);
        const total = filtered.length;
        return res.json({ Appointment: filtered, total })
    } catch (error) {
        console.error("Error while deleting")
        res.status(500).json({ msg: "Something went wrong" });
    }
})
module.exports = {
    AppointRouter
}