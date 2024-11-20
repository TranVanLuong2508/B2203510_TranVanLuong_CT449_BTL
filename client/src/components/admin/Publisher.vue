<template>
    <div class="Book">
        <h4 class="text-center m-2 space-text">Quản lý nhà xuất bản</h4>
        <div class="container create-btn-container d-flex justify-content-end">
            <button type="button" class="btn btn-primary buttonAdd" @click="navigatorToAdd">Thêm nhà xuất bản
                mới</button>
        </div>
        <div class="container table-container">
            <el-table :data="filteredPublisher" style="width: 100%">
                <el-table-column type="index" label="STT"> </el-table-column>
                <el-table-column label="Tên Nhà xuất bản" prop="TenNXB"> </el-table-column>
                <el-table-column label="Địa chỉ Nhà xuất bản" prop="DiaChi"> </el-table-column>
                <el-table-column align="right">
                    <template #header>
                        <el-input v-model="searchText" size="small" placeholder="Nhập tên nhà xuất bản để tìm" />
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
import { mapStores } from 'pinia';
export default {

    mounted() {
        const publisherStore = usePublisherStore()
        if (!publisherStore.fetching) {
            publisherStore.getAll()
        }
    },
    components: {
        ElInput
    },

    data() {
        return {
            // publishers: usePublisherStore().publisher,
            searchText: ''
        }
    },

    computed: {
        ...mapStores(usePublisherStore),
        filteredPublisher() {
            if (this.publisherStore.publisher) {
                return this.publisherStore.publisher.filter((publisher) => publisher.TenNXB.toLowerCase().includes(this.searchText.toLowerCase()))
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
        },
    },

}
</script>
<style>
.Book .space-text {
    margin-top: 24px;
}

.Book .buttonAdd {
    margin-bottom: 16px;
}
</style>