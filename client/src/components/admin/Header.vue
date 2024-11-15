<template>
    <div class="header">
        <div class="header-box container">
            <el-button @click="SignOut">Đăng xuất</el-button>
        </div>
    </div>
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
            useUserStore().SignOut()
            ElMessage('Đăng xuất thành công!')
            this.$router.push({
                path: '/'
            })
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