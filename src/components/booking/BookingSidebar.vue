<template>
  <vs-sidebar
    click-not-close
    position-right
    parent="body"
    default-index="1"
    color="primary"
    class="add-new-data-sidebar items-no-padding"
    spacer
    v-model="isSidebarActiveLocal"
  >
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>{{ Object.entries(this.data).length === 0 ? "Бронирование" : "Изменение бронирования" }}</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component
      :is="scrollbarTag"
      class="scroll-area--data-list-add-new"
      :settings="settings"
      :key="$vs.rtl"
    >
      <div class="p-6">
         <flat-pickr class="w-full mb-5" :config="configdateTimePicker" v-model="startDate" placeholder="Выберите начало бронирования" />

         <flat-pickr class="w-full" :config="configdateTimePicker" v-model="endDate" placeholder="Выберите конец бронирования" />

         <vs-textarea  class="mt-5 w-full" label="Описание" v-model="description" />

         <vx-input-group class="mb-base">
            <vs-input placeholder="Участника" v-model="partner" />
            <template slot="prepend">
                <div class="prepend-text btn-addon">
                <vs-button @click="addPartner" color="primary">Добавить</vs-button>
                </div>
            </template>
        </vx-input-group>

        <vs-list v-if="partners.length > 0">
            <vs-list-header title="Учасники" color="danger"></vs-list-header>

            <vs-list-item v-for="(p,index) in partners" :key="index" :title="p.name ? p.name:p">
                <template slot="avatar">
                <vs-avatar />
                </template>
                <trash-2-icon @click="removePartner(index)" size="1.5x" class="custom-class coursor-pointer"/>
            </vs-list-item>
        </vs-list>
      </div>
      <div class="flex flex-wrap items-center p-6">
        <vs-button class="mr-6" @click="submitData">Сохранить</vs-button>
        <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Отменить</vs-button>
      </div>
    </component>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { Trash2Icon } from 'vue-feather-icons'
export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      default: () => {},
    },
    roomId:{
      required: true
    }
  },
  components: {
    VuePerfectScrollbar,
    flatPickr,
    Trash2Icon
  },
  data() {
    return {
    dataId: null,
    description: "",
    settings: {
    // perfectscrollbar settings
    maxScrollbarLength: 60,
    wheelSpeed: 0.6,
    },
    partner:null,
    partners:[],
    endDate:null,
    startDate:null,
    configdateTimePicker: {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        altInputClass: "w-full flatpickr-input",
        time_24hr: true
    }

    };
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebar");
        }
      },
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    },
  },
  methods: {
    initValues() {
      if (this.data.id) return;
      this.dataId = null;
      this.description = "";
    },
    submitData() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          if (this.data !== null && this.data.id >= 0) {
            this.$store
              .dispatch("booking/UPDATE_RESERVATION", this)
              .catch((err) => {
                console.error(err);
              });
          } else {
            this.$store
              .dispatch("booking/CREATE_RESERVATION", this)
              .catch((err) => {
                console.error(err);
              });
          }
          this.initValues();
        }
      });
    },

    addPartner(){
        if(this.partner && !this.partners.includes(this.partner)){
            this.partners.push(this.partner)
            this.partner = null
        }
    },

    removePartner(index){
        this.partners.splice(index,1)
    }
  },

  watch: {
    isSidebarActive(val) {
      if (!val) return;
      
      if (Object.entries(this.data).length === 0) {
        this.initValues();
        this.$validator.reset();
      } else {
        const { id, start_date, end_date, description, partners } = this.data;
        this.dataId = id;
        this.startDate = start_date;
        this.endDate = end_date;
        this.description = description;
        this.partners = partners;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
  // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
  height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

  &:not(.ps) {
    overflow-y: auto;
  }
}
</style>
