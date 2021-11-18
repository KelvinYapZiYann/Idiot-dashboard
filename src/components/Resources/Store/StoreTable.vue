<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h3 slot="header" class="card-title">{{$t('component.stores')}}</h3>
        <div class="text-right">
          <base-button
            @click="addModel"
            type="primary"      
          >
            {{$t('component.add')}} {{$t('component.store')}}
          </base-button>
        </div>
        <!-- <div class="row">
          <div class="col-xl-4 col-lg-5 col-md-6 ml-auto">
            <base-input 
                    addonLeftIcon="el-icon-search"
                    :placeholder="$t('component.search')"
                    v-model="searchQuery">
            </base-input>
          </div>
        </div> -->
        <div class="table-responsive">
          <base-table
            :data="resource.models"
            :columns="table.columns"
            thead-classes="text-primary"
            v-on:show-details="showDetails"
            v-on:edit-details="editDetails"
            v-on:delete-details="deleteDetails"
            :startIndex="resource.data.from"
          >
            <!-- <template slot-scope="{ row }">
              <td
                @click="showDetails(row.id)"
                @mousedown="startLongClick(row.id)" 
                @mouseleave="stopLongClick"
                @mouseup="stopLongClick"
                @touchstart="startLongClick(row.id)"
                @touchend="stopLongClick"
                @touchcancel="stopLongClick"
              >
                {{ row.asset_nickname }}
              </td>
              <td
                v-if="!$store.getters['mobileLayout/isMobileLayout']"
                @click="showDetails(row.id)"
                @mousedown="startLongClick(row.id)" 
                @mouseleave="stopLongClick"
                @mouseup="stopLongClick"
                @touchstart="startLongClick(row.id)"
                @touchend="stopLongClick"
                @touchcancel="stopLongClick"
              >
                {{ row.location_details ? row.location_details.asset_unit_no : '' }}
              </td>
              <td
                v-if="!$store.getters['mobileLayout/isMobileLayout']"
                @click="showDetails(row.id)"
                @mousedown="startLongClick(row.id)" 
                @mouseleave="stopLongClick"
                @mouseup="stopLongClick"
                @touchstart="startLongClick(row.id)"
                @touchend="stopLongClick"
                @touchcancel="stopLongClick"
              >
                {{ row.location_details ? row.location_details.asset_address_line : '' }}
              </td>
              <td
                v-if="!$store.getters['mobileLayout/isMobileLayout']"
                @click="showDetails(row.id)"
                @mousedown="startLongClick(row.id)" 
                @mouseleave="stopLongClick"
                @mouseup="stopLongClick"
                @touchstart="startLongClick(row.id)"
                @touchend="stopLongClick"
                @touchcancel="stopLongClick"
              >
                {{ row.location_details ? row.location_details.asset_city : '' }}
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
                <base-room-indicator :value="row.number_of_rooms"></base-room-indicator>
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
                <base-tenant-indicator :value="row.number_of_tenants"></base-tenant-indicator>
              </td> 
            </template> -->
          </base-table>
          <div
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
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { BaseButton, BasePagination, BaseTable, Card } from "@/components/index";
// import router from "@/router";
// import swal from "sweetalert2";
// import errorHandlingService from "@/store/services/error-handling-service";

