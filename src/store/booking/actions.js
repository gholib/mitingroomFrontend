export default{
  GET_RESERVATIONS({commit}, context){
    context.$vs.loading({color: 'rgb(228, 222, 37)' })
      context.$http.get(`reservation/${context.roomId}`).then(response => {
        context.$vs.loading.close()
          commit('SET_RESERVATIONS', response.data.reservations)
      })
  },
  CREATE_RESERVATION({commit}, context){
    context.$vs.loading({color: 'rgb(228, 222, 37)' })
      const formData = {
        room_id: context.roomId,
        start_date: context.startDate,
        end_date: context.endDate,
        description: context.description,
        partners: context.partners
      }
      context.$http.post('reservation', formData).then(response => {
        context.$vs.loading.close()
          commit('SET_RESERVATION', response.data.reservation)
          context.$vs.notify({
            title: 'Ураа...',
            text: 'Успешно зарегистрирован',
            color: "success",
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            position: 'top-center',
          });
          context.$emit("closeSidebar")
      }).catch(err => {
        context.$vs.loading.close()
        if(err.response.status === 422){
          context.$vs.notify({
              title: 'О, нет...',
              text: err.response.data.errors.room_id[0],
              color: "warning",
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              position: 'top-center',
          });
        }
      })
  },
  UPDATE_RESERVATION({commit}, context){
    context.$vs.loading({color: 'rgb(228, 222, 37)' })
      const formData = {
        room_id: context.roomId,
        start_date: context.startDate,
        end_date: context.endDate,
        description: context.description,
        partners: context.partners
      }
      context.$http.post(`reservation/${context.data.id}`, formData).then(response => {
        context.$vs.loading.close()
          commit('UPDATE_RESERVATION', response.data.reservation);
          context.$vs.notify({
            title: 'Ураа...',
            text: 'Успешно обновлен!',
            color: "success",
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            position: 'top-center',
          });
          context.$emit("closeSidebar")
      }).catch(err => {
        context.$vs.loading.close()
        if(err.response.status === 422){
          context.$vs.notify({
              title: 'О, нет...',
              text: err.response.data.errors.room_id[0],
              color: "warning",
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              position: 'top-center',
          });
        }
      })
  },
  DELETE_RESERVATION({commit}, context){
    context.$vs.loading({color: 'rgb(228, 222, 37)' })
      context.$http.delete(`reservation/${context.deletedId}`).then(() => {
        context.$vs.loading.close()
          commit('DELETE_RESERVATION', context.deletedId);
          context.$vs.notify({
            title: 'О, нет...',
            text: 'Успешно завершон',
            color: "success",
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            position: 'top-center',
          });
      })
  },
  SORT_BY({commit}, context){
    context.$vs.loading({color: 'rgb(228, 222, 37)' })
    context.$http.post(`reservation/sort`, {sortKey:context.query}).then((response) => {
      context.$vs.loading.close()
        commit('SET_RESERVATIONS', response.data.reservations);
    })
},
}