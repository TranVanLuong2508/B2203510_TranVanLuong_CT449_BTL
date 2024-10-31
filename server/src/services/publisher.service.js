const publisherModel = require('../models/publisher.model')

module.exports = class publisherService {

    async add(data) {

            const newPublisher = new publisherModel(data)
            const isValid = await publisherModel.exists({TenNXB : data.TenNXB})
            const isMaNXBDuplicated = await publisherModel.exists({ MaNXB: data.MaNXB });

            if(isMaNXBDuplicated){
                return { 
                    message: "Mã nhà xuất bản không được trùng lặp!",
                }
            }

            if(isValid) {
                return {
                    message: "Nhà xuất bản đã tồn tại !",
                }
            }
                const result = await newPublisher.save()
                return {
                    result,
                    message:'Publisher was added successfully !'
                }
    }


    async find(condition) {
            const publishers = await publisherModel.find(condition);
            return publishers
    } 

    async findByName(name) {
         return await this.find({TenNXB: { $regex: new RegExp(new RegExp(name)), $options: "i"}})
    }
    
    async update( manxb , data) {
            const updatePublisher = await publisherModel.findOneAndUpdate(
                {MaNXB: manxb},
                { $set:{ TenNXB: data.TenNXB, DiaChi: data.DiaChi }},
                {returnDocument: "after"}
            )
            return updatePublisher
    }

    async deleteAll() {
             const result = await publisherModel.deleteMany({})
            return result.deletedCount
    }

    async delete (publisherId) {
            const deletedPublisher = await publisherModel.findOneAndDelete({MaNXB: publisherId})
            return deletedPublisher
    }
}