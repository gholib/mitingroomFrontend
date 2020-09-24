export default {
    SET_ROOMS(state, rooms){
        state.rooms = rooms
    },
    SET_ROOM(state, room){
        state.rooms.push(room)
    },
    UPDATE_ROOM(state, room){
        const index = state.rooms.findIndex(el => el.id === room.id)
        state.rooms.splice(index, 1, room)
    },
    DELETE_ROOM(state, roomId){
        const index = state.rooms.findIndex(el => el.id === roomId)
        state.rooms.splice(index, 1)
    },
    DELETE_SELECTED_ROOMS(state, selected){
        selected.forEach(roomId => {
            const index = state.rooms.findIndex(el => el.id === roomId)
            state.rooms.splice(index, 1)
        })
    }
}