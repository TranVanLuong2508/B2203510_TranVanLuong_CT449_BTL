<template>
    <div class="header">
        <div class="header-box container">
            <div class="logo">
                <router-link to="/">
                    <img src="../assets/img/logo.png" class="logo" />
                </router-link>
            </div>
            <input type="text" class="search-input" placeholder="Tìm kiếm" v-model="bookStore.searchText" />
            <div>
                <div class="dropdown" v-if="!user.token">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="login-btn"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Đăng Nhập
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="login-btn">
                        <li>
                            <router-link class="dropdown-item" to="/login">Đăng nhập | Đọc giả</router-link>
                        </li>
                        <li>
                            <router-link class="dropdown-item" to="/loginmanager">Đăng nhập | Nhân viên</router-link>
                        </li>
                    </ul>
                </div>
                <div v-if="user.token">
                    <el-dropdown size="large" type="primary">
                        <span class="menu-icon"><el-icon>
                                <Expand />
                            </el-icon></span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>
                                    <router-link class="action-link" to="/history">Lịch sử mượn sách</router-link>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div @click="SignOut(user)">Đăng xuất</div>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
        </div>
    </div>
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
        }
    }
}
</script>
<style>
.header {
    position: sticky;
    padding: 0;
    top: 0;
    left: 0;
    right: 0;
    background: #e5e5e5;
}

.header .header-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
}

.header .header-box .logo {
    max-width: 60px;
    max-height: 60px;
    border-radius: 9px;
}

.header .header-box .text {
    color: aqua;
}

.header .header-box .search-input {
    width: 300px;
    margin-left: 10px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 4px 8px;
}

.header .header-box .search-input:focus {
    outline: none;
    border: 2px solid rgba(61, 108, 185, 0.6);
    box-shadow: rgba(0, 224, 255, 0.1) 0px 6px 12px -2px, rgba(0, 224, 255, 0.1) 0px 3px 7px -3px;
}

.header .header-box .menu-icon {
    font-size: 26px;
}

.header .header-box .action-link {
    text-decoration: none;
}
</style>