<template>
  <!-- <el-tooltip :content="$t('sidebar.toggleSidebar')" :open-delay="300" placement="bottom"> -->
    <button
      class="minimize-sidebar btn btn-link btn-just-icon"
      @click="minimizeSidebar"
      rel="tooltip"
      data-original-title="Sidebar toggle"
      data-placement="right"
    >
      <i class="fas fa-align-justify visible-on-sidebar-regular"></i>
      <i class="fas fa-list-ul visible-on-sidebar-mini"></i>
    </button>
  <!-- </el-tooltip> -->
</template>
<script>
export default {
  name: "sidebar-toggle-button",
  methods: {
    minimizeSidebar() {
      // let isMinimizedText = this.$sidebar.isMinimized
      //   ? "deactivated"
      //   : "activated";
      // this.$notify({
      //   type: "success",
      //   message: `Sidebar mini ${isMinimizedText}...`,
      //   icon: "tim-icons icon-bell-55"
      // });
      this.$sidebar.toggleMinimize();
    }
  }
};
</script>
<style></style>
