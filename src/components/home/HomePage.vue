<template>
	<div>
		<div v-if="rooms.length > 0" class="vx-row">
            <div v-for="(room, index) in rooms" :key="index" class="vx-col w-full sm:w-1/2 lg:w-1/4 mb-base mr-2">
                <router-link :to="`rooms/${room.id}`">
                    <vx-card class="room-container">
                        <div slot="no-body" style="height:100x">
                            <img style="height:100%" :src="$apiUrl + room.img" alt="content-img" class="responsive card-img-top">
                        </div>
                        <h5 class="mb-1 pl-1">{{ room.title }}</h5>
                        <!-- <p class="text-grey pl-1 pt-1">{{ room.description }}</p> -->
                    </vx-card>
                </router-link>
            </div>            
        </div>
	</div>
</template>



<script>
import {mapGetters} from 'vuex'
export default {
	data(){
		return{
		}
	},

	computed:{
		...mapGetters({
			rooms: 'room/getRooms'
		})
	},

	methods:{
		goTo(path){
			this.$router.push(path)
		}
	},

	mounted(){
		this.$store.dispatch('room/GET_ROOM', this).catch(err => { console.error(err) })
	}
}
</script>