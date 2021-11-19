<template>
    <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
        <store-input-fields
            :resource="resource"
            :tmpApiValidationErrors="apiValidationErrors"
            :addOrEdit="addOrEdit"
            @submit="handleSubmit"
            @cancel="handleCancel"
            >
        </store-input-fields>
    </div>
</template>
<script>
import StoreInputFields from "@/components/Resources/Store/StoreInputFields.vue";
import router from "@/router";

export default {
  components: {
    StoreInputFields,
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
        await this.$store.dispatch('store/getById', this.$route.params.storeId).then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["store/model"][0]);
          this.resource.data = Object.assign({}, this.$store.getters["store/data"]);
          this.resource.selector = Object.assign({}, this.$store.getters["store/selector"]);
        })
      } catch (e) {
          this.$swal.fire({
              title: this.$t('alert.failedToBeInitialized'),
              text: this.$t('alert.redirectingToPreviousPage'),
          }).then(() => {
                // if (this.previousRoute) {
                //     router.push({
                //         name: this.previousRoute, 
                //         params: {
                //             previousRouteParam: this.previousRouteParam
                //         }
                //     });
                // } else {
                //     router.go(-1);
                // }
          });
        console.error(e);
      } finally {
        loader.hide();
      }
    },
    async handleSubmit(model) {
      let loader = this.$loading.show();
        try {
          await this.$store.dispatch('store/add', {'model': model}).then(() => {
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