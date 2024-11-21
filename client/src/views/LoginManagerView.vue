<template>
    <div class="body">
        <Header></Header>
        <LoginForm @handleSubmit="submit"></LoginForm>
    </div>
</template>
<script>
import LoginForm from "@/components/LoginForm.vue";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/piniaStores/user.store";
import Header from "@/components/Header.vue";
export default {
    name: "loginmanager",
    components: {
        LoginForm,
        Header
    },
    methods: {
        async submit(data) {
            const userStore = useUserStore()
            if (data.SoDienThoai && data.MatKhau) {
                var result = await userStore.staffSignIn({
                    SoDienThoai: data.SoDienThoai,
                    MatKhau: data.MatKhau,
                });
                if (userStore.staffToken) {
                    this.$router.push({ name: "manager-borrow" });
                }
                ElMessage(result);
            }
        },
    },
};
</script>
<style></style>