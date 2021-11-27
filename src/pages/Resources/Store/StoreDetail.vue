<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <base-detail
     :title="$t('component.store')"
     :model="resource.model"
     :headers="detail.detailHeaders"
     thead-classes="text-primary"
    ></base-detail>

    <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6 col-6">
            <stats-card
                :title="trafficResource.enter ? trafficResource.enter : '0'"
                :sub-title="$t('property.enter')"
                type="primary"
                icon="fas fa-sign-in-alt"
                >
            </stats-card>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-6">
            <stats-card
                :title="trafficResource.exit ? trafficResource.exit : '0'"
                :sub-title="$t('property.exit')"
                type="warning"
                icon="fas fa-sign-out-alt"
                >
            </stats-card>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-6">
            <stats-card
                :title="trafficResource.return ? trafficResource.return : '0'"
                :sub-title="$t('property.return')"
                type="success"
                icon="fas fa-undo-alt"
                >
            </stats-card>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-6">
            <stats-card
                :title="trafficResource.passing ? trafficResource.passing : '0'"
                :sub-title="$t('property.passing')"
                type="neutral"
                icon="fas fa-times"
                >
            </stats-card>
        </div>
    </div>

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
import { 
  BaseButton, 
  BaseDetail,
  StatsCard
} from "@/components";
import InStoreTrafficTable from "@/components/Resources/InStoreTraffic/InStoreTrafficTable";
import router from "@/router";

export default {
  components: {
    BaseButton,
    BaseDetail,
    StatsCard,
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
      trafficResource: {
        enter: 0,
        exit: 0,
        return: 0,
        passing: 0
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
        this.inStoreTrafficResource.models = [];
        this.trafficResource.enter = 0;
        this.trafficResource.exit = 0;
        this.trafficResource.return = 0;
        this.trafficResource.passing = 0;
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
                  this.trafficResource.enter += model.enter;
                  this.trafficResource.exit += model.exit;
                  this.trafficResource.return += model.return;
                  this.trafficResource.passing += model.passing;
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
