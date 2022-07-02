<template>
    <div class="row">
        <div class="col-12">
            <card :title="$t('sales.salesReport')" :showFooterLine="true">
                <div class="text-right">
                    <base-button
                        @click="addModel"
                        type="primary"
                    >
                        {{$t('component.add')}} {{$t('sales.salesReport')}}
                        <i class="fas fa-file-lines ml-2"></i>
                    </base-button>
                </div>
                <!-- <div class="row">
                <div class="col-xl-4 col-lg-5 col-md-6 ml-auto">
                    <base-input 
                            addonLeftIcon="el-icon-search"
                            :placeholder="$t('component.search')"
                            v-model="searchQuery">
                    </base-input>
                </div>
                </div> -->
                <div class="table-responsive">
                    <base-table
                        :data="resource.models"
                        :columns="table.columns"
                        thead-classes="text-primary"
                        v-on:show-details="showDetails"
                        :disableDelete="true"
                        :disableEdit="true"
                        :startIndex="resource.data.from"
                    >
                        <template slot-scope="{ row }">
                            <td
                                @click="showDetails(row.id)"
                            >
                                {{ row.collection_date ? row.collection_date.substring(0, 10) : '-' }}
                            </td>
                            <td
                                @click="showDetails(row.id)"
                            >
                                {{ row.revenue ? 'RM' + row.revenue : '-' }}
                            </td>
                            <td
                                @click="showDetails(row.id)"
                            >
                                {{ row.profit ? 'RM' + row.profit : '0' }}
                            </td>
                            <td
                                @click="showDetails(row.id)"
                            >
                                {{ row.profit_margin ? 'RM' + row.profit_margin : '0' }}
                            </td>
                            <td
                                @click="showDetails(row.id)"
                            >
                                {{ row.volume ? row.volume : '0' }}
                            </td>
                        </template>
                    </base-table>
                    <div
                        slot="footer"
                        class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
                    >
                        <div class="">
                        <p class="card-category">
                            {{$t('component.showing')}} {{ resource.data.from ? resource.data.from : "0" }} {{$t('component.to')}} {{ resource.data.to ? resource.data.to : "0" }} {{$t('component.of')}} {{ resource.data.total ? resource.data.total : "0" }} {{$t('component.entries')}}
                        </p>
                        </div>
                        <base-pagination
                            class="pagination-no-border"
                            :value="resource.data.current_page"
                            :per-page="resource.data.per_page"
                            :total="resource.data.total"
                            @input="handlePagination"
                            type="primary"
                        >
                        </base-pagination>
                    </div>
                </div>
            </card>
        </div>
    </div>
</template>
<script>
import {
    BaseButton,
    BaseTable,
    BasePagination,
    Card,
} from "@/components/index";

export default {
    components: {
        BaseButton,
        BaseTable,
        BasePagination,
        Card,
    },
    data() {
        return {
            table: {
                columns: {
                    collection_date: this.$t('date.date'),
                    revenue: this.$t('sales.revenue'),
                    profit: this.$t('sales.profit'),
                    profit_margin: this.$t('sales.profitMargin'),
                    volume: this.$t('sales.volume'),
                },
            },
        };
    },
    props: {
        resource: {
            type: Object,
            required: true,
            default: () => {
                return {
                    models: [],
                    data: {
                        current_page: 1,
                        total: 0,
                        from: 0,
                        to: 0,
                        per_page: 10,
                    }
                }
            },
            description: "Stores Resource"
        },
    },
    methods: {
        showDetails(id) {
            this.$emit('handle-edit-click', id);
        },
        editDetails(id) {
            this.$emit('handle-edit-click', id);
        },
        deleteDetails(id) {
            this.$emit('handle-remove-click', id);
        },
        handlePagination(id) {
            this.$emit('get-all', id);
        },
        addModel() {
            this.$emit('handle-add-click');
        },
    },
    watch: {
    }
};
</script>
<style>
</style>
