<template>
    <Header></Header>

    <main class="container">
        <h1 class="text-center m-2">Lịch sử mượn sách</h1>
        <el-table :data="borrowStore.borrows" stripe style="width: 100%">
            <el-table-column type="expand">
                <template #default="scope">
                    <div class="row">
                        <div class="col-12">
                            <p m="t-0 b-2">
                                Ngày mượn sách:
                                {{
                                    scope.row?.NgayMuon && new Date(scope.row?.NgayMuon).toLocaleString()
                                }}
                            </p>
                            <p m="t-0 b-2">
                                Ngày trả:
                                {{ scope.row?.NgayTra && new Date(scope.row?.NgayTra).toLocaleString() }}
                            </p>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="MaMuonSach" label="Mã mượn" width="180" />
            <el-table-column prop="MaSach.TenSach" label="Tên sách" width="180">
                <template #default="scope">
                    <router-link :to="`/book/${scope.row.MaSach.MaSach}`">
                        {{ scope.row.MaSach.TenSach }}
                    </router-link>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="NgayMuon" label="Ngày mượn">
                <template #default="scope">
                    {{ scope.row?.NgayMuon && new Date(scope.row?.NgayMuon).toLocaleString() }}
                </template>
            </el-table-column>
            <el-table-column prop="NgayTra" label="Ngày trả">
                <template #default="scope">
                    {{ scope.row?.NgayTra && new Date(scope.row?.NgayTra).toLocaleString() }}
                </template>
            </el-table-column> -->
            <el-table-column prop="TrangThai" label="Trạng thái">
                <template #default="scope">
                    {{ this.convertToVN(scope.row.TrangThai) }}
                </template>
            </el-table-column>
            <el-table-column label="Đơn giá">
                <template #default="scope"> {{ scope.row.MaSach.DonGia }} VND </template>
            </el-table-column>
            <el-table-column align="right">
                <template #default="scope">
                    <el-button v-if="scope.row.TrangThai === 'pending'" size="small"
                        @click="handleDelete(scope.row._id)"><el-icon>
                            <span class="delete-icons">
                                <DeleteFilled />
                            </span></el-icon></el-button>
                </template>
            </el-table-column>
        </el-table>
    </main>
</template>
<script>
import { ElButton } from "element-plus";
import Header from "@/components/Header.vue";
import { mapStores } from "pinia";
import { useBookBorrowStore } from "@/piniaStores/bookBorrow.store";
export default {
    name: "history",
    components: {
        ElButton,
        Header,
    },

    setup() {
        const borrow = useBookBorrowStore();
        if (!borrow.fetching) {
            borrow.getAllForUser();
        }
    },
    computed: {
        ...mapStores(useBookBorrowStore),
    },
    data() {
        return {};
    },
    methods: {
        handleDelete(id) {
            this.borrowStore.deleteBorrowForUser(id);
        },
        convertToVN(status) {
            switch (status) {
                case "pending":
                    return "Đang chờ nhận sách";
                case "borrow":
                    return "Đã lấy sách";
                case "paid":
                    return "Đã trả sách";
            }
        },
    },
};
</script>
<style>
main .detail-container {
    padding: 16px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    display: flex;
    flex-direction: row;
}

main .detail-container .image {
    max-width: 300px;
}

main .detail-container .detailInfor .title {
    margin-bottom: 2px;
}

main .detail-container .detailInfor .author {
    margin-top: 0;
    margin-bottom: 4px;
    color: #1d9d74;
}

main .detail-container .detailInfor .pay {
    font-size: 26px;
    color: #fe642e;
    font-weight: 600;
}

main .detail-container .detailInfor .quantity span {
    font-size: 24px;
    font-weight: 600;
}

main .detail-container .detailInfor .borrow-container {
    margin-top: 32px;
}

main .detail-container .detailInfor .borrow-container .borrow-quantity {
    margin-right: 8px;
}

main .detail-container .detailInfor .title-description {
    margin-top: 64px;
}

main .detail-container .detailInfor .detail {
    margin: 2px;
}
</style>
