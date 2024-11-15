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
export default {
    components: {
        ElButton,
        BookList,
        Header
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