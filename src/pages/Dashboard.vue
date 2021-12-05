<template>
    <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
        <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.totalTrafficsEnter ? resource.totalTrafficsEnter : '0'"
                    :sub-title="$t('dashboard.totalTraffics') + ' ' + $t('property.enter')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                    >
                    <!-- <div slot="footer" v-html="asd"></div> -->
                </stats-card>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.totalTrafficsExit ? resource.totalTrafficsExit : '0'"
                    :sub-title="$t('dashboard.totalTraffics') + ' ' + $t('property.exit')"
                    type="warning"
                    icon="fas fa-sign-out-alt"
                    >
                </stats-card>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6 col-12">
                <traffics-card
                    :sub-title="$t('date.today')"
                    :previous-title="$t('date.yesterday')"
                    :enter="resource.todayEnter ? resource.todayEnter : 0"
                    :exit="resource.todayExit ? resource.todayExit : 0"
                    :previous-enter="resource.yesterdayEnter ? resource.yesterdayEnter : 0"
                    :previous-exit="resource.yesterdayExit ? resource.yesterdayExit : 0"
                    >
                </traffics-card>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6 col-12">
                <traffics-card
                    :sub-title="$t('date.thisWeek')"
                    :previous-title="$t('date.lastWeek')"
                    :enter="resource.thisWeekEnter ? resource.thisWeekEnter : 0"
                    :exit="resource.thisWeekExit ? resource.thisWeekExit : 0"
                    :previous-enter="resource.lastWeekEnter ? resource.lastWeekEnter : 0"
                    :previous-exit="resource.lastWeekExit ? resource.lastWeekExit : 0"
                    >
                </traffics-card>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6 col-12">
                <traffics-card
                    :sub-title="$t('date.thisMonth')"
                    :previous-title="$t('date.lastMonth')"
                    :enter="resource.thisMonthEnter ? resource.thisMonthEnter : 0"
                    :exit="resource.thisMonthExit ? resource.thisMonthExit : 0"
                    :previous-enter="resource.lastMonthEnter ? resource.lastMonthEnter : 0"
                    :previous-exit="resource.lastMonthExit ? resource.lastMonthExit : 0"
                    >
                </traffics-card>
            </div>
        </div>
        <traffic-trend-line-chart
            :labels="lineChart.labels"
            :enters="lineChart.enters"
            :exits="lineChart.exits"
            @getLineChartDateRange="getLineChartDateRange"
        >
        </traffic-trend-line-chart>
        <!-- <div class="row">
            <div class="col-12">
                <card type="chart">
                    <div slot="header">
                        <h2 class="card-title">
                            {{ $t('dashboard.trafficTrendChart') }}
                        </h2>
                        <div class="row">
                            <div class="col-sm-6 col-12">
                                <base-input 
                                    :placeholder="$t('date.start')"
                                    v-model="lineChart.dateRange.startDate"
                                    type="date"
                                    @input="getLineChartDateRange"
                                    >
                                </base-input>
                            </div>
                            <div class="col-sm-6 col-12">
                                <base-input 
                                    :placeholder="$t('date.end')"
                                    v-model="lineChart.dateRange.endDate"
                                    type="date"
                                    @input="getLineChartDateRange"
                                    >
                                </base-input>
                            </div>
                        </div>
                    </div>
                    <line-chart
                        chart-id="green-line-chart"
                        :chart-data="chartData"
                        :extra-options="lineChart.extraOptions"
                    >
                    </line-chart>
                </card>
            </div>
        </div> -->
    </div>
</template>
<script>
import {
    // BaseButton,
    // BaseInput,
    // Card,
    StatsCard,
    TrafficsCard,
    // LineChart
    TrafficTrendLineChart
} from "@/components/index";
// import * as chartConfigs from "@/components/Chart/ChartConfig";
// import TrafficTrendLineChart from '../components/Chart/TrafficTrendLineChart.vue';
// import DateRangePicker from 'vue2-daterange-picker';
// import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';

