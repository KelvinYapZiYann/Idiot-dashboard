<template>
  <form @submit.prevent>
    <card :title="(addOrEdit == 'Add' ? $t('component.add') : $t('component.edit')) + ' ' + $t('component.inStoreTraffic')">
      <div class="row">
        <div class="col-md-6 ">
          <base-selector-input 
            :label="$t('component.store')"
            :placeholder="$t('component.store')"
            v-model="resource.model.store_id"
            :options="resource.selector.store_id"
            :error="tmpApiValidationErrors.store_id ? tmpApiValidationErrors.store_id[0] : ''"
            >
          </base-selector-input>
        </div>
      </div>
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
            :label="$t('property.macAddress')"
            :placeholder="$t('property.macAddress')"
            v-model="resource.model.mac_address"
            :error="tmpApiValidationErrors.mac_address ? tmpApiValidationErrors.mac_address[0] : ''"
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
import { BaseButton, BaseInput, BaseSelectorInput, Card } from "@/components";

export default {
  name: "in-store-traffic-input-fields",
  mixins: [formMixin],
  components: {
    BaseButton,
    BaseInput,
    BaseSelectorInput,
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
        store_id: model.store_id,
        name: model.name,
        mac_address: model.mac_address,
      }
    },
  }
}
</script>
<style>
</style>