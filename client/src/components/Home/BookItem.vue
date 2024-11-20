<script>
export default {
    name: "BookItem",
    props: {
        data: { type: Object, required: true }
    },
    methods: {
        handleNavigate() {
            this.$router.push({
                name: "book",
                params: {
                    id: this.data.MaSach
                }
            })
        },
        handleNavigateToDetail() {
            this.$router.push(`/book/${this.data.MaSach}`)
        },
    }
}
</script>
<template>
    <div class="col-md-3">
        <div class="product-item">
            <div class="product-style">
                <img :src="data.image" alt="Books" class="product-item">
                <button type="button" class="add-to-detail" data-product-tile="add-to-cart"
                    @click="handleNavigateToDetail">Xem
                    chi tiết</button>
            </div>
            <div class="product-infor">
                <h3 class="text-limit">{{ data.TenSach }}</h3>
                <h6>{{ data.TacGia }}</h6>
                <div class="item-price">{{ data.DonGia }} VND</div>
            </div>
        </div>
    </div>
</template>
<style>
.text-limit {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>