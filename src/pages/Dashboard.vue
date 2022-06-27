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
                            class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-6"
                            @input="byShopTypeSelectorChange"
                        ></base-selector-input>
                        <base-selector-input
                            :label="$t('dashboard.timeRange')"
                            v-model="byShopSelectedDateRange"
                            :options="$t('timeRangeOptions')"
                            class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-6"
                            @input="byShopTimeRangeSelectorChange"
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
                                <span class="font-italic">{{ decodeByShopValue(value) }}</span>
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
                        <base-selector-input
                            :label="$t('dashboard.type')"
                            v-model="byFloorSelectedType"
                            :options="$t('typeOptions')"
                            class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-6"
                            @input="byFloorSelectorChange"
                        ></base-selector-input>
                        <base-selector-input
                            :label="$t('dashboard.timeRange')"
                            v-model="byFloorSelectedDateRange"
                            :options="$t('timeRangeOptions')"
                            class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-6"
                            @input="byFloorDateRangeSelectorChange"
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
                                <span class="font-italic">{{ decodeByFloorValue(value) }}</span>
                            </div>
                            <div class="mb-1">
                                <i class="card-category-icon success" :class="value.icon"></i>
                            </div>
                        </div>
                    </div>
                </category-card>
            </div>

            <!-- <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
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
            </div> -->
        </div>
        <!-- <div class="row">
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
        </div> -->

        <!-- <div class="row">
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
        </div> -->

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
    CategoryCard,
    BaseSelectorInput,
    // StatsCard,
    // TrafficsCard,
    // TrafficTrendLineChart,
} from "@/components/index";

