const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = class userService {
   async signUp(data) {
    const userTest = await userModel.exists({ SoDienThoai: data.SoDienThoai });
    if (!userTest) {
      const newUser = new userModel({
        HoLot: data.HoLot,
        Ten: data.Ten,
        SoDienThoai: data.SoDienThoai,
        GioiTinh: data.GioiTinh,
        DiaChi: data.DiaChi,
        MatKhau: bcrypt.hashSync(data.password, 10), //salt rounds: 10
      });

      return  await newUser.save()
                    .then((res) =>{
                        return{message:"Đăng ký thành công ! Hãy đăng nhập vào tài khoản của bạn"}
                     })
                    .catch((erorr) =>{
                        return { message: erorr}
                     })
    } else {
        return { message: 'Số điện thoại đã tồn tại !' };
    }
  }

   async login(user) {
    const userCheck =  await userModel.findOne({ SoDienThoai: user?.SoDienThoai }) // optianl chaining "?."

    if(userCheck) {
      if( await bcrypt.compare(user?.MatKhau , userCheck.MatKhau) ) {

        const {MatKhau, ...userInfor} = userCheck._doc 
        const token  = jwt.sign(userInfor, 'CT449', { expiresIn: '24h' }) 
        return { data: {user: userInfor, token}, message: "Đăng nhập thành công !"} 
      } else {
        return {message: "Mật khẩu không đúng !"};
      }
    } else {
      return {message: "Số điện thoại không đúng !"}
    }
  }
};
