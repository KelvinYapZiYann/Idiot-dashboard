<template>
  <div class="room-indicator d-inline-flex" :class="[{
      'justify-content-center': align == 'center',
      'justify-content-start': align == 'left',
      'justify-content-end': align == 'right'
    }]">
    <div v-for="(item, index) in value" :key="index" class="pl-1 pr-1">
        <i class="fas fa-camera" aria-hidden="true"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "in-store-traffic-icon-list",
  props: {
    value: {
      type: Array,
      default: () => {
          return [];
      }
    },
    align: {
      type: String,
      default: "center"
    }
  },
};
</script>
<style>
</style>
