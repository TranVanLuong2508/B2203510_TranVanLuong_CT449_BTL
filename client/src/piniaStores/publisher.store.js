import {CustomAxios} from '../axios/customAxios'
import {defineStore} from 'pinia'
import { useUserStore } from './user.store'

export const usePublisherStore = defineStore('publisher', {
    state:() => {
        return {
            publisher: [],
            fetching: false,
        }
    },
    actions: {
        async getAll() {
            const userStore = useUserStore()
            const token = userStore.staffToken
            return await CustomAxios.get('/publisher',{headers: { Authorization: token}})
                .then((res) => {
                    this.publisher = [...this.publisher, ...res.data.publisher]
                    this.fetching = true
                    return res.data.message
                })
                .catch((error) =>{
                    console.log(error)
                    return error
                })
        },
         async add(data) {
            const userStore = useUserStore()
            const token = userStore.staffToken
            return await CustomAxios.post('/publisher/add', data, {headers: {Authorization: token}})
                .then((res) =>{
                    this.publisher.push(res.data.publisher)
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
            return await CustomAxios.patch(`publisher/update/${data.MaNXB}`, data, {headers: {Authorization: token}})
                .then((res) =>{
                    this.publisher.forEach((nxb) => {
                        if(nxb.MaNXB == data.MaNXB) {
                            nxb = data
                        }
                    })
                    return res.data.message
                })
                .catch((error) =>{
                    console.log(error)
                    return error
                })
        },
        async delete(MaNXB) {
            const token = useUserStore().staffToken;
            return await CustomAxios.delete(`publisher/delete/${MaNXB}`, { headers: { Authorization: token } })
                .then((res) => {
                    this.publisher = this.publisher.filter((item) => item.MaNXB != MaNXB);
                    return res.data.message;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                });
        },

    },
    getters: {
        getPublisher(state) {
            return (MaNXB) => state.publisher.find((item) => item.MaNXB == MaNXB);
        },
    }
})