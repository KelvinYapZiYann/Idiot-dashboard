<template>
    <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
        <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <category-card
                    :title="$t('dashboard.byStore')"
                >
                    <div class="row">
                        <!-- <base-selector-input
                            :label="$t('dashboard.type')"
                            v-model="byStoreSelectedType"
                            :options="$t('typeOptions')"
                            class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"
                            @input="byStoreTypeSelectorChange"
                        ></base-selector-input> -->
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                            <label class="col-12">{{$t('dashboard.type')}}</label>
                            <el-select
                                class="select-info"
                                size="large"
                                v-model="byStoreSelectedType"
                                :placeholder="$t('dashboard.type')"
                                @change="byStoreTypeSelectorChange"
                            >
                                <el-option
                                    v-for="option in $t('typeOptions')"
                                    class="select-info"
                                    :value="option.id"
                                    :label="option.name"
                                    :key="option.name"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <!-- <base-selector-input
                            :label="$t('date.dateRange')"
                            v-model="byStoreSelectedDateRange"
                            :options="$t('dateRangeOptions')"
                            class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"
                            @input="byStoreDateRangeSelectorChange"
                        ></base-selector-input> -->
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                            <label class="col-12">{{$t('date.dateRange')}}</label>
                            <el-select
                                class="select-info"
                                size="large"
                                v-model="byStoreSelectedDateRange"
                                :placeholder="$t('date.dateRange')"
                                @change="byStoreDateRangeSelectorChange"
                            >
                                <el-option
                                    v-for="option in $t('dateRangeOptions')"
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
                        <div 
                            class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6 d-flex flex-column justify-content-center"
                            v-for="(value, i) in byStore"
                            :key="i"
                        >
                            <div class="mb-1 font-weight-bold">
                                <span>{{ value.name }}: </span>
                                <span class="font-italic">{{ decodeByStoreValue(value) }}</span>
                            </div>
                            <div class="mb-1">
                                <i class="fa-solid fa-shop card-category-icon warning" @click="goToStore(value.id)"></i>
                            </div>
                        </div>
                    </div>
                </category-card>
            </div>

            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <category-card
                    :title="$t('dashboard.byFloor')"
                >
                    <div class="row">
                        <!-- <base-selector-input
                            :label="$t('dashboard.type')"
                            v-model="byFloorSelectedType"
                            :options="$t('typeOptions')"
                            class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"
                            @input="byFloorSelectorChange"
                        ></base-selector-input> -->
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                            <label class="col-12">{{$t('dashboard.type')}}</label>
                            <el-select
                                class="select-info"
                                size="large"
                                v-model="byFloorSelectedType"
                                :placeholder="$t('dashboard.type')"
                                @change="byFloorSelectorChange"
                            >
                                <el-option
                                    v-for="option in $t('typeOptions')"
                                    class="select-info"
                                    :value="option.id"
                                    :label="option.name"
                                    :key="option.name"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <!-- <base-selector-input
                            :label="$t('date.dateRange')"
                            v-model="byFloorSelectedDateRange"
                            :options="$t('dateRangeOptions')"
                            class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"
                            @input="byFloorDateRangeSelectorChange"
                        ></base-selector-input> -->
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                            <label class="col-12">{{$t('date.dateRange')}}</label>
                            <el-select
                                class="select-info"
                                size="large"
                                v-model="byFloorSelectedDateRange"
                                :placeholder="$t('date.dateRange')"
                                @change="byFloorDateRangeSelectorChange"
                            >
                                <el-option
                                    v-for="option in $t('dateRangeOptions')"
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
                        <div 
                            class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6 d-flex flex-column justify-content-center"
                            v-for="(value, i) in byFloor"
                            :key="i"
                        >
                            <div class="mb-1 font-weight-bold">
                                <span>{{ value.name }}: </span>
                                <span class="font-italic">{{ decodeByFloorValue(value) }}</span>
                            </div>
                            <div class="mb-1">
                                <i class="card-category-icon success" :class="value.icon"></i>
                            </div>
                        </div>
                    </div>
                </category-card>
            </div>
        </div>
        
        <category-card :title="$t('component.total') + ' ' + $t('component.traffics')">
            <div class="row">
                <!-- <base-selector-input
                    :label="$t('date.dateRange')"
                    v-model="totalTrafficsSelectedDateRange"
                    :options="$t('customDateRangeOptions')"
                    class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6"
                    @input="totalTrafficsDateRangeSelectorChange"
                ></base-selector-input> -->
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6">
                    <label class="col-12">{{$t('date.dateRange')}}</label>
                    <el-select
                        class="select-info"
                        size="large"
                        v-model="totalTrafficsSelectedDateRange"
                        :placeholder="$t('chart.type')"
                        @change="totalTrafficsDateRangeSelectorChange"
                    >
                        <el-option
                            v-for="option in $t('customDateRangeOptions')"
                            class="select-info"
                            :value="option.id"
                            :label="option.name"
                            :key="option.name"
                        >
                        </el-option>
                    </el-select>
                </div>
                <!-- <base-input 
                    :label="$t('date.start')"
                    :placeholder="$t('date.start')"
                    v-model="totalTrafficsSelectedStartDate"
                    type="date"
                    class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6"
                    @input="totalTrafficsStartDateChange"
                    v-show="totalTrafficsSelectedDateRange == 'custom'"
                    >
                </base-input>
                <base-input 
                    :label="$t('date.end')"
                    :placeholder="$t('date.end')"
                    v-model="totalTrafficsSelectedEndDate"
                    type="date"
                    class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6"
                    @input="totalTrafficsEndDateChange"
                    v-show="totalTrafficsSelectedDateRange == 'custom'"
                    >
                </base-input> -->

                <div 
                    class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6" 
                    v-show="totalTrafficsSelectedDateRange == 'custom'"
                >
                    <label class="col-12">{{$t('date.dateRange')}}</label>
                    <el-date-picker
                        size="large"
                        v-model="totalTrafficsSelected2DateRange"
                        :start-placeholder="$t('date.start')"
                        :end-placeholder="$t('date.end')"
                        type="daterange"
                        @input="totalTrafficsChange"
                    ></el-date-picker>
                </div>

                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6">
                    <label class="col-12">{{$t('component.stores')}}</label>
                    <el-select
                        multiple
                        class="select-info"
                        size="large"
                        v-model="totalTrafficsSelectedStores"
                        :placeholder="$t('component.stores')"
                        @change="totalTrafficsStoresChange"
                    >
                        <el-option
                            v-for="option in totalTrafficsStoreOptions"
                            class="select-info"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6">
                    <label class="col-12">{{$t('component.inStoreTraffics')}}</label>
                    <el-select
                        multiple
                        class="select-info"
                        size="large"
                        v-model="totalTrafficsSelectedDevices"
                        :placeholder="$t('component.inStoreTraffics')"
                        @change="totalTrafficsDevicesChange"
                    >
                        <el-option
                            v-for="option in totalTrafficsDeviceOptions"
                            class="select-info"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
        </category-card>
        <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="totalTraffics.enter ? totalTraffics.enter : '0'"
                    :sub-title="$t('component.total') + ' ' + $t('property.enter')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                    >
                </stats-card>
            </div>
            <!-- <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="totalTraffics.exit ? totalTraffics.exit : '0'"
                    :sub-title="$t('component.total') + ' ' + $t('property.exit')"
                    type="warning"
                    icon="fas fa-sign-out-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="totalTraffics.return ? totalTraffics.return : '0'"
                    :sub-title="$t('component.total') + ' ' + $t('property.return')"
                    type="success"
                    icon="fas fa-undo-alt"
                    >
                </stats-card>
            </div> -->
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="totalTraffics.passing ? totalTraffics.passing : '0'"
                    :sub-title="$t('component.total') + ' ' + $t('property.passing')"
                    type="neutral"
                    icon="fas fa-times"
                    >
                </stats-card>
            </div>
        </div>

        <category-card>
            <div slot="title">
                {{ $t('component.history') + ' ' + $t('component.traffics') }}
                <i class="fa-solid fa-align-center" :title="$t('dashboard.historyTrafficsDescription')"></i>
            </div>
            <div class="row">
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6">
                    <label class="col-12">{{$t('dashboard.type')}}</label>
                    <el-select
                        multiple
                        class="select-info"
                        size="large"
                        v-model="comparisonTotalTrafficsTypes"
                        :placeholder="$t('component.stores')"
                    >
                        <el-option
                            v-for="option in $t('multiTypeOptions')"
                            class="select-info"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6">
                    <label class="col-12">{{$t('component.stores')}}</label>
                    <el-select
                        multiple
                        class="select-info"
                        size="large"
                        v-model="comparisonTotalTrafficsSelectedStores"
                        :placeholder="$t('component.stores')"
                        @change="comparisonTotalTrafficsStoresChange"
                    >
                        <el-option
                            v-for="option in comparisonTotalTrafficsStoreOptions"
                            class="select-info"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6">
                    <label class="col-12">{{$t('component.inStoreTraffics')}}</label>
                    <el-select
                        multiple
                        class="select-info"
                        size="large"
                        v-model="comparisonTotalTrafficsSelectedDevices"
                        :placeholder="$t('component.inStoreTraffics')"
                        @change="comparisonTotalTrafficsDevicesChange"
                    >
                        <el-option
                            v-for="option in comparisonTotalTrafficsDeviceOptions"
                            class="select-info"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
        </category-card>
        <div class="row">
            <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                <traffics-card
                    :sub-title="$t('date.today')"
                    :previous-title="$t('date.yesterday')"
                    :displayTypes="comparisonTotalTrafficsTypes"
                    :currentData="comparisonTotalTraffics.today"
                    :previousData="comparisonTotalTraffics.yesterday"
                    >
                </traffics-card>
            </div>
            <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                <traffics-card
                    :sub-title="$t('date.thisWeek')"
                    :previous-title="$t('date.lastWeek')"
                    :displayTypes="comparisonTotalTrafficsTypes"
                    :currentData="comparisonTotalTraffics.thisWeek"
                    :previousData="comparisonTotalTraffics.lastWeek"
                    >
                </traffics-card>
            </div>
            <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                <traffics-card
                    :sub-title="$t('date.thisMonth')"
                    :previous-title="$t('date.lastMonth')"
                    :displayTypes="comparisonTotalTrafficsTypes"
                    :currentData="comparisonTotalTraffics.thisMonth"
                    :previousData="comparisonTotalTraffics.lastMonth"
                    >
                </traffics-card>
            </div>
        </div>

        <category-card>
            <div slot="title">
                {{ $t('component.comparison') + ' ' + $t('component.traffics') }}
                <i class="fa-solid fa-align-center" :title="$t('dashboard.comparisonTrafficsDescription')"></i>
            </div>
            <div class="row">
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6">
                    <label class="col-12">{{$t('dashboard.type')}}</label>
                    <el-select
                        multiple
                        class="select-info"
                        size="large"
                        v-model="specificComparisonTotalTrafficsTypes"
                        :placeholder="$t('component.stores')"
                    >
                        <el-option
                            v-for="option in $t('multiTypeOptions')"
                            class="select-info"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="row">
                <!-- <base-selector-input
                    :label="$t('date.dateRange') + ' ' + 1"
                    v-model="specificComparisonTotalTrafficsSelectedDateRange1"
                    :options="$t('customDateRangeOptions')"
                    class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6"
                    @input="specificComparisonTotalTrafficsDateRangeSelectorChange1"
                ></base-selector-input> -->

                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6">
                    <label class="col-12">{{$t('date.dateRange')}}</label>
                    <el-select
                        class="select-info"
                        size="large"
                        v-model="specificComparisonTotalTrafficsSelectedDateRange1"
                        :placeholder="$t('chart.type')"
                        @change="specificComparisonTotalTrafficsDateRangeSelectorChange1"
                    >
                        <el-option
                            v-for="option in $t('customDateRangeOptions')"
                            class="select-info"
                            :value="option.id"
                            :label="option.name"
                            :key="option.name"
                        >
                        </el-option>
                    </el-select>
                </div>

                <!-- <base-input 
                    :label="$t('date.start')"
                    :placeholder="$t('date.start')"
                    v-model="specificComparisonTotalTrafficsSelectedStartDate1"
                    type="date"
                    class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6"
                    @input="specificComparisonTotalTrafficsStartDateChange1"
                    v-show="specificComparisonTotalTrafficsSelectedDateRange1 == 'custom'"
                    >
                </base-input>
                <base-input 
                    :label="$t('date.end')"
                    :placeholder="$t('date.end')"
                    v-model="specificComparisonTotalTrafficsSelectedEndDate1"
                    type="date"
                    class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6"
                    @input="specificComparisonTotalTrafficsEndDateChange1"
                    v-show="specificComparisonTotalTrafficsSelectedDateRange1 == 'custom'"
                    >
                </base-input> -->

                <div 
                    class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6" 
                    v-show="specificComparisonTotalTrafficsSelectedDateRange1 == 'custom'"
                >
                    <label class="col-12">{{$t('date.dateRange')}}</label>
                    <el-date-picker
                        size="large"
                        v-model="specificComparisonTotalTraffics2SelectedDateRange1"
                        :start-placeholder="$t('date.start')"
                        :end-placeholder="$t('date.end')"
                        type="daterange"
                        @input="specificComparisonTotalTrafficsDateRangeChange1"
                    ></el-date-picker>
                </div>

                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6">
                    <label class="col-12">{{$t('component.stores') + ' ' + 1}}</label>
                    <el-select
                        multiple
                        class="select-info"
                        size="large"
                        v-model="specificComparisonTotalTrafficsSelectedStores1"
                        :placeholder="$t('component.stores')"
                        @change="specificComparisonTotalTrafficsStoresChange1"
                    >
                        <el-option
                            v-for="option in specificComparisonTotalTrafficsStoreOptions1"
                            class="select-info"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6">
                    <label class="col-12">{{$t('component.inStoreTraffics') + ' ' + 1}}</label>
                    <el-select
                        multiple
                        class="select-info"
                        size="large"
                        v-model="specificComparisonTotalTrafficsSelectedDevices1"
                        :placeholder="$t('component.inStoreTraffics')"
                        @change="specificComparisonTotalTrafficsDevicesChange1"
                    >
                        <el-option
                            v-for="option in specificComparisonTotalTrafficsDeviceOptions1"
                            class="select-info"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="row">
                <!-- <base-selector-input
                    :label="$t('date.dateRange') + ' ' + 2"
                    v-model="specificComparisonTotalTrafficsSelectedDateRange2"
                    :options="$t('customDateRangeOptions')"
                    class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6"
                    @input="specificComparisonTotalTrafficsDateRangeSelectorChange2"
                ></base-selector-input> -->

                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6">
                    <label class="col-12">{{$t('date.dateRange')}}</label>
                    <el-select
                        class="select-info"
                        size="large"
                        v-model="specificComparisonTotalTrafficsSelectedDateRange2"
                        :placeholder="$t('chart.type')"
                        @change="specificComparisonTotalTrafficsDateRangeSelectorChange2"
                    >
                        <el-option
                            v-for="option in $t('customDateRangeOptions')"
                            class="select-info"
                            :value="option.id"
                            :label="option.name"
                            :key="option.name"
                        >
                        </el-option>
                    </el-select>
                </div>

                <!-- <base-input 
                    :label="$t('date.start')"
                    :placeholder="$t('date.start')"
                    v-model="specificComparisonTotalTrafficsSelectedStartDate2"
                    type="date"
                    class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6"
                    @input="specificComparisonTotalTrafficsStartDateChange2"
                    v-show="specificComparisonTotalTrafficsSelectedDateRange2 == 'custom'"
                    >
                </base-input>
                <base-input 
                    :label="$t('date.end')"
                    :placeholder="$t('date.end')"
                    v-model="specificComparisonTotalTrafficsSelectedEndDate2"
                    type="date"
                    class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6"
                    @input="specificComparisonTotalTrafficsEndDateChange2"
                    v-show="specificComparisonTotalTrafficsSelectedDateRange2 == 'custom'"
                    >
                </base-input> -->

                <div 
                    class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6" 
                    v-show="specificComparisonTotalTrafficsSelectedDateRange2 == 'custom'"
                >
                    <label class="col-12">{{$t('date.dateRange')}}</label>
                    <el-date-picker
                        size="large"
                        v-model="specificComparisonTotalTraffics2SelectedDateRange2"
                        :start-placeholder="$t('date.start')"
                        :end-placeholder="$t('date.end')"
                        type="daterange"
                        @input="specificComparisonTotalTrafficsDateRangeChange2"
                    ></el-date-picker>
                </div>

                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6">
                    <label class="col-12">{{$t('component.stores') + ' ' + 2}}</label>
                    <el-select
                        multiple
                        class="select-info"
                        size="large"
                        v-model="specificComparisonTotalTrafficsSelectedStores2"
                        :placeholder="$t('component.stores')"
                        @change="specificComparisonTotalTrafficsStoresChange2"
                    >
                        <el-option
                            v-for="option in specificComparisonTotalTrafficsStoreOptions2"
                            class="select-info"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6">
                    <label class="col-12">{{$t('component.inStoreTraffics') + ' ' + 2}}</label>
                    <el-select
                        multiple
                        class="select-info"
                        size="large"
                        v-model="specificComparisonTotalTrafficsSelectedDevices2"
                        :placeholder="$t('component.inStoreTraffics')"
                        @change="specificComparisonTotalTrafficsDevicesChange2"
                    >
                        <el-option
                            v-for="option in specificComparisonTotalTrafficsDeviceOptions2"
                            class="select-info"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
        </category-card>
        <div class="row">
            <div class="col-12">
                <traffics-card
                    :sub-title="specificComparisonTotalTrafficsSelectedDateRange1"
                    :previous-title="specificComparisonTotalTrafficsSelectedDateRange2"
                    :displayTypes="specificComparisonTotalTrafficsTypes"
                    :currentData="specificComparisonTotalTraffics1"
                    :previousData="specificComparisonTotalTraffics2"
                    >
                </traffics-card>
            </div>
        </div>

        <traffic-trend-line-chart
            :labels="trendLineChartLabels"
            :lines="trendLineChartLines"
            :storeOptions="totalTrafficsStoreOptions"
            :deviceOptions="totalTrafficsDeviceOptions"
            @trend-chart-change="trafficTrendChartChange"
        >
        </traffic-trend-line-chart>

        <!-- <traffic-trend-line-chart
            type="15min"
            :labels="minuteLineChart.labels"
            :enters="minuteLineChart.enters"
            :exits="minuteLineChart.exits"
            :returns="minuteLineChart.returns"
            :passings="minuteLineChart.passings"
            @getLineChartTimeRange="getLineChartTimeRange"
            :disableOption="false"
            :options="options"
            @optionChange="getLineChartTimeRange"
        >
        </traffic-trend-line-chart>
        <traffic-trend-line-chart
            type="hourly"
            :labels="hourlyLineChart.labels"
            :enters="hourlyLineChart.enters"
            :exits="hourlyLineChart.exits"
            :returns="hourlyLineChart.returns"
            :passings="hourlyLineChart.passings"
            @getLineChartDate="getLineChartDate"
            :disableOption="false"
            :options="options"
            @optionChange="getLineChartDate"
        >
        </traffic-trend-line-chart>
        <traffic-trend-line-chart
            :labels="dailyLineChart.labels"
            :enters="dailyLineChart.enters"
            :exits="dailyLineChart.exits"
            :returns="dailyLineChart.returns"
            :passings="dailyLineChart.passings"
            @getLineChartDateRange="getLineChartDateRange"
            :disableOption="false"
            :options="options"
            @optionChange="getLineChartDateRange"
        >
        </traffic-trend-line-chart> -->
    </div>
