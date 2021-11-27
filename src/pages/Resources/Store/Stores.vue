<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <store-table
      :resource="resource"
      @getResource="getResource"
    ></store-table>
  </div>
</template>
<script>
import StoreTable from "@/components/Resources/Store/StoreTable";

export default {
  components: {
    StoreTable
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
        // await this.$store.dispatch('store/get', pageId).then(() => {
        //   this.resource.models = this.$store.getters["store/models"]
        //   this.resource.data = Object.assign({}, this.$store.getters["store/data"]);
        // });
        await this.$store.dispatch('store/getAll').then(() => {
          let stores = this.$store.getters["store/models"];
          // console.log(stores[0]);
          for (let i = 0; i < stores.length; i++) {
            for (let j = 0; j < stores[i].devices.length; j++) {
              this.$store.dispatch('dashboard/getTotalTraffics', {storeId: stores[i].store_id, deviceId: stores[i].devices[j].device_id}).then(() => {
                let model = this.$store.getters["dashboard/models"][0];
                stores[i].enter = model.enter;
                stores[i].exit = model.exit;
                if (i+1 == stores.length && j+1 == stores[i].devices.length) {
                  this.resource.models = stores;
                  loader.hide();
                }
              });
            }
            // tmpModels[i].devices.forEach((device) => {
            //   console.log('device id = ' + device.device_id);
            //   this.$store.dispatch('store/getAll').then(() => {
            //     this.$store.dispatch('dashboard/getTotalTraffics', {storeId: tmpModels[i].store_id, deviceId: device.device_id}).then(() => {
            //       let model = this.$store.getters["dashboard/models"][0];
            //       // this.resource.totalTrafficsEnter += model.enter;
            //       // this.resource.totalTrafficsExit += model.exit;
            //       tmpModels
            //     });
            //   });
            // });
          }
          // this.resource.data = Object.assign({}, this.$store.getters["store/data"]);
        });
      } catch (e) {
          console.error(e);
          loader.hide();
      }
    },
  }
};
</script>
<style>
</style>
