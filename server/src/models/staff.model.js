const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    HoTenNV: { type: String, required: true },
    MatKhau: { type: String, required: true },
    ChucVu: { type: String, required: true, default: "" },
    DiaChi: { type: String, required: true },
    SoDienThoai: { type: String, required: true },
  },
  {timestamps: true, minimize: false}
);

module.exports = mongoose.model?.staffSchema || mongoose.model("staffSchema", staffSchema);
