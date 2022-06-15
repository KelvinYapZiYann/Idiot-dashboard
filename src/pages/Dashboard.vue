<template>
    <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
        <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <category-card
                    :title="$t('dashboard.byShop')"
                >
                    <div class="row">
                        <base-selector-input
                            :label="$t('dashboard.type')"
                            v-model="byShopSelectedType"
                            :options="$t('typeOptions')"
                            class="col-6"
                            @input="byShopTypeSelectorChange"
                        ></base-selector-input>
                        <base-selector-input
                            :label="$t('dashboard.timeRange')"
                            v-model="byShopSelectedTimeRange"
                            :options="$t('timeRangeOptions')"
                            class="col-6"
                            @input="byShopTimeRangeSelectorChange"
                            v-show="false"
                        ></base-selector-input>
                    </div>
                    <div class="row">
                        <div 
                            class="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-6 d-flex flex-column justify-content-center"
                            v-for="(value, i) in byShop"
                            :key="i"
                        >
                            <div class="mb-1 font-weight-bold">
                                <span>{{ value.name }}: </span>
                                <span class="font-italic">{{ value.count }}</span>
                            </div>
                            <div class="mb-1">
                                <i class="fa-solid fa-shop card-category-icon warning"></i>
                            </div>
                        </div>
                    </div>
                </category-card>
            </div>

            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <category-card
                    :title="$t('dashboard.byBusinessType')"
                >
                    <div class="row">
                        <base-selector-input
                            :label="$t('dashboard.type')"
                            v-model="byBusinessTypeSelectedType"
                            :options="$t('typeOptions')"
                            class="col-6"
                            @input="byBusinessTypeSelectorChange"
                        ></base-selector-input>
                        <base-selector-input
                            :label="$t('dashboard.timeRange')"
                            v-model="byBusinessTypeSelectedTimeRange"
                            :options="$t('timeRangeOptions')"
                            class="col-6"
                            @input="byBusinessTypeTimeRangeSelectorChange"
                            v-show="false"
                        ></base-selector-input>
                    </div>
                    <div class="row">
                        <div 
                            class="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-6 d-flex flex-column justify-content-center"
                            v-for="(value, i) in byBusinessType"
                            :key="i"
                        >
                            <div class="mb-1 font-weight-bold">
                                <span>{{ value.name }}: </span>
                                <span class="font-italic">{{ value.count }}</span>
                            </div>
                            <div class="mb-1">
                                <i class="card-category-icon primary" :class="value.icon"></i>
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
                        <base-selector-input
                            :label="$t('dashboard.type')"
                            v-model="byFloorSelectedType"
                            :options="$t('typeOptions')"
                            class="col-6"
                            @input="byFloorSelectorChange"
                        ></base-selector-input>
                        <base-selector-input
                            :label="$t('dashboard.timeRange')"
                            v-model="byFloorSelectedTimeRange"
                            :options="$t('timeRangeOptions')"
                            class="col-6"
                            @input="byFloorTimeRangeSelectorChange"
                            v-show="false"
                        ></base-selector-input>
                    </div>
                    <div class="row">
                        <div 
                            class="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-6 d-flex flex-column justify-content-center"
                            v-for="(value, i) in byFloor"
                            :key="i"
                        >
                            <div class="mb-1 font-weight-bold">
                                <span>{{ value.name }}: </span>
                                <span class="font-italic">{{ value.count }}</span>
                            </div>
                            <div class="mb-1">
                                <i class="card-category-icon success" :class="value.icon"></i>
                            </div>
                        </div>
                    </div>
                </category-card>
            </div>

            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <category-card
                    :title="$t('dashboard.byBrand')"
                >
                    <div class="row">
                        <base-selector-input
                            :label="$t('dashboard.type')"
                            v-model="byBrandSelectedType"
                            :options="$t('typeOptions')"
                            class="col-6"
                            @input="byBrandSelectorChange"
                        ></base-selector-input>
                        <base-selector-input
                            :label="$t('dashboard.timeRange')"
                            v-model="byBrandSelectedTimeRange"
                            :options="$t('timeRangeOptions')"
                            class="col-6"
                            @input="byBrandTimeRangeSelectorChange"
                            v-show="false"
                        ></base-selector-input>
                    </div>
                    <div class="row">
                        <div 
                            class="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-6 d-flex flex-column justify-content-center"
                            v-for="(value, i) in byBrand"
                            :key="i"
                        >
                            <div class="mb-1 font-weight-bold">
                                <span>{{ value.name }}: </span>
                                <span class="font-italic">{{ value.count }}</span>
                            </div>
                            <div class="mb-1">
                                <i class="card-category-icon danger" :class="value.icon"></i>
                            </div>
                        </div>
                    </div>
                </category-card>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="todayEnter ? todayEnter : '0'"
                    :sub-title="$t('date.today') + ' ' + $t('property.enter')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                ></stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="todayExit ? todayExit : '0'"
                    :sub-title="$t('date.today') + ' ' + $t('property.exit')"
                    type="warning"
                    icon="fas fa-sign-out-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="todayReturn ? todayReturn : '0'"
                    :sub-title="$t('date.today') + ' ' + $t('property.return')"
                    type="success"
                    icon="fas fa-undo-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="todayPassing ? todayPassing : '0'"
                    :sub-title="$t('date.today') + ' ' + $t('property.passing')"
                    type="neutral"
                    icon="fas fa-times"
                    >
                </stats-card>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="totalTrafficsEnter ? totalTrafficsEnter : '0'"
                    :sub-title="$t('component.total') + ' ' + $t('property.enter')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                    >
                    <!-- <div slot="footer" v-html="asd"></div> -->
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="totalTrafficsExit ? totalTrafficsExit : '0'"
                    :sub-title="$t('component.total') + ' ' + $t('property.exit')"
                    type="warning"
                    icon="fas fa-sign-out-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="totalTrafficsReturn ? totalTrafficsReturn : '0'"
                    :sub-title="$t('component.total') + ' ' + $t('property.return')"
                    type="success"
                    icon="fas fa-undo-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="totalTrafficsPassing ? totalTrafficsPassing : '0'"
                    :sub-title="$t('component.total') + ' ' + $t('property.passing')"
                    type="neutral"
                    icon="fas fa-times"
                    >
                </stats-card>
            </div>
        </div>

        <div class="row">
            <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                <traffics-card
                    :sub-title="$t('date.today')"
                    :previous-title="$t('date.yesterday')"
                    :enter="todayEnter ? todayEnter : 0"
                    :exit="todayExit ? todayExit : 0"
                    :previous-enter="yesterdayEnter ? yesterdayEnter : 0"
                    :previous-exit="yesterdayExit ? yesterdayExit : 0"
                    >
                </traffics-card>
            </div>
            <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                <traffics-card
                    :sub-title="$t('date.thisWeek')"
                    :previous-title="$t('date.lastWeek')"
                    :enter="thisWeekEnter ? thisWeekEnter : 0"
                    :exit="thisWeekExit ? thisWeekExit : 0"
                    :previous-enter="lastWeekEnter ? lastWeekEnter : 0"
                    :previous-exit="lastWeekExit ? lastWeekExit : 0"
                    >
                </traffics-card>
            </div>
            <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                <traffics-card
                    :sub-title="$t('date.thisMonth')"
                    :previous-title="$t('date.lastMonth')"
                    :enter="thisMonthEnter ? thisMonthEnter : 0"
                    :exit="thisMonthExit ? thisMonthExit : 0"
                    :previous-enter="lastMonthEnter ? lastMonthEnter : 0"
                    :previous-exit="lastMonthExit ? lastMonthExit : 0"
                    >
                </traffics-card>
            </div>
        </div>

        <traffic-trend-line-chart
            type="15min"
            :labels="minuteLineChart.labels"
            :enters="minuteLineChart.enters"
            :exits="minuteLineChart.exits"
            :returns="minuteLineChart.returns"
            :passings="minuteLineChart.passings"
            @getLineChartTimeRange="getLineChartTimeRange"
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
        >
        </traffic-trend-line-chart>
        <traffic-trend-line-chart
            :labels="dailyLineChart.labels"
            :enters="dailyLineChart.enters"
            :exits="dailyLineChart.exits"
            :returns="dailyLineChart.returns"
            :passings="dailyLineChart.passings"
            @getLineChartDateRange="getLineChartDateRange"
        >
        </traffic-trend-line-chart>
    </div>
