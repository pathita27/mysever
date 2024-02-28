const User = require("../models/user.model.js");

exports.register = async (req, res)=> {
    try {
        let user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            email: req.body.email,
            password: req.body.password
        });

        // ใช้งานเมธอด hashPassword สำหรับการเข้ารหัสรหัสผ่าน
        user.password = await user.hashPassword(req.body.password);

        let createdUser = await user.save();
        res.status(200).json({
            msg: "New user created",
            data: createdUser
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.login = async (req, res) => {
    const login = {
        email: req.body.email,
        password: req.body.password
    };

    try {
        let user = await User.findOne({ email: login.email });

        // ตรวจสอบว่ามีผู้ใช้หรือไม่
        if (!user) {
            res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            });
        }

        // เปรียบเทียบรหัสผ่าน
        let match = await user.compareUserPassword(login.password, user.password);
        if (match) {
            // สร้าง token JWT สำหรับผู้ใช้ที่ถูกต้อง
            let token = await user.generateJwtToken({ user }, "secret", { expiresIn: 604800 });

            if (token) {
                res.status(200).json({
                    success: true,
                    token: token,
                    userCredentials: user
                });
            }
        } else {
            res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        });
    }
};
