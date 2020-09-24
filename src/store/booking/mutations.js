export default {
  SET_RESERVATIONS(state, reservations){
      state.reservations = reservations
  },
  SET_RESERVATION(state, reservation){
      state.reservations.push(reservation)
  },
  UPDATE_RESERVATION(state, reservation){
      const index = state.reservations.findIndex(el => el.id === reservation.id)
      state.reservations.splice(index, 1, reservation)
  },
  DELETE_RESERVATION(state, reservationId){
      const index = state.reservations.findIndex(el => el.id === reservationId)
      state.reservations.splice(index, 1)
  },
}