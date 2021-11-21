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
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.todayEnter ? resource.todayEnter : '0'"
                    :sub-title="$t('date.today')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.todayExit ? resource.todayExit : '0'"
                    :sub-title="$t('date.today')"
                    type="warning"
                    icon="fas fa-sign-out-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.yesterdayEnter ? resource.yesterdayEnter : '0'"
                    :sub-title="$t('date.yesterday')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.yesterdayExit ? resource.yesterdayExit : '0'"
                    :sub-title="$t('date.yesterday')"
                    type="warning"
                    icon="fas fa-sign-out-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.thisWeekEnter ? resource.thisWeekEnter : '0'"
                    :sub-title="$t('date.thisWeek')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.thisWeekExit ? resource.thisWeekExit : '0'"
                    :sub-title="$t('date.thisWeek')"
                    type="warning"
                    icon="fas fa-sign-out-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.lastWeekEnter ? resource.lastWeekEnter : '0'"
                    :sub-title="$t('date.lastWeek')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.lastWeekExit ? resource.lastWeekExit : '0'"
                    :sub-title="$t('date.lastWeek')"
                    type="warning"
                    icon="fas fa-sign-out-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.thisMonthEnter ? resource.thisMonthEnter : '0'"
                    :sub-title="$t('date.thisMonth')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.thisMonthExit ? resource.thisMonthExit : '0'"
                    :sub-title="$t('date.thisMonth')"
                    type="warning"
                    icon="fas fa-sign-out-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.lastMonthEnter ? resource.lastMonthEnter : '0'"
                    :sub-title="$t('date.lastMonth')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.lastMonthExit ? resource.lastMonthExit : '0'"
                    :sub-title="$t('date.lastMonth')"
                    type="warning"
                    icon="fas fa-sign-out-alt"
                    >
                </stats-card>
            </div>
        </div>
    </div>
</template>
<script>
import {
    StatsCard,
} from "@/components/index";

export default {
    components: {
        StatsCard,
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

                stores: [],
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
                // await this.$store.dispatch('dashboard/getMaxTraffics').then(() => {
                //     this.resource.maxTrafficsEnter = this.$store.getters["dashboard/maxTrafficsEnter"];
                //     this.resource.maxTrafficsExit = this.$store.getters["dashboard/maxTrafficsExit"];
                // });
                // await this.$store.dispatch('dashboard/getTodayTraffics').then(() => {
                //     this.resource.todayEnter = this.$store.getters["dashboard/todayEnter"];
                //     this.resource.todayExit = this.$store.getters["dashboard/todayExit"];
                // });
                // await this.$store.dispatch('dashboard/getYesterdayTraffics').then(() => {
                //     this.resource.yesterdayEnter = this.$store.getters["dashboard/yesterdayEnter"];
                //     this.resource.yesterdayExit = this.$store.getters["dashboard/yesterdayExit"];
                // });
                // await this.$store.dispatch('dashboard/getThisWeekTraffics').then(() => {
                //     this.resource.thisWeekEnter = this.$store.getters["dashboard/thisWeekEnter"];
                //     this.resource.thisWeekExit = this.$store.getters["dashboard/thisWeekExit"];
                // });
                // await this.$store.dispatch('dashboard/getlastWeekTraffics').then(() => {
                //     this.resource.lastWeekEnter = this.$store.getters["dashboard/lastWeekEnter"];
                //     this.resource.lastWeekExit = this.$store.getters["dashboard/lastWeekExit"];
                // });
                // await this.$store.dispatch('dashboard/getThisMonthTraffics').then(() => {
                //     this.resource.thisMonthEnter = this.$store.getters["dashboard/thisMonthEnter"];
                //     this.resource.thisMonthExit = this.$store.getters["dashboard/thisMonthExit"];
                // });
                // await this.$store.dispatch('dashboard/getlastMonthTraffics').then(() => {
                //     this.resource.lastMonthEnter = this.$store.getters["dashboard/lastMonthEnter"];
                //     this.resource.lastMonthExit = this.$store.getters["dashboard/lastMonthExit"];
                // });

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

                // console.log();
                let today = this.$moment();
                
                let currentDay = today.format('D');
                let todayDateString = today.format('YYYY-MM-DD');
                let yesterday = today.subtract(1, 'days').format('D');
                let thisWeekStartDateString = today.subtract(5, 'days').format('YYYY-MM-DD');
                let lastWeekEndDateString = today.subtract(1, 'days').format('YYYY-MM-DD');
                let lastWeekStartDateString = today.subtract(6, 'days').format('YYYY-MM-DD');
                today = this.$moment();
                let thisMonthStartDateString = today.startOf('month').format('YYYY-MM-DD');
                let thisMonthEndDateString = today.endOf('month').format('YYYY-MM-DD');
                let lastMonthStartDateString = today.subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
                let lastMonthEndDateString = today.endOf('month').format('YYYY-MM-DD');
                

                await this.$store.dispatch('store/getAll').then(() => {
                    this.stores = this.$store.getters["store/models"];
                    
                    this.stores.forEach((store) => {
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
                        });
                    });

                    // await this.$store.dispatch('dashboard/getTotalTraffics', ).then(() => {
                    //     let model = this.$store.getters["dashboard/models"][0];
                    //     this.resource.totalTrafficsEnter = model.enter;
                    //     this.resource.totalTrafficsExit = model.exit;
                    // });

                });
            } catch (e) {
                console.error(e);
            } finally {
                loader.hide();
            }
        }
    }
};

</script>