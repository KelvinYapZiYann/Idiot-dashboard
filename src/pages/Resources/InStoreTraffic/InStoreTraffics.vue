<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <in-store-traffic-table
      :resource="resource"
      @getResource="getResource"
    ></in-store-traffic-table>
  </div>
</template>
<script>
import InStoreTrafficTable from "@/components/Resources/InStoreTraffic/InStoreTrafficTable";

export default {
  components: {
    InStoreTrafficTable
  },
  data() {
    return {
      resource: {
        models: [],
        data: {}
      }
    };
  },
  props: {
    previousRouteParam: {
      type: Object,
      required: false,
      default: () => {return {}},
      description: "Previous Route Param"
    }
  },
  mounted() {
    this.getResource();
  },
  methods: {
    async getResource() {
      let loader = this.$loading.show();
      try {
        // await this.$store.dispatch('inStoreTraffic/get', pageId).then(() => {
        //   this.resource.models = this.$store.getters["inStoreTraffic/models"]
        //   this.resource.data = Object.assign({}, this.$store.getters["inStoreTraffic/data"]);
        // });
        await this.$store.dispatch('store/getAll').then(() => {
          let tmp = this.$store.getters["store/models"];
          this.resource.models = [];
          tmp.forEach((item) => {
            item.devices.forEach((device) => {
              let obj = device;
              obj.id = device.device_id;
              this.$store.dispatch('dashboard/getTotalTraffics', {storeId: item.store_id, deviceId: device.device_id}).then(() => {
                let model = this.$store.getters["dashboard/models"][0];
                if (model) {
                  obj.enter = model.enter;
                  obj.exit = model.exit;
                }
                this.resource.models.push(obj);
              });
            });
          });
          // this.resource.data = Object.assign({}, this.$store.getters["inStoreTraffic/data"]);
        });
      } catch (e) {
          console.error(e);
      } finally {
        loader.hide();
      }
    },
  }
};
</script>
<style>
</style>
