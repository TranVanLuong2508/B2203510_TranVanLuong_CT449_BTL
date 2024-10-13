const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const bookBorrowSchema = mongoose.Schema(
    {
        MaMuonSach: {type: Number, required: true},
        MaDocGia: { type: mongoose.Schema.ObjectId, ref: 'userSchema', require: true },
        MaSach: { type: mongoose.Schema.ObjectId, ref: 'bookSchema', require: true },
        MaNhanVien: { type: mongoose.Schema.ObjectId, ref: 'staffSchema' },
        NgayMuon: {type: Date, required: true},
        NgayTra: {type: Date, required: true},
        ChiPhi: { type: Number },
        TrangThai: { type: String, required: true, default: 'pending' }, 
        //pending / borrowed / returned / overdue / canceled 
    },
    { timestamps: true, minimize: false },
)

bookBorrowSchema.plugin(AutoIncrement, { inc_field: "MaMuonSach", start_seq: 1000 });

module.exports = mongoose.models?.bookBorrowSchema || mongoose.model('bookBorrowSchema', bookBorrowSchema);