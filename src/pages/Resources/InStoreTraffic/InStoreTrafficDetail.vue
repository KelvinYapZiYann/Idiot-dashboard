<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <base-detail
     :title="$t('component.inStoreTraffic')"
     :model="resource.model"
     :headers="detail.detailHeaders"
     :detailDisplayValue="detail.detailDisplayValue"
     thead-classes="text-primary"
    ></base-detail>

    <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6 col-6">
            <stats-card
                :title="inStoreTrafficResource.enter ? inStoreTrafficResource.enter : '0'"
                :sub-title="$t('property.enter')"
                type="primary"
                icon="fas fa-sign-in-alt"
                >
            </stats-card>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-6">
            <stats-card
                :title="inStoreTrafficResource.exit ? inStoreTrafficResource.exit : '0'"
                :sub-title="$t('property.exit')"
                type="warning"
                icon="fas fa-sign-out-alt"
                >
            </stats-card>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-6">
            <stats-card
                :title="inStoreTrafficResource.return ? inStoreTrafficResource.return : '0'"
                :sub-title="$t('property.return')"
                type="success"
                icon="fas fa-undo-alt"
                >
            </stats-card>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-6">
            <stats-card
                :title="inStoreTrafficResource.passing ? inStoreTrafficResource.passing : '0'"
                :sub-title="$t('property.passing')"
                type="neutral"
                icon="fas fa-times"
                >
            </stats-card>
        </div>
    </div>

    <base-button slot="footer" type="primary" @click="handleBack()" fill>
      <i class="fas fa-chevron-left mr-1"></i>
      {{$t('component.back')}}
    </base-button>
    <!-- <base-button slot="footer" type="primary" @click="handleEdit()" fill>
      <i class="fas fa-edit mr-1"></i>
      {{$t('component.edit')}} {{$t('component.inStoreTraffic')}}
    </base-button> -->
  </div>
</template>
<script>
import { BaseButton, BaseDetail, StatsCard } from "@/components";
import router from "@/router";

export default {
  components: {
    BaseButton,
    BaseDetail,
    StatsCard
  },
  data() {
    return {
      inStoreTrafficId: this.$route.params.inStoreTrafficId,
      resource: {
        model: {},
        data: {}
      },
      inStoreTrafficResource: {
        enter: 0,
        exit: 0,
        return: 0,
        passing: 0
      },
      detail: {
        detailHeaders: {
          device_description: this.$t('property.name'),
          device_mac_address: this.$t('property.macAddress'),
          // status: this.$t('property.status'),
          device_type: this.$t('property.type'),
        },
        detailDisplayValue: {
          device_type: this.$t('inStoreTrafficType')
        }
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
        // await this.$store.dispatch('inStoreTraffic/getById', this.storeId).then(() => {
        //   this.resource.model = this.$store.getters["store/models"][0];
        //   this.resource.data = this.$store.getters["asset/data"];
        // });
        await this.$store.dispatch('store/getAll').then(() => {
          let tmp = this.$store.getters["store/models"];
          tmp.forEach((store) => {
            store.devices.forEach((device) => {
              if (device.device_id == this.inStoreTrafficId) {
                this.resource.model = device;
                let param = {
                  storeId: store.store_id,
                  deviceId: device.device_id,
                };
                this.$store.dispatch('dashboard/getTotalTraffics', param).then(() => {
                  this.inStoreTrafficResource = this.$store.getters["dashboard/models"][0];
                });
              }
            });
          });
          // this.resource.data = this.$store.getters["asset/data"];
        });
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
        name: "Edit In Store Traffic",
        params: {
          inStoreTrafficId: this.inStoreTrafficId,
          previousRoute: router.currentRoute.name,
        }
      });
    },
  }
};
</script>
<style>
</style>
