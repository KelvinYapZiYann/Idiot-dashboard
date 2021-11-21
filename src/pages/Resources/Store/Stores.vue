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
          this.resource.models = this.$store.getters["store/models"];
          // this.resource.data = Object.assign({}, this.$store.getters["store/data"]);
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