</template>
<script>
import {
    // BaseSelectorInput,
    // BaseInput,
    CategoryCard,
    StatsCard,
    TrafficsCard,
    TrafficTrendLineChart,
} from "@/components/index";
import { DatePicker, Select, Option } from "element-ui";

export default {
    components: {
        [Option.name]: Option,
        [Select.name]: Select,
        [DatePicker.name]: DatePicker,
        // BaseSelectorInput,
        // BaseInput,
        CategoryCard,
        StatsCard,
        TrafficsCard,
        TrafficTrendLineChart,
    },
    data() {
        // let today = this.$moment();
        // let todayString = today.format("YYYY-MM-DD");
        // let tomorrowString = today.add(1, 'days').format("YYYY-MM-DD");
        // let yesterdayString = today.subtract(2, 'days').format("YYYY-MM-DD");
        return {
            byStoreSelectedType: "enter",
            byStoreSelectedDateRange: "today",
            byStore: [],

            byFloorSelectedType: "enter",
            byFloorSelectedDateRange: "today",
            byFloor: [],

            deviceOptions: [],

            totalTrafficsSelectedDateRange: "today",
            // totalTrafficsSelectedStartDate: todayString,
            // totalTrafficsSelectedEndDate: tomorrowString,
            totalTrafficsSelected2DateRange: "",
            totalTrafficsSelectedStores: "",
            totalTrafficsStoreOptions: [],
            totalTrafficsStoreOptionsLength: 0,
            totalTrafficsSelectedDevices: "",
            totalTrafficsDeviceOptions: [],
            totalTraffics: {
                enter: 0,
                exit: 0,
                return: 0,
                passing: 0,
            },

            comparisonTotalTrafficsSelectedStores: "",
            comparisonTotalTrafficsStoreOptions: [],
            comparisonTotalTrafficsStoreOptionsLength: 0,
            comparisonTotalTrafficsSelectedDevices: "",
            comparisonTotalTrafficsDeviceOptions: [],
            comparisonTotalTrafficsTypes: ["enter", "passing"],
            comparisonTotalTraffics: {
                today: {
                    enter: 0,
                    exit: 0,
                    return: 0,
                    passing: 0,
                },
                yesterday: {
                    enter: 0,
                    exit: 0,
                    return: 0,
                    passing: 0,
                },
                thisWeek: {
                    enter: 0,
                    exit: 0,
                    return: 0,
                    passing: 0,
                },
                lastWeek: {
                    enter: 0,
                    exit: 0,
                    return: 0,
                    passing: 0,
                },
                thisMonth: {
                    enter: 0,
                    exit: 0,
                    return: 0,
                    passing: 0,
                },
                lastMonth: {
                    enter: 0,
                    exit: 0,
                    return: 0,
                    passing: 0,
                },
            },
            specificComparisonTotalTrafficsTypes: ["enter", "return", "passing"],
            specificComparisonTotalTrafficsSelectedDateRange1: "today",
            // specificComparisonTotalTrafficsSelectedStartDate1: todayString,
            // specificComparisonTotalTrafficsSelectedEndDate1: tomorrowString,
            specificComparisonTotalTraffics2SelectedDateRange1: "",
            specificComparisonTotalTrafficsSelectedStores1: "",
            specificComparisonTotalTrafficsStoreOptions1: [],
            specificComparisonTotalTrafficsStoreOptions1Length: 0,
            specificComparisonTotalTrafficsSelectedDevices1: "",
            specificComparisonTotalTrafficsDeviceOptions1: [],

            specificComparisonTotalTrafficsSelectedDateRange2: "yesterday",
            // specificComparisonTotalTrafficsSelectedStartDate2: yesterdayString,
            // specificComparisonTotalTrafficsSelectedEndDate2: todayString,
            specificComparisonTotalTraffics2SelectedDateRange2: "",
            specificComparisonTotalTrafficsSelectedStores2: "",
            specificComparisonTotalTrafficsStoreOptions2: [],
            specificComparisonTotalTrafficsStoreOptions2Length: 0,
            specificComparisonTotalTrafficsSelectedDevices2: "",
            specificComparisonTotalTrafficsDeviceOptions2: [],
            specificComparisonTotalTraffics1: {
                enter: 0,
                exit: 0,
                return: 0,
                passing: 0,
            },
            specificComparisonTotalTraffics2: {
                enter: 0,
                exit: 0,
                return: 0,
                passing: 0,
            },

            trendLineChartLabels: [],
            trendLineChartLines: [],
        }
    },
    mounted() {
        this.init().then(() => {
            this.getByStore();
            this.getByFloor();
            this.getTotalTraffics();
            this.getComparisonTotalTraffics();
            this.getSpecificComparisonTotalTraffics1();
            this.getSpecificComparisonTotalTraffics2();
        });
    },
    methods: {
        async init() {
            this.totalTraffics = {
                enter: 0,
                exit: 0,
                return: 0,
                passing: 0,
            };
            this.comparisonTotalTraffics = {
                today: {
                    enter: 0,
                    exit: 0,
                    return: 0,
                    passing: 0,
                },
                yesterday: {
                    enter: 0,
                    exit: 0,
                    return: 0,
                    passing: 0,
                },
                thisWeek: {
                    enter: 0,
                    exit: 0,
                    return: 0,
                    passing: 0,
                },
                lastWeek: {
                    enter: 0,
                    exit: 0,
                    return: 0,
                    passing: 0,
                },
                thisMonth: {
                    enter: 0,
                    exit: 0,
                    return: 0,
                    passing: 0,
                },
                lastMonth: {
                    enter: 0,
                    exit: 0,
                    return: 0,
                    passing: 0,
                },
            },
            await this.initStore();
            await this.initDevice();
        },
        async initStore() {
            await this.$store.dispatch('store/getAll').then(() => {
                let stores = this.$store.getters["store/models"];
                let tmpByStore = [];
                let tmpStoreOptions = [];
                for (let i = 0; i < stores.length; i++) {
                    tmpByStore.push({
                        id: stores[i].store_id,
                        name: stores[i].store_name,
                        enter: 0,
                        exit: 0,
                        return: 0,
                        passing: 0,
                    });
                    tmpStoreOptions.push({
                        value: stores[i].store_id,
                        label: stores[i].store_name,
                    });
                }
                this.byStore = tmpByStore;
                this.totalTrafficsStoreOptions = tmpStoreOptions;
                this.comparisonTotalTrafficsStoreOptions = tmpStoreOptions;
                this.specificComparisonTotalTrafficsStoreOptions1 = tmpStoreOptions;
                this.specificComparisonTotalTrafficsStoreOptions2 = tmpStoreOptions;
            });
        },
        async initDevice() {
            await this.$store.dispatch('inStoreTraffic/getAll').then(() => {
                let devices = this.$store.getters["inStoreTraffic/models"];
                let tmpByFloor = [];
                let tmpDeviceOptions = [];
                for (let i = 0; i < devices.length; i++) {
                    let doesByFloorExist = false;
                    for (let j = 0; j < tmpByFloor.length; j++) {
                        if (devices[i].floor == tmpByFloor[j].id) {
                            doesByFloorExist = true;
                            break;
                        }
                    }
                    if (!doesByFloorExist) {
                        tmpByFloor.push({
                            id: devices[i].floor,
                            name: devices[i].floor,
                            enter: 0,
                            exit: 0,
                            return: 0,
                            passing: 0,
                            icon: "fa-solid fa-layer-group"
                        });
                    }
                    tmpDeviceOptions.push({
                        value: devices[i].device_id,
                        label: devices[i].device_description,
                        storeId: devices[i].store_id,
                    });
                }
                this.byFloor = tmpByFloor;
                this.deviceOptions = tmpDeviceOptions;
                this.totalTrafficsDeviceOptions = tmpDeviceOptions;
                this.comparisonTotalTrafficsDeviceOptions = tmpDeviceOptions;
                this.specificComparisonTotalTrafficsDeviceOptions1 = tmpDeviceOptions;
                this.specificComparisonTotalTrafficsDeviceOptions2 = tmpDeviceOptions;
            });
        },

        goToStore(storeId) {
            this.$router.push({
                name: "Store Detail",
                params: {
                    storeId: storeId,
                    previousRoute: this.$router.currentRoute.name,
                }
            });
        },
        byStoreTypeSelectorChange() {
            // this.getByStore();
        },
        byStoreDateRangeSelectorChange() {
            this.getByStore();
        },
        async getByStore() {
            await this.$store.dispatch('decode/decodeDateRange', this.byStoreSelectedDateRange).then((dateRange) => {
                for (let i = 0; i < this.byStore.length; i++) {
                    this.$store.dispatch('inStoreTraffic/getTotalTraffics', {
                        param: `store_id=${this.byStore[i].id}&date=${dateRange}`
                    }).then((response) => {
                        // let totalTraffics = this.$store.getters["inStoreTraffic/totalTraffics"];
                        let totalTraffics = response;
                        this.byStore[i].enter = totalTraffics.enter;
                        this.byStore[i].exit = totalTraffics.exit;
                        this.byStore[i].return = totalTraffics.return;
                        this.byStore[i].passing = totalTraffics.passing;
                    });
                }
            });
        },
        decodeByStoreValue(value) {
            if (this.byStoreSelectedType == 'enter') {
                return value.enter;
            } else if (this.byStoreSelectedType == 'exit') {
                return value.exit;
            } else if (this.byStoreSelectedType == 'return') {
                return value.return;
            } else if (this.byStoreSelectedType == 'passing') {
                return value.passing;
            } else {
                return 0;
            }
        },

        byFloorSelectorChange() {
            // this.getByFloor();
        },
        byFloorDateRangeSelectorChange() {
            this.getByFloor();
        },
        async getByFloor() {
            await this.$store.dispatch('decode/decodeDateRange', this.byFloorSelectedDateRange).then((dateRange) => {
                for (let i = 0; i < this.byFloor.length; i++) {
                    this.$store.dispatch('inStoreTraffic/getTotalTraffics', {
                        param: `floor=${this.byFloor[i].id}&date=${dateRange}`
                    }).then((response) => {
                        let totalTraffics = response;
                        this.byFloor[i].enter = totalTraffics.enter;
                        this.byFloor[i].exit = totalTraffics.exit;
                        this.byFloor[i].return = totalTraffics.return;
                        this.byFloor[i].passing = totalTraffics.passing;
                    });
                }
            });
        },
        decodeByFloorValue(value) {
            if (this.byFloorSelectedType == 'enter') {
                return value.enter;
            } else if (this.byFloorSelectedType == 'exit') {
                return value.exit;
            } else if (this.byFloorSelectedType == 'return') {
                return value.return;
            } else if (this.byFloorSelectedType == 'passing') {
                return value.passing;
            } else {
                return 0;
            }
        },

        totalTrafficsDateRangeSelectorChange() {
            this.getTotalTraffics();
        },
        totalTrafficsStartDateChange() {
            this.getTotalTraffics();
        },
        totalTrafficsEndDateChange() {
            this.getTotalTraffics();
        },
        totalTrafficsChange() {
            this.getTotalTraffics();
        },
        totalTrafficsStoresChange(storeOptions) {
            if (storeOptions.length == 0) {
                this.totalTrafficsDeviceOptions = this.deviceOptions;
            } else {
                let tmpStoreOptions = [];
                for (let i = 0; i < storeOptions.length; i++) {
                    for (let j = 0; j < this.deviceOptions.length; j++) {
                        if (this.deviceOptions[j].storeId == storeOptions[i]) {
                            tmpStoreOptions.push(j);
                        }
                    }
                }
                let tmpDeviceOptions = [];
                for (let i = 0; i < tmpStoreOptions.length; i++) {
                    tmpDeviceOptions.push({
                        value: this.deviceOptions[tmpStoreOptions[i]].value,
                        label: this.deviceOptions[tmpStoreOptions[i]].label,
                    });
                }
                this.totalTrafficsDeviceOptions = tmpDeviceOptions;
            }
            if (storeOptions.length != 0 && this.totalTrafficsStoreOptionsLength > storeOptions.length) {
                this.totalTrafficsSelectedDevices = "";
            }
            this.totalTrafficsStoreOptionsLength = storeOptions.length;
            this.getTotalTraffics();
        },
        totalTrafficsDevicesChange() {
            this.getTotalTraffics();
        },
        async getTotalTraffics() {
            let param = '';
            if (this.totalTrafficsSelectedStores.length > 0) {
                param += `&store_id=${this.totalTrafficsSelectedStores.join()}`;
            }
            if (this.totalTrafficsSelectedDevices.length > 0) {
                param += `&device_id=${this.totalTrafficsSelectedDevices.join()}`;
            }
            if (this.totalTrafficsSelectedDateRange == 'custom') {
                this.$store.dispatch('inStoreTraffic/getTotalTraffics', {
                    param: `date=${this.totalTrafficsSelectedStartDate},${this.totalTrafficsSelectedEndDate}` + param
                }).then((response) => {
                        let totalTraffics = response;
                    this.totalTraffics = {
                        enter: totalTraffics.enter,
                        exit: totalTraffics.exit,
                        return: totalTraffics.return,
                        passing: totalTraffics.passing,
                    };
                });
            } else {
                await this.$store.dispatch('decode/decodeDateRange', this.totalTrafficsSelectedDateRange).then((dateRange) => {
                    this.$store.dispatch('inStoreTraffic/getTotalTraffics', {
                        param: `date=${dateRange}` + param
                    }).then((response) => {
                        let totalTraffics = response;
                        this.totalTraffics = {
                            enter: totalTraffics.enter,
                            exit: totalTraffics.exit,
                            return: totalTraffics.return,
                            passing: totalTraffics.passing,
                        };
                    });
                });
            }
        },

        comparisonTotalTrafficsStoresChange(storeOptions) {
            if (storeOptions.length == 0) {
                this.comparisonTotalTrafficsDeviceOptions = this.deviceOptions;
            } else {
                let tmpStoreOptions = [];
                for (let i = 0; i < storeOptions.length; i++) {
                    for (let j = 0; j < this.deviceOptions.length; j++) {
                        if (this.deviceOptions[j].storeId == storeOptions[i]) {
                            tmpStoreOptions.push(j);
                        }
                    }
                }
                let tmpDeviceOptions = [];
                for (let i = 0; i < tmpStoreOptions.length; i++) {
                    tmpDeviceOptions.push({
                        value: this.deviceOptions[tmpStoreOptions[i]].value,
                        label: this.deviceOptions[tmpStoreOptions[i]].label,
                    });
                }
                this.comparisonTotalTrafficsDeviceOptions = tmpDeviceOptions;
            }
            if (storeOptions.length != 0 && this.comparisonTotalTrafficsStoreOptionsLength > storeOptions.length) {
                this.comparisonTotalTrafficsSelectedDevices = "";
            }
            this.comparisonTotalTrafficsStoreOptionsLength = storeOptions.length;
            this.getComparisonTotalTraffics();
        },
        comparisonTotalTrafficsDevicesChange() {
            this.getComparisonTotalTraffics();
        },
        async getComparisonTotalTraffics() {
            let param = '';
            if (this.comparisonTotalTrafficsSelectedStores.length > 0) {
                param += `&store_id=${this.comparisonTotalTrafficsSelectedStores.join()}`;
            }
            if (this.comparisonTotalTrafficsSelectedDevices.length > 0) {
                param += `&device_id=${this.comparisonTotalTrafficsSelectedDevices.join()}`;
            }
            await this.$store.dispatch('decode/decodeDateRange', 'today').then((dateRange) => {
                this.$store.dispatch('inStoreTraffic/getTotalTraffics', {
                    param: `date=${dateRange}` + param
                }).then((response) => {
                    let totalTraffics = response;
                    this.comparisonTotalTraffics.today = {
                        enter: totalTraffics.enter,
                        exit: totalTraffics.exit,
                        return: totalTraffics.return,
                        passing: totalTraffics.passing,
                    };
                });
            });
            await this.$store.dispatch('decode/decodeDateRange', 'yesterday').then((dateRange) => {
                this.$store.dispatch('inStoreTraffic/getTotalTraffics', {
                    param: `date=${dateRange}` + param
                }).then((response) => {
                    let totalTraffics = response;
                    this.comparisonTotalTraffics.yesterday = {
                        enter: totalTraffics.enter,
                        exit: totalTraffics.exit,
                        return: totalTraffics.return,
                        passing: totalTraffics.passing,
                    };
                });
            });
            await this.$store.dispatch('decode/decodeDateRange', 'weekTillDate').then((dateRange) => {
                this.$store.dispatch('inStoreTraffic/getTotalTraffics', {
                    param: `date=${dateRange}` + param
                }).then((response) => {
                    let totalTraffics = response;
                    this.comparisonTotalTraffics.thisWeek = {
                        enter: totalTraffics.enter,
                        exit: totalTraffics.exit,
                        return: totalTraffics.return,
                        passing: totalTraffics.passing,
                    };
                });
            });
            await this.$store.dispatch('decode/decodeDateRange', 'lastWeek').then((dateRange) => {
                this.$store.dispatch('inStoreTraffic/getTotalTraffics', {
                    param: `date=${dateRange}` + param
                }).then((response) => {
                    let totalTraffics = response;
                    this.comparisonTotalTraffics.lastWeek = {
                        enter: totalTraffics.enter,
                        exit: totalTraffics.exit,
                        return: totalTraffics.return,
                        passing: totalTraffics.passing,
                    };
                });
            });
            await this.$store.dispatch('decode/decodeDateRange', 'monthTillDate').then((dateRange) => {
                this.$store.dispatch('inStoreTraffic/getTotalTraffics', {
                    param: `date=${dateRange}` + param
                }).then((response) => {
                    let totalTraffics = response;
                    this.comparisonTotalTraffics.thisMonth = {
                        enter: totalTraffics.enter,
                        exit: totalTraffics.exit,
                        return: totalTraffics.return,
                        passing: totalTraffics.passing,
                    };
                });
            });
            await this.$store.dispatch('decode/decodeDateRange', 'lastMonth').then((dateRange) => {
                this.$store.dispatch('inStoreTraffic/getTotalTraffics', {
                    param: `date=${dateRange}` + param
                }).then((response) => {
                    let totalTraffics = response;
                    this.comparisonTotalTraffics.lastMonth = {
                        enter: totalTraffics.enter,
                        exit: totalTraffics.exit,
                        return: totalTraffics.return,
                        passing: totalTraffics.passing,
                    };
                });
            });
        },
        specificComparisonTotalTrafficsDateRangeSelectorChange1() {
            this.getSpecificComparisonTotalTraffics1();
        },
        specificComparisonTotalTrafficsStartDateChange1() {
            this.getSpecificComparisonTotalTraffics1();
        },
        specificComparisonTotalTrafficsEndDateChange1() {
            this.getSpecificComparisonTotalTraffics1();
        },
        specificComparisonTotalTrafficsDateRangeChange1() {
            this.getSpecificComparisonTotalTraffics1();
        },
        specificComparisonTotalTrafficsStoresChange1(storeOptions) {
            if (storeOptions.length == 0) {
                this.specificComparisonTotalTrafficsDeviceOptions1 = this.deviceOptions;
            } else {
                let tmpStoreOptions = [];
                for (let i = 0; i < storeOptions.length; i++) {
                    for (let j = 0; j < this.deviceOptions.length; j++) {
                        if (this.deviceOptions[j].storeId == storeOptions[i]) {
                            tmpStoreOptions.push(j);
                        }
                    }
                }
                let tmpDeviceOptions = [];
                for (let i = 0; i < tmpStoreOptions.length; i++) {
                    tmpDeviceOptions.push({
                        value: this.deviceOptions[tmpStoreOptions[i]].value,
                        label: this.deviceOptions[tmpStoreOptions[i]].label,
                    });
                }
                this.specificComparisonTotalTrafficsDeviceOptions1 = tmpDeviceOptions;
            }
            if (storeOptions.length != 0 && this.specificComparisonTotalTrafficsStoreOptions1Length > storeOptions.length) {
                this.specificComparisonTotalTrafficsSelectedDevices1 = "";
            }
            this.specificComparisonTotalTrafficsStoreOptions1Length = storeOptions.length;
            this.getSpecificComparisonTotalTraffics1();
        },
        specificComparisonTotalTrafficsDevicesChange1() {
            this.getSpecificComparisonTotalTraffics1();
        },
        async getSpecificComparisonTotalTraffics1() {
            let param = '';
            if (this.specificComparisonTotalTrafficsSelectedStores1.length > 0) {
                param += `&store_id=${this.specificComparisonTotalTrafficsSelectedStores1.join()}`;
            }
            if (this.specificComparisonTotalTrafficsSelectedDevices1.length > 0) {
                param += `&device_id=${this.specificComparisonTotalTrafficsSelectedDevices1.join()}`;
            }
            if (this.specificComparisonTotalTrafficsSelectedDateRange1 == 'custom') {
                this.$store.dispatch('inStoreTraffic/getTotalTraffics', {
                    param: `date=${this.specificComparisonTotalTrafficsSelectedStartDate1},${this.specificComparisonTotalTrafficsSelectedEndDate1}` + param
                }).then((response) => {
                    this.specificComparisonTotalTraffics1 = {
                        enter: response.enter,
                        exit: response.exit,
                        return: response.return,
                        passing: response.passing,
                    };
                });
            } else {
                await this.$store.dispatch('decode/decodeDateRange', this.specificComparisonTotalTrafficsSelectedDateRange1).then((dateRange) => {
                    this.$store.dispatch('inStoreTraffic/getTotalTraffics', {
                        param: `date=${dateRange}` + param
                    }).then((response) => {
                        this.specificComparisonTotalTraffics1 = {
                            enter: response.enter,
                            exit: response.exit,
                            return: response.return,
                            passing: response.passing,
                        };
                    });
                });
            }
        },
        specificComparisonTotalTrafficsDateRangeSelectorChange2() {
            this.getSpecificComparisonTotalTraffics2();
        },
        specificComparisonTotalTrafficsStartDateChange2() {
            this.getSpecificComparisonTotalTraffics2();
        },
        specificComparisonTotalTrafficsEndDateChange2() {
            this.getSpecificComparisonTotalTraffics2();
        },
        specificComparisonTotalTrafficsDateRangeChange2() {
            this.getSpecificComparisonTotalTraffics2();
        },
        specificComparisonTotalTrafficsStoresChange2(storeOptions) {
            if (storeOptions.length == 0) {
                this.specificComparisonTotalTrafficsDeviceOptions2 = this.deviceOptions;
            } else {
                let tmpStoreOptions = [];
                for (let i = 0; i < storeOptions.length; i++) {
                    for (let j = 0; j < this.deviceOptions.length; j++) {
                        if (this.deviceOptions[j].storeId == storeOptions[i]) {
                            tmpStoreOptions.push(j);
                        }
                    }
                }
                let tmpDeviceOptions = [];
                for (let i = 0; i < tmpStoreOptions.length; i++) {
                    tmpDeviceOptions.push({
                        value: this.deviceOptions[tmpStoreOptions[i]].value,
                        label: this.deviceOptions[tmpStoreOptions[i]].label,
                    });
                }
                this.specificComparisonTotalTrafficsDeviceOptions2 = tmpDeviceOptions;
            }
            if (storeOptions.length != 0 && this.specificComparisonTotalTrafficsStoreOptions2Length > storeOptions.length) {
                this.specificComparisonTotalTrafficsSelectedDevices2 = "";
            }
            this.specificComparisonTotalTrafficsStoreOptions2Length = storeOptions.length;
            this.getSpecificComparisonTotalTraffics2();
        },
        specificComparisonTotalTrafficsDevicesChange2() {
            this.getSpecificComparisonTotalTraffics2();
        },
        async getSpecificComparisonTotalTraffics2() {
            let param = '';
            if (this.specificComparisonTotalTrafficsSelectedStores2.length > 0) {
                param += `&store_id=${this.specificComparisonTotalTrafficsSelectedStores2.join()}`;
            }
            if (this.specificComparisonTotalTrafficsSelectedDevices2.length > 0) {
                param += `&device_id=${this.specificComparisonTotalTrafficsSelectedDevices2.join()}`;
            }
            if (this.specificComparisonTotalTrafficsSelectedDateRange2 == 'custom') {
                this.$store.dispatch('inStoreTraffic/getTotalTraffics', {
                    param: `date=${this.specificComparisonTotalTrafficsSelectedStartDate2},${this.specificComparisonTotalTrafficsSelectedEndDate2}` + param
                }).then((response) => {
                    this.specificComparisonTotalTraffics2 = {
                        enter: response.enter,
                        exit: response.exit,
                        return: response.return,
                        passing: response.passing,
                    };
                });
            } else {
                await this.$store.dispatch('decode/decodeDateRange', this.specificComparisonTotalTrafficsSelectedDateRange2).then((dateRange) => {
                    this.$store.dispatch('inStoreTraffic/getTotalTraffics', {
                        param: `date=${dateRange}` + param
                    }).then((response) => {
                        this.specificComparisonTotalTraffics2 = {
                            enter: response.enter,
                            exit: response.exit,
                            return: response.return,
                            passing: response.passing,
                        };
                    });
                });
            }
        },


        async trafficTrendChartChange(param) {
            let queries = [];
            if (param.chartType == 'daily') {
                if (param.dateRange == 'custom') {
                    let tmpTrendLineChartLabels = [];
                    let tmpStartDate = this.$moment(param.startDate);
                    let tmpStartDate2 = this.$moment(param.startDate);
                    let tmpEndDate = this.$moment(param.endDate);
                    let tmpEndDate2 = this.$moment(param.endDate);
                    let daysDifference = tmpEndDate.diff(tmpStartDate, 'days');
                    // if (daysDifference > 10) {
                    //     this.$swal.fire({
                    //         text: this.$t('alert.trafficTrendChartDateRangeExceeded'),
                    //         showCancelButton: false,
                    //         confirmButtonText: this.$t('component.ok'),
                    //         icon: "warning",
                    //     });
                    //     return;
                    // }
                    for (let i = 0; i < daysDifference + 1; i++) {
                        tmpTrendLineChartLabels.push(tmpStartDate.format('YYYY-MM-DD (ddd)'));
                        tmpStartDate.add(1, 'days');
                    }
                    if (param.startDate && param.endDate) {
                        this.trendLineChartLabels = tmpTrendLineChartLabels;
                        queries.push({
                            label: this.$t('dashboard.all'),
                            dateRange: `${tmpStartDate2.format('YYYY-MM-DD')},${tmpEndDate2.format('YYYY-MM-DD')}`,
                            startDate: tmpStartDate2,
                            endDate: tmpEndDate2,
                            daysDifference: daysDifference + 1,
                            query: '',
                        });
                        for (let i = 0; i < param.stores.length; i++) {
                            for (let j = 0; j < this.totalTrafficsStoreOptions.length; j++) {
                                if (this.totalTrafficsStoreOptions[j].value == param.stores[i]) {
                                    queries.push({
                                        label: this.totalTrafficsStoreOptions[j].label,
                                        dateRange: `${tmpStartDate2.format('YYYY-MM-DD')},${tmpEndDate2.format('YYYY-MM-DD')}`,
                                        startDate: tmpStartDate2,
                                        endDate: tmpEndDate2,
                                        daysDifference: daysDifference + 1,
                                        query: `&store_id=${param.stores[i]}`
                                    });
                                    break;
                                }
                            }
                        }
                        for (let i = 0; i < param.devices.length; i++) {
                            for (let j = 0; j < this.totalTrafficsDeviceOptions.length; j++) {
                                if (this.totalTrafficsDeviceOptions[j].value == param.devices[i]) {
                                    queries.push({
                                        label: this.totalTrafficsDeviceOptions[j].label,
                                        dateRange: `${tmpStartDate2.format('YYYY-MM-DD')},${tmpEndDate2.format('YYYY-MM-DD')}`,
                                        startDate: tmpStartDate2,
                                        endDate: tmpEndDate2,
                                        daysDifference: daysDifference + 1,
                                        query: `&device_id=${param.devices[i]}`
                                    });
                                    break;
                                }
                            }
                        }
                    }
                } else {
                    await this.$store.dispatch('decode/decodeDateRangeOneDayBefore', param.dateRange).then((dateRange) => {
                        let tmpTrendLineChartLabels = [];
                        let tmpStartDate = this.$moment(dateRange.substring(0, 10));
                        let tmpEndDate = this.$moment(dateRange.substring(11, 21));
                        let daysDifference = tmpEndDate.diff(tmpStartDate, 'days');
                        for (let i = 0; i < daysDifference + 1; i++) {
                            tmpTrendLineChartLabels.push(tmpStartDate.format('YYYY-MM-DD (ddd)'));
                            tmpStartDate.add(1, 'days');
                        }
                        this.trendLineChartLabels = tmpTrendLineChartLabels;

                        queries.push({
                            label: this.$t('dashboard.all'),
                            dateRange: dateRange,
                            startDate: tmpStartDate,
                            endDate: tmpEndDate,
                            daysDifference: daysDifference + 1,
                            query: '',
                        });
                        for (let i = 0; i < param.stores.length; i++) {
                            for (let j = 0; j < this.totalTrafficsStoreOptions.length; j++) {
                                if (this.totalTrafficsStoreOptions[j].value == param.stores[i]) {
                                    queries.push({
                                        label: this.totalTrafficsStoreOptions[j].label,
                                        dateRange: dateRange,
                                        startDate: tmpStartDate,
                                        endDate: tmpEndDate,
                                        daysDifference: daysDifference + 1,
                                        query: `&store_id=${param.stores[i]}`
                                    });
                                    break;
                                }
                            }
                        }
                        for (let i = 0; i < param.devices.length; i++) {
                            for (let j = 0; j < this.totalTrafficsDeviceOptions.length; j++) {
                                if (this.totalTrafficsDeviceOptions[j].value == param.devices[i]) {
                                    queries.push({
                                        label: this.totalTrafficsDeviceOptions[j].label,
                                        dateRange: dateRange,
                                        startDate: tmpStartDate,
                                        endDate: tmpEndDate,
                                        daysDifference: daysDifference + 1,
                                        query: `&device_id=${param.devices[i]}`
                                    });
                                    break;
                                }
                            }
                        }
                    });
                }
                let lines = [];
                let tmpFlag = 0;
                if (queries.length > 0) {
                    for (let i = 0; i < queries.length; i++) {
                        await this.getDailyTrafficTrendChart(lines, i, queries[i].daysDifference, queries[i].label, queries[i].dateRange, queries[i].startDate, queries[i].endDate, queries[i].query).then(() => {
                            tmpFlag++;
                            if (tmpFlag == queries.length) {
                                this.trendLineChartLines = lines;
                            }
                        });
                    }
                }
            } else if (param.chartType == 'hourly') {
                let tmpTrendLineChartLabels = [];
                let tmpDate = this.$moment(param.date);
                let tmpDate2 = this.$moment(param.date);
                let today = this.$moment();
                if (today.format("YYYY-MM-DD") == tmpDate.format("YYYY-MM-DD")) {
                    for (let i = 0; i < today.hour() + 1; i++) {
                        tmpTrendLineChartLabels.push(tmpDate2.format('hh:mm a'));
                        tmpDate2.add(60, 'minutes');
                    }
                } else {
                    for (let i = 0; i < 24; i++) {
                        tmpTrendLineChartLabels.push(tmpDate2.format('hh:mm a'));
                        tmpDate2.add(60, 'minutes');
                    }
                }
                this.trendLineChartLabels = tmpTrendLineChartLabels;

                queries.push({
                    label: this.$t('dashboard.all'),
                    date: tmpDate.format("YYYY-MM-DD"),
                    query: '',
                });
                for (let i = 0; i < param.stores.length; i++) {
                    for (let j = 0; j < this.totalTrafficsStoreOptions.length; j++) {
                        if (this.totalTrafficsStoreOptions[j].value == param.stores[i]) {
                            queries.push({
                                label: this.totalTrafficsStoreOptions[j].label,
                                date: tmpDate.format("YYYY-MM-DD"),
                                query: `&store_id=${param.stores[i]}`
                            });
                            break;
                        }
                    }
                }
                for (let i = 0; i < param.devices.length; i++) {
                    for (let j = 0; j < this.totalTrafficsDeviceOptions.length; j++) {
                        if (this.totalTrafficsDeviceOptions[j].value == param.devices[i]) {
                            queries.push({
                                label: this.totalTrafficsDeviceOptions[j].label,
                                date: tmpDate.format("YYYY-MM-DD"),
                                query: `&device_id=${param.devices[i]}`
                            });
                            break;
                        }
                    }
                }
                
                let lines = [];
                let tmpFlag = 0;
                for (let i = 0; i < queries.length; i++) {
                    await this.getHourlyTrafficTrendChart(lines, tmpTrendLineChartLabels.length, queries[i].label, queries[i].date, queries[i].query).then(() => {
                        tmpFlag++;
                        if (tmpFlag == queries.length) {
                            this.trendLineChartLines = lines;
                        }
                    });
                }
            } else if (param.chartType == 'minute15') {
                let tmpTrendLineChartLabels = [];
                let tmpDate = this.$moment(param.date);
                let tmpDate2 = this.$moment(param.date);
                let today = this.$moment();
                if (today.format("YYYY-MM-DD") == tmpDate.format("YYYY-MM-DD")) {
                    for (let i = 0; i < today.hour() + 1; i++) {
                        if (i != today.hour()) {
                            for (let j = 0; j < 4; j++) {
                                tmpTrendLineChartLabels.push(tmpDate2.format('hh:mm a'));
                                tmpDate2.add(15, 'minutes');
                            }
                        } else {
                            for (let j = 0; j < (today.minute() / 15) + 1; j++) {
                                tmpTrendLineChartLabels.push(tmpDate2.format('hh:mm a'));
                                tmpDate2.add(15, 'minutes');
                            }
                        }
                    }
                } else {
                    for (let i = 0; i < 24; i++) {
                        for (let j = 0; j < 4; j++) {
                            tmpTrendLineChartLabels.push(tmpDate2.format('hh:mm a'));
                            tmpDate2.add(15, 'minutes');
                        }
                    }
                }
                this.trendLineChartLabels = tmpTrendLineChartLabels;

                queries.push({
                    label: this.$t('dashboard.all'),
                    date: tmpDate.format("YYYY-MM-DD"),
                    query: '',
                });
                for (let i = 0; i < param.stores.length; i++) {
                    for (let j = 0; j < this.totalTrafficsStoreOptions.length; j++) {
                        if (this.totalTrafficsStoreOptions[j].value == param.stores[i]) {
                            queries.push({
                                label: this.totalTrafficsStoreOptions[j].label,
                                date: tmpDate.format("YYYY-MM-DD"),
                                query: `&store_id=${param.stores[i]}`
                            });
                            break;
                        }
                    }
                }
                for (let i = 0; i < param.devices.length; i++) {
                    for (let j = 0; j < this.totalTrafficsDeviceOptions.length; j++) {
                        if (this.totalTrafficsDeviceOptions[j].value == param.devices[i]) {
                            queries.push({
                                label: this.totalTrafficsDeviceOptions[j].label,
                                date: tmpDate.format("YYYY-MM-DD"),
                                query: `&device_id=${param.devices[i]}`
                            });
                            break;
                        }
                    }
                }
                
                let lines = [];
                let tmpFlag = 0;
                for (let i = 0; i < queries.length; i++) {
                    await this.getMinuteTrafficTrendChart(lines, tmpTrendLineChartLabels.length, queries[i].label, queries[i].date, queries[i].query).then(() => {
                        tmpFlag++;
                        if (tmpFlag == queries.length) {
                            this.trendLineChartLines = lines;
                        }
                    });
                }
            }
        },
        async getDailyTrafficTrendChart(lines, lineId, daysDifference, label, dateRange, startDate, endDate, query) {
            if (daysDifference > 10) {
                let tmpStartDate = this.$moment(startDate.format('YYYY-MM-DD'));
                let tmpEndDate = this.$moment(endDate.format('YYYY-MM-DD'));
                await this.getDailyTrafficTrendChartExceedDaysDifference(lines, lineId, daysDifference, label, dateRange, tmpStartDate, tmpEndDate, query);
                return;
            }
            await this.$store.dispatch('inStoreTraffic/getDailyTraffics', {
                param: `date=${dateRange}` + query
            }).then((response) => {
                if (response.length == daysDifference) {
                    if (lines.length == lineId) {
                        lines.push({
                            label: label,
                            data: response.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
                        });
                    } else {
                        lines[lineId].data.splice(lines[lineId].data.length, 0, response.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0)));
                    }
                } else if (response.length > daysDifference) {
                    response.splice(response.length - 1, response.length - daysDifference);
                    if (lines.length == lineId) {
                        lines.push({
                            label: label,
                            data: response.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
                        });
                    } else {
                        lines[lineId].data.splice(lines[lineId].data.length, 0, response.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0)));
                    }
                } else {
                    response = response.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
                    let tmpJ = 0;
                    let tmpData = [];
                    loop: for (let i = 0; i < daysDifference; i++) {
                        for (let j = tmpJ; j < response.length; j++) {
                            if (this.trendLineChartLabels[i].substring(0, 10) == response[j].date) {
                                tmpData.push(response[j]);
                                tmpJ++;
                                continue loop;
                            }
                        }
                        tmpData.push({
                            date: this.trendLineChartLabels[i],
                            enter: 0,
                            exit: 0,
                            return: 0,
                            passing: 0,
                        });
                    }
                    if (lines.length == lineId) {
                        lines.push({
                            label: label,
                            data: tmpData,
                        });
                    } else {
                        lines[lineId].data.splice(lines[lineId].data.length, 0, tmpData);
                    }
                }
            });
        },
        async getDailyTrafficTrendChartExceedDaysDifference(lines, lineId, daysDifference, label, dateRange, startDate, endDate, query) {
            if (daysDifference <= 0) {
                return;
            }
            let tmpStartDate = startDate.format('YYYY-MM-DD');
            let tmpEndDate = daysDifference <= 10 ? endDate.format('YYYY-MM-DD') : startDate.add(9, 'days').format('YYYY-MM-DD');
            await this.$store.dispatch('inStoreTraffic/getDailyTraffics', {
                param: `date=${tmpStartDate},${tmpEndDate}` + query
            }).then((response) => {
                if (lines[lineId]) {
                    lines[lineId].data = lines[lineId].data.concat(response.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0)));
                } else {
                    lines.push({
                        label: label,
                        data: response.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
                    });
                }
                if (daysDifference > 10) {
                    this.getDailyTrafficTrendChartExceedDaysDifference(lines, lineId, daysDifference - 10, label, dateRange, startDate.add(1, 'days'), endDate, query);
                    return;
                }
            });
        },
        async getHourlyTrafficTrendChart(lines, timeDifference, label, date, query) {
            await this.$store.dispatch('inStoreTraffic/getMinuteTraffics', {
                param: `date=${date}&interval=60` + query
            }).then((response) => {
                if (response.length == timeDifference) {
                    lines.push({
                        label: label,
                        data: response.sort((a,b) => (a.end_time > b.end_time) ? 1 : ((b.end_time > a.end_time) ? -1 : 0))
                    });
                } else if (response.length > timeDifference) {
                    response.splice(response.length - 1, response.length - timeDifference);
                    lines.push({
                        label: label,
                        data: response.sort((a,b) => (a.end_time > b.end_time) ? 1 : ((b.end_time > a.end_time) ? -1 : 0))
                    });
                } else {
                    response = response.sort((a,b) => (a.end_time > b.end_time) ? 1 : ((b.end_time > a.end_time) ? -1 : 0));
                    let tmpJ = 0;
                    let tmpData = [];
                    loop: for (let i = 0; i < timeDifference; i++) {
                        for (let j = tmpJ; j < response.length; j++) {
                            if (this.trendLineChartLabels[i].substring(0, 2) == response[j].end_time.substring(0, 2)) {
                                tmpData.push(response[j]);
                                tmpJ++;
                                continue loop;
                            }
                        }
                        tmpData.push({
                            date: this.trendLineChartLabels[i],
                            enter: 0,
                            exit: 0,
                            return: 0,
                            passing: 0,
                        });
                    }
                    lines.push({
                        label: label,
                        data: tmpData,
                    });
                }
            });
        },
        async getMinuteTrafficTrendChart(lines, timeDifference, label, date, query) {
            await this.$store.dispatch('inStoreTraffic/getMinuteTraffics', {
                param: `date=${date}&interval=15` + query
            }).then((response) => {
                if (response.length == timeDifference) {
                    lines.push({
                        label: label,
                        data: response.sort((a,b) => (a.end_time > b.end_time) ? 1 : ((b.end_time > a.end_time) ? -1 : 0))
                    });
                } else if (response.length > timeDifference) {
                    response.splice(response.length - 1, response.length - timeDifference);
                    lines.push({
                        label: label,
                        data: response.sort((a,b) => (a.end_time > b.end_time) ? 1 : ((b.end_time > a.end_time) ? -1 : 0))
                    });
                } else {
                    response.splice(response.length, timeDifference - response.length, {
                        end_time: "",
                        enter: 0,
                        exit: 0,
                        return: 0,
                        passing: 0,
                    });
                    lines.push({
                        label: label,
                        data: response.sort((a,b) => (a.end_time > b.end_time) ? 1 : ((b.end_time > a.end_time) ? -1 : 0))
                    });
                }
            });
        },
    }
};

</script>
<style>

</style>