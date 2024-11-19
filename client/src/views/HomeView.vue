<template lang="">
    <Header></Header>
    <main class="container">
        <h1 class="text-center m-2">Danh sách sách</h1>
    </main>
    <BookList></BookList>
</template>
<script>
import Header from '@/components/Header.vue';
import { ElButton } from 'element-plus';
import BookList from '@/components/Home/BookList.vue';
import { useBookStore } from '@/piniaStores/book.store';
export default {
    components: {
        ElButton,
        BookList,
        Header
    },
    mounted() {
        const bookStore = useBookStore()
        if (!bookStore.fetching) {
            bookStore.getAll()
        }
    }
}
</script>
<style>
main .pagination {
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>