export default {
  components: {
    // BaseInput,
    BaseButton,
    BasePagination,
    BaseTable,
    Card,
  },
  data() {
    return {
      table: {
        columns: {
          name: this.$t('property.name'),
          address: this.$t('property.address'),
          inStoreTraffics: this.$t('component.inStoreTraffics'),
          enter: this.$t('property.enter'),
          exit: this.$t('property.exit'),
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
        console.log(id);
    //   console.log(router.currentRoute);
    //   router.push({
    //     name: router.currentRoute.matched[0].path == "/m" ? "Mobile Asset Detail" : "Asset Detail",
    //     params: {
    //       assetId: id,
    //       previousRoute: this.$router.currentRoute.name,
    //       previousRouteParam: {
    //         name: 'asset',
    //         pageId: this.paginationPage
    //       },
    //     }
    //   });
    },
    editDetails(id) {
        console.log(id);
    //   router.push({
    //     name: router.currentRoute.matched[0].path == "/m" ? "Mobile Edit Assets" : "Edit Assets",
    //     params: {
    //       assetId: id,
    //       previousRoute: this.$router.currentRoute.name,
    //       previousRouteParam: {
    //         name: 'asset',
    //         pageId: this.paginationPage
    //       },
    //     }
    //   });
    },
    deleteDetails(id) {
        console.log(id);
    //   swal.fire({
    //     title: this.$t('alert.notDeletable'),
    //     text: this.$t('alert.notDeletableText'),
    //     buttonsStyling: false,
    //     confirmButtonClass: "btn btn-info btn-fill",
    //     icon: "error",
    //   });
      // if (id == null) {
      //   this.$notify({
      //     message:'Server error del id == null',
      //     icon: 'tim-icons icon-bell-55',
      //     type: 'danger'
      //   });
      // } else {
      //   try {
      //     this.$store.dispatch('asset/remove', id)
      //     this.$notify({
      //       message:'Successfully Deleted',
      //       icon: 'tim-icons icon-bell-55',
      //       type: 'success'
      //     });
      //     this.getResource();
      //   } catch (e) {
      //     this.$notify({
      //       message:'Server error when del',
      //       icon: 'tim-icons icon-bell-55',
      //       type: 'danger'
      //     });
      //   }
      // }
    },
    addModel() {
    //   if (!this.resource.data.canAdd) {
    //     swal.fire({
    //       title: this.$t('alert.assetFailedAdded'),
    //       text: this.$t('alert.basicTierAssetCount'),
    //       buttonsStyling: false,
    //       confirmButtonClass: "btn btn-info btn-fill",
    //       icon: "error",
    //     });
    //     return;
    //   }
    //   router.push({
    //     name: router.currentRoute.matched[0].path == "/m" ? "Mobile Add Assets" : "Add Assets",
    //     params: {
    //       previousRoute: this.$router.currentRoute.name,
    //       previousRouteParam: {
    //         name: 'asset',
    //         pageId: this.paginationPage
    //       },
    //     }
    //   });
    },
    getResource() {
      this.$emit('getResource');
    },
    async handlePagination(pageId) {
        console.log(pageId);
    //   this.paginationPage = pageId;
    //   let loader = this.$loading.show({
    //     canCancel: false,
    //     color: '#1d8cf8',
    //     loader: 'spinner',
    //   });
    //   try {
    //     if (this.$props.query) {
    //       if (this.$props.query.tenantId) {
    //         var param = {
    //           id: this.$props.query.tenantId,
    //           pageId: pageId
    //         }
    //         await this.$store.dispatch('tenant/getAssets', param).then(() => {
    //           this.resource.models = this.$store.getters["tenant/assetModels"];
    //           this.resource.data = Object.assign({}, this.$store.getters["tenant/assetData"]);
    //           // let models = this.$store.getters["tenant/assetModels"];
    //           // for (let i = 0; i < models.length; i++) {
    //           //   this.getAssetTenantsFromTenant(models, i, models[i].id);
    //           // }
    //         });
    //       } else {
    //         await this.$store.dispatch('asset/get', pageId).then(() => {
    //           this.resource.models = this.$store.getters["asset/models"];
    //           this.resource.data = Object.assign({}, this.$store.getters["asset/data"]);
    //           // let models = this.$store.getters["asset/models"];
    //           // for (let i = 0; i < models.length; i++) {
    //           //   this.getAssetTenantsFromAsset(models, i, models[i].id);
    //           // }
    //         });
    //       }
    //     } else {
    //       await this.$store.dispatch('asset/get', pageId).then(() => {
    //         this.resource.models = this.$store.getters["asset/models"];
    //         this.resource.data = Object.assign({}, this.$store.getters["asset/data"]);
    //         // let models = this.$store.getters["asset/models"];
    //         // for (let i = 0; i < models.length; i++) {
    //         //   this.getAssetTenantsFromAsset(models, i, models[i].id);
    //         // }
    //       });
    //     }
    //   } catch (e) {
    //     this.$notify({
    //       message: errorHandlingService.displayAlertFromServer(e),
    //       icon: 'tim-icons icon-bell-55',
    //       type: 'danger'
    //     });
    //   } finally {
    //     loader.hide();
    //   }
    },
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
    //           previousRoute: this.$router.currentRoute.name,
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
