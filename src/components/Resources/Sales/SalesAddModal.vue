<template>
    <div class="sales-add-modal">
        <modal 
            :name="name"
            height="auto"
            :minHeight="300"
            width="100%"
            >
                <h3 class="text-center mt-2">{{ $t('sales.salesReport') }}</h3>
                <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                        <!-- <base-selector-input
                            :label="$t('component.store')"
                            v-model="storeId"
                            :options="storeOptions"
                            class="col-12"
                            :disabled="selectedStore != ''"
                        ></base-selector-input> -->
                        <label class="col-12">{{$t('component.store')}}</label>
                        <el-select
                            class="select-info"
                            size="large"
                            v-model="storeId"
                            :placeholder="$t('component.store')"
                            :disabled="selectedStore != ''"
                        >
                            <el-option
                                v-for="option in storeOptions"
                                class="select-info"
                                :value="option.id"
                                :label="option.name"
                                :key="option.name"
                            >
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                        <!-- <base-input
                            :label="$t('date.date')"
                            :placeholder="$t('date.date')"
                            class="col-12"
                            type="date"
                            v-model="date"
                        ></base-input> -->
                        <label class="col-12">{{$t('date.date')}}</label>
                        <el-date-picker
                            size="large"
                            v-model="date"
                            :placeholder="$t('date.date')"
                            type="date"
                        ></el-date-picker>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                        <!-- <base-input
                            :label="$t('sales.revenueRm')"
                            :placeholder="$t('sales.revenueRm')"
                            class="col-12"
                            type="number"
                            v-model="revenue"
                        ></base-input> -->
                        <label class="col-12">{{$t('sales.revenueRm')}}</label>
                        <el-input-number
                            size="large"
                            v-model="revenue"
                            type="number"
                            :placeholder="$t('sales.revenueRm')"
                        ></el-input-number>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                        <!-- <base-input
                            :label="$t('sales.profitRm')"
                            :placeholder="$t('sales.profitRm')"
                            class="col-12"
                            type="number"
                            v-model="profit"
                        ></base-input> -->
                        <label class="col-12">{{$t('sales.profitRm')}}</label>
                        <el-input-number
                            size="large"
                            v-model="profit"
                            :placeholder="$t('sales.profitRm')"
                            type="number"
                        ></el-input-number>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                        <!-- <base-input
                            :label="$t('sales.profitMarginRm')"
                            :placeholder="$t('sales.profitMarginRm')"
                            class="col-12"
                            type="number"
                            v-model="profitMargin"
                        ></base-input> -->
                        <label class="col-12">{{$t('sales.profitMarginRm')}}</label>
                        <el-input-number
                            size="large"
                            v-model="profitMargin"
                            :placeholder="$t('sales.profitMarginRm')"
                            type="number"
                        ></el-input-number>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                        <!-- <base-input
                            :label="$t('sales.volume')"
                            :placeholder="$t('sales.volume')"
                            class="col-12"
                            type="number"
                            v-model="volume"
                        ></base-input> -->
                        <label class="col-12">{{$t('sales.volume')}}</label>
                        <el-input-number
                            size="large"
                            v-model="volume"
                            :placeholder="$t('sales.volume')"
                            type="number"
                        ></el-input-number>
                    </div>
                </div>
                <base-button 
                    type="primary" 
                    @click="handleSubmitSalesReport()" 
                    class="mb-2"
                    fill
                    >
                        <i class="fas fa-plus mr-1"></i>
                        {{ isEdit ? $t('component.save') : $t('component.add')}}
                </base-button>
        </modal>
    </div>
</template>

<script>
import { 
    // BaseSelectorInput,
	// BaseInput,
    BaseButton,
} from "@/components/index";
import { InputNumber, DatePicker, Select, Option } from "element-ui";

export default {
    name: "sales-add-modal",
    components: {
        [InputNumber.name]: InputNumber,
        [Option.name]: Option,
        [Select.name]: Select,
        [DatePicker.name]: DatePicker,
        // BaseSelectorInput,
        // BaseInput,
        BaseButton,
	},
    props: {
        name: {
            type: String,
            default: "",
        },
        storeOptions: {
            type: Array,
            default: () => {
                return [];
            }
        },
        selectedStore: {
            type: [String, Number],
            default: "",
        },
        isEdit: {
            type: Boolean,
            default: false,
        },
        salesId: {
            type: [String, Number],
            default: "",
        },
    },
    data() {
        let today = this.$moment();
        return {
            storeId: this.selectedStore,
            date: today.format("YYYY-MM-DD"),
            revenue: 0,
            profit: 0,
            profitMargin: 0,
            volume: 0,
        };
    },
    watch: {
        isEdit: function(value) {
            if (value) {
                this.getSalesDetail();
            }
        },
        salesId: function(value) {
            if (value) {
                this.getSalesDetail();
            }
        },
    },
    methods: {
        async getSalesDetail() {
            await this.$store.dispatch('sales/getById', {
                id: this.salesId,
            }).then((response) => {
                this.date = response.data.collection_date.substring(0, 10);
                this.revenue = parseInt(response.data.revenue);
                this.profit = parseInt(response.data.profit);
                this.profitMargin = parseInt(response.data.profit_margin);
                this.volume = parseInt(response.data.volume);
            });
        },
        async handleSubmitSalesReport() {
            if (this.isEdit) {
                await this.$store.dispatch('sales/update', {
                    id: this.salesId,
                    model: {
                        store_id: this.storeId,
                        revenue: this.revenue,
                        profit: this.profit,
                        profit_margin: this.profitMargin,
                        volume: this.volume,
                        collection_date: this.date,
                    }
                }).then(() => {
                    this.$emit('close-modal');
                });
            } else {
                await this.$store.dispatch('sales/add', {
                    model: {
                        store_id: this.storeId,
                        revenue: this.revenue,
                        profit: this.profit,
                        profit_margin: this.profitMargin,
                        volume: this.volume,
                        collection_date: this.date,
                    }
                }).then(() => {
                    this.$emit('close-modal');
                });
            }
        },
    },
};
</script>
<style></style>
