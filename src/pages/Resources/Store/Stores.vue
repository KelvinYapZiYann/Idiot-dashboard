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
        // await this.$store.dispatch('asset/get', this.previousRouteParam ? (this.previousRouteParam.name ? (this.previousRouteParam.name == 'asset' ? this.previousRouteParam.pageId : {}) : {}) : {}).then(() => {
        //   this.resource.models = this.$store.getters["asset/models"]
        //   this.resource.data = Object.assign({}, this.$store.getters["asset/data"]);

        //   // let models = this.$store.getters["asset/models"];

        //   // for (let i = 0; i < models.length; i++) {
        //   //   this.getAssetTenants(models, i, models[i].id);
        //   // }
        // });
      } catch (e) {
          console.error(e);
        // this.$notify({
        //   message: errorHandlingService.displayAlertFromServer(e),
        //   icon: 'tim-icons icon-bell-55',
        //   type: 'danger'
        // });
      } finally {
        loader.hide();
      }
    },
    // async getAssetTenants(models, id, assetId) {
    //   try {
    //     await this.$store.dispatch('asset/getTenants', assetId).then(() => {
    //       models[id]['tenantCount'] = this.$store.getters["asset/tenantData"].total;
    //       if (models.length - 1 == id) {
    //         this.resource.models = models;
    //         this.resource.data = Object.assign({}, this.$store.getters["asset/data"]);
    //       }
    //     })
    //   } catch (e) {
    //     this.$notify({
    //       message: errorHandlingService.displayAlertFromServer(e),
    //       icon: 'tim-icons icon-bell-55',
    //       type: 'danger'
    //     });
    //   }
    // }
  }
};
</script>
<style>
</style>
