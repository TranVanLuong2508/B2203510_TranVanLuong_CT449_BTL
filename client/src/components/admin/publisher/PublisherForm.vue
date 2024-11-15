<template lang="">
    <div class="publisher">
        <div class="d-flex flex-column">
            <label>Tên nhà xuất bản:</label>
            <el-input v-model="publisher.TenNXB" style="width: 300px" size="large" placeholder="Nhập tên nhà xuất bản" />
        </div>
        <div class="d-flex flex-column my-4">
            <label>Địa chỉ:</label>
            <el-input v-model="publisher.DiaChi" style="width: 300px" size="large" placeholder="Nhập địa chỉ" />
        </div>
        <div class="d-flex justify-content-center align-items-center">
            <el-button type="primary" plain @click="submit">Lưu</el-button>
        </div>
    </div>
</template>
<script>
export default {
    components: {},
    props: {
        publisher: { type: Object, required: false }
    },
    data() {
        return {}
    },
    methods: {
        submit() {
            this.$emit('handleSubmit', this.publisher);
        }
    }
}
</script>
<style>
.publisher {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>