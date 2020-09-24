<template>
    <div>
        <vs-popup title="Участники" :active.sync="popupActive" >
            <vs-list v-if="partners.length > 0">
                <vs-list-header title="Учасники" color="success"></vs-list-header>

                <vs-list-item v-for="(p,index) in partners" :key="index" :title="p">
                    <template slot="avatar">
                    <vs-avatar />
                    </template>
                </vs-list-item>
            </vs-list>
        </vs-popup>
    </div>
</template>


<script>
export default {
    name:"ShowPartners",
    props:{
        popupActive:{
            required:true,
        },
        partners:{
            required:true
        }
    }
}
</script>