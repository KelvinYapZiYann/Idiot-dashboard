<template>
    <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
        <in-store-traffic-input-fields
            :resource="resource"
            :tmpApiValidationErrors="apiValidationErrors"
            :addOrEdit="addOrEdit"
            @submit="handleSubmit"
            @cancel="handleCancel"
            >
        </in-store-traffic-input-fields>
    </div>
</template>
<script>
import InStoreTrafficInputFields from "@/components/Resources/InStoreTraffic/InStoreTrafficInputFields.vue";
import router from "@/router";

export default {
  components: {
    InStoreTrafficInputFields,
  },
  data() {
    return {
      resource: {
        model: {},
        data: {},
        selector: {}
      },
      addOrEdit: "Edit",
      apiValidationErrors: {}
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
    this.initResource();
  },
  methods: {
    async initResource() {
      let loader = this.$loading.show();
      try {
        await this.$store.dispatch('inStoreTraffic/getById', this.$route.params.inStoreTrafficId).then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["inStoreTraffic/model"][0]);
          this.resource.data = Object.assign({}, this.$store.getters["inStoreTraffic/data"]);
          this.resource.selector = Object.assign({}, this.$store.getters["inStoreTraffic/selector"]);
        })
      } catch (e) {
          this.$swal.fire({
              title: this.$t('alert.failedToBeInitialized'),
              text: this.$t('alert.redirectingToPreviousPage'),
          }).then(() => {
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
          });
        console.error(e);
      } finally {
        loader.hide();
      }
    },
    async handleSubmit(model) {
      let loader = this.$loading.show();
        try {
          await this.$store.dispatch('inStoreTraffic/add', {'model': model}).then(() => {
            this.resetApiValidation();
            this.$swal.fire({
                title: this.$t('alert.editedSuccessfully'),
                text: this.$t('alert.redirectingToPreviousPage'),
            }).then(() => {
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
            });
          });
        } catch (e) {
          console.error(e);
          this.setApiValidation(e.response.data.errors);
          this.$swal.fire({
            title: this.$t('alert.failedToBeEdited'),
            text: this.$t('alert.tryAgain'),
          });
        } finally {
          loader.hide();
        }
    },
    async handleCancel() {
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
    }
  }
}
</script>
<style>
</style>