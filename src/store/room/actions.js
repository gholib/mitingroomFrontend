export default{
    GET_ROOM({commit}, context){
        context.$vs.loading({color: 'rgb(228, 222, 37)' })
        context.$http.get('room').then(response => {
            context.$vs.loading.close()
            commit('SET_ROOMS', response.data.rooms)
        })
    },
    CREATE_ROOM({commit}, context){
        context.$vs.loading({color: 'rgb(228, 222, 37)' })
        let formData = new FormData()
        formData.append('title', context.dataName)
        formData.append('img', context.dataImg)
        context.$http.post('room', formData).then(response => {
            context.$vs.loading.close()
            commit('SET_ROOM', response.data.room)
        })
    },
    UPDATE_ROOM({commit}, context){
        context.$vs.loading({color: 'rgb(228, 222, 37)' })
        let formData = new FormData()
        formData.append('title', context.dataName)
        formData.append('img', context.dataImg)
        context.$http.post(`room/${context.data.id}`, formData).then(response => {
            context.$vs.loading.close()
            commit('UPDATE_ROOM', response.data.room)
        })
    },
    DELETE_ROOM({commit}, context){
        context.$vs.loading({color: 'rgb(228, 222, 37)' })
        context.$http.delete(`room/${context.deletedId}`).then(() => {
            context.$vs.loading.close()
            commit('DELETE_ROOM', context.deletedId)
        })
    },
    DELETE_SELECTED_ROOMS({commit}, context){
        context.$vs.loading({color: 'rgb(228, 222, 37)' })
        const obj = {selectedId: context.selectedId}
        context.$http.patch(`room/delete_selected`, obj).then(() => {
            context.$vs.loading.close()
            commit('DELETE_SELECTED_ROOMS', context.selectedId)
        })
    }
}