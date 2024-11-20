<template>
    <header id="header">
        <div class="container-fluid">
            <div class="row inner-wrap">
                <div class="col-md-2 logo-box">
                    <div class="main-logo" data-aos="fade-right">
                        <router-link to="/">
                            <img src="../assets/img/logo.png" class="logo" />
                        </router-link>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="search">
                        <input type="text" class="input-search" placeholder="Nhập tên sách để tìm kiếm"
                            v-model="bookStore.searchText">
                    </div>
                </div>
                <div class="main-menu col-4 col-md-4">
                    <ul class="menu-list">
                        <li class="menu-item "><router-link to="/"
                                :class="`${routeBookCheck() == 'home' ? 'active' : ''}`">Trang chủ</router-link></li>
                        <li class="menu-item"><router-link to="/history"
                                :class="`${routeBookCheck() == 'history' ? 'active' : ''}`">Lịch sử mượn
                                sách</router-link></li>
                    </ul>
                </div>
                <div class="btn-group col-md-2 button-header" v-if="!user.token">
                    <button type="button" class="btn  dropdown-toggle button-header-item" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        TÀI KHOẢN
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end drop-down ul-dropdown">
                        <li><button class="dropdown-item" type="button" @click="handleNavigateToLogin">Đăng nhập | Đọc
                                giả</button></li>
                        <li><button class="dropdown-item" type="button" @click="handleNavigateToLoginManager">Đăng nhập
                                |
                                Quản
                                trị
                                viên</button></li>
                    </ul>
                </div>
                <div v-if="user.token" class="btn-group col-md-2 button-header">
                    <button type="button" class="btn btn-primary button-logout" @click="SignOut(user)">Đăng
                        xuất</button>
                </div>
            </div>
        </div>
    </header>

</template>
<script>
import { ElInput, ElButton, ElMessage } from 'element-plus';
import { useUserStore } from '@/piniaStores/user.store';
import { mapStores } from 'pinia';
import { useBookStore } from '@/piniaStores/book.store';
export default {
    components: {
        ElInput
    },

    data() {
        return {
            value: '',
            user: useUserStore()
        }
    },

    computed: {
        ...mapStores(useBookStore)
    },

    methods: {
        SignOut(user) {
            user.SignOut()
            ElMessage('Đăng xuất thành công!')
            this.$router.push('/')
        },
        routeBookCheck() {
            // console.log(this.$route.name)
            return this.$route.name
        },

        handleNavigateToLogin() {
            this.$router.push('/login')
        },
        handleNavigateToLoginManager() {
            this.$router.push('/loginmanager')
        },
    }
}
</script>
<style>
#header .inner-wrap .menu-item a {
    font-weight: 600;
}

#header .inner-wrap .button-header button {
    font-weight: 600;
}

.el-dropdown i {
    width: 100%;
    height: 100%;
}

.el-icon svg {
    height: 40px;
    width: 40px;
}
</style>