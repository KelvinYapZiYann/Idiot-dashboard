<template>
  <div class="wrapper">
    <side-bar :background-color="backgroundColor">
      <template slot="links">
        
          <sidebar-link
            :link="{
              name: $t('route.dashboard'),
              icon: 'fas fa-home',
              path: '/dashboard'
            }"
          >
          </sidebar-link>

          <sidebar-link
            :link="{
              name: $t('component.stores'),
              icon: 'fas fa-map-marker-alt',
              path: '/stores'
            }"
          >
          </sidebar-link>

          <sidebar-link
            :link="{
              name: $t('component.inStoreTraffics'),
              icon: 'fas fa-camera',
              path: '/inStoreTraffics'
            }"
          >
          </sidebar-link>

          <li class="">
            <a href="javascript:void(0)" class="nav-link" @click="logout">
                <i class="fas fa-sign-out-alt"></i><p>{{$t('route.logout')}}</p>
            </a>
          </li>

          <!-- <sidebar-link
            :link="{
              name: $t('route.userProfile'),
              icon: 'fas fa-user',
              path: '/profile'
            }"
          >
          </sidebar-link> -->

      </template>
    </side-bar>

    <div class="main-panel" :data="backgroundColor">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"></dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./DashboardContent.vue";
import SideBar from "@/components/SidebarPlugin/SideBar.vue";
import SidebarLink from "@/components/SidebarPlugin/SidebarLink.vue";
import router from "@/router";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    SideBar,
    SidebarLink
  },
  data() {
    return {
      backgroundColor: "primary"
    };
  },
  computed: {
    isRTL() {
      return this.$rtl.isRTL;
    }
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    logout() {
      this.$swal.fire({
        title: this.$t('route.logout'),
        text: this.$t('alert.logoutConfirmation'),
        showCancelButton: true,
        confirmButtonText: this.$t('route.logout'),
        cancelButtonText: this.$t('component.cancel'),
        icon: "warning",
      }).then((result) => {
        if (result.value) {
          try {
            this.$store.dispatch("auth/logout").then(() => {
              router.push({ name: "Login" });
            });
          } catch (err) {
            console.error(err);
          }
        }
      });
    },
  }
};
</script>
