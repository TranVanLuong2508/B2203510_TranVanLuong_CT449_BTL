const bookModel = require('../models/book.model')
const bookBorrowModel = require('../models/bookBorrow.model')

module.exports = class bookBorrowService {
    // for admin
     async getAllForAdmin () {
        const borrowList = await bookBorrowModel.find() 
                                                .populate('MaSach')
                                                .populate('MaNhanVien',["HoTenNV", "ChucVu", "SoDienThoai"])
                                                .populate('MaDocGia', ['HoLot', 'Ten', 'NgaySinh', 'GioiTinh', 'DiaChi', 'SoDienThoai'])
        return borrowList
    }

    async deleteBorrowForAdmin (id) {
        const borrow = await bookBorrowModel.find({_id: id })
        if(borrow) {
            if(borrow.TrangThai !='paid') {
                await bookModel.findByIdAndUpdate(
                    {MaSach: borrow.MaSach},
                    {}
                )
            }
        }
    }


}