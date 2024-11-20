<template>
    <Header></Header>
    <RouterView />
</template>
<script>
import Header from '@/components/admin/Header.vue';
import { RouterView } from 'vue-router';
import { usePublisherStore } from '@/piniaStores/publisher.store';
import { useBookStore } from '@/piniaStores/book.store';
export default {
    name: 'Manager',
    components: {
        Header
    },

    mounted() {
        const bookStore = useBookStore()
        if (!bookStore.fetching) {
            bookStore.getAll()
        }

    },
    methods: {
        login(data) {
            console.log(data);
        },
    },
    computed: {
        // active: ''
    }
}
</script>
<style></style>