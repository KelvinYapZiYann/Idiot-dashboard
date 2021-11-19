<template>
  <form @submit.prevent>
    <card :title="(addOrEdit == 'Add' ? $t('component.add') : $t('component.edit')) + ' ' + $t('component.store')">
      <div class="row">
        <div class="col-md-6 ">
          <base-input 
            :label="$t('property.name')"
            :placeholder="$t('property.name')"
            v-model="resource.model.name"
            :error="tmpApiValidationErrors.name ? tmpApiValidationErrors.name[0] : ''"
            >
          </base-input>
        </div>
        <div class="col-md-6 ">
          <base-input 
            :label="$t('property.address')"
            :placeholder="$t('property.address')"
            v-model="resource.model.address"
            :error="tmpApiValidationErrors.address ? tmpApiValidationErrors.address[0] : ''"
            >
          </base-input>
        </div>
      </div>
    </card>
    <base-button slot="footer" type="primary" @click="handleCancel()" fill>
      <i class="fas fa-chevron-left mr-1"></i>
      {{$t('component.cancel')}}
    </base-button>
    <base-button slot="footer" type="primary" @click="handleSubmit()" fill>
      <i class="fas fa-check mr-1"></i>
      {{ addOrEdit == "Add" ? $t('component.add') : $t('component.edit') }}
    </base-button>
  </form>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import { BaseButton, BaseInput, Card } from "@/components";

export default {
  name: "store-input-fields",
  mixins: [formMixin],
  components: {
    BaseButton,
    BaseInput,
    Card,
  },
  props: {
    resource: {
      type: Object,
      required: true,
      default: () => {
        return {
            model: {},
            data: {},
            selector: {}
        }
      },
      description: "Resource info"
    },
    tmpApiValidationErrors: {
      type: Object,
      required: true,
      default: function() {
        return {};
      }
    },
    addOrEdit: {
      type: String,
      required: true,
      default: "Add"
    }
  },
  methods: {
    async handleSubmit() {
      this.$emit('submit', this.translateModel(this.resource.model));
    },
    async handleCancel() {
      this.$emit('cancel');
    },
    translateModel(model) {
      return {
        name: model.name,
        address: model.address,
      }
    },
  }
}
</script>
<style>
</style>