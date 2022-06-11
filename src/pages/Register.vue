<template>
  <div class="container">
    <div class="col-lg-4 col-md-6 col-sm-8 col-12 ml-auto mr-auto">
      <form @submit.prevent="register">
        <card class="card-register">
          <template slot="header">
            <img src="img/company_logo.png" class="card-img" alt=""/>
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
            <base-input
                name="name"
                v-model="model.name"
                :placeholder="$t('property.name')"
                addon-left-icon="fas fa-user"
                :error="apiValidationErrors.name ? apiValidationErrors.name[0] : ''"
            >
            </base-input>
            <base-input
                name="password"
                v-model="model.password"
                type="password"
                :placeholder="$t('property.password')"
                addon-left-icon="fas fa-lock"
                :error="apiValidationErrors.password ? apiValidationErrors.password[0] : ''"
            >
            </base-input>
            <base-input
                name="Password Confirmation"
                v-model="model.password_confirmation"
                type="password"
                :placeholder="$t('property.confirmPassword')"
                addon-left-icon="fas fa-lock"
                :error="apiValidationErrors.password_confirmation ? apiValidationErrors.password_confirmation[0] : ''"
            >
            </base-input>
            <base-input
                name="Phone Number"
                v-model="model.phone_number"
                :placeholder="$t('property.phoneNumber')"
                addon-left-icon="fas fa-phone"
                :error="apiValidationErrors.phone_number ? apiValidationErrors.phone_number[0] : ''"
            >
            </base-input>
            <base-input
                name="Business Name"
                v-model="model.business_name"
                :placeholder="$t('property.businessName')"
                addon-left-icon="fas fa-building"
                :error="apiValidationErrors.business_name ? apiValidationErrors.business_name[0] : ''"
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
              {{$t('route.register')}}
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
        password: "",
        password_confirmation: "",
        name: "",
        business_name: "",
        phone_number: "",
      }
    };
  },
  methods: {
    async register() {
      const payload = {
        email: this.model.email,
        password: this.model.password,
        password_confirmation: this.model.password_confirmation,
        name: this.model.name,
        business_name: this.model.business_name,
        phone_number: this.model.phone_number,
      };
      let loader = this.$loading.show();
      try {
        await this.$store.dispatch("auth/register", payload).then(() => {
            this.$swal.fire({
                title: this.$t('alert.registerSuccessfully'),
                text: this.$t('alert.registerSuccessfullyText'),
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
.card-register .card-title {
    color: #1d8cf8 !important;
    font-weight: 900 !important;
}
</style>
