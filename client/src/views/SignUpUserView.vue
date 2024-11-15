<template>
    <div class="body">
        <SignUpForm @handleSubmit="login"></SignUpForm>
    </div>
</template>
<script>
import SignUpForm from '@/components/SignUpForm.vue';
export default {
    name: 'Login User',
    components: {
        SignUpForm
    },
    methods: {
        login(data) {
            console.log(data)
        }
    }
}
</script>
<style></style>