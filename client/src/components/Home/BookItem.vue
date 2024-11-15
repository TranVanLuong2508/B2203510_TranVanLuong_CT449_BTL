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
        }
    }
}
</script>
<template>
    <div class="BookItem m-2">
        <img :src="data.image" alt="" class="image" />
        <div class="d-flex justify-content-between align-items-center p-4">
            <div class="d-flex align-items-start justify-content-center flex-column">
                <h5 class="m-0 title">
                    <router-link :to="`/book/${data.MaSach}`">
                        {{ data.TenSach }}
                    </router-link>
                </h5>
                <span class="author">{{ data.TacGia }}</span>
                <p class="pay">
                    Đơn giá: <span>{{ data.DonGia }} đ</span>
                </p>
                <p class="quantity">
                    Số lượng: <span>{{ data.SoQuyen - data.SoLuongDaMuon || 0 }}</span>
                </p>
            </div>
        </div>
    </div>
</template>
<style>
.BookItem {
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    height: 360px;
    max-width: 190px;
    display: flex;
    flex-direction: column;
}

.BookItem .image {
    width: 190px;
    height: 190px;
}

.BookItem .title {
    min-height: 40px;
    font-size: 16px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}

.BookItem .author {
    font-size: 12px;
    color: #1d9d74;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
}

.BookItem .pay {
    font-size: 14px;
    margin-top: 4px;
}

.BookItem .pay span {
    color: #fe642e;
    font-weight: 600;
    font-size: 16px;
}

.BookItem .quantity {
    font-size: 12px;
    margin: 0;
}

.BookItem .quantity span {
    font-size: 16px;
    font-weight: 600;
}

.BookItem .title a {
    text-decoration: none;
}
</style>