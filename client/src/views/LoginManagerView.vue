<template>
    <div class="body">
        <LoginForm @handleSubmit="submit"></LoginForm>
    </div>
</template>
<script>
import LoginForm from "@/components/LoginForm.vue";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/piniaStores/user.store";
export default {
    name: "loginmanager",
    components: {
        LoginForm,
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