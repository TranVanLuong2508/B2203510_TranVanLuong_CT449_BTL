<template lang="">
    <div>
        <h4 class="m-4 text-center">Thêm Sách</h4>
        <BookForm :book="data" @handleSubmit="addBook" />
    </div>
</template>
<script>
import { ElMessage } from 'element-plus';
import BookForm from './BookForm.vue';
import { useBookStore } from '@/piniaStores/book.store';
export default {
    components: {
        BookForm
    },
    data() {
        return {
            data: {}
        }
    },
    methods: {
        async addBook(data) {
            let result = await useBookStore().add(data)
            ElMessage(result)
            this.$router.push('/manager/book')
        }
    }
}
</script>
<style></style>