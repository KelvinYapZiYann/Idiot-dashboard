<template>
  <div
      class="form-group base-selector-input"
      :class="{
      'input-group-focus': focused,
      'has-danger': error,
      'has-label': label,
      'has-icon': hasIcon
    }"
  >
  <!-- 'has-success': !error && touched, -->
    <slot name="label">
      <label v-if="label"> {{ label }} {{ required ? "*" : "" }} </label>
    </slot>
    <div class="mb-0" :class="{ 'input-group': hasIcon }">
      <slot name="addonLeft">
        <span v-if="addonLeftIcon" class="input-group-prepend">
          <div class="input-group-text"><i :class="addonLeftIcon"></i></div>
        </span>
      </slot>
      <slot>
        <select 
            class="form-control select-primary"
            v-model="changeValue"
            :disabled="disabled"
        >
          <option
              v-for="option in options"
              class="select-primary"
              :value="option.id"
              :label="option.name"
              :key="option.id"
          >
          <!-- :selected="value === option.id" -->
          </option>
        </select >
      </slot>
      <slot name="addonRight">
        <span v-if="addonRightIcon" class="input-group-append">
          <div class="input-group-text"><i :class="addonRightIcon"></i></div>
        </span>
      </slot>
    </div>

    <slot name="error" v-if="error || $slots.error">
      <label class="error">{{ error }}</label>
    </slot>
    <slot name="helperText"></slot>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  name: "base-multi-selector-input",
  props: {
    required: Boolean,
    label: {
      type: String,
      description: "Input label"
    },
    error: {
      type: String,
      description: "Input error",
      default: ""
    },
    value: {
      type: [String, Number, Boolean],
      description: "Input value"
    },
    addonRightIcon: {
      type: String,
      description: "Input icon on the right"
    },
    addonLeftIcon: {
      type: String,
      description: "Input icon on the left"
    },
    checked: {
      type: Boolean,
      description: "Input checkbox value"
    },
    disabled: {
      type: Boolean,
      description: "Input disabled",
      default: false
    },
    // defaultValue: {
    //   type: [String, Number, Boolean],
    //   description: "Input default value",
    //   default: undefined
    // },
    options: {
      type: Array,
      required: true,
      default: function() {
        return []
      },
      note: 'Options of dropdown. An array of options with id and name',
    },
  },
  model: {
    prop: "value",
    event: "input"
  },
  mounted() {
    // this.setDefaultValue();
  },
  data() {
    return {
      focused: false,
      touched: false
    };
  },
  computed: {
    hasIcon() {
      return this.hasLeftAddon || this.hasRightAddon;
    },
    hasLeftAddon() {
      const { addonLeft } = this.$slots;
      return addonLeft !== undefined || this.addonLeftIcon !== undefined;
    },
    hasRightAddon() {
      const { addonRight } = this.$slots;
      return addonRight !== undefined || this.addonRightIcon !== undefined;
    },
    changeValue: {
        get: function() {
          return this.value;
        },
        set: function(newVal) {
          this.$emit("input", newVal);
        }
    }
  },
  methods: {
    // setDefaultValue() {
    //   if (this.defaultValue) {
    //     // this.changeValue.set(this.defaultValue);
    //     this.$emit("input", this.defaultValue);
    //   }
    // }
  },
  watch: {
    // value: function(newVal, oldVal) { // watch it
    //   this.$emit("input", newVal);
    // }
  },
};
</script>
<style>
.has-danger .el-date-editor {
  border-color: #ec250d;
}
.has-danger .el-date-editor .el-range-input {
  color: #ec250d;
}
.base-selector-input.has-danger::after {
  content: "";
}
.base-selector-input.has-danger .el-input__inner {
  border-color: #ec250d;
}
.select-primary.el-select .el-input.is-disabled .el-input__inner {
  background-color: #e9ecef;
  border-color: rgba(29, 37, 59, 0.5);
  color: #344675;
}
</style>