export default {
    components: {
        // BaseButton,
        // BaseInput,
        // Card,
        StatsCard,
        TrafficsCard,
        // LineChart,
        // DateRangePicker,
        TrafficTrendLineChart
    },
    data() {
        return {
            resource: {
                totalTrafficsEnter: 0,
                totalTrafficsExit: 0,
                todayEnter: 0,
                todayExit: 0,
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
            },
            lineChart: {
            //     extraOptions: chartConfigs.chartOptions,
                labels: [],
                enters: [],
                exits: [],
            //     dateRange: {
            //         startDate: null,
            //         endDate: null
            //     }
            },
        }
    },
    mounted() {
        this.getResource();
    },
    methods: {
        async getResource() {
            let loader = this.$loading.show();
            try {
                this.resource.totalTrafficsEnter = 0;
                this.resource.totalTrafficsExit = 0;
                this.resource.todayEnter = 0;
                this.resource.todayExit = 0;
                this.resource.yesterdayEnter = 0;
                this.resource.yesterdayExit = 0;
                this.resource.thisWeekEnter = 0;
                this.resource.thisWeekExit = 0;
                this.resource.lastWeekEnter = 0;
                this.resource.lastWeekExit = 0;
                this.resource.thisMonthEnter = 0;
                this.resource.thisMonthExit = 0;
                this.resource.lastMonthEnter = 0;
                this.resource.lastMonthExit = 0;

                // this.lineChart.labels = [];
                // this.lineChart.enters = [];
                // this.lineChart.exits = [];

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
                // today = this.$moment();
                // let wholeMonthStartDateString = this.$store.getters["mobileLayout/isMobileLayout"] ? today.subtract(7, 'days').format('YYYY-MM-DD') : today.subtract(1, 'months').format('YYYY-MM-DD');

                // this.lineChart.dateRange.startDate = wholeMonthStartDateString;
                // this.lineChart.dateRange.endDate = todayDateString;

                await this.$store.dispatch('store/getAll').then(() => {
                    let stores = this.$store.getters["store/models"];
                    
                    stores.forEach((store) => {
                        store.devices.forEach((device) => {
                            this.$store.dispatch('dashboard/getTotalTraffics', {storeId: store.store_id, deviceId: device.device_id}).then(() => {
                                let model = this.$store.getters["dashboard/models"][0];
                                this.resource.totalTrafficsEnter += model.enter;
                                this.resource.totalTrafficsExit += model.exit;
                            });

                            this.$store.dispatch('dashboard/getDailyTrafficsInCustomDateRange', {storeId: store.store_id, deviceId: device.device_id, startDate: thisWeekStartDateString, endDate: todayDateString}).then(() => {
                                let models = this.$store.getters["dashboard/models"];
                                models.forEach((model) => {
                                    this.resource.thisWeekEnter += model.enter;
                                    this.resource.thisWeekExit += model.exit;
                                    let day = model.date.substring(8, 10);
                                    if (parseInt(day) == (currentDay)) {
                                        this.resource.todayEnter = model.enter;
                                        this.resource.todayExit = model.exit;
                                    } else if (parseInt(day) == parseInt(yesterday)) {
                                        this.resource.yesterdayEnter = model.enter;
                                        this.resource.yesterdayExit = model.exit;
                                    }
                                });
                            });

                            this.$store.dispatch('dashboard/getDailyTrafficsInCustomDateRange', {storeId: store.store_id, deviceId: device.device_id, startDate: lastWeekStartDateString, endDate: lastWeekEndDateString}).then(() => {
                                let models = this.$store.getters["dashboard/models"];
                                models.forEach((model) => {
                                    this.resource.lastWeekEnter += model.enter;
                                    this.resource.lastWeekExit += model.exit;
                                });
                            });

                            if ((currentDay) == 1) {
                                this.resource.thisMonthEnter = this.resource.todayEnter;
                                this.resource.thisMonthExit = this.resource.todayExit;
                            } else {
                                this.$store.dispatch('dashboard/getDailyTrafficsInCustomDateRange', {storeId: store.store_id, deviceId: device.device_id, startDate: thisMonthStartDateString, endDate: thisMonthEndDateString}).then(() => {
                                    let models = this.$store.getters["dashboard/models"];
                                    models.forEach((model) => {
                                        this.resource.thisMonthEnter += model.enter;
                                        this.resource.thisMonthExit += model.exit;
                                    });
                                });
                            }
                            
                            this.$store.dispatch('dashboard/getDailyTrafficsInCustomDateRange', {storeId: store.store_id, deviceId: device.device_id, startDate: lastMonthStartDateString, endDate: lastMonthEndDateString}).then(() => {
                                let models = this.$store.getters["dashboard/models"];
                                models.forEach((model) => {
                                    this.resource.lastMonthEnter += model.enter;
                                    this.resource.lastMonthExit += model.exit;
                                });
                            });

                            // this.getLineChartDateRange();
                        });
                    });
                });
            } catch (e) {
                console.error(e);
            } finally {
                loader.hide();
            }
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
            let endDateMoment = this.$moment(dateRange.endDate);
            let duration = this.$moment.duration(endDateMoment.diff(startDateMoment));
            let durationDiffDays = Math.floor(duration.asDays());
            if (duration._milliseconds <= 0) {
                return;
            }
            this.lineChart.labels = [];
            this.lineChart.enters = [];
            this.lineChart.exits = [];
            await this.$store.dispatch('store/getAll').then(() => {
                let stores = this.$store.getters["store/models"];
                
                stores.forEach((store) => {
                    store.devices.forEach((device) => {
                        this.$store.dispatch('dashboard/getDailyTrafficsInCustomDateRange', {storeId: store.store_id, deviceId: device.device_id, startDate: dateRange.startDate, endDate: dateRange.endDate}).then(() => {
                            let models = this.$store.getters["dashboard/models"];
                            
                            mainLoop: for (let i = 0; i < durationDiffDays; i++) {
                                let tmpDate = startDateMoment.format('YYYY-MM-DD');
                                for (let j = 0; j < models.length; j++) {
                                    if (tmpDate == models[j].date) {
                                        this.lineChart.labels.push(startDateMoment.format('YYYY-MM-DD (ddd)'));
                                        this.lineChart.enters.push(models[j].enter);
                                        this.lineChart.exits.push(models[j].exit);
                                        startDateMoment.add(1, 'days');
                                        continue mainLoop;
                                    }
                                }
                                this.lineChart.labels.push(startDateMoment.format('YYYY-MM-DD (ddd)'));
                                this.lineChart.enters.push(0);
                                this.lineChart.exits.push(0);
                                startDateMoment.add(1, 'days');
                            }
                        });
                    });
                });
            });
        }
    },
    // computed: {
    //     chartData() {
    //         return {
    //             labels: this.lineChart.labels,
    //             datasets: [
    //                 {
    //                     label: this.$t('property.enter'),
    //                     fill: true,
    //                     borderColor: "#00f2c3",
    //                     borderWidth: 2,
    //                     borderDash: [],
    //                     borderDashOffset: 0.0,
    //                     pointBackgroundColor: "#00f2c3",
    //                     pointBorderColor: "rgba(255,255,255,0)",
    //                     pointHoverBackgroundColor: "#00f2c3",
    //                     pointBorderWidth: 20,
    //                     pointHoverRadius: 4,
    //                     pointHoverBorderWidth: 15,
    //                     pointRadius: 4,
    //                     data: this.lineChart.enters
    //                 },
    //                 {
    //                     label: this.$t('property.exit'),
    //                     fill: true,
    //                     borderColor: "#fd5d93",
    //                     borderWidth: 2,
    //                     borderDash: [],
    //                     borderDashOffset: 0.0,
    //                     pointBackgroundColor: "#fd5d93",
    //                     pointBorderColor: "rgba(255,255,255,0)",
    //                     pointHoverBackgroundColor: "#fd5d93",
    //                     pointBorderWidth: 20,
    //                     pointHoverRadius: 4,
    //                     pointHoverBorderWidth: 15,
    //                     pointRadius: 4,
    //                     data: this.lineChart.exits
    //                 }
    //             ]
    //         };
    //     }
    // }
};

</script>
<style>

</style>