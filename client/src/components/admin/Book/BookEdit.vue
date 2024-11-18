<template lang="">
    <div>
        <h4 class="m-4 text-center">Chỉnh sửa sách</h4>
        <BookForm :book="data" @handleSubmit="submit" />
    </div>
</template>
<script>
import { ElMessage } from 'element-plus';
import BookForm from './BookForm.vue';
import { useBookStore } from '@/piniaStores/book.store';

export default {
    props: {
        MaSach: { type: String, required: true }
    },
    components: {
        BookForm
    },
    data() {
        const book = useBookStore().getBook(this.MaSach)
        return {
            data: {
                ...book,
                MaNXB: book.MaNXB._id,
                NamXuatBan: new Date(book.NamXuatBan).getFullYear(),
            }
        }
    },
    methods: {
        async submit(data) {
            const result = await useBookStore().update(data);
            ElMessage(result);
            this.$router.push('/manager/book')
        },
    },
}
</script>
<style></style>