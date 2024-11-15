<template lang="">
    <div class="body">
        <LoginForm @handleSubmit="submit"></LoginForm>
    </div>
</template>
<script>
import LoginForm from '@/components/LoginForm.vue';
import { useUserStore } from '@/piniaStores/user.store';
import { ElMessage } from 'element-plus';
export default {
    name: 'Login User',
    components: {
        LoginForm
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