</template>
<script>
import {
    CategoryCard,
    BaseSelectorInput,
    StatsCard,
    TrafficsCard,
    TrafficTrendLineChart,
} from "@/components/index";

export default {
    components: {
        CategoryCard,
        BaseSelectorInput,
        StatsCard,
        TrafficsCard,
        TrafficTrendLineChart,
    },
    data() {
        return {
            byShopSelectedType: "enter",
            byShopSelectedTimeRange: "today",
            byShop: [],

            byBusinessTypeSelectedType: "enter",
            byBusinessTypeSelectedTimeRange: "today",
            byBusinessType: [],

            byFloorSelectedType: "enter",
            byFloorSelectedTimeRange: "today",
            byFloor: [],

            byBrandSelectedType: "enter",
            byBrandSelectedTimeRange: "today",
            byBrand: [],

            totalTrafficsEnter: 0,
            totalTrafficsExit: 0,
            totalTrafficsReturn: 0,
            totalTrafficsPassing: 0,
            todayEnter: 0,
            todayExit: 0,
            todayReturn: 0,
            todayPassing: 0,
            yesterdayEnter: 0,
            yesterdayExit: 0,
            thisWeekEnter: 0,
            thisWeekExit: 0,
            lastWeekEnter: 0,
            lastWeekExit: 0,
            thisMonthEnter: 0,
            thisMonthExit: 0,
            lastMonthEnter: 0,
            lastMonthExit: 0,

            dailyLineChart: {
                labels: [],
                enters: [],
                exits: [],
                returns: [],
                passings: [],
            },
            hourlyLineChart: {
                labels: [],
                enters: [],
                exits: [],
                returns: [],
                passings: [],
            },
			minuteLineChart: {
				labels: [],
				enters: [],
				exits: [],
				returns: [],
				passings: [],
			},
        }
    },
    mounted() {
        this.initResource();
        this.getByShop();
        this.getResource();
        this.getByBusinessType();
        this.getByFloor();
        this.getByBrand();
    },
    methods: {
        async getResource() {
            let loader = this.$loading.show();
            try {
                let today = this.$moment();
                let currentDay = parseInt(today.format('D'));
                let todayDateString = today.add(1, 'days').format('YYYY-MM-DD');
                let yesterday = parseInt(today.subtract(2, 'days').format('D'));
                let thisWeekStartDateString = today.subtract(5, 'days').format('YYYY-MM-DD');
                let lastWeekEndDateString = today.subtract(1, 'days').format('YYYY-MM-DD');
                let lastWeekStartDateString = today.subtract(6, 'days').format('YYYY-MM-DD');
                today = this.$moment();
                let thisMonthStartDateString = today.startOf('month').format('YYYY-MM-DD');
                let thisMonthEndDateString = today.endOf('month').format('YYYY-MM-DD');
                let lastMonthStartDateString = today.subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
                let lastMonthEndDateString = today.endOf('month').format('YYYY-MM-DD');

                await this.$store.dispatch('store/getAll').then(() => {
                    let stores = this.$store.getters["store/models"];
                    
                    stores.forEach((store) => {
                        store.devices.forEach((device) => {
                            this.$store.dispatch('dashboard/getTotalTraffics', {storeId: store.store_id, deviceId: device.device_id}).then(() => {
                                let model = this.$store.getters["dashboard/models"][0];
                                if (model) {
                                    this.totalTrafficsEnter += model.enter;
                                    this.totalTrafficsExit += model.exit;
                                    this.totalTrafficsReturn += model.return;
                                    this.totalTrafficsPassing += model.passing;
                                }
                            });

                            this.$store.dispatch('dashboard/getDailyTrafficsInCustomDateRange', {storeId: store.store_id, deviceId: device.device_id, startDate: thisWeekStartDateString, endDate: todayDateString}).then(() => {
                                let models = this.$store.getters["dashboard/models"];
                                models.forEach((model) => {
                                    this.thisWeekEnter += model.enter;
                                    this.thisWeekExit += model.exit;
                                    let day = model.date.substring(8, 10);
                                    if (parseInt(day) == (currentDay)) {
                                        this.todayEnter = model.enter;
                                        this.todayExit = model.exit;
                                        this.todayReturn = model.return;
                                        this.todayPassing = model.passing;
                                    } else if (parseInt(day) == parseInt(yesterday)) {
                                        this.yesterdayEnter = model.enter;
                                        this.yesterdayExit = model.exit;
                                    }
                                });
                            });

                            this.$store.dispatch('dashboard/getDailyTrafficsInCustomDateRange', {storeId: store.store_id, deviceId: device.device_id, startDate: lastWeekStartDateString, endDate: lastWeekEndDateString}).then(() => {
                                let models = this.$store.getters["dashboard/models"];
                                models.forEach((model) => {
                                    this.lastWeekEnter += model.enter;
                                    this.lastWeekExit += model.exit;
                                });
                            });

                            if ((currentDay) == 1) {
                                this.thisMonthEnter = this.todayEnter;
                                this.thisMonthExit = this.todayExit;
                            } else {
                                this.$store.dispatch('dashboard/getDailyTrafficsInCustomDateRange', {storeId: store.store_id, deviceId: device.device_id, startDate: thisMonthStartDateString, endDate: thisMonthEndDateString}).then(() => {
                                    let models = this.$store.getters["dashboard/models"];
                                    models.forEach((model) => {
                                        this.thisMonthEnter += model.enter;
                                        this.thisMonthExit += model.exit;
                                    });
                                });
                            }
                            
                            this.$store.dispatch('dashboard/getDailyTrafficsInCustomDateRange', {storeId: store.store_id, deviceId: device.device_id, startDate: lastMonthStartDateString, endDate: lastMonthEndDateString}).then(() => {
                                let models = this.$store.getters["dashboard/models"];
                                models.forEach((model) => {
                                    this.lastMonthEnter += model.enter;
                                    this.lastMonthExit += model.exit;
                                });
                            });
                        });
                    });
                });
            } catch (e) {
                console.error(e);
            } finally {
                loader.hide();
            }
        },
        initResource() {
            this.totalTrafficsEnter = 0;
            this.totalTrafficsExit = 0;
            this.totalTrafficsReturn = 0;
            this.totalTrafficsPassing = 0;
            this.todayEnter = 0;
            this.todayExit = 0;
            this.todayReturn = 0;
            this.todayPassing = 0;
        },

        byShopTypeSelectorChange() {
            this.getByShop();
        },
        byShopTimeRangeSelectorChange() {
            this.getByShop();
        },
        async getByShop() {
            this.byShop = [];
            let tmpByShop = [];
            await this.$store.dispatch('store/getAll').then(() => {
                let stores = this.$store.getters["store/models"];
                for (let i = 0; i < stores.length; i++) {
                    let tmpByShopPerStore = {
                        name: stores[i].store_name,
                        count: 0,
                    };
                    for (let j = 0; j < stores[i].devices.length; j++) {
                        this.$store.dispatch('dashboard/getTotalTraffics', {storeId: stores[i].store_id, deviceId: stores[i].devices[j].device_id}).then(() => {
                            let model = this.$store.getters["dashboard/models"][0];
                            if (this.byShopSelectedType == 'enter') {
                                tmpByShopPerStore.count += model.enter;
                            } else if (this.byShopSelectedType == 'exit') {
                                tmpByShopPerStore.count += model.exit;
                            } else if (this.byShopSelectedType == 'return') {
                                tmpByShopPerStore.count += model.return;
                            } else if (this.byShopSelectedType == 'passing') {
                                tmpByShopPerStore.count += model.passing;
                            }
                        });
                    }
                    tmpByShop.push(tmpByShopPerStore);
                }
                this.byShop = tmpByShop;
            });
        },
        byBusinessTypeSelectorChange() {
            this.getByBusinessType();
        },
        byBusinessTypeTimeRangeSelectorChange() {
            this.getByBusinessType();
        },
        async getByBusinessType() {
            this.byBusinessType = [];
            let tmpByBusinessType = [];
            await this.$store.dispatch('store/getAll').then(() => {
                let stores = this.$store.getters["store/models"];
                for (let i = 0; i < stores.length; i++) {
                    for (let j = 0; j < stores[i].devices.length; j++) {
                        let subtype = JSON.parse(stores[i].devices[j].subtype);
                        this.$store.dispatch('dashboard/getTotalTraffics', {storeId: stores[i].store_id, deviceId: stores[i].devices[j].device_id}).then(() => {
                            let model = this.$store.getters["dashboard/models"][0];
                            let doesBusinessTypeExist = false;
                            for (let k = 0; k < tmpByBusinessType.length; k++) {
                                if (tmpByBusinessType[k].name == subtype.businessType) {
                                    if (this.byBusinessTypeSelectedType == 'enter') {
                                        tmpByBusinessType[k].count += model.enter;
                                    } else if (this.byBusinessTypeSelectedType == 'exit') {
                                        tmpByBusinessType[k].count += model.exit;
                                    } else if (this.byBusinessTypeSelectedType == 'return') {
                                        tmpByBusinessType[k].count += model.return;
                                    } else if (this.byBusinessTypeSelectedType == 'passing') {
                                        tmpByBusinessType[k].count += model.passing;
                                    }
                                    doesBusinessTypeExist = true;
                                    break;
                                }
                            }
                            if (!doesBusinessTypeExist) {
                                if (this.byBusinessTypeSelectedType == 'enter') {
                                    tmpByBusinessType.push({
                                        name: subtype.businessType,
                                        count: model.enter,
                                        icon: subtype.businessTypeIcon,
                                    });
                                } else if (this.byBusinessTypeSelectedType == 'exit') {
                                    tmpByBusinessType.push({
                                        name: subtype.businessType,
                                        count: model.exit,
                                        icon: subtype.businessTypeIcon,
                                    });
                                } else if (this.byBusinessTypeSelectedType == 'return') {
                                    tmpByBusinessType.push({
                                        name: subtype.businessType,
                                        count: model.return,
                                        icon: subtype.businessTypeIcon,
                                    });
                                } else if (this.byBusinessTypeSelectedType == 'passing') {
                                    tmpByBusinessType.push({
                                        name: subtype.businessType,
                                        count: model.passing,
                                        icon: subtype.businessTypeIcon,
                                    });
                                }
                            }
                            
                        });
                    }
                    
                }
                this.byBusinessType = tmpByBusinessType;
            });
        },
        byFloorSelectorChange() {
            this.getByFloor();
        },
        byFloorTimeRangeSelectorChange() {
            this.getByFloor();
        },
        async getByFloor() {
            this.byFloor = [];
            let tmpByFloor = [];
            await this.$store.dispatch('store/getAll').then(() => {
                let stores = this.$store.getters["store/models"];
                for (let i = 0; i < stores.length; i++) {
                    for (let j = 0; j < stores[i].devices.length; j++) {
                        let subtype = JSON.parse(stores[i].devices[j].subtype);
                        this.$store.dispatch('dashboard/getTotalTraffics', {storeId: stores[i].store_id, deviceId: stores[i].devices[j].device_id}).then(() => {
                            let model = this.$store.getters["dashboard/models"][0];
                            let doesByFloorExist = false;
                            for (let k = 0; k < tmpByFloor.length; k++) {
                                if (tmpByFloor[k].name == subtype.floor) {
                                    if (this.byFloorSelectedType == 'enter') {
                                        tmpByFloor[k].count += model.enter;
                                    } else if (this.byFloorSelectedType == 'exit') {
                                        tmpByFloor[k].count += model.exit;
                                    } else if (this.byFloorSelectedType == 'return') {
                                        tmpByFloor[k].count += model.return;
                                    } else if (this.byFloorSelectedType == 'passing') {
                                        tmpByFloor[k].count += model.passing;
                                    }
                                    doesByFloorExist = true;
                                    break;
                                }
                            }
                            if (!doesByFloorExist) {
                                if (this.byFloorSelectedType == 'enter') {
                                    tmpByFloor.push({
                                        name: subtype.floor,
                                        count: model.enter,
                                        icon: "fa-solid fa-layer-group",
                                    });
                                } else if (this.byFloorSelectedType == 'exit') {
                                    tmpByFloor.push({
                                        name: subtype.floor,
                                        count: model.exit,
                                        icon: "fa-solid fa-layer-group",
                                    });
                                } else if (this.byFloorSelectedType == 'return') {
                                    tmpByFloor.push({
                                        name: subtype.floor,
                                        count: model.return,
                                        icon: "fa-solid fa-layer-group",
                                    });
                                } else if (this.byFloorSelectedType == 'passing') {
                                    tmpByFloor.push({
                                        name: subtype.floor,
                                        count: model.passing,
                                        icon: "fa-solid fa-layer-group",
                                    });
                                }
                            }
                        });
                    }
                }
                this.byFloor = tmpByFloor;
            });
        },
        byBrandSelectorChange() {
            this.getByBrand();
        },
        byBrandTimeRangeSelectorChange() {
            this.getByBrand();
        },
        async getByBrand() {
            this.byBrand = [];
            let tmpByBrand = [];
            await this.$store.dispatch('store/getAll').then(() => {
                let stores = this.$store.getters["store/models"];
                for (let i = 0; i < stores.length; i++) {
                    for (let j = 0; j < stores[i].devices.length; j++) {
                        this.$store.dispatch('dashboard/getTotalTraffics', {storeId: stores[i].store_id, deviceId: stores[i].devices[j].device_id}).then(() => {
                            let model = this.$store.getters["dashboard/models"][0];
                            if (this.byFloorSelectedType == 'enter') {
                                tmpByBrand.push({
                                    name: this.$t("dashboard.all"),
                                    count: model.enter,
                                    icon: "fa-solid fa-tags",
                                });
                            } else if (this.byFloorSelectedType == 'exit') {
                                tmpByBrand.push({
                                    name: this.$t("dashboard.all"),
                                    count: model.exit,
                                    icon: "fa-solid fa-tags",
                                });
                            } else if (this.byFloorSelectedType == 'return') {
                                tmpByBrand.push({
                                    name: this.$t("dashboard.all"),
                                    count: model.return,
                                    icon: "fa-solid fa-tags",
                                });
                            } else if (this.byFloorSelectedType == 'passing') {
                                tmpByBrand.push({
                                    name: this.$t("dashboard.all"),
                                    count: model.passing,
                                    icon: "fa-solid fa-tags",
                                });
                            }
                        });
                    }
                }
                this.byBrand = tmpByBrand;
            });
        },

        async getLineChartTimeRange(date) {
            if (!date) {
                return;
            }
            this.minuteLineChart.labels = [];

            let tmpLabels = [];
            let tmpEnters = [];
            let tmpExits = [];
            let tmpReturns = [];
            let tmpPassings = [];

            await this.$store.dispatch('store/getAll').then(() => {
                let stores = this.$store.getters["store/models"];
                stores.forEach((store) => {
                    store.devices.forEach((device) => {
                        this.$store.dispatch('dashboard/getMinuteTrafficsInDay', {
							storeId: store.store_id, 
							deviceId: device.device_id, 
							date: date, 
							interval: 15
						}).then(() => {
                            let models = this.$store.getters["dashboard/models"];
                            for (let i = 0; i < models.length; i++) {
                              if (parseInt(models[i].end_time.substring(0, 2)) <= 12) {
                                tmpLabels.push(models[i].end_time.substring(0, 5) + "AM");
                              } else {
                                tmpLabels.push(models[i].end_time.substring(0, 5) + "PM");
                              }
                              tmpEnters.push(models[i].enter);
                              tmpExits.push(models[i].exit);
                              tmpReturns.push(models[i].return);
                              tmpPassings.push(models[i].passing);
                            }
                            this.minuteLineChart.labels = tmpLabels;
                            this.minuteLineChart.enters = tmpEnters;
                            this.minuteLineChart.exits = tmpExits;
                            this.minuteLineChart.returns = tmpReturns;
                            this.minuteLineChart.passings = tmpPassings;
                        }).catch(() => {
                            this.minuteLineChart.labels = [];
                            this.minuteLineChart.enters = [];
                            this.minuteLineChart.exits = [];
                            this.minuteLineChart.returns = [];
                            this.minuteLineChart.passings = [];
                        });
                    });
                });
            });
        },
        async getLineChartDate(date) {
            if (!date) {
                return;
            }
            this.hourlyLineChart.labels = [];

            let tmpEnters = [];
            let tmpExits = [];
            let tmpReturns = [];
            let tmpPassings = [];
            
            let today = this.$moment();
            let totalHour = 24;
            if (date == today.format('YYYY-MM-DD')) {
                totalHour = parseInt(today.format('H')) + 1;
            }
            let time = this.$t('date.am');
            for (let i = 0; i < totalHour; i++) {
                if (i >= 12) {
                    time = this.$t('date.pm');
                }
                this.hourlyLineChart.labels.push(i + ':00' + time);
                tmpEnters.push(0);
                tmpExits.push(0);
                tmpPassings.push(0);
                tmpReturns.push(0);
            }

            await this.$store.dispatch('store/getAll').then(() => {
                let stores = this.$store.getters["store/models"];
                stores.forEach((store) => {
                    store.devices.forEach((device) => {
                        
                        this.$store.dispatch('dashboard/getHourlyTrafficsInDay', {storeId: store.store_id, deviceId: device.device_id, date: date}).then(() => {
                            let models = this.$store.getters["dashboard/models"];
                            for (let i = 0; i < models.length; i++) {
                                let tmpTime = parseInt(models[i].hour);
                                tmpEnters[tmpTime] += models[i].enter;
                                tmpExits[tmpTime] += models[i].exit;
                                tmpReturns[tmpTime] += models[i].return;
                                tmpPassings[tmpTime] += models[i].passing;
                            }
                            this.hourlyLineChart.enters = tmpEnters;
                            this.hourlyLineChart.exits = tmpExits;
                            this.hourlyLineChart.returns = tmpReturns;
                            this.hourlyLineChart.passings = tmpPassings;
                            if (date == today.format('YYYY-MM-DD')) {
                                let tmpEnter = 0;
                                let tmpExit = 0;
                                let tmpReturn = 0;
                                let tmpPassing = 0;
                                for (let i = 0; i < models.length; i++) {
                                    tmpEnter += models[i].enter;
                                    tmpExit += models[i].exit;
                                    tmpReturn += models[i].return;
                                    tmpPassing += models[i].passing;
                                }
                                this.todayEnter = tmpEnter;
                                this.todayExit = tmpExit;
                                this.todayReturn = tmpReturn;
                                this.todayPassing = tmpPassing;
                            }
                        });
                    });
                });
            });
        },
        async getLineChartDateRange(dateRange) {
            if (!dateRange) {
                return;
            }
            if (!dateRange.endDate) {
                return;
            }
            if (!dateRange.startDate) {
                return;
            }
            if (dateRange.endDate <= dateRange.startDate) {
                return;
            }
            let startDateMoment = this.$moment(dateRange.startDate);
            let tmpStartDateMoment = startDateMoment;
            let endDateMoment = this.$moment(dateRange.endDate);
            let duration = this.$moment.duration(endDateMoment.diff(startDateMoment));
            let durationDiffDays = Math.floor(duration.asDays());
            if (duration._milliseconds <= 0) {
                return;
            }
            this.dailyLineChart.labels = [];

            let tmpEnters = [];
            let tmpExits = [];
            let tmpReturns = [];
            let tmpPassings = [];

            for (let i = 0; i < durationDiffDays; i++) {
                this.dailyLineChart.labels.push(tmpStartDateMoment.format('YYYY-MM-DD (ddd)'));
                tmpEnters.push(0);
                tmpExits.push(0);
                tmpReturns.push(0);
                tmpPassings.push(0);
                tmpStartDateMoment.add(1, 'days');
            }

            await this.$store.dispatch('store/getAll').then(() => {
                let stores = this.$store.getters["store/models"];
                
                stores.forEach((store) => {
                    store.devices.forEach((device) => {
                        this.$store.dispatch('dashboard/getDailyTrafficsInCustomDateRange', {storeId: store.store_id, deviceId: device.device_id, startDate: dateRange.startDate, endDate: dateRange.endDate}).then(() => {
                            let models = this.$store.getters["dashboard/models"];
                            tmpStartDateMoment = this.$moment(dateRange.startDate);
                            mainLoop: for (let i = 0; i < durationDiffDays; i++) {
                                let tmpDate = tmpStartDateMoment.format('YYYY-MM-DD');
                                for (let j = 0; j < models.length; j++) {
                                    if (tmpDate == models[j].date) {
                                        tmpEnters[i] += (models[j].enter);
                                        tmpExits[i] += (models[j].exit);
                                        tmpReturns[i] += (models[j].return);
                                        tmpPassings[i] += (models[j].passing);
                                        tmpStartDateMoment.add(1, 'days');
                                        continue mainLoop;
                                    }
                                }
                                tmpStartDateMoment.add(1, 'days');
                            }
                            this.dailyLineChart.enters = tmpEnters;
                            this.dailyLineChart.exits = tmpExits;
                            this.dailyLineChart.returns = tmpReturns;
                            this.dailyLineChart.passings = tmpPassings;
                        });
                    });
                });
            });
        }
    }
};

</script>
<style>

</style>