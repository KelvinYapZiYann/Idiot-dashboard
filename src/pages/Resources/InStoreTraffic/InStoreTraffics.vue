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
    this.getResource(1);
  },
  methods: {
    async getResource(pageId) {
      let loader = this.$loading.show();
      try {
        await this.$store.dispatch('inStoreTraffic/get', pageId).then(() => {
          this.resource.models = this.$store.getters["inStoreTraffic/models"]
          this.resource.data = Object.assign({}, this.$store.getters["inStoreTraffic/data"]);
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
