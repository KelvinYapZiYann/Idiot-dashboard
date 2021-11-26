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
            <!-- <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.todayEnter ? resource.todayEnter : '0'"
                    :sub-title="$t('date.today') + ' ' + $t('property.enter')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.todayExit ? resource.todayExit : '0'"
                    :sub-title="$t('date.today') + ' ' + $t('property.exit')"
                    type="warning"
                    icon="fas fa-sign-out-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.yesterdayEnter ? resource.yesterdayEnter : '0'"
                    :sub-title="$t('date.yesterday') + ' ' + $t('property.enter')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.yesterdayExit ? resource.yesterdayExit : '0'"
                    :sub-title="$t('date.yesterday') + ' ' + $t('property.exit')"
                    type="warning"
                    icon="fas fa-sign-out-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.thisWeekEnter ? resource.thisWeekEnter : '0'"
                    :sub-title="$t('date.thisWeek') + ' ' + $t('property.enter')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.thisWeekExit ? resource.thisWeekExit : '0'"
                    :sub-title="$t('date.thisWeek') + ' ' + $t('property.exit')"
                    type="warning"
                    icon="fas fa-sign-out-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.lastWeekEnter ? resource.lastWeekEnter : '0'"
                    :sub-title="$t('date.lastWeek') + ' ' + $t('property.enter')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.lastWeekExit ? resource.lastWeekExit : '0'"
                    :sub-title="$t('date.lastWeek') + ' ' + $t('property.exit')"
                    type="warning"
                    icon="fas fa-sign-out-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.thisMonthEnter ? resource.thisMonthEnter : '0'"
                    :sub-title="$t('date.thisMonth') + ' ' + $t('property.enter')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.thisMonthExit ? resource.thisMonthExit : '0'"
                    :sub-title="$t('date.thisMonth') + ' ' + $t('property.exit')"
                    type="warning"
                    icon="fas fa-sign-out-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.lastMonthEnter ? resource.lastMonthEnter : '0'"
                    :sub-title="$t('date.lastMonth') + ' ' + $t('property.enter')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.lastMonthExit ? resource.lastMonthExit : '0'"
                    :sub-title="$t('date.lastMonth') + ' ' + $t('property.exit')"
                    type="warning"
                    icon="fas fa-sign-out-alt"
                    >
                </stats-card>
            </div> -->
        </div>
        <div class="row">
            <div class="col-12">
                <card type="chart" :title="$t('dashboard.trafficsOfPastMonth')">
                    <!-- <h4 class="text-left ml-2">
                        <span><i class="fas fa-sign-in-alt"></i> {{resource.wholeMonthEnter}}</span>
                    </h4>
                    <h4 class="text-left ml-2">
                        <span><i class="fas fa-sign-out-alt"></i> {{resource.wholeMonthExit}}</span>
                    </h4> -->
                    <line-chart
                        chart-id="green-line-chart"
                        :chart-data="chartData"
                        :extra-options="lineChart.extraOptions"
                    >
                    <!-- :gradient-colors="greenLineChart.gradientColors"
                        :gradient-stops="greenLineChart.gradientStops" -->
                    </line-chart>
                </card>
            </div>
        </div>
    </div>
</template>
<script>
import {
    Card,
    StatsCard,
    TrafficsCard,
    LineChart
} from "@/components/index";
import * as chartConfigs from "@/components/Chart/ChartConfig";

export default {
    components: {
        Card,
        StatsCard,
        TrafficsCard,
        LineChart,
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
            asd: '<i class="fas fa-user"></i> Update Now',
            lineChart: {
                extraOptions: chartConfigs.chartOptions,
                labels: [],
                enters: [],
                exits: [],
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

                let today = this.$moment();
                let currentDay = today.format('D');
                let todayDateString = today.add(1, 'days').format('YYYY-MM-DD');
                let yesterday = today.subtract(2, 'days').format('D');
                let thisWeekStartDateString = today.subtract(5, 'days').format('YYYY-MM-DD');
                let lastWeekEndDateString = today.subtract(1, 'days').format('YYYY-MM-DD');
                let lastWeekStartDateString = today.subtract(6, 'days').format('YYYY-MM-DD');
                today = this.$moment();
                let thisMonthStartDateString = today.startOf('month').format('YYYY-MM-DD');
                let thisMonthEndDateString = today.endOf('month').format('YYYY-MM-DD');
                let lastMonthStartDateString = today.subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
                let lastMonthEndDateString = today.endOf('month').format('YYYY-MM-DD');
                today = this.$moment();
                let wholeMonthStartDateString = today.subtract(1, 'months').format('YYYY-MM-DD');
                

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
                                    if (day == currentDay) {
                                        this.resource.todayEnter = model.enter;
                                        this.resource.todayExit = model.exit;
                                    } else if (day == yesterday) {
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

                            if (currentDay == 1) {
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

                            this.$store.dispatch('dashboard/getDailyTrafficsInCustomDateRange', {storeId: store.store_id, deviceId: device.device_id, startDate: wholeMonthStartDateString, endDate: todayDateString}).then(() => {
                                let models = this.$store.getters["dashboard/models"];
                                // models.sort((a, b) => {
                                //     return a.date < b.date;
                                // });
                                this.lineChart.labels = [];
                                this.lineChart.enters = [];
                                this.lineChart.exits = [];
                                // models.forEach((model) => {
                                //     this.lineChart.labels.push(model.date);
                                //     this.lineChart.enters.push(model.enter);
                                //     this.lineChart.exits.push(model.exit);
                                // });

                                let duration = this.$moment.duration(this.$moment().diff(today));
                                let durationDiffDays = Math.floor(duration.asDays());
                                mainLoop: for (let i = 0; i < durationDiffDays; i++) {
                                    let tmpDate = today.add(1, 'days').format('YYYY-MM-DD');
                                    for (let j = 0; j < models.length; j++) {
                                        if (tmpDate == models[j].date) {
                                            this.lineChart.labels.push(models[j].date);
                                            this.lineChart.enters.push(models[j].enter);
                                            this.lineChart.exits.push(models[j].exit);
                                            continue mainLoop;
                                        }
                                    }
                                    this.lineChart.labels.push(tmpDate);
                                    this.lineChart.enters.push(0);
                                    this.lineChart.exits.push(0);
                                }
                            });
                        });
                    });
                });
            } catch (e) {
                console.error(e);
            } finally {
                loader.hide();
            }
        }
    },
    computed: {
        chartData() {
            return {
                labels: this.lineChart.labels,
                datasets: [
                    {
                        label: this.$t('property.enter'),
                        fill: true,
                        borderColor: "#00f2c3",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: "#00f2c3",
                        pointBorderColor: "rgba(255,255,255,0)",
                        pointHoverBackgroundColor: "#00f2c3",
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: this.lineChart.enters
                    },
                    {
                        label: this.$t('property.exit'),
                        fill: true,
                        borderColor: "#fd5d93",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: "#fd5d93",
                        pointBorderColor: "rgba(255,255,255,0)",
                        pointHoverBackgroundColor: "#fd5d93",
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: this.lineChart.exits
                    }
                ]
            };
        }
    }
};

</script>
<style>

</style>