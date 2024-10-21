const bookModel = require('../models/book.model')

module.exports = class bookService {
     async  getAll() {
        const books = await bookModel.find().populate('MaNXB')
        return books
     }

     async add(data) {
      const isValid =  await bookModel.findOne({
         $or: [{TenSach: data.TenSach}, {MaSach: data.MaSach}]
      })
      
      if(!isValid) {

         const newBook = new bookModel(data)
         const savedBook = await newBook.save()
         return await savedBook.populate('MaNXB')
      }
      return {
         message: "Sách đã tồn tại !",
         statusCode: 404
      }
     }

    async update( data) {
      const updatedBook = await bookModel.findOneAndUpdate(
         {_id: data._id},
         { $set: {
            TenSach: data.TenSach,
            DonGia: data.DonGia,
            SoQuyen: data.SoQuyen,
            NamXuatBan: data.NamXuatBan,
            TacGia: data.TacGia,
            MaNXB: data.MaNXB,
            image:data.image
         }
         },
         { new: true}
      )
      if(!updatedBook) {
         return{
            message:'Không tìm thấy sách !'
         }
      }
       await updatedBook.populate('MaNXB')
       return updatedBook
     }

     async delete (bookId) {
      const deletedBook = await bookModel.findOneAndDelete({MaSach: bookId})
      return deletedBook
   }

   async deleteAll() {
      const result = await bookModel.deleteMany({})
     return result.deletedCount
   }
}