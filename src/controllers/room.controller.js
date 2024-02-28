const Room = require('../models/room.model.js');
exports.getRooms = (req, res) => {
  Room.find()
    .then((result) => {
      res.status(200).json({
        msg: "Search OK",
        data: result
      });
    })
    .catch((err) => {
      console.log(err); // หากเกิดข้อผิดพลาดในการดึงข้อมูล
      res.status(500).json({
        msg: "Internal Server Error",
        error: err.message
      });
    });
};


exports.getRoomById = async (req, res) => {
  try {
    let room = await Room.findById(req.params.id);
    res.status(200).json({
      msg: "Search OK",
      data: room
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message
    });
  }
}

exports.createRoom = async (req, res)=>{
  try {
    let room = new Room({
      name: req.body.name,
      room_number: req.body.room_number,
      status: req.body.status,
      imageroom: req.body.imageroom
    });
    let createdRoom = await room.save();
    res.status(200).json({
      msg: "App a room complete.",
      data: createdRoom
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error
    });
  }
}

exports.updateRoom = async (req, res) => {
  try {
    let room = {
      name: req.body.name,
      room_number: req.body.room_number,
      status: req.body.status,
      imageroom: req.body.imageroom
    };
    let updatedRoom = await Room.findByIdAndUpdate(req.params.id, room, { new: true });
    res.status(200).json({
      msg: "OK",
      data: updatedRoom
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message
    });
  }
}


exports.appRoomReview = async (req, res) =>{
  let reviewData = {
    $push: {
        reviews: {
            star: req.body.star,
            comment: req.body.comment
        }
    }
};
Room.findByIdAndUpdate(req.params.id, reviewData)  //ระบุทั้ง id ที่ต้องการแก้ และข้อมูลใหม่
    .exec((err, result) => {
        // findById อีกครั้งเพื่อเอา data ใหม่
        Room.findById(req.params.id)
            .exec((err, result) => {
                res.status(200).json({
                    msg: "OK",
                    data: result
                });
            });
    });
}

exports.deleteRoomById = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json({
      msg: "Delete OK"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message
    });
  }
}

exports.getRoomsByRoomNumber = async (req, res) =>{
  Room.find({
    room_number: new RegExp(req.params.room_number)
}) // { room_number: /xxxx/}
.exec((err, result) => {
    res.status(200).json({
        msg: "Search OK",
        data: result
    });
});
}

exports.getRoomsByPirce = async (req, res) =>{
  Room.find({
    price: new RegExp(req.params.price)
}) // { price: /xxxx/}
.exec((err, result) => { 
    res.status(200).json({
        msg: "Search OK",
        data: result 
    });
});
}