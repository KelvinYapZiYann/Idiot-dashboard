<template>
  <form @submit.prevent>
    <card :title="(detailOrEdit == 'Detail' ? '' : $t('component.edit')) + ' ' + $t('route.userProfile')">
      <div class="row">
        <div class="col-md-6 ">
          <base-input 
            :label="$t('property.email')"
            :placeholder="$t('property.email')"
            v-model="resource.model.email"
            :disabled="true"
            >
          </base-input>
        </div>
        <div class="col-md-6 ">
          <base-input 
            :label="$t('property.name')"
            :placeholder="$t('property.name')"
            v-model="resource.model.name"
            :error="tmpApiValidationErrors.name ? tmpApiValidationErrors.name[0] : ''"
            :disabled="detailOrEdit != 'Edit'"
            >
          </base-input>
        </div>
        <div class="col-md-6 ">
          <base-input
            :label="$t('property.phoneNumber')"
            :placeholder="$t('property.phoneNumber')"
            v-model="resource.model.phone_number"
            :error="tmpApiValidationErrors.phone_number ? tmpApiValidationErrors.phone_number[0] : ''"
            :disabled="detailOrEdit != 'Edit'"
            >
          </base-input>
        </div>
        <div class="col-md-6 ">
          <base-input
            :label="$t('property.businessName')"
            :placeholder="$t('property.businessName')"
            v-model="resource.model.business_name"
            :error="tmpApiValidationErrors.business_name ? tmpApiValidationErrors.business_name[0] : ''"
            :disabled="detailOrEdit != 'Edit'"
            >
          </base-input>
        </div>
      </div>
    </card>
    <base-button slot="footer" type="primary" v-if="detailOrEdit=='Edit'" @click="handleCancel()" fill>
      <i class="fas fa-chevron-left mr-1"></i>
      {{$t('component.cancel')}}
    </base-button>
    <base-button slot="footer" type="primary" v-if="detailOrEdit=='Edit'" @click="handleSubmit()" fill>
      <i class="fas fa-check mr-1"></i>
      {{ $t('component.edit') }}
    </base-button>
  </form>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import { BaseButton, BaseInput, Card } from "@/components";

export default {
  name: "profile-input-fields",
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
    detailOrEdit: {
      type: String,
      required: true,
      default: "Detail"
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
        email: model.email,
        name: model.name,
        phone_number: model.phone_number,
        business_name: model.business_name,
      }
    },
  }
}
</script>
<style>
</style>