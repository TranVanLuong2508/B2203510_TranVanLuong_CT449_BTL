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
                await bookModel.findByIdAndUpdate(borrow.MaSach,{$set: {SoQuyenDaMuon: book.SoQuyenDaMuon - borrow.SoLuongMuon}})
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
           const borrowDetail = await borrow.populate('MaSach')
                  .populate('MaNhanVien',["HoTenNV", "ChucVu", "SoDienThoai"])
                  .populate('MaDocGia', ['HoLot', 'Ten', 'NgaySinh', 'GioiTinh', 'DiaChi', 'SoDienThoai'])
            return borrowDetail
         }

         else if( updateData.TrangThai == 'paid') {
            const borrow = await bookBorrowModel.findOne({_id: updateData._id})
            const book = await bookModel.findOne({_id: updateData._id})
            const returnDay = Date.now()
            const borrowDay = new Date(borrow.NgayMuon)
            const price = ((returnDay - borrowDay)/(1000 * 60 * 60 * 24)).toFixed(0)*book.DonGia
            borrow.TrangThai = updateData.TrangThai
            borrow.MaNhanVien = updateData.MaNhanVien
            borrow.NgayTra = returnDay
            borrow.ChiPhi = price.toFixed(3)
            await borrow.save()
            await bookModel.findByIdAndUpdate(updateData.MaSach,{ $set: {SoQuyenDaMuon: book.SoQuyenDaMuon - borrow.SoLuongMuon}})
            const savedBorrow = await borrow.populate('MaSach')
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
            await bookModel.findByIdAndUpdate(deletedBorrow.MaSach, {$set: {SoQuyenDaMuon: book.SoQuyenDaMuon -  deletedBorrow.SoLuongMuon}})
        }
    }

    async addBorrow(userId, data ) {
        const newBorrow = new bookBorrowModel(data)
        newBorrow.save()
        return newBorrow
    }
} 