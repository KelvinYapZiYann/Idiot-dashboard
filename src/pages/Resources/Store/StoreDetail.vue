<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto main-content">
    <base-detail
     :title="$t('component.store')"
     :model="resource.model"
     :headers="detail.detailHeaders"
     thead-classes="text-primary"
    ></base-detail>

    <base-button slot="footer" type="primary" @click="handleBack()" fill>
      <i class="fas fa-chevron-left mr-1"></i>
      {{$t('component.back')}}
    </base-button>
    <base-button slot="footer" type="primary" @click="handleEdit()" fill>
      <i class="fas fa-edit mr-1"></i>
      {{$t('component.edit')}} {{$t('component.store')}}
    </base-button>
  </div>
</template>
<script>
import { BaseButton, BaseDetail } from "@/components";
import router from "@/router";

export default {
  components: {
    BaseButton,
    BaseDetail,
  },
  data() {
    return {
      storeId: this.$route.params.storeId,
      resource: {
        model: {},
        data: {}
      },
      detail: {
        detailHeaders: {
          name: this.$t('property.name'),
          address: this.$t('property.address'),
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
        await this.$store.dispatch('store/getById', this.storeId).then(() => {
          this.resource.model = this.$store.getters["store/models"][0];
          this.resource.data = this.$store.getters["asset/data"];
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
