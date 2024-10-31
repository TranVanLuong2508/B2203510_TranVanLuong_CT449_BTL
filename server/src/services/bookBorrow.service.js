const bookModel = require('../models/book.model')
const bookBorrowModel = require('../models/bookBorrow.model')

module.exports = class bookBorrowService {
    // for admin
     async getAllForAdmin () {
        const borrowList = await bookBorrowModel.find({}) 
                                                .populate('MaSach')
                                                .populate('MaNhanVien',["HoTenNV", "ChucVu", "SoDienThoai"])
                                                .populate('MaDocGia', ['HoLot', 'Ten', 'NgaySinh', 'GioiTinh', 'DiaChi', 'SoDienThoai'])
        return borrowList
    }
    
    async deleteBorrowForAdmin ( borrowId) {
        const borrow = await bookBorrowModel.findOneAndDelete({_id : borrowId})
        if(borrow) {
            if(borrow.TrangThai != 'paid') {
                const book = await bookModel.findById(borrow.MaSach)
                await bookModel.findByIdAndUpdate(borrow.MaSach,{$set: {SoLuongDaMuon: book.SoLuongDaMuon - borrow.SoLuongMuon}})
            }
        }
        return borrow
    }

     async updateBorrowForAdmin ( staffId, updateData) {
         if(updateData.TrangThai == 'borrow') {
            const borrow = await bookBorrowModel.findOneAndUpdate(
                {_id : updateData._id},
                {
                    TrangThai: updateData.TrangThai,
                    NgayMuon: Date.now(),
                    MaNhanVien: staffId
                },
                {new: true}
            )
            
           const borrowDetail = await bookBorrowModel.findOne(({_id : updateData._id}))
                                                    .populate('MaSach')
                                                    .populate('MaNhanVien',["HoTenNV", "ChucVu", "SoDienThoai"])
                                                    .populate('MaDocGia', ['HoLot', 'Ten', 'NgaySinh', 'GioiTinh', 'DiaChi', 'SoDienThoai'])
            return borrowDetail 
         }

         else if( updateData.TrangThai == 'paid') {
            const borrow = await bookBorrowModel.findOne({_id: updateData._id})
            const book = await bookModel.findOne({_id: updateData.MaSach}) //ma sach o day la ID
            const returnDay = Date.now()
            borrow.TrangThai = updateData.TrangThai
            borrow.MaNhanVien = updateData.MaNhanVien
            borrow.NgayTra = returnDay
            await borrow.save()
            await bookModel.findByIdAndUpdate(updateData.MaSach,{ $set: {SoLuongDaMuon: book.SoLuongDaMuon - borrow.SoLuongMuon}})
            const savedBorrow = await bookBorrowModel.findOne({_id: updateData._id})
                                                    .populate('MaSach')
                                                    .populate('MaNhanVien',["HoTenNV", "ChucVu", "SoDienThoai"])
                                                    .populate('MaDocGia', ['HoLot', 'Ten', 'NgaySinh', 'GioiTinh', 'DiaChi', 'SoDienThoai'])
           return savedBorrow
         }
    }

    //for user

    async getAllForUser(userId) {
        const borrowList = await bookBorrowModel.find({MaDocGia: userId}).populate('MaSach')
        return borrowList
    }

    async deleteBorrowForUser(idBorrow , userId) {
        const deletedBorrow = await bookBorrowModel.findOneAndDelete({_id: idBorrow, MaDocGia: userId, TrangThai: 'pending'})
        if(deletedBorrow) {
            const book = await bookModel.findById(deletedBorrow.MaSach)
            await bookModel.findByIdAndUpdate(deletedBorrow.MaSach, {$set: {SoLuongDaMuon: book.SoLuongDaMuon -  deletedBorrow.SoLuongMuon}})
            return deletedBorrow
        }
        return {
            message:"Chỉ xóa được khi chưa nhận sách !"
        }
    }

    async addBorrow( data ) {
        const newBorrow = new bookBorrowModel(data)
        await newBorrow.save()
        if (newBorrow){
            //update so luong sach da muon
            const book = await bookModel.findById(data.MaSach)
            await bookModel.findByIdAndUpdate(data.MaSach,{ $set: {SoLuongDaMuon: book.SoLuongDaMuon + newBorrow.SoLuongMuon}})
            console.log(book.TenSach)
        }
        return newBorrow
    }
} 