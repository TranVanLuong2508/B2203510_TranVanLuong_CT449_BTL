<template>
    <header id="header">
        <div class="container-fluid">
            <div class="row inner-wrap">
                <div class="col-md-2">
                    <div class="main-logo">
                        <router-link to="/manager/borrow"><img src="../../assets/img/logo.png" alt=""></router-link>
                    </div>
                </div>
                <ul class="menu-list col-md-8 col-8">
                    <li class="menu-item">
                        <router-link to="/manager/NXB"
                            :class="`${routeBookCheck() == 'manager-nxb' ? 'active' : ''}`">Quản Lý Nhà xuất
                            bản</router-link>
                    </li>
                    <li class="menu-item">
                        <router-link to="/manager/book"
                            :class="`${routeBookCheck() == 'manager-book' ? 'active' : ''}`">Quản Lý
                            Sách</router-link>
                    </li>
                    <li class="menu-item">
                        <router-link to="/manager/borrow"
                            :class="`${routeBookCheck() == 'manager-borrow' ? 'active' : ''}`">Quản Lý Mượn
                            Sách</router-link>
                    </li>
                </ul>
                <div class="btn-group col-md-2 button-header">
                    <button type="button" class="btn btn-primary button-logout" @click="SignOut">Đăng xuất</button>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
import { ElButton, ElInput, ElMessage } from 'element-plus';
import { useUserStore } from '@/piniaStores/user.store';

export default {

    components: {
        ElInput
    },

    data() {
        return {
            value: ''
        }
    },

    methods: {
        SignOut() {
            useUserStore().staffSignOut()
            ElMessage('Đăng xuất thành công!')
            this.$router.push({
                path: '/'
            })
        },
        routeBookCheck() {
            return this.$route.name
        },
        changeActive(value) {
            this.active = value;
        }
    }
}
</script>
<style>
#header .inner-wrap .menu-item a {
    font-weight: 600;
}
</style>