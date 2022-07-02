<template>
    <div class="sales-add-modal">
        <modal 
            :name="name"
            height="auto"
            :minHeight="300"
            width="50%"
            >
                <h3 class="text-center">{{ $t('sales.salesReport') }}</h3>
                <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                        <base-selector-input
                            :label="$t('component.store')"
                            v-model="storeId"
                            :options="storeOptions"
                            class="col-12"
                            :disabled="selectedStore != ''"
                        ></base-selector-input>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                        <base-input
                            :label="$t('date.date')"
                            :placeholder="$t('date.date')"
                            class="col-12"
                            type="date"
                            v-model="date"
                        ></base-input>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                        <base-input
                            :label="$t('sales.revenue')"
                            :placeholder="$t('sales.revenueRm')"
                            class="col-12"
                            type="number"
                            v-model="revenue"
                        ></base-input>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                        <base-input
                            :label="$t('sales.profit')"
                            :placeholder="$t('sales.profitRm')"
                            class="col-12"
                            type="number"
                            v-model="profit"
                        ></base-input>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                        <base-input
                            :label="$t('sales.profitMargin')"
                            :placeholder="$t('sales.profitMarginRm')"
                            class="col-12"
                            type="number"
                            v-model="profitMargin"
                        ></base-input>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                        <base-input
                            :label="$t('sales.volume')"
                            :placeholder="$t('sales.volume')"
                            class="col-12"
                            type="number"
                            v-model="volume"
                        ></base-input>
                    </div>
                </div>
                <base-button 
                    type="primary" 
                    @click="handleSubmitSalesReport()" 
                    class="mb-2"
                    fill
                    >
                        <i class="fas fa-plus mr-1"></i>
                        {{$t('component.add')}}
                </base-button>
        </modal>
    </div>
</template>

<script>
import { 
    BaseSelectorInput,
	BaseInput,
    BaseButton,
} from "@/components/index";

export default {
    name: "sales-add-modal",
    components: {
        BaseSelectorInput,
        BaseInput,
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
    mounted() {
        // console.log(this.storeOptions);
    },
    methods: {
        handleSubmitSalesReport() {

        },
    },
};
</script>
<style></style>
