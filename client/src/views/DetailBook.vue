<script>
import Header from '@/components/Header.vue';
import { ElButton, ElMessage } from 'element-plus';
import { mapStores } from 'pinia';
import { useBookStore } from '@/piniaStores/book.store';
import { useBookBorrowStore } from '@/piniaStores/bookBorrow.store';
import { useUserStore } from '@/piniaStores/user.store';
export default {

    props: {
        MaSach: { type: String, required: true }
    },

    components: {
        ElButton,
        Header,
    },

    data() {
        return {
            quantity: 0
        }
    },

    computed: {
        ...mapStores(useBookStore, useUserStore, useBookBorrowStore)
    },

    methods: {
        handleChange(value) {
            this.quantity = value
        },
        async handleBorrow() {
            if (!this.userStore.token) {
                ElMessage('Hãy đăng nhập để mượn sách!')
                this.$router.push('/login')
                return;
            }
            const data = {
                MaSach: this.bookStore.getBook(this.MaSach)._id,
                SoLuongMuon: this.quantity
            }
            const result = await this.borrowStore.addBorrow(data)
            ElMessage(result)
        }
    }
}
</script>
<template>
    <Header></Header>
    <main class="container">
        <div class="detail-container mt-4" data-aos="fade-up">
            <div class="imageBox">
                <img class="image" :src="bookStore.getBook(MaSach).image" alt="" />
            </div>
            <div class="detailInfor">
                <h4 class="title">{{ bookStore.getBook(MaSach).TenSach }}</h4>
                <p class="quantity">
                    Số lượng còn lại:
                    <span>{{ bookStore.getBook(MaSach).SoQuyen - bookStore.getBook(MaSach).SoLuongDaMuon }}</span>
                </p>
                <div>
                    <p class="detail">Tác giả: {{ bookStore.getBook(MaSach).TacGia }}</p>
                    <p class="detail">Nhà xuất bản: {{ bookStore.getBook(MaSach).MaNXB.TenNXB }}</p>
                    <p class="detail">Năm xuất bản: {{ new Date(bookStore.getBook(MaSach).NamXuatBan).getFullYear() }}
                    </p>
                </div>
                <p class="pay">Đơn giá: {{ bookStore.getBook(MaSach).DonGia + " VND" }}
                </p>
                <div class="borrow-container">
                    <span class="borrow-quantity">Số lượng</span>
                    <el-input-number v-model="quantity" :min="1" :max="20" @change="handleChange" />
                    <div class="mt-3">
                        <button type="button" class="btn btn-primary button-submit  " @click="handleBorrow">Mượn
                            Sách</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<style scoped>
main .detail-container {
    padding: 16px;
    display: flex;
    flex-direction: row;
}

main .detail-container .imageBox {
    margin-right: 32px;
}

main .detail-container .imageBox .image {
    max-width: 300px;
}

main .detail-container .detailInfor .title {
    margin-bottom: 2px;
}

main .detail-container .detailInfor .author {
    margin-top: 0;
    margin-bottom: 4px;
    color: #1d9d74;
}

main .detail-container .detailInfor .pay {
    font-size: 26px;
    color: #d74d03;
    font-weight: 600;
}

main .detail-container .detailInfor .quantity span {
    font-size: 24px;
    font-weight: 600;
}

main .detail-container .detailInfor .quantity p {
    margin-bottom: 0px;
}

main .detail-container .detailInfor .borrow-container {
    margin-top: 32px;
}

main .detail-container .detailInfor .borrow-container .borrow-quantity {
    margin-right: 8px;
}

main .detail-container .detailInfor .title-description {
    margin-top: 24px;
}

main .detail-container .detailInfor .detail {
    margin: 2px;
}
</style>