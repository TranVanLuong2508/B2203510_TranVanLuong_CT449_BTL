<template lang="">
    <Header></Header>   
    <BookList></BookList>
    <Footer></Footer>
</template>
<script>
import Header from '@/components/Header.vue';
import { ElButton } from 'element-plus';
import BookList from '@/components/Home/BookList.vue';
import { useBookStore } from '@/piniaStores/book.store';
import Footer from '@/components/Footer.vue';
export default {
    components: {
        ElButton,
        BookList,
        Header,
        Footer
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