export default {
    components: {
        CategoryCard,
        BaseSelectorInput,
        // StatsCard,
        // TrafficsCard,
        // TrafficTrendLineChart,
    },
    data() {
        return {
            byShopSelectedType: "enter",
            byShopSelectedDateRange: "today",
            byShop: [],

            byFloorSelectedType: "enter",
            byFloorSelectedDateRange: "today",
            byFloor: [],

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
            options: [],
        }
    },
    mounted() {
        this.initResource();
        this.initByShopOptions().then(() => {
            this.getByShop();
        });
        this.initByFloorOptions().then(() => {
            this.getByFloor();
        });
        
        this.getResource();
    },
    methods: {
        async getResource() {
            // let loader = this.$loading.show();
            // try {
            //     let today = this.$moment();
            //     let currentDay = parseInt(today.format('D'));
            //     let todayDateString = today.add(1, 'days').format('YYYY-MM-DD');
            //     let yesterday = parseInt(today.subtract(2, 'days').format('D'));
            //     let thisWeekStartDateString = today.subtract(5, 'days').format('YYYY-MM-DD');
            //     let lastWeekEndDateString = today.subtract(1, 'days').format('YYYY-MM-DD');
            //     let lastWeekStartDateString = today.subtract(6, 'days').format('YYYY-MM-DD');
            //     today = this.$moment();
            //     let thisMonthStartDateString = today.startOf('month').format('YYYY-MM-DD');
            //     let thisMonthEndDateString = today.endOf('month').format('YYYY-MM-DD');
            //     let lastMonthStartDateString = today.subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
            //     let lastMonthEndDateString = today.endOf('month').format('YYYY-MM-DD');

            //     await this.$store.dispatch('store/getAll').then(() => {
            //         let stores = this.$store.getters["store/models"];
            //         this.options.push({
            //             id: "all",
            //             name: "All"
            //         });
            //         stores.forEach((store) => {
            //             store.devices.forEach((device) => {
            //                 this.options.push({
            //                     id: device.device_id,
            //                     name: device.device_description
            //                 });
            //                 this.$store.dispatch('dashboard/getTotalTraffics', {storeId: store.store_id, deviceId: device.device_id}).then(() => {
            //                     let model = this.$store.getters["dashboard/models"][0];
            //                     if (model) {
            //                         this.totalTrafficsEnter += model.enter;
            //                         this.totalTrafficsExit += model.exit;
            //                         this.totalTrafficsReturn += model.return;
            //                         this.totalTrafficsPassing += model.passing;
            //                     }
            //                 });

            //                 this.$store.dispatch('dashboard/getDailyTrafficsInCustomDateRange', {storeId: store.store_id, deviceId: device.device_id, startDate: thisWeekStartDateString, endDate: todayDateString}).then(() => {
            //                     let models = this.$store.getters["dashboard/models"];
            //                     models.forEach((model) => {
            //                         this.thisWeekEnter += model.enter;
            //                         this.thisWeekExit += model.exit;
            //                         let day = model.date.substring(8, 10);
            //                         if (parseInt(day) == (currentDay)) {
            //                             this.todayEnter += model.enter;
            //                             this.todayExit += model.exit;
            //                             this.todayReturn += model.return;
            //                             this.todayPassing += model.passing;
            //                         } else if (parseInt(day) == parseInt(yesterday)) {
            //                             this.yesterdayEnter += model.enter;
            //                             this.yesterdayExit += model.exit;
            //                         }
            //                     });
            //                 });

            //                 this.$store.dispatch('dashboard/getDailyTrafficsInCustomDateRange', {storeId: store.store_id, deviceId: device.device_id, startDate: lastWeekStartDateString, endDate: lastWeekEndDateString}).then(() => {
            //                     let models = this.$store.getters["dashboard/models"];
            //                     models.forEach((model) => {
            //                         this.lastWeekEnter += model.enter;
            //                         this.lastWeekExit += model.exit;
            //                     });
            //                 });

            //                 if ((currentDay) == 1) {
            //                     this.thisMonthEnter = this.todayEnter;
            //                     this.thisMonthExit = this.todayExit;
            //                 } else {
            //                     this.$store.dispatch('dashboard/getDailyTrafficsInCustomDateRange', {storeId: store.store_id, deviceId: device.device_id, startDate: thisMonthStartDateString, endDate: thisMonthEndDateString}).then(() => {
            //                         let models = this.$store.getters["dashboard/models"];
            //                         models.forEach((model) => {
            //                             this.thisMonthEnter += model.enter;
            //                             this.thisMonthExit += model.exit;
            //                         });
            //                     });
            //                 }
                            
            //                 this.$store.dispatch('dashboard/getDailyTrafficsInCustomDateRange', {storeId: store.store_id, deviceId: device.device_id, startDate: lastMonthStartDateString, endDate: lastMonthEndDateString}).then(() => {
            //                     let models = this.$store.getters["dashboard/models"];
            //                     models.forEach((model) => {
            //                         this.lastMonthEnter += model.enter;
            //                         this.lastMonthExit += model.exit;
            //                     });
            //                 });
            //             });
            //         });
            //     });
            // } catch (e) {
            //     console.error(e);
            // } finally {
            //     loader.hide();
            // }
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
            this.options = [];
        },

        goToStore(storeId) {
            this.$router.push({
                name: "Store Detail",
                param: {
                    storeId: storeId,
                }
            });
        },
        async initByShopOptions() {
            await this.$store.dispatch('store/getAll').then(() => {
                let stores = this.$store.getters["store/models"];
                let tmpByShop = [];
                for (let i = 0; i < stores.length; i++) {
                    tmpByShop.push({
                        id: stores[i].store_id,
                        name: stores[i].store_name,
                        enter: 0,
                        exit: 0,
                        return: 0,
                        passing: 0,
                    });
                }
                this.byShop = tmpByShop;
            });
        },
        byShopTypeSelectorChange() {
            // this.getByShop();
        },
        byShopTimeRangeSelectorChange() {
            this.getByShop();
        },
        async getByShop() {
            await this.$store.dispatch('decode/decodeDateRange', this.byShopSelectedDateRange).then((dateRange) => {
                for (let i = 0; i < this.byShop.length; i++) {
                    this.$store.dispatch('inStoreTraffic/getTotalTraffics', {
                        param: `store_id=${this.byShop[i].id}&date=${dateRange}`
                    }).then(() => {
                        let totalTraffics = this.$store.getters["inStoreTraffic/totalTraffics"];
                        this.byShop[i].enter = totalTraffics.enter;
                        this.byShop[i].exit = totalTraffics.exit;
                        this.byShop[i].return = totalTraffics.return;
                        this.byShop[i].passing = totalTraffics.passing;
                    });
                }
            });
        },
        decodeByShopValue(value) {
            if (this.byShopSelectedType == 'enter') {
                return value.enter;
            } else if (this.byShopSelectedType == 'exit') {
                return value.exit;
            } else if (this.byShopSelectedType == 'return') {
                return value.return;
            } else if (this.byShopSelectedType == 'passing') {
                return value.passing;
            } else {
                return 0;
            }
        },

        async initByFloorOptions() {
            await this.$store.dispatch('inStoreTraffic/getAll').then(() => {
                let devices = this.$store.getters["inStoreTraffic/models"];
                let tmpByFloor = [];
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
                }
                this.byFloor = tmpByFloor;
            });
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
                    }).then(() => {
                        let totalTraffics = this.$store.getters["inStoreTraffic/totalTraffics"];
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

        async getLineChartTimeRange(value) {
            if (!value.date) {
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
                        if (device.device_id == value.option || value.option == 'all') {
                            this.$store.dispatch('dashboard/getMinuteTrafficsInDay', {
                                storeId: store.store_id, 
                                deviceId: device.device_id, 
                                date: value.date, 
                                interval: 15
                            }).then(() => {
                                let models = this.$store.getters["dashboard/models"];
                                for (let i = 0; i < models.length; i++) {
                                if (parseInt(models[i].end_time.substring(0, 2)) < 12) {
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
                        }
                    });
                });
            });
        },
        async getLineChartDate(value) {
            if (!value.date) {
                return;
            }
            this.hourlyLineChart.labels = [];

            let tmpEnters = [];
            let tmpExits = [];
            let tmpReturns = [];
            let tmpPassings = [];
            
            let today = this.$moment();
            let totalHour = 24;
            if (value.date == today.format('YYYY-MM-DD')) {
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
                        if (device.device_id == value.option || value.option == 'all') {
                            this.$store.dispatch('dashboard/getHourlyTrafficsInDay', {storeId: store.store_id, deviceId: device.device_id, date: value.date}).then(() => {
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
                                // if (date == today.format('YYYY-MM-DD')) {
                                //     let tmpEnter = 0;
                                //     let tmpExit = 0;
                                //     let tmpReturn = 0;
                                //     let tmpPassing = 0;
                                //     for (let i = 0; i < models.length; i++) {
                                //         tmpEnter += models[i].enter;
                                //         tmpExit += models[i].exit;
                                //         tmpReturn += models[i].return;
                                //         tmpPassing += models[i].passing;
                                //     }
                                //     this.todayEnter = tmpEnter;
                                //     this.todayExit = tmpExit;
                                //     this.todayReturn = tmpReturn;
                                //     this.todayPassing = tmpPassing;
                                // }
                            });
                        }
                    });
                });
            });
        },
        async getLineChartDateRange(value) {
            if (!value) {
                return;
            }
            if (!value.endDate) {
                return;
            }
            if (!value.startDate) {
                return;
            }
            if (value.endDate <= value.startDate) {
                return;
            }
            let startDateMoment = this.$moment(value.startDate);
            let tmpStartDateMoment = startDateMoment;
            let endDateMoment = this.$moment(value.endDate);
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
                        if (device.device_id == value.option || value.option == 'all') {
                            this.$store.dispatch('dashboard/getDailyTrafficsInCustomDateRange', {storeId: store.store_id, deviceId: device.device_id, startDate: value.startDate, endDate: value.endDate}).then(() => {
                                let models = this.$store.getters["dashboard/models"];
                                tmpStartDateMoment = this.$moment(value.startDate);
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
                        }
                    });
                });
            });
        }
    }
};

</script>
<style>

</style>