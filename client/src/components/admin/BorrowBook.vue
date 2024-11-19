<template>
    <div class="Book">
        <h4 class="text-center m-2">Quản lý mượn sách</h4>
    </div>
    <div class="container table-container">
        <el-table :data="borrowStore.borrowAdmin" style="width: 100%">
            <el-table-column type="expand">
                <template #default="scope">
                    <div class="row">
                        <div class="col-6">
                            <h6>Thông tin đọc giả:</h6>
                            <p m="t-0 b-2">Họ và Tên: {{ scope.row?.MaDocGia.HoLot + ' ' + scope.row?.MaDocGia.Ten }}
                            </p>
                            <p m="t-0 b-2">Số điện thoại: {{ scope.row?.MaDocGia.SoDienThoai }}</p>
                            <p m="t-0 b-2">Giới tính: {{ scope.row?.MaDocGia.GioiTinh }}</p>
                            <p m="t-0 b-2">Địa chỉ: {{ scope.row?.MaDocGia.DiaChi }}</p>
                        </div>
                        <div class="col-6">
                            <h6>Thông tin mượn:</h6>
                            <p m="t-0 b-2">Số lượng mượn: {{ scope.row?.SoLuongMuon }}</p>
                            <p m="t-0 b-2">
                                Ngày lấy sách: {{ scope.row?.NgayMuon && new Date(scope.row?.NgayMuon).toLocaleString()
                                }}
                            </p>
                            <p m="t-0 b-2">
                                Ngày trả sách: {{ scope.row?.NgayTra && new Date(scope.row?.NgayTra).toLocaleString() }}
                            </p>
                            <p m="t-0 b-2">Nhân viên: {{ scope.row?.MaNhanVien?.HoTenNV }}</p>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Mã mượn sách" prop="MaMuonSach"></el-table-column>
            <el-table-column label="Tên Sách">
                <template #default="scope">
                    <router-link :to="`/book/${scope.row.MaSach.MaSach}`">
                        {{ scope.row.MaSach.TenSach }}
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column label="Tên người mượn">
                <template #default="scope">
                    {{ scope.row.MaDocGia.Ten }}
                </template>
            </el-table-column>
            <el-table-column label="Trạng thái" prop="TrangThai">
                <template #default="scope">
                    <el-select class="w-100" v-model="scope.row.TrangThai" placeholder="Trạng thái" size="large"
                        style="width: 240px">
                        <el-option label="Đang chờ nhận sách" value="pending" />
                        <el-option label="Đã lấy sách" value="borrow" />
                        <el-option label="Đã trả sách" value="paid" />
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="Đơn giá">
                <template #default="scope">
                    {{ scope.row.MaSach.DonGia }} VND
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template #default="scope">
                    <el-button size="small"
                        @click="handleSave({ _id: scope.row._id, TrangThai: scope.row.TrangThai }, {})">Lưu</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row._id)">Xóa</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { useBookBorrowStore } from '@/piniaStores/bookBorrow.store';
import { ElMessage, ElButton, ElInput } from 'element-plus';
import { mapStores } from 'pinia';
export default {
    mounted() {
        const borrow = useBookBorrowStore()
        if (!borrow.fetchAdmin) {
            borrow.getAllForAdmin()
        }
    },
    components: {
        ElInput
    },
    computed: {
        ...mapStores(useBookBorrowStore)
    },
    data() {
        return {
            value: ''
        }
    },
    methods: {
        async handleSave(data) {
            const result = await this.borrowStore.updateBorrowForAdmin(data)
            ElMessage(result)
        },
        async handleDelete(borrowId) {
            const result = await this.borrowStore.deleteBorrowForAdmin(borrowId)
            ElMessage(result)
        }
    }
}
</script>
<style></style>