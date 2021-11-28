<template>
  <div class="table-responsive">
    <table class="table tablesorter" :class="tableClass">
      <thead :class="theadClasses">
      <tr>
        <slot name="columns">
          <th v-if="!disableIndex && !$store.getters['mobileLayout/isMobileLayout']">{{$t('component.index')}}</th>
          <th v-if="(!disableView || !disableEdit || !disableDelete) && !$store.getters['mobileLayout/isMobileLayout']">{{$t('component.actions')}}</th>
          <th v-for="column in columns" :key="column">{{column}}</th>
        </slot>
      </tr>
      </thead>
      <tbody :class="tbodyClasses">
      <tr v-for="(item, index) in data" :key="index" :class="[{viewableRow: !disableView}]" :style="rowBackgroundColor[index]">
        <td v-if="!disableIndex  && !$store.getters['mobileLayout/isMobileLayout']">
          <span @click="showDetails(item.id)">
            {{startIndex + index}}.
          </span>
        </td>
        <td v-if="!$store.getters['mobileLayout/isMobileLayout']">
          <base-button
              v-if="!disableView"
              @click="showDetails(item.id)"
              class="remove btn-link"
              type="info"
              size="sm"
              :title="$t('component.detail')"
              icon
          >
            <i class="fa fa-eye" aria-hidden="true"></i>
          </base-button>
          <base-button
              v-if="!disableEdit"
              @click="editDetails(item.id)"
              class="edit btn-link"
              type="info"
              size="sm"
              :title="$t('component.edit')"
              icon
          >
            <i class="fas fa-edit"></i>
          </base-button>
          <base-button
              v-if="!disableDelete"
              @click="deleteDetails(item.id)"
              class="remove btn-link"
              type="danger"
              size="sm"
              :title="$t('component.remove')"
              icon
          >
            <i class="fas fa-trash"></i>
          </base-button>
        </td>
        <slot :row="item">
          <td 
            v-for="(column, columnKey, i) in columns"
            :key="i"
            @click="showDetails(item.id)"
            @mousedown="startLongClick(item.id)" 
            @mouseleave="stopLongClick"
            @mouseup="stopLongClick"
            @touchstart="startLongClick(item.id)"
            @touchend="stopLongClick"
            @touchcancel="stopLongClick"
            >
            <span :class="itemClass(columnKey, index)" >
              {{itemValue(item, columnKey)}}
            </span>
          </td>
        </slot>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { BaseButton } from "@/components/index";

