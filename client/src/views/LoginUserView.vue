<template lang="">
    <div class="body">
        <Header></Header>
        <LoginForm @handleSubmit="submit"></LoginForm>
    </div>  
</template>
<script>
import LoginForm from '@/components/LoginForm.vue';
import { useUserStore } from '@/piniaStores/user.store';
import { ElMessage } from 'element-plus';
import Header from '@/components/Header.vue';
export default {
    name: 'Login User',
    components: {
        LoginForm,
        Header
    },
    methods: {
        submit: async function (data) {
            if (data.SoDienThoai && data.MatKhau) {
                var result = await useUserStore().SignIn({ SoDienThoai: data.SoDienThoai, MatKhau: data.MatKhau })
                if (useUserStore().token) {
                    this.$router.push({ name: 'home' });
                }
                ElMessage(result);
            }
        },
    }
}
</script>
<style></style>