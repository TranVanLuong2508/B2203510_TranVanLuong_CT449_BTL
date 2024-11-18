<template lang="">
    <div>
        <h4 class="m-4 text-center">Thêm Nhà Xuất Bản</h4>
        <PublisherForm :publisher="data" @handleSubmit="submit" />
    </div>
</template>
<script>
import PublisherForm from './PublisherForm.vue';
import { usePublisherStore } from '@/piniaStores/publisher.store';
import { ElMessage } from 'element-plus';

export default {
    components: {
        PublisherForm
    },
    data() {
        return {
            data: {}
        }
    },
    methods: {
        async submit(data) {
            const result = await usePublisherStore().add(data)
            ElMessage(result)
            this.$router.push('/manager/NXB')
        }
    }
}
</script>
<style></style>