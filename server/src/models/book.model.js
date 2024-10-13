const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const bookSchema = new mongoose.Schema(
  {
    MaSach: Number,
    TenSach: { type: String, required: true },
    DonGia: { type: Object, required: true },
    SoQuyen: { type: Number, required: true },
    NamXuatBan: { type: Date, required: true },
    TacGia: { type: String },
    MaNXB: { type: mongoose.Schema.ObjectId, ref: "publisherSchema", required: true},
    image: { type: String },
    SoLuongDaMuon: { type: Number, required: true, default: 0 },
    //them thuoc tinh SoLuongDaMuon
  },
  { timestamps: true, minimize: false }
);

bookSchema.plugin(AutoIncrement, { inc_field: "MaSach", start_seq: 1000 });

module.exports = mongoose.models?.bookSchema || mongoose.model('bookSchema', bookSchema);