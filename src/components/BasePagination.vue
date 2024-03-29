<template>
  <ul class="pagination" :class="paginationClass">
    <li
      class="page-item prev-page"
      v-if="showArrows"
      :class="{ disabled: value === 1 }"
    >
      <a class="page-link" aria-label="Previous" @click="firstPage">
        <i class="fas fa-angle-double-left" aria-hidden="true"></i>
      </a>
    </li>
    <li
      class="page-item prev-page"
      v-if="showArrows"
      :class="{ disabled: value === 1 }"
    >
      <a class="page-link" aria-label="Previous" @click="prevPage">
        <i class="fas fa-chevron-left" aria-hidden="true"></i>
      </a>
    </li>
    <li
      class="page-item"
      v-for="item in range(minPage, maxPage)"
      :key="item"
      :class="{ active: value === item }"
    >
      <a class="page-link" @click="changePage(item)">{{ item }}</a>
    </li>
    <li
      v-if="showArrows"
      class="page-item page-pre next-page"
      :class="{ disabled: value === totalPages }"
    >
      <a class="page-link" aria-label="Next" @click="nextPage">
        <i class="fas fa-chevron-right" aria-hidden="true"></i>
      </a>
    </li>
    <li
      v-if="showArrows"
      class="page-item page-pre next-page"
      :class="{ disabled: value === totalPages }"
    >
      <a class="page-link" aria-label="Next" @click="lastPage">
        <i class="fas fa-angle-double-right" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  name: "base-pagination",
  props: {
    type: {
      type: String,
      default: "primary",
      validator: value => {
        return [
          "default",
          "primary",
          "danger",
          "success",
          "warning",
          "info"
        ].includes(value);
      }
    },
    pageCount: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 10
    },
    showArrows: {
      type: Boolean,
      default: true
    },
    total: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 1
    },
    pagesToDisplay: {
      type: Number,
      default: 5
    }
  },
  methods: {
    nextPage() {
      if (this.value < this.totalPages) {
        this.$emit("input", this.value + 1);
      }
    },
    prevPage() {
      if (this.value > 1) {
        this.$emit("input", this.value - 1);
      }
    },
    firstPage() {
      if (this.value > 1) {
        this.$emit("input", 1);
      }
    },
    lastPage() {
      if (this.value < this.totalPages) {
        this.$emit("input", this.totalPages);
      }
    },
    changePage(item) {
      this.$emit("input", item);
    },
    range(min, max) {
      let arr = [];
      for (let i = min; i <= max; i++) {
        arr.push(i);
      }
      return arr;
    }
  },
  computed: {
    paginationClass() {
      return `pagination-${this.type}`;
    },
    totalPages() {
      if (this.pageCount > 0) return this.pageCount;
      if (this.total > 0) {
        return Math.ceil(this.total / this.perPage);
      }
      return 1;
    },
    defaultPagesToDisplay() {
      if (this.totalPages > 0 && this.totalPages < this.pagesToDisplay) {
        return this.totalPages;
      }
      return this.pagesToDisplay;
    },
    minPage() {
      if (this.value >= this.defaultPagesToDisplay) {
        const pagesToAdd = Math.floor(this.defaultPagesToDisplay / 2);
        const newMaxPage = pagesToAdd + this.value;
        if (newMaxPage > this.totalPages) {
          return this.totalPages - this.defaultPagesToDisplay + 1;
        }
        return this.value - pagesToAdd;
      } else {
        return 1;
      }
    },
    maxPage() {
      if (this.value >= this.defaultPagesToDisplay) {
        const pagesToAdd = Math.floor(this.defaultPagesToDisplay / 2);
        const newMaxPage = pagesToAdd + this.value;
        if (newMaxPage < this.totalPages) {
          return newMaxPage;
        } else {
          return this.totalPages;
        }
      } else {
        return this.defaultPagesToDisplay;
      }
    }
  },
  watch: {
    perPage() {
      // this.$emit("input", 1);
    },
    total() {
      // this.$emit("input", 1);
    }
  }
};
</script>
<style></style>
