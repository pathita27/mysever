const Booking = require('../models/bookingroom.model.js');

exports.getBooking = async (req, res) => {
    try {
        const bookings = await Booking.find().exec();
        res.status(200).json({
            msg: "Search OK",
            data: bookings
        });
    } catch (err) {
        res.status(500).json({
            msg: "Error fetching bookings",
            error: err
        });
    }
};


exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).exec();
        if (!booking) {
            return res.status(404).json({
                msg: "Booking not found"
            });
        }
        res.status(200).json({
            msg: "Search OK",
            data: booking
        });
    } catch (err) {
        res.status(500).json({
            msg: "Error fetching booking",
            error: err
        });
    }
}

exports.getBookingByName = async (req, res) => {
    try {
        const bookings = await Booking.find({
            name: new RegExp(req.params.name, "i")
        }).exec();
        res.status(200).json({
            msg: "Search OK",
            data: bookings
        });
    } catch (err) {
        res.status(500).json({
            msg: "Error fetching bookings",
            error: err
        });
    }
}

exports.createBooking = async (req, res) => {
    try {
        let booking = new Booking({
            name: req.body.name,
            contract: req.body.contract,
            email: req.body.email,
            room_number: req.body.room_number,
            date: req.body.date,
            startTime: req.body.startTime,
            endTime: req.body.endTime
        });

        let createdBooking = await booking.save();
        res.status(200).json({
            msg: "App a booking complete.",
            data: createdBooking
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error
        });
    }
}

exports.updateBooking = async (req, res) => {
    try {
        let booking = {
            name: req.body.name,
            contract: req.body.contract,
            email: req.body.email,
            room_number: req.body.room_number,
            date: req.body.date,
            startTime: req.body.startTime,
            endTime: req.body.endTime
        };

        let updatedBooking = await Booking.findOneAndUpdate(
            { _id: req.params.id },
            booking,
            { new: true }
        );

        res.status(200).json({
            msg: "Booking updated successfully",
            data: updatedBooking
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error
        });
    }
}

exports.deleteBookingById = async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json({
            msg: "Delete OK"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error
        });
    }
}
