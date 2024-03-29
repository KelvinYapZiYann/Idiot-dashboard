<template>
  <div
    class="form-group"
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
        <input
          v-if="!multiline"
          :value="value"
          v-bind="$attrs"
          v-on="listeners"
          :checked="checked"
          class="form-control"
          aria-describedby="addon-right addon-left"
        />
        <textarea
          v-if="multiline"
          :value="value"
          v-bind="$attrs"
          v-on="listeners"
          class="form-control"
          aria-describedby="addon-right addon-left"
        >

        </textarea>
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
  name: "base-input",
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
    multiline: {
      type: Boolean,
      description: "Textarea"
    },
    checked: {
      type: Boolean,
      description: "Input checkbox value"
    }
  },
  model: {
    prop: "value",
    event: "input"
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
    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
        blur: this.onBlur,
        focus: this.onFocus
      };
    }
  },
  methods: {
    onInput(evt) {
      if (!this.touched) {
        this.touched = true;
      }
      if (evt.target.type == 'checkbox') {
        this.$emit("input", evt.target.checked);
      } else {
        this.$emit("input", evt.target.value);
      }
    },
    onFocus(evt) {
      this.focused = true;
      this.$emit("focus", evt);
    },
    onBlur(evt) {
      this.focused = false;
      this.$emit("blur", evt);
    }
  }
};
</script>
<style>
.has-danger .el-date-editor .el-input__inner {
  border-color: #ec250d;
  color: #ec250d;
}
.el-input.is-disabled .el-input__inner {
  background-color: #e9ecef;
  border-color: rgba(29, 37, 59, 0.5);
  color: #344675;
  cursor: not-allowed;
}
</style>
