<template>
    <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
        <profile-input-fields
            :resource="resource"
            :tmpApiValidationErrors="apiValidationErrors"
            :detailOrEdit="detailOrEdit"
            >
        </profile-input-fields>
        <base-button slot="footer" type="primary" @click="handleEdit()" fill>
            <i class="fas fa-edit mr-1"></i>
            {{$t('component.edit')}}
        </base-button>
    </div>
</template>
<script>
import { BaseButton } from "@/components";
import ProfileInputFields from "@/components/Profile/ProfileInputFields.vue";
import router from "@/router";

export default {
  components: {
    BaseButton,
    ProfileInputFields,
  },
  data() {
    return {
      resource: {
        model: {},
        selector: {}
      },
      detailOrEdit: "Detail",
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
        console.error(e);
      } finally {
        loader.hide();
      }
    },
    async handleEdit() {
      router.push({
        name: "Edit Profile",
        params: {
          previousRoute: router.currentRoute.name,
        }
      });
    },
  }
}
</script>
<style>
</style>