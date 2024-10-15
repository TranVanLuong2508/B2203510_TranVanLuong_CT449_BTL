const publisherModel = require('../models/publisher.model')

module.exports = class publisherService {

    async add(data) {
        try {
            const newPublisher = new publisherModel(data)
            await newPublisher.save()
            return {
                statusCode: 200,
                message: "Thêm Nhà Xuất Bản thành công !",
                publisher: newPublisher
            }
        } catch (error) {
            return { message:"Thêm Nhà xuất bản không thành công !",
                     statusCode: 500,
            }
        }
    }

    async getAll() {
        try {
            const publishers = await publisherModel.find();
            return {
                message: "Lấy thông tin tất cả Nhà xuất bản thành công !",
                statusCode:200,
                publisher: publishers
            }
        } catch (error) {
            return {
                message: 'Lấy thông tin thất bại !',
                statusCode: 500
            }
        }
    } 
    
    async update(data) {
        try {
            const updatePublisher = await publisherModel.findOneAndUpdate(
                {MaNXB: data.MaNXB},
                {TenNXB: data.TenNXB, DiaChi: data.DiaChi },
                {new: true}
            )

            return {
                publisher: updatePublisher,
                statusCode: 200,
                message: "Cập nhật thông tin Nhà xuất bản thành công !"
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: 'Cập nhật không thành công !'
            }
        }
    }

    async deleteAll() {
        try {
            await publisherModel.deleteAll()
            return {
                
            }
        } catch (error) {
            
        }
    }

    async deleteOne (publisherId) {
        try {
            const deletedPublisher = await publisherModel.findOneAndDelete({MaNXB: publisherId})
            return {
                publisher: deletedPublisher,
                statusCode: 200,
                message: 'Xóa Nhà xuất bản thành công !'
            }
        } catch (error) {
            return {
                statusCode: 500,
                message: 'Xóa thất bại !'
            }
        }
    }
}