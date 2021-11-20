<template>
  <div class="container">
    <div class="col-lg-4 col-md-6 col-sm-8 col-12 ml-auto mr-auto">
      <form @submit.prevent="login">
        <card class="card-login">
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
            <base-input
                name="password"
                v-model="model.password"
                type="password"
                :placeholder="$t('property.password')"
                addon-left-icon="fas fa-lock"
                :error="apiValidationErrors.password ? apiValidationErrors.password[0] : ''"
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
              {{$t('route.login')}}
            </base-button>
            <!-- <div class="pull-left">
              <h6>
                <router-link class="link footer-link" to="/register" v-slot="{ navigate, href }" custom>
                  <a @click="navigate" @keypress.enter="navigate" role="link" :href="href">{{$t('login.createAccount')}}</a>
                </router-link>
              </h6>
            </div>
            <div class="pull-right">
              <h6>
                <router-link class="link footer-link" to="/forgot-password" v-slot="{ navigate, href }" custom>
                  <a @click="navigate" @keypress.enter="navigate" role="link" :href="href">{{$t('login.forgotPassword')}}</a>
                </router-link>
              </h6>
            </div> -->
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
// import axios from "axios";

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
      }
    };
  },
  methods: {
    async login() {
      const payload = {
        email: this.model.email,
        password: this.model.password
      };
      let loader = this.$loading.show();
      try {
        await this.$store.dispatch("auth/login", payload).then(() => {
            router.push({
                name: 'Dashboard'
            });
        });
      } catch (e) {
        console.error(e);
        this.setApiValidation(e.response.data.errors);
      } finally {
        loader.hide();
      }


    //   loader = this.$loading.show();
    //   try {
    //     await this.$store.dispatch("verifyMiddleware");
    //   } catch (e) {
    //     if (e.response.data.message) {
    //       if (e.response.data.message == 'user email not verified.') {
    //         swal.fire({
    //           title: `User email is not verified`,
    //           text: this.$t('register.noVerificationEmail'),
    //           buttonsStyling: false,
    //           showCancelButton: true,
    //           cancelButtonText: "OK",
    //           cancelButtonClass: "btn btn-neutral btn-fill",
    //           confirmButtonClass: "btn btn-info btn-fill",
    //           confirmButtonText: this.$t('register.resendVerificationEmail'),
    //           icon: "info",
    //           preConfirm: () => {
    //             const url = process.env.VUE_APP_API_BASE_URL;
    //             return axios({
    //               url: `${url}/email-not-verified`,
    //               method: 'POST',
    //             }).then((response) => {
    //               if (response.data.message != "email successfully sent") {
    //                 throw new Error("email has not been sent");
    //               }
    //               return "email successfully sent";
    //             }).catch((error) => {
    //               swal.showValidationMessage(
    //                 `Request failed: Something went wrong. Verification email has not been resent.`
    //               )
    //             });
    //           },
    //         }).then((result) => {
    //           if (!result.dismiss) {
    //             swal.fire({
    //               title: `Verification Email has been resent`
    //             });
    //           }
    //         });
    //         return;
    //       }
    //     }
    //     try {
    //       errorHandlingService.verifyErrorFromServer(e);
    //     } catch(e1) {
    //       this.$notify({
    //         message: errorHandlingService.displayAlertFromServer(e1),
    //         icon: 'tim-icons icon-bell-55',
    //         type: 'danger'
    //       });
    //     }
    //     return;
    //   } finally {
    //     loader.hide();
    //   }
      // try {
      //   await this.$store.dispatch('users/get', {});
      // } catch(e) {
        // this.$notify({
        //   message: errorHandlingService.displayAlertFromServer(e),
        //   icon: 'tim-icons icon-bell-55',
        //   type: 'danger'
        // });
      // }

      
    }
  }
};
</script>
<style>
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 5px;
}
.card-login .card-title {
    color: #1d8cf8 !important;
    font-weight: 900 !important;
}
</style>
