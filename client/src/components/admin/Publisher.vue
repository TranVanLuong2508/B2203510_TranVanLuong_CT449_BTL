<template>
    <div class="Book">
        <h4 class="text-center m-2">Quản lý nhà xuất bản</h4>
        <div class="container create-btn-container d-flex justify-content-end">
            <el-button type="primary" plain @click="navigatorToAdd">Thêm NXB mới</el-button>
        </div>
        <div class="container table-container">
            <el-table :data="filteredPublisher" style="width: 100%">
                <el-table-column type="expand">
                    <template #default="scope">
                        <div class="row">
                            <div class="col-12" style="text-align: center">
                                <h6>Thông tin Nhà xuất bản:</h6>
                                <p m="t-0 b-2">Tên Nhà xuất bản: {{ scope.row?.TenNXB }}
                                </p>
                                <p m="t-0 b-2">Địa chỉ: {{ scope.row?.DiaChi }}</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column type="index" label="STT"> </el-table-column>
                <el-table-column label="Tên NXB" prop="TenNXB"> </el-table-column>
                <el-table-column label="Tên NXB" prop="Diachi"> </el-table-column>
                <el-table-column align="right">
                    <template #header>
                        <el-input v-model="searchText" size="small" placeholder="Nhập tên nhà xuất bản để tìm kiếm" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="navigatorToEdit(scope.row.MaNXB)">Chỉnh sửa</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.row.MaNXB)">Xóa</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { ElMessage, ElInput, ElButton } from 'element-plus';
import { usePublisherStore } from '@/piniaStores/publisher.store';
export default {
    components: {
        ElInput
    },

    data() {
        return {
            publishers: usePublisherStore().publisher,
            searchText: ''
        }
    },

    computed: {
        filteredPublisher() {
            if (this?.publishers) {
                return this.publishers.filter((publisher) => publisher.TenNXB.toLowerCase().includes(this.searchText.toLowerCase()))
            }
            return []
        }
    },

    methods: {
        navigatorToAdd() {
            this.$router.push({
                name: 'nxb-add'
            })
        },

        navigatorToEdit(MaNXB) {
            this.$router.push({
                name: 'edit-nxb',
                params: {
                    MaNXB
                }
            })
        },

        async handleDelete(MaNXB) {
            const result = await usePublisherStore().delete(MaNXB)
            ElMessage(result)
            this.publishers = usePublisherStore().publisher
        }
    }
}
</script>
<style></style>