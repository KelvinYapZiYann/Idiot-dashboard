<template>
  <div class="row">
    <div class="col-12">
      <card :title="$t('component.stores')" :showFooterLine="true">
        <!-- <div class="text-right">
          <base-button
            @click="addModel"
            type="primary"
          >
            {{$t('component.add')}} {{$t('component.store')}}
            <i class="fas fa-map-marker-alt ml-1"></i>
          </base-button>
        </div> -->
        <!-- <div class="row">
          <div class="col-xl-4 col-lg-5 col-md-6 ml-auto">
            <base-input 
                    addonLeftIcon="el-icon-search"
                    :placeholder="$t('component.search')"
                    v-model="searchQuery">
            </base-input>
          </div>
        </div> -->
        <!-- <div class="table-responsive"> -->
          <base-table
            :data="resource.models"
            :columns="table.columns"
            thead-classes="text-primary"
            v-on:show-details="showDetails"
            :disableDelete="true"
            :disableEdit="true"
            :startIndex="1"
          >
            <!-- v-on:edit-details="editDetails"
            v-on:delete-details="deleteDetails" -->
            <!-- :startIndex="resource.data.from" -->



            <template slot-scope="{ row }">
              <td
                @click="showDetails(row.id)"
                @mousedown="startLongClick(row.id)" 
                @mouseleave="stopLongClick"
                @mouseup="stopLongClick"
                @touchstart="startLongClick(row.id)"
                @touchend="stopLongClick"
                @touchcancel="stopLongClick"
              >
                {{ row.store_name ? row.store_name : '-' }}
              </td>
              <td
                @click="showDetails(row.id)"
                @mousedown="startLongClick(row.id)" 
                @mouseleave="stopLongClick"
                @mouseup="stopLongClick"
                @touchstart="startLongClick(row.id)"
                @touchend="stopLongClick"
                @touchcancel="stopLongClick"
              >
                {{ row.store_address ? row.store_address : '-' }}
              </td>
              <td
                @click="showDetails(row.id)"
                @mousedown="startLongClick(row.id)" 
                @mouseleave="stopLongClick"
                @mouseup="stopLongClick"
                @touchstart="startLongClick(row.id)"
                @touchend="stopLongClick"
                @touchcancel="stopLongClick"
              >
                <in-store-traffic-icon-list :value="row.devices"></in-store-traffic-icon-list>
              </td>
              <td
                @click="showDetails(row.id)"
                @mousedown="startLongClick(row.id)" 
                @mouseleave="stopLongClick"
                @mouseup="stopLongClick"
                @touchstart="startLongClick(row.id)"
                @touchend="stopLongClick"
                @touchcancel="stopLongClick"
              >
                {{ row.enter ? row.enter : '0' }}
              </td>
              <td
                @click="showDetails(row.id)"
                @mousedown="startLongClick(row.id)" 
                @mouseleave="stopLongClick"
                @mouseup="stopLongClick"
                @touchstart="startLongClick(row.id)"
                @touchend="stopLongClick"
                @touchcancel="stopLongClick"
              >
                {{ row.passing ? row.passing : '0' }}
              </td>
            </template>
          </base-table>
          <!-- <div
            slot="footer"
            class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
          >
            <div class="">
              <p class="card-category">
                {{$t('component.showing')}} {{ resource.data.from ? resource.data.from : "0" }} {{$t('component.to')}} {{ resource.data.to ? resource.data.to : "0" }} {{$t('component.of')}} {{ resource.data.total ? resource.data.total : "0" }} {{$t('component.entries')}}
              </p>
            </div>
            <base-pagination
              class="pagination-no-border"
              v-model="resource.data.currentPage"
              :per-page="resource.data.perPage"
              :total="resource.data.total"
              @input="handlePagination"
              type="primary"
            >
            </base-pagination>
          </div> -->
        <!-- </div> -->
      </card>
    </div>
  </div>
</template>
<script>
import { /*BaseButton, BasePagination,*/ BaseTable, Card } from "@/components/index";
import InStoreTrafficIconList from "@/components/Resources/InStoreTraffic/InStoreTrafficIconList";

