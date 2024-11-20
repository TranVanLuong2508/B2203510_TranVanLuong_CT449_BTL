import { useUserStore } from "@/piniaStores/user.store";
import { createRouter, createWebHistory } from "vue-router";
//import comnponent
//views
import HomeView from "@/views/HomeView.vue";
import DetailBook from "@/views/DetailBook.vue";
import HistoryView from "@/views/HistoryView.vue";
import LoginManagerView from "@/views/LoginManagerView.vue";
import LoginUserView from "@/views/LoginUserView.vue";
import ManagerView from "@/views/ManagerView.vue";
import SignUpUserView from "@/views/SignUpUserView.vue";
//components
import BookAdd from "@/components/admin/Book/BookAdd.vue";
import BookEdit from "@/components/admin/Book/BookEdit.vue";
import BookForm from "@/components/admin/Book/BookForm.vue";
import PublisherForm from "@/components/admin/publisher/PublisherForm.vue";
import PublisherEdit from "@/components/admin/publisher/PublisherEdit.vue";
import PublisherAdd from "@/components/admin/publisher/PublisherAdd.vue";
import Book from "@/components/admin/Book.vue";
import BorrowBook from "@/components/admin/BorrowBook.vue";
import HeaderAdmin from "@/components/admin/Header.vue";
import Publisher from "@/components/admin/Publisher.vue";
import BookItem from "@/components/Home/BookItem.vue";
import BookList from "@/components/Home/BookList.vue";
import Header from "@/components/Header.vue";
import LoginForm from "@/components/LoginForm.vue";
import SignUpForm from "@/components/SignUpForm.vue";
import { ElMessage } from "element-plus";

const routes =[
    {
        path:'/',
        name: 'home',
        component:HomeView
    },

    {
        path:'/login',
        name:'login',
        component: LoginUserView
    },

    {
        path: '/signup',
        name: 'signup',
        component: SignUpUserView
    },

    {
        path: '/book/:MaSach',
        name: 'book',
        component: DetailBook,
        props: true
    },

    {
        path: '/history',
        name: 'history',
        beforeEnter (to, from, next){
            const userStore = useUserStore()
            if(userStore.token){
                next()
            } else {
                ElMessage('Vui lòng đăng nhập để xem lịch sử mượn sách!')
                next({name:'login'})
            }
        },
        component: HistoryView
    },

    {
        path: '/loginmanager',
        name: 'loginmanager',
        component: LoginManagerView
    },

    {
        path: '/manager',
        name: 'manager',
        component: ManagerView,
        // beforeEnter(to, from, next) {
        //     const userStore = useUserStore()
        //     if(userStore.staffToken){
        //         next()
        //     } else {
        //         next({name:'loginmanager'})
        //     }
        // },
        children: [
            {
                path:'',
                name:'book-default',
                component: BorrowBook
            },

            {
                path:'book',
                name:'manager-book',
                component: Book
            },

            {
                path:'nxb',
                name:'manager-nxb',
                component: Publisher
            },

            {
                path:'nxb/add',
                name:'nxb-add',
                component:PublisherAdd
            },

            {
                path: 'nxb/edit/:MaNXB',
                name:'edit-nxb',
                component: PublisherEdit,
                props: true
            },
            
            {
                path:'book/add',
                name:'add-book',
                component:BookAdd
            },

            {
                path:'book/edit/:MaSach',
                name:'edit-book',
                component:BookEdit,
                props:true
            },

            {
                path:'borrow',
                name:'manager-borrow',
                component:BorrowBook
            }
        ]
    },

]   

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });

export default router