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
              icon: 'fas fa-map-marker',
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

          <sidebar-link
            :link="{
              name: $t('route.userProfile'),
              icon: 'fas fa-user',
              path: '/profile'
            }"
          >
          </sidebar-link>

        
          <!-- <sidebar-link
            :link="{ name: $t('sidebar.assets'), path: '/assets', icon: 'fas fa-home'}"
          ></sidebar-link>
        
          <sidebar-link
            :link="{ name: $t('sidebar.tenants'), path: '/tenants', icon: 'fas fa-child'}"
          ></sidebar-link>
        
          <sidebar-link
            :link="{ name: $t('sidebar.tenureContracts'), path: '/tenure-contracts', icon: 'fas fa-file'}"
          ></sidebar-link>
          <sidebar-link
            :link="{ name: $t('sidebar.billingRecords'), path: '/billing-records', icon: 'fas fa-credit-card'}"
          ></sidebar-link>
        
          <sidebar-link
            :link="{ name: $t('sidebar.billingPayments'), path: '/billing-payments', icon: 'fas fa-history'}"
          ></sidebar-link>
        
          <sidebar-link
            :link="{ name: $t('sidebar.paymentRecords'), path: '/payment-records', icon: 'fas fa-dollar-sign'}"
          ></sidebar-link>
        
          <sidebar-link
            :link="{ name: $t('sidebar.assetExpenses'), path: '/asset-expenses', icon: 'fas fa-newspaper'}"
          ></sidebar-link>
        
          <sidebar-link
            :link="{ name: $t('sidebar.userProfile'), path: '/profile', icon: 'tim-icons icon-single-02'}"
          ></sidebar-link> -->
        
        <!-- <sidebar-link
          :link="{ name: $t('sidebar.settings'), path: '/settings', icon: 'fas fa-cog'}"
        ></sidebar-link> -->
        <!-- <sidebar-link
          :link="{
            name: $t('sidebar.more'),
            icon: 'tim-icons icon-bullet-list-67',
            path: '/profile',
          }"
        >
          <sidebar-link
            :link="{
              name: $t('sidebar.todoList'),
              path: '/todo-list'
            }"
          ></sidebar-link>
          <sidebar-link
            :link="{
              name: $t('topbar.changeRole'),
              path: '/select-role'
            }"
          ></sidebar-link>
          <sidebar-link
            :link="{
              name: $t('roadmap.title'),
              path: '/roadmap'
            }"
          ></sidebar-link> -->
          <!-- <sidebar-link
            :link="{
              name: $t('tutorial.title'),
              path: '/tutorial'
            }"
          > 
          </sidebar-link> -->
          <!-- <li>
            <a href="https://propster.io/tutorial" target="_blank" class="nav-link ">
              <span class="sidebar-mini-icon">R</span>
              <span class="sidebar-normal">{{$t('tutorial.title')}}</span>
            </a>
          </li> -->
        <!-- </sidebar-link> -->
        <!-- <li class="align-bottom">
          <a href="javascript:void(0)" class="nav-link " @click="logout">
            <i class="fas fa-sign-out-alt"></i>
            <p>{{$t('topbar.logout')}}</p>
          </a>
        </li> -->
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
// import SidebarFixedToggleButton from "./SidebarFixedToggleButton.vue";
// import swal from "sweetalert2";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    SideBar,
    SidebarLink,
    // SidebarFixedToggleButton
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
  }
};
</script>
