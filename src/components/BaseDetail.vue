<template>
    <card :category="category" :title="title">
        <div class="row">
            <div :class="headers2 ? 'col-md-6' : 'col-12'">
                <slot name="column1" v-bind:text="headers">
                    <div class="row" v-for="(value, key) in headers" :key="key">
                        <div class="col-12">
                            <h6 class="mb-0">{{ headers[key] }}</h6>
                        </div>
                        <span class="col-12 mb-3">
                            <span :class="itemClass(key)">
                                {{ itemValue(model, key) }}
                            </span>
                        </span>
                    </div>
                </slot>
            </div>
            <div :class="headers2 ? 'col-md-6' : 'col-12'">
                <slot name="column2" v-bind:text="headers2">
                    <div class="row" v-for="(value, key) in headers2" :key="key">
                        <div class="col-12">
                            <h6 class="mb-0">{{ headers2[key] }}</h6>
                        </div>
                        <span class="col-12 mb-3">
                            <span :class="itemClass(key)">
                                {{ itemValue(model, key) }}
                            </span>
                        </span>
                    </div>
                </slot>
            </div>
        </div>
    </card>
</template>
<script>
import Card from "./Card/Card";
export default {
    components: {
        Card
    },
    name: 'base-detail',
    props: {
        category: {
            type: String,
            default: '',
            description: "Detail Category"
        },
        title: {
            type: String,
            default: '',
            description: "Detail Title"
        },
        model: {
            type: Object,
            default: () => {},
            description: "Detail Data"
        },
        headers: {
            type: Object,
            default: () => {},
            description: "Detail Headers"
        },
        headers2: {
            type: Object,
            default: () => {},
            description: "Detail Headers 2"
        },
        detailDisplayValue: {
            type: Object,
            default: () => {},
            description: "Detail display value"
        },
        detailDisplayColor: {
            type: Object,
            default: () => {},
            description: "Detail display color"
        },
        detailDisplayPrefix: {
            type: Object,
            default: () => {},
            description: "Detail display prefix"
        },
        detailDisplaySuffix: {
            type: Object,
            default: () => {},
            description: "Detail display suffix"
        },
        detailClass: {
            type: Object,
            default: () => {},
            description: "Detail class"
        },
    },
    methods: {
        itemValue(item, column) {
            if (!item) {
                return '-';
            }
            let columnLowerCase = column.toLowerCase();
            let prefix;
            if (this.detailDisplayPrefix) {
                prefix = this.detailDisplayPrefix[columnLowerCase];
                if (!prefix) {
                    prefix = '';
                }
            } else {
                prefix = '';
            }
            let suffix;
            if (this.detailDisplaySuffix) {
                suffix = this.detailDisplaySuffix[columnLowerCase];
                if (!suffix) {
                    suffix = '';
                }
            } else {
                suffix = '';
            }
            let itemValue = item[columnLowerCase];
            if (typeof itemValue == 'boolean') {
                if (this.detailDisplayValue) {
                    let displayValueObject = this.detailDisplayValue[columnLowerCase];
                    if (displayValueObject) {
                        if (displayValueObject[itemValue]) {
                            itemValue = displayValueObject[itemValue];
                        }
                    }
                }
                return prefix + itemValue + suffix;
            } else if (itemValue) {
                if (this.detailDisplayValue) {
                    let displayValueObject = this.detailDisplayValue[columnLowerCase];
                    if (displayValueObject) {
                        if (displayValueObject[itemValue]) {
                            itemValue = displayValueObject[itemValue];
                        }
                    }
                }
                if (typeof itemValue == 'boolean') {
                    return prefix + itemValue + suffix;
                } else if (typeof itemValue == 'number') {
                    return prefix + itemValue + suffix;
                } else if (typeof itemValue == 'string') {
                    return prefix + itemValue + suffix;
                } else {
                    return '-';
                }
            } 
            // else {
            //     for (const objectValue of Object.values(item)) {
            //         if (typeof objectValue == 'object') {
            //         if (objectValue) {
            //             itemValue = objectValue[columnLowerCase];
            //             if (itemValue) {
            //             if (typeof itemValue == 'boolean') {
            //                 return prefix + itemValue + suffix;
            //             } else if (typeof itemValue == 'number') {
            //                 return prefix + itemValue + suffix;
            //             } else if (typeof itemValue == 'string') {
            //                 return prefix + itemValue + suffix;
            //             }
            //             }
            //         }
            //         }
            //     }
            // }
            return '-';
        },
        itemClass(column) {
            if (this.detailClass) {
                if (this.detailClass[column]) {
                    return this.detailClass[column];
                }
            }
            return '';
        },
    // showDetails: function (id) {
    //   this.$emit('show-details', id)
    // },
    // editDetails: function (id) {
    //   this.$emit('edit-details', id)
    // },
    // deleteDetails: function (id) {
    //   this.$emit('delete-details', id)
    // }
    }
};
</script>
<style>
</style>
