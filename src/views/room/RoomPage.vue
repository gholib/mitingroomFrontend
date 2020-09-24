<template>
    <div>
        <booking-table :room-id="$route.params.roomId" />
    </div>
</template>


<script>
export default {
    components:{
        'BookingTable': () => import("../../components/booking/BookingTable")
    }
}
</script> 