export default {
  components: {
    // BaseInput,
    // BaseButton,
    // BasePagination,
    BaseTable,
    Card,
    InStoreTrafficIconList,
  },
  data() {
    return {
      table: {
        columns: {
          store_name: this.$t('property.name'),
          store_address: this.$t('property.address'),
          inStoreTraffics: this.$t('component.inStoreTraffics'),
          enter: this.$t('date.weekTillDate') + ' ' + this.$t('property.enter'),
          passing: this.$t('date.weekTillDate') + ' ' + this.$t('property.passing'),
        },
      },
    //   searchQuery: "",
    //   searchQueryTimeout: null,
      paginationPage: 1,
      timeout: null
    };
  },
  props: {
    resource: {
      type: Object,
      required: true,
      default: () => {
        return {
          models: [],
          data: {
            canAdd: false,
            currentPage: 1,
            total: 0,
            from: 0,
            to: 0,
            perPage: 10,
            links: []
          }
        }
      },
      description: "Stores Resource"
    },
    // query: {
    //   type: Object,
    //   // default: {},
    // }
  },
  methods: {
    showDetails(id) {
      this.$router.push({
        name: "Store Detail",
        params: {
          storeId: id,
          previousRoute: this.$router.currentRoute.name,
        }
      });
    },
    editDetails(id) {
      this.$router.push({
        name: "Edit Store",
        params: {
          storeId: id,
          previousRoute: this.$router.currentRoute.name,
        }
      });
    },
    deleteDetails(id) {
      this.$swal.fire({
        title: this.$t('component.remove'),
        text: this.$t('alert.removeConfirmation'),
        icon: "warning",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            this.$store.dispatch('store/remove', id).then(() => {
              this.getResource();
            });
          } catch (e) {
            console.error(e);
          }
        }
      });
        
    },
    // addModel() {
    //   if (!this.resource.data.canAdd) {
    //     this.$swal.fire({
    //       title: this.$t('alert.error'),
    //       text: this.$t('component.store') + ' ' + this.$t('alert.cannotBeAdded'),
    //       icon: "error",
    //     });
    //     return;
    //   }
    //   router.push({
    //     name: "Add Store",
    //     params: {
    //       previousRoute: router.currentRoute.name,
    //     }
    //   });
    // },
    getResource() {
      this.$emit('getResource');
      // this.$emit('getResource', this.resource.data.currentPage);
    },
    // async handlePagination(pageId) {
    //   this.$emit('getResource', pageId);
    // },
    longClickEvent(id) {
        console.log(id);
    //   swal.fire({
    //     title: this.$t('alert.editOrRemove'),
    //     text: this.$t('alert.editOrRemoveText') + " " + this.$t('sidebar.asset') + "?",
    //     buttonsStyling: false,
    //     showDenyButton: true,
    //     showCancelButton: true,
    //     confirmButtonText: this.$t('component.edit'),
    //     denyButtonText: this.$t('component.remove'),
    //     cancelButtonText: this.$t('component.cancel'),
    //     cancelButtonClass: "btn btn-info btn-fill",
    //     denyButtonClass: "btn btn-neutral btn-fill",
    //     confirmButtonClass: "btn btn-info btn-fill",
    //     icon: "warning",
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       router.push({
    //         name: router.currentRoute.matched[0].path == "/m" ? "Mobile Edit Assets" : "Edit Assets",
    //         params: {
    //           assetId: id,
    //           previousRoute: router.currentRoute.name,
    //           previousRouteParam: {
    //             name: 'asset',
    //             pageId: this.paginationPage
    //           },
    //         }
    //       });
    //     } else if (result.isDenied) {
    //       swal.fire({
    //         title: this.$t('alert.notDeletable'),
    //         text: this.$t('alert.notDeletableText'),
    //         buttonsStyling: false,
    //         confirmButtonClass: "btn btn-info btn-fill",
    //         icon: "error",
    //       });
    //     }
    //   });
    },
    startLongClick(id) {
        console.log(id);
    //   if (!this.timeout && this.$store.getters["mobileLayout/isMobileLayout"]) {
    //     this.timeout = setTimeout(() => {
    //       this.longClickEvent(id);
    //     }, 2000);
    //   }
    },
    stopLongClick() {
    //   if (this.timeout) {
    //     clearTimeout(this.timeout);
    //     this.timeout = null;
    //   }
    },
  },
  watch: {
    // searchQuery(value) {
    //   if (this.searchQueryTimeout) {
    //     clearTimeout(this.searchQueryTimeout);
    //   }
    //   this.searchQueryTimeout = setTimeout(() => {
    //     console.log('searching query with = ' + value);
    //   }, 2000);
    // }
  }
};
</script>
<style>
</style>
