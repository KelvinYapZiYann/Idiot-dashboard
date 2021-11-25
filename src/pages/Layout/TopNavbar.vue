<template>
  <nav
    class="navbar navbar-expand-lg sticky-top navbar-transparent"
  >
  <!-- navbar-absolute -->
  <!-- :class="{ 'bg-white': showMenu, 'navbar-transparent': !showMenu, 'border-bottom ': showMenu }" -->
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div class="navbar-minimize d-inline"><sidebar-toggle-button /></div>
        <div
          class="navbar-toggle d-inline"
          :class="{ toggled: $sidebar.showSidebar }"
        >
          <button type="button" class="navbar-toggler" @click="toggleSidebar">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <a class="navbar-brand" href="javascript:void(0)">{{$t('company.name')}}</a>
      </div>
      
    </div>
  </nav>
</template>
<script>
// import DropDown from "@/components/Dropdown.vue";
// import Modal from "@/components/Modal.vue";
import SidebarToggleButton from "./SidebarToggleButton.vue";
// import swal from "sweetalert2";
import router from "@/router";

export default {
  components: {
    // DropDown,
    // Modal,
    SidebarToggleButton
  },
  data() {
    return {
      searchModalVisible: false,
      searchQuery: "",
      showMenu: false,
      hasNotification: false,
      messages: [
        {
          id: 1,
          title: "Message 1 email sent",
          link: "https://propster.io/api/dashboard/message/1"
        },
        {
          id: 2,
          title: "Message 2 email sent",
          link: "https://propster.io/api/dashboard/message/2"
        },
        {
          id: 3,
          title: "Message 3 email sent",
          link: "https://propster.io/api/dashboard/message/3"
        },
        {
          id: 4,
          title: "Message 1 email sent",
          link: "https://propster.io/api/dashboard/message/4"
        },
        {
          id: 5,
          title: "Message 1 email sent",
          link: "https://propster.io/api/dashboard/message/5"
        },
      ],
      notifications: [
        {
          id: 1,
          title: "Notification 1 email sent",
          link: "/notifications"
        },
        {
          id: 2,
          title: "Notification 2 email sent",
          link: "/notifications"
        },
        {
          id: 3,
          title: "Notification 3 email sent",
          link: "/notifications"
        },
        {
          id: 4,
          title: "Notification 1 email sent",
          link: "/notifications"
        },
        {
          id: 5,
          title: "Notification 1 email sent",
          link: "/notifications"
        },
      ],
      userFullname: this.$store.getters["users/model"].full_name,
      userGender: this.$store.getters["users/model"].gender,
    };
  },
  mounted() {
    // if (!this.$store.getters["users/model"].full_name) {
    //   this.$store.dispatch('users/get').then(() => {
    //     this.userFullname = this.$store.getters["users/model"].full_name;
    //     this.userGender = this.$store.getters["users/model"].gender;
    //   });
    // }
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    async logout() {
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
          } catch (e) {
            console.error(e);
          }
        }
      });
    },
    async profile() {
      try {
        if (router.currentRoute.path == "/profile") {
          return;
        }
        router.push({name: "Profile Detail"});
      } catch (error) {
        // this.$notify({
        //   type: "danger",
        //   message: "Oops, something went wrong!",
        // });
      }
    },
  },
  computed: {
    // isRTL() {
    //   return this.$rtl.isRTL;
    // }
  }
};
</script>
<style></style>
