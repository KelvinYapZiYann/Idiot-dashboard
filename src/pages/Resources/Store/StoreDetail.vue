<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <base-detail
     :title="$t('component.store')"
     :model="resource.model"
     :headers="detail.detailHeaders"
     thead-classes="text-primary"
    ></base-detail>

    <in-store-traffic-table
      :resource="inStoreTrafficResource"
      @getResource="getResource"
    ></in-store-traffic-table>

    <base-button slot="footer" type="primary" @click="handleBack()" fill>
      <i class="fas fa-chevron-left mr-1"></i>
      {{$t('component.back')}}
    </base-button>
    <!-- <base-button slot="footer" type="primary" @click="handleEdit()" fill>
      <i class="fas fa-edit mr-1"></i>
      {{$t('component.edit')}} {{$t('component.store')}}
    </base-button> -->
  </div>
</template>
<script>
import { BaseButton, BaseDetail } from "@/components";
import InStoreTrafficTable from "@/components/Resources/InStoreTraffic/InStoreTrafficTable";
import router from "@/router";

export default {
  components: {
    BaseButton,
    BaseDetail,
    InStoreTrafficTable
  },
  data() {
    return {
      storeId: this.$route.params.storeId,
      resource: {
        model: {},
        data: {}
      },
      inStoreTrafficResource: {
        models: [],
        data: {}
      },
      detail: {
        detailHeaders: {
          store_name: this.$t('property.name'),
          store_address: this.$t('property.address'),
        },
      }
    };
  },
  props: {
    previousRoute: {
      type: String,
      required: false,
      default: "",
      description: "Previous Route"
    }
  },
  mounted() {
    this.getResource();
  },
  methods: {
    async getResource() {
      let loader = this.$loading.show();
      try {
        // await this.$store.dispatch('store/getById', this.storeId).then(() => {
        //   this.resource.model = this.$store.getters["store/models"][0];
        //   this.resource.data = this.$store.getters["asset/data"];
        // });
        await this.$store.dispatch('store/getAll').then(() => {
          let tmpModels = this.$store.getters["store/models"];
          tmpModels.forEach((store) => {
            if (store.store_id == this.storeId) {
              this.resource.model = store;
              store.devices.forEach((device) => {
                let obj = device;
                obj.id = device.device_id;
                // this.inStoreTrafficResource.models.push(obj);
                this.$store.dispatch('dashboard/getTotalTraffics', {storeId: store.store_id, deviceId: device.device_id}).then(() => {
                  let model = this.$store.getters["dashboard/models"][0];
                  obj.enter = model.enter;
                  obj.exit = model.exit;
                  this.inStoreTrafficResource.models.push(obj);
                });
              });
            }
          });
          // this.resource.models = this.$store.getters["store/models"];
          // this.resource.data = Object.assign({}, this.$store.getters["store/data"]);
        });
        // let param = {
        //   storeId: this.storeId
        // };
        // await this.$store.dispatch('inStoreTraffic/get', param).then(() => {
        //   this.inStoreTrafficResource.model = this.$store.getters["inStoreTraffic/models"];
        //   this.inStoreTrafficResource.data = this.$store.getters["inStoreTraffic/data"];
        // });
      } catch (e) {
        console.error(e);
      } finally {
        loader.hide();
      }
    },
    async handleBack() {
      if (this.previousRoute) {
        router.push({
          name: this.previousRoute, 
          params: {
            previousRouteParam: this.previousRouteParam
          }
        });
      } else {
        router.go(-1);
      }
    },
    async handleEdit() {
      router.push({
        name: "Edit Store",
        params: {
          storeId: this.storeId,
          previousRoute: router.currentRoute.name,
        }
      });
    },
  }
};
</script>
<style>
</style>
