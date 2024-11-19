import {axiosInstance} from '../axios/axiosInstance'
import {defineStore} from 'pinia'
import { useUserStore } from './user.store'

export const useBookStore = defineStore('book', {
    state: () =>{
        return {
            books: [],
            searchText: '',
            fetching: false,
        }
    },
    actions: {
        async getAll() {
            // const userStore = useUserStore()
            // const token = userStore.token
            return await axiosInstance.get('/book')
                  .then((res) =>{
                    this.books = [...this.books, ...res.data.books]
                    this.fetching = true
                    return res.data.message
                  })
                  .catch((error) =>{
                    console.log(error)
                  })
        },

        async add(data) {
            const userStore = useUserStore()
            const token = userStore.staffToken           
            return await axiosInstance.post('/book/add', data, {headers:{Authorization: token}})
                  .then((res) =>{
                    this.books.push(res.data.book)
                    return res.data.message
                  })
                  .catch((error) =>{
                    console.log(error)
                    return error
                  })
        },

        async update(data) {
            const userStore = useUserStore()
            const token = userStore.staffToken
            return await axiosInstance.patch('/book//update', data, { headers: { Authorization: token}})
                  .then((res) => {
                    console.log(res.data.books)
                    this.books = this.books.map((item) =>{
                        if(item._id == data._id)
                        {
                            console.log("Đã cập nhật!")
                            item = res.data.book
                        }
                        return item
                    })
                    return res.data.message
                  })
                  .catch((error) =>{
                    console.log(error)
                  })
        },

        async delete(bookCode) {
            const userStore = useUserStore()
            const token = userStore.staffToken
            return await axiosInstance.delete(`/book/delete/${bookCode}`, { headers: { Authorization: token}})
                   .then((res)=>{
                    this.books = this.books.filter((book) => book.MaSach != bookCode )
                    return res.data.message
                   })
                   .catch((error) =>{
                    console.log(error)
                    return error
                   })
        }
    },

    getters: {
        getBook(state) {
            return (bookCode) => state.books.find((item) => item.MaSach == bookCode);
        },
        getBooks(state) {
            return state.books;
        },
        getBooksFromTitle(state) {
            return (title) => state.books.filter((book) => book.TenSach.toLowerCase().includes(title.toLowerCase()));
        },
        getFetching(state) {
            return state.fetching;
        },
    }
})