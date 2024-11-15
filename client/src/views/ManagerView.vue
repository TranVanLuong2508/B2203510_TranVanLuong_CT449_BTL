<template>
    <Header></Header>
    <div class="manager">
        <div class="d-flex justify-content-evenly text-center">
            <router-link to="/manager/borrow" class="navigation-link flex-grow-1">
                <div :class="`navigation ${routeBookCheck() == 'manager-borrow' ? 'active' : ''}`">
                    Quản lý Mượn Sách
                </div>
            </router-link>
            <router-link to="/manager/book" class="navigation-link flex-grow-1">
                <div :class="`navigation ${routeBookCheck() == 'manager-book' ? 'active' : ''}`">Quản lý sách</div>
            </router-link>
            <router-link to="/manager/NXB" class="navigation-link flex-grow-1">
                <div :class="`navigation ${routeBookCheck() == 'manager-nxb' ? 'active' : ''}`">
                    Quản lý Nhà Xuất Bản
                </div>
            </router-link>
        </div>
        <div class="">
            <RouterView />
        </div>
    </div>
</template>
<script>
import Header from '@/components/admin/Header.vue';
import { RouterView } from 'vue-router';
import { usePublisherStore } from '@/piniaStores/publisher.store';
export default {
    name: 'Manager',
    components: {
        Header
    },

    mounted() {
        if (!usePublisherStore().fetching) {
            console.log('Fetching')
            usePublisherStore().getAll()
        }
    },
    methods: {
        login(data) {
            // Login user
            console.log(data);
        },
        routeBookCheck() {
            console.log(this.$router.currentRoute._value.name);
        },
        changeActive(value) {
            this.active = value;
        }
    },
    computed: {}
}
</script>
<style>
.manager .navigation-link+.navigation-link {
    border-left: 1px solid #e5e5e5;
}

.manager .navigation {
    text-decoration: none;
    border-bottom: 1px solid #e5e5e5;
    padding: 2px;
    font-size: 18px;
    font-weight: 600;
}

.manager .navigation.active {
    background: #22b2da;
    color: #fff;
}
</style>