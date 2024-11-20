<template lang="">
    <section id="featured-books">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-header align-center" data-aos="flip-up">
                        <h2 class="section-title">Danh sách tác phẩm</h2>
                    </div>
                    <div class="product-list"  data-aos="fade-up">
                        <div class="row">
                            <BookItem v-for="book in bookStore.getBooksFromTitle(bookStore.searchText)" :key="book._id" :data="book">
                            </BookItem>
                        </div>
                    </div>
                </div> 
            </div> 
        </div> 
    </section> 
</template>
<script>
import { mapStores } from 'pinia';
import BookItem from './BookItem.vue';
import { useBookStore } from '@/piniaStores/book.store';

export default {
    name: "BookList",
    computed: {
        // bookStore() {
        //     return useBookStore()
        // }
        ...mapStores(useBookStore)
    },
    components: {
        BookItem,
    },
    methods: {},
    data() {
        return {}
    }
}
</script>
<style>
/* .BookList {
    min-height: 75vh;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    display: flex;
    flex-wrap: wrap;
    padding: 30px;
} */
</style>