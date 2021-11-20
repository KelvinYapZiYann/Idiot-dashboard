<template>
    <div class="wrapper wrapper-full-page">
        <div class="content">
          <router-view></router-view>
        </div>
        <footer class="footer">
          <div class="container-fluid">
            <copyright-ink>
            </copyright-ink>
          </div>
        </footer>
    </div>
</template>
<script>
import CopyrightInk from "@/components/CopyrightInk";
export default {
  components: {
    CopyrightInk
  },
};
</script>
<style></style>
