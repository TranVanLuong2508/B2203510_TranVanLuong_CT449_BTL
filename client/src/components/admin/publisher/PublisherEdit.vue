<template lang="">
    <div>
        <h4 class="m-4 text-center">Chỉnh sửa Nhà Xuất Bản</h4>
        <PublisherForm :publisher="data" @handleSubmit="submit" />
    </div>
</template>
<script>
import { ElMessage } from 'element-plus';
import { usePublisherStore } from '@/piniaStores/publisher.store';
import PublisherForm from './PublisherForm.vue';
export default {
    components: {
        PublisherForm
    },
    props: {
        MaNXB: { type: String, default: false }
    },
    data() {
        return {
            data: usePublisherStore().getPublisher(this.MaNXB)
        }
    },
    methods: {
        async submit(data) {
            const result = await usePublisherStore().update(data)
            ElMessage(result)
            this.$router.push('/manager/NXB')
        }
    }
}
</script>
<style></style>