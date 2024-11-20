<template>
    <div class="Book">
        <h4 class="text-center m-2">Quản lý sách</h4>
        <div class="container create-btn-container d-flex justify-content-end">
            <button type="button" class="btn btn-primary buttonAdd  " @click="handleNavigateToAddBook">Thêm sách
                mới</button>
        </div>
        <div class="container table-container">
            <el-table :data="filteredBooks" style="width: 100%">
                <el-table-column type="expand">
                    <template #default="scope">
                        <div class="row">
                            <div class="col-6">
                                <p m="t-0 b-2">Tên sách: {{ scope.row?.TenSach }}</p>
                                <p m="t-0 b-2">Đơn giá: {{ scope.row?.DonGia + " VND" }}</p>
                                <p m="t-0 b-2">Tổng số quyển: {{ scope.row?.SoQuyen }}</p>
                                <p m="t-0 b-2">Năm xuất bản: {{ new Date(scope.row?.NamXuatBan).getFullYear() }}</p>
                            </div>
                            <div class="col-6">
                                <p m="t-0 b-2">Nhà xuất bản: {{ scope.row?.MaNXB?.TenNXB }}</p>
                                <p m="t-0 b-2">Tác giả: {{ scope.row?.TacGia }}</p>
                                <p m="t-0 b-2">Số lượng đã mượn: {{ scope.row?.SoLuongDaMuon }}</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column type="index" label="STT"> </el-table-column>
                <el-table-column label="Mã sách" prop="MaSach" />
                <el-table-column label="Tên Sách" prop="TenSach">
                    <template #default="scope">
                        <router-link :to="`/book/${scope.row.MaSach}`">
                            {{ scope.row.TenSach }}
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column label="Đơn giá">
                    <template #default="scope">
                        {{ scope?.row?.DonGia + " VND" }}
                    </template>
                </el-table-column>
                <el-table-column label="Số lượng trong kho">
                    <template #default="scope">
                        {{ scope?.row?.SoQuyen - scope.row?.SoLuongDaMuon || 0 }}
                    </template>
                </el-table-column>
                <el-table-column align="right">
                    <template #header>
                        <el-input v-model="searchText" size="small" placeholder="Nhập tên sách để tìm kiếm" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="navigatorToEdit(scope.row.MaSach)">Chỉnh sửa</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.row.MaSach)">Xóa</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { ElButton, ElInput, ElMessage } from 'element-plus';
import { useBookStore } from '@/piniaStores/book.store';
import { mapStores } from 'pinia';
export default {
    components: {
        ElInput
    },

    data() {
        return {
            // books: useBookStore().books,
            searchText: '',
        }
    },

    computed: {
        ...mapStores(useBookStore),
        filteredBooks() {
            if (this.bookStore.books) {
                return this.bookStore.books.filter((book) => book.TenSach.toLowerCase().includes(this.searchText.toLowerCase()))
            }
            return []
        }
    },

    methods: {
        handleNavigateToAddBook() {
            this.$router.push({
                name: 'add-book'
            })
        },
        navigatorToEdit(MaSach) {
            this.$router.push({
                name: 'edit-book',
                params: {
                    MaSach
                }
            })
        },

        async handleDelete(MaSach) {
            const result = await this.bookStore.delete(MaSach)
            this.books = this.bookStore.books
            ElMessage(result)
        }
    },
}
</script>
<style>
.Book .button-manager {
    margin-bottom: 15px;
}

.Book .button-manager:hover {
    background-color: #D06B18;
}
</style>