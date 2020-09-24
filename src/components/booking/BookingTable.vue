<template>
  <div id="data-list-list-view" class="data-list-container">

    <data-view-sidebar :room-id="roomId" :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />

    <vs-table ref="table" pagination :max-items="itemsPerPage" :data="reservations">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">

          <!-- ACTION - DROPDOWN -->
          <vs-dropdown vs-trigger-click class="dd-actions cursor-pointer mr-4 mb-4">

            <div class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32 w-full">
              <span class="mr-2">Сортировка</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <!-- <feather-icon icon="TrashIcon" svgClasses="h-4 w-4" class="mr-2" /> -->
                  <span @click="showAll">Показать все</span>
                </span>
              </vs-dropdown-item>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <!-- <feather-icon icon="TrashIcon" svgClasses="h-4 w-4" class="mr-2" /> -->
                  <span @click="sortReservations('myself')">Показать мои</span>
                </span>
              </vs-dropdown-item>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <!-- <feather-icon icon="TrashIcon" svgClasses="h-4 w-4" class="mr-2" /> -->
                  <span @click="sortReservations('today')">Сегоднящние</span>
                </span>
              </vs-dropdown-item>

            </vs-dropdown-menu>

          </vs-dropdown>

          <!-- ADD NEW -->
          <div class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Забронировать</span>
          </div>
        </div>
      </div>

      <template slot="thead">
        <vs-th sort-key="name">Номер</vs-th>
        <vs-th>Начало</vs-th>
        <vs-th sort-key="ROOM">Конец</vs-th>
        <vs-th>Участники</vs-th>
        <vs-th>Действие</vs-th>
      </template>

        <template slot-scope="{data}">
          <tbody>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

              <vs-td>
                <p class="product-name font-medium truncate">{{ indextr + 1 }}</p>
              </vs-td>

              <vs-td>
                <p class="product-category">{{ tr.start_date|datetime }}</p>
              </vs-td>

              <vs-td>
                <p class="product-category">{{ tr.end_date|datetime }}</p>
              </vs-td>

              <vs-td>
                <feather-icon icon="EyeIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click="showPartners(tr.partners)" />
              </vs-td>

              <vs-td class="whitespace-no-wrap">
               <div v-if="$canChange(tr.user_id)">
                  <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr)" />
                  <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="openConfirm(tr.id)" />
               </div>
              </vs-td>

            </vs-tr>
          </tbody>
        </template>
    </vs-table>
    <vs-popup title="Участники" :active.sync="showPartnersPopup" >
        <vs-list v-if="partnersData.length > 0">
            <vs-list-item v-for="(p,index) in partnersData" :key="index" :title="p.name">
                <template slot="avatar">
                <vs-avatar />
                </template>
            </vs-list-item>
        </vs-list>
        <div v-else>
          <p class="product-category">Участники не добавлены!</p>
        </div>
    </vs-popup>
  </div>
</template>

<script>
import DataViewSidebar from './BookingSidebar'
import { mapGetters } from 'vuex'

export default {
  props:['roomId'],

  components: {
    DataViewSidebar,
    'show-partners': import("../partners/ShowPartners"),
  },
  data () {
    return {
      selected: [],
      selectedId:[],
      itemsPerPage: 4,
      isMounted: false,

      showPartnersPopup:false,
      partnersData: [],
      addNewDataSidebar: false,
      sidebarData: {},
      deletedId:null,
      query:""
    }
  },
  computed: {
    currentPage () {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },
    ...mapGetters({
      reservations: 'booking/getReservations'
    })
  },
  methods: {
    openConfirm(id) {
      this.deletedId = id
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Подтвердите завершения`,
        text: 'Безвозвратное завершение.',
        accept: this.deleteData,
        acceptText: "Подтвердить",
        cancelText: "Отменить"
      })
    },
    addNewData () {
      this.sidebarData = {}
      this.toggleDataSidebar(true)
    },
    deleteData () {
      this.$store.dispatch('booking/DELETE_RESERVATION', this);
    },
    editData (data) {
      this.sidebarData = data      
      this.toggleDataSidebar(true)
    },
    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    },
    deleteSelected() {
      
    },
    showPartners(partners){
      this.partnersData = partners
      this.showPartnersPopup = true
    },
    sortReservations(query){
      this.query = query
      this.$store.dispatch('booking/SORT_BY', this);
    },
    showAll(){
      this.$store.dispatch('booking/GET_RESERVATIONS', this);
    }
  },

  mounted () {
    this.isMounted = true 
    this.$store.dispatch('booking/GET_RESERVATIONS', this);
  }
}
</script>

<style lang="scss">
#data-list-list-view {
  .img-container{
    width: 100px;
    height: 80px;
}
  .product-img{
    width: 100%;
    height: 100%;
  }
  .vs-con-table {

    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search{
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          &+i {
            left: 1rem;
          }

          &:focus+i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr{
          box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
          td{
            padding: 20px;
            &:first-child{
              border-top-left-radius: .5rem;
              border-bottom-left-radius: .5rem;
            }
            &:last-child{
              border-top-right-radius: .5rem;
              border-bottom-right-radius: .5rem;
            }
          }
          td.td-check{
            padding: 20px !important;
          }
      }
    }

    .vs-table--thead{
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text{
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check{
        padding: 0 15px !important;
      }
      tr{
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
