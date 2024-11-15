import { CustomAxios } from "@/axios/customAxios";
import { defineStore } from "pinia";
import { useUserStore } from "./user.store";

export const useBookBorrowStore = defineStore('borrow', {
    state: () =>{
        return {
            borrows: [],
            borrowAdmin: [],
            fetchAdmin: false,
            fetching: false,
        }
    },
    actions: {
         getAllForAdmin () {
            const userStore = useUserStore()
            const token = userStore.token
            return  CustomAxios.get('/borrow/admin', { headers: { Authorization: token }})
                   .then((res) =>{
                    this.borrowAdmin = [...this.borrows, ...res.data.borrows]
                    this.fetching = true
                    return res.data.message
                   })
                   .catch((error) =>{
                    console.log(error)
                    return error
                   })
        },
         getAllForUser() {
            const userStore = useUserStore()
            const token = userStore.token
            return  CustomAxios.get('/borrow', {headers: { Authorization: token}})
                  .then((res) =>{
                    this.borrows = [...this.borrows, ...res.data.borrows]
                    this.fetching = true
                    return res.data.message
                  })
                  .catch((error) =>{
                    console.log(error)
                    return error
                  })
        },

         addBorrow (data) {
            const userStore = useUserStore()
            const token = userStore.token
            return  CustomAxios.post('/borrow/add', data, { headers: { Authorization: token}})
                  .then((res) =>{
                    return res.data.message
                  })
                  .catch((error) => {
                    console.log(error)
                    return error
                  })
        },

         updateBorrowForAdmin (data) {
            const userStore = useUserStore()
            const token = userStore.token
            return  CustomAxios.patch('/borrow/admin/update', data, { headers: { Authorization: token}})
                  .then((res) =>{
                    this.borrowAdmin = this.borrowAdmin.map((item) => {
                        if(item._id == data._id){
                            item = res.data.borrow
                        }
                        return item
                    })
                    return res.data.message
                  })
                  .catch((error) => {
                    console.log(error)
                    return error
                  })
        },

         deleteBorrowForUser (borrowId) {
            const userStore = useUserStore()
            const token = userStore.token
            return  CustomAxios.delete(`/borrow/user/delete/${borrowId}`,{ headers: { Authorization: token}})
                  .then((res) =>{
                    this.borrowUser = this.borrows.filter((item) => item._id !== borrowId)
                    return res.data.message
                  })
                  .catch((error) => {
                    console.log(error)
                    return error
                  })
        },

         deleteBorrowForAdmin (borrowId) {
            const userStore = useUserStore()
            const token = userStore.token
            return  CustomAxios.delete(`/borrow/admin/delete/${borrowId}`,{ headers: { Authorization: token}})
                  .then((res) =>{
                    this.borrowAdmin = this.borrowAdmin.filter((item) => item._id !== borrowId)
                    return res.data.message
                  })
                  .catch((error) => {
                    console.log(error)
                    return error
                  })
        },
    }
})