<template>
    <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
        <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.maxTrafficsEnter"
                    :sub-title="$t('dashboard.maxTraffics')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                    >
                </stats-card>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.maxTrafficsExit"
                    :sub-title="$t('dashboard.maxTraffics')"
                    type="warning"
                    icon="fas fa-sign-out-alt"
                    >
                </stats-card>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.todayEnter"
                    :sub-title="$t('date.today')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.todayExit"
                    :sub-title="$t('date.today')"
                    type="warning"
                    icon="fas fa-sign-out-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.yesterdayEnter"
                    :sub-title="$t('date.yesterday')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.yesterdayExit"
                    :sub-title="$t('date.yesterday')"
                    type="warning"
                    icon="fas fa-sign-out-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.thisWeekEnter"
                    :sub-title="$t('date.thisWeek')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.thisWeekExit"
                    :sub-title="$t('date.thisWeek')"
                    type="warning"
                    icon="fas fa-sign-out-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.lastWeekEnter"
                    :sub-title="$t('date.lastWeek')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.lastWeekExit"
                    :sub-title="$t('date.lastWeek')"
                    type="warning"
                    icon="fas fa-sign-out-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.thisMonthEnter"
                    :sub-title="$t('date.thisMonth')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.thisMonthExit"
                    :sub-title="$t('date.thisMonth')"
                    type="warning"
                    icon="fas fa-sign-out-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.lastMonthEnter"
                    :sub-title="$t('date.lastMonth')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="resource.lastMonthExit"
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
                maxTrafficsEnter: '0',
                maxTrafficsExit: '0',
                todayEnter: '0',
                todayExit: '0',
                yesterdayEnter: '0',
                yesterdayExit: '0',
                thisWeekEnter: '0',
                thisWeekExit: '0',
                lastWeekEnter: '0',
                lastWeekExit: '0',
                thisMonthEnter: '0',
                thisMonthExit: '0',
                lastMonthEnter: '0',
                lastMonthExit: '0',
            }
        }
    },
    mounted() {
        this.getResource();
    },
    methods: {
        async getResource() {
            let loader = this.$loading.show();
            try {
                await this.$store.dispatch('dashboard/getMaxTraffics').then(() => {
                    this.resource.maxTrafficsEnter = this.$store.getters["dashboard/maxTrafficsEnter"];
                    this.resource.maxTrafficsExit = this.$store.getters["dashboard/maxTrafficsExit"];
                });
                await this.$store.dispatch('dashboard/getTodayTraffics').then(() => {
                    this.resource.todayEnter = this.$store.getters["dashboard/todayEnter"];
                    this.resource.todayExit = this.$store.getters["dashboard/todayExit"];
                });
                await this.$store.dispatch('dashboard/getYesterdayTraffics').then(() => {
                    this.resource.yesterdayEnter = this.$store.getters["dashboard/yesterdayEnter"];
                    this.resource.yesterdayExit = this.$store.getters["dashboard/yesterdayExit"];
                });
                await this.$store.dispatch('dashboard/getThisWeekTraffics').then(() => {
                    this.resource.thisWeekEnter = this.$store.getters["dashboard/thisWeekEnter"];
                    this.resource.thisWeekExit = this.$store.getters["dashboard/thisWeekExit"];
                });
                await this.$store.dispatch('dashboard/getlastWeekTraffics').then(() => {
                    this.resource.lastWeekEnter = this.$store.getters["dashboard/lastWeekEnter"];
                    this.resource.lastWeekExit = this.$store.getters["dashboard/lastWeekExit"];
                });
                await this.$store.dispatch('dashboard/getThisMonthTraffics').then(() => {
                    this.resource.thisMonthEnter = this.$store.getters["dashboard/thisMonthEnter"];
                    this.resource.thisMonthExit = this.$store.getters["dashboard/thisMonthExit"];
                });
                await this.$store.dispatch('dashboard/getlastMonthTraffics').then(() => {
                    this.resource.lastMonthEnter = this.$store.getters["dashboard/lastMonthEnter"];
                    this.resource.lastMonthExit = this.$store.getters["dashboard/lastMonthExit"];
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