export default {
  name: 'base-table',
  components: {
    BaseButton,
  },
  data() {
    return {
      timeout: null
    }
  },
  props: {
    columns: {
      type: Object,
      default: () => {},
      description: "Table columns"
    },
    columnsDisplayValue: {
      type: Object,
      default: () => {},
      description: "Table columns display value"
    },
    columnsDisplayPrefix: {
      type: Object,
      default: () => {},
      description: "Table columns display prefix"
    },
    columnsDisplaySuffix: {
      type: Object,
      default: () => {},
      description: "Table columns display suffix"
    },
    columnsClass: {
      type: Array,
      default: () => [],
      description: "Table columns class"
    },
    // columnsClassColumn: {
    //   type: Array,
    //   default: () => [],
    //   description: "Table columns class"
    // },
    rowBackgroundColor: {
      type: Array,
      default: () => [],
      description: "Table row background color"
    },
    data: {
      type: Array,
      default: () => [],
      description: "Table data"
    },
    type: {
      type: String, // striped | hover
      default: "",
      description: "Whether table is striped or hover type"
    },
    theadClasses: {
      type: String,
      default: '',
      description: "<thead> css classes"
    },
    tbodyClasses: {
      type: String,
      default: '',
      description: "<tbody> css classes"
    },
    disableEdit: {
      type: Boolean,
      default: false
    },
    disableView: {
      type: Boolean,
      default: false
    },
    disableDelete: {
      type: Boolean,
      default: false
    },
    disableIndex: {
      type: Boolean,
      default: false
    },
    startIndex: {
      type: Number,
      default: 0
    },
  },
  computed: {
    tableClass() {
      return this.type && `table-${this.type}`;
    },
  },
  methods: {
    itemValue(item, column) {
      let columLowerCase = column.toLowerCase();
      let prefix;
      if (this.columnsDisplayPrefix) {
        prefix = this.columnsDisplayPrefix[columLowerCase];
        if (!prefix) {
          prefix = '';
        }
      } else {
        prefix = '';
      }
      let suffix;
      if (this.columnsDisplaySuffix) {
        suffix = this.columnsDisplaySuffix[columLowerCase];
        if (!suffix) {
          suffix = '';
        }
      } else {
        suffix = '';
      }
      let itemValue = item[columLowerCase];
      if (itemValue) {
        // let tmpItemDisplayValue = itemDisplayValuef(itemValue, columLowerCase);
        if (this.columnsDisplayValue) {
            let displayValueObject = this.columnsDisplayValue[columLowerCase];
            if (displayValueObject) {
                if (displayValueObject[itemValue]) {
                    itemValue = displayValueObject[itemValue];
                }
            }
        }
        let itemValueType = typeof itemValue;
        if (itemValueType == 'boolean' || itemValueType == 'number' || itemValueType == 'string') {
          return prefix + itemValue + suffix;
        } else {
          return '-';
        }
      } 
    //   else {
    //     for (const objectValue of Object.values(item)) {
    //       if (typeof objectValue == 'object') {
    //         if (objectValue) {
    //           itemValue = objectValue[columLowerCase];
    //           if (this.columnsDisplayValue) {
    //             let displayValueObject = this.columnsDisplayValue[columLowerCase];
    //             if (displayValueObject) {
    //               if (displayValueObject[itemValue]) {
    //                 itemValue = displayValueObject[itemValue];
    //               }
    //             }
    //           }
    //           if (itemValue) {
    //             if (typeof itemValue == 'boolean') {
    //               return prefix + itemValue;
    //             } else if (typeof itemValue == 'number') {
    //               return prefix + itemValue;
    //             } else if (typeof itemValue == 'string') {
    //               return prefix + itemValue;
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
      return '-';
    },
    itemDisplayValuef(itemValue, columLowerCase) {
        if (this.columnsDisplayValue) {
            let displayValueObject = this.columnsDisplayValue[columLowerCase];
            if (displayValueObject) {
                if (displayValueObject[itemValue]) {
                    itemValue = displayValueObject[itemValue];
                }
            }
        }
        let itemValueType = typeof itemValue;
        if (itemValueType == 'boolean' || itemValueType == 'number' || itemValueType == 'string') {
           return itemValue;
        } else {
            return null;
        }
    },
    itemClass(column, index) {
      try {
        if (this.columnsClass) {
          for (let j = 0; j < this.columnsClass.length; j++) {
            if (this.columnsClass[j].name == column) {
              return this.columnsClass[j].class[index];
            }
          }
        }
        return '';
      } catch(e) {
        console.error(e);
      }
    },
    showDetails: function (id) {
      if (!this.disableView) {
        this.$emit('show-details', id)
      }
    },
    editDetails: function (id) {
      this.$emit('edit-details', id)
    },
    deleteDetails: function (id) {
      this.$emit('delete-details', id)
    },
    startLongClick(id) {
      if (!this.timeout && this.$store.getters["mobileLayout/isMobileLayout"]) {
        this.timeout = setTimeout(() => {
          this.$emit('long-click-event', id)
        }, 2000);
      }
    },
    stopLongClick() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
    },
  }
};
</script>
<style>
.viewableRow {
  cursor: pointer;
}
.viewableRow:hover {
  background-color: #1d8cf411;
}
/* .unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
} */
</style>
