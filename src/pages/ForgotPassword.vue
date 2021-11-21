<template>
  <div class="container">
    <div class="col-lg-4 col-md-6 col-sm-8 col-12 ml-auto mr-auto">
      <form @submit.prevent="forgotPassword">
        <card class="card-forgot-password">
          <template slot="header">
            <img src="img/main_propster_logo.svg" class="card-img" alt=""/>
            <h1 class="card-title text-center">{{$t('company.name')}}</h1>
          </template>

          <div>
            <base-input
                name="email"
                v-model="model.email"
                :placeholder="$t('property.email')"
                addon-left-icon="fas fa-envelope"
                :error="apiValidationErrors.email ? apiValidationErrors.email[0] : ''"
            >
            </base-input>
          </div>

          <div slot="footer">
            <base-button
                native-type="submit"
                type="primary"
                class="mb-3"
                size="lg"
                block
            >
              {{$t('route.forgotPassword')}}
            </base-button>
            <div class="pull-left">
              <h6>
                <router-link class="link footer-link" to="/login" v-slot="{ navigate, href }" custom>
                  <a @click="navigate" @keypress.enter="navigate" role="link" :href="href">{{$t('route.backToLogin')}}</a>
                </router-link>
              </h6>
            </div>
          </div>
        </card>
      </form>
    </div>
  </div>
</template>
<script>
import { BaseButton, BaseInput, Card } from "@/components/index";
import formMixin from "@/mixins/form-mixin";
import router from "@/router";

export default {
  mixins: [formMixin],
  components: {
    BaseButton,
    BaseInput,
    Card,
  },
  data() {
    return {
      model: {
        email: "",
      }
    };
  },
  methods: {
    async forgotPassword() {
      const payload = {
        email: this.model.email,
      };
      let loader = this.$loading.show();
      try {
        await this.$store.dispatch("auth/forgotPassword", payload).then(() => {
            this.$swal.fire({
                title: this.$t('alert.forgotPasswordSuccessfully'),
                text: this.$t('alert.forgotPasswordSuccessfullyText'),
                icon: "success",
            }).then((result) => {
                this.resetApiValidation();
                if (result.isConfirmed) {
                    router.push({
                        name: 'Login'
                    });
                }
            });
        });
      } catch (e) {
        console.error(e);
        this.setApiValidation(e.response.data.errors);
      } finally {
        loader.hide();
      }
    }
  }
};
</script>
<style>
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 5px;
}
.card-forgot-password .card-title {
    color: #1d8cf8 !important;
    font-weight: 900 !important;
}
</style>
