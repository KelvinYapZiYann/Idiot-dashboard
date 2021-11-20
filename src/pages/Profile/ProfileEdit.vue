<template>
    <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
        <profile-input-fields
            :resource="resource"
            :tmpApiValidationErrors="apiValidationErrors"
            :detailOrEdit="detailOrEdit"
            @submit="handleSubmit"
            @cancel="handleCancel"
            >
        </profile-input-fields>
    </div>
</template>
<script>
import ProfileInputFields from "@/components/Profile/ProfileInputFields.vue";
import router from "@/router";

export default {
  components: {
    ProfileInputFields,
  },
  data() {
    return {
      resource: {
        model: {},
        selector: {}
      },
      detailOrEdit: "Edit",
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
        await this.$store.dispatch('users/get').then(() => {
          this.resource.model = Object.assign({}, this.$store.getters["users/model"]);
          this.resource.selector = Object.assign({}, this.$store.getters["users/selector"]);
        });
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
          await this.$store.dispatch('users/update', {'model': model}).then(() => {
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