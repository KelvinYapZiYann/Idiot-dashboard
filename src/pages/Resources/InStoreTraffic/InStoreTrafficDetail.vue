<template>
	<div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
		<base-detail
			:title="$t('component.store')"
			:model="detail.model"
			:headers="detail.detailHeaders"
			thead-classes="text-primary"
		></base-detail>

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
                        :placeholder="$t('date.dateRange')"
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
                <base-input 
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
                </base-input>
            </div>
        </category-card>
		<div class="row">
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="totalTraffics.enter ? totalTraffics.enter : '0'"
                    :sub-title="$t('component.total') + ' ' + $t('property.enter')"
                    type="primary"
                    icon="fas fa-sign-in-alt"
                    >
                </stats-card>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
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
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <stats-card
                    :title="totalTraffics.passing ? totalTraffics.passing : '0'"
                    :sub-title="$t('component.total') + ' ' + $t('property.passing')"
                    type="neutral"
                    icon="fas fa-times"
                    >
                </stats-card>
            </div>
        </div>

		<traffic-trend-line-chart
            :labels="trendLineChartLabels"
            :lines="trendLineChartLines"
            @trend-chart-change="trafficTrendChartChange"
        >
        </traffic-trend-line-chart>

		<base-button slot="footer" type="primary" @click="handleBack()" fill>
			<i class="fas fa-chevron-left mr-1"></i>
			{{$t('component.back')}}
		</base-button>
	</div>
</template>
<script>
import { 
	// BaseSelectorInput,
	BaseInput,
	BaseButton, 
	BaseDetail,
	StatsCard,
	CategoryCard,
	TrafficTrendLineChart,
} from "@/components/index";
import { Select, Option } from "element-ui";

export default {
	components: {
        [Option.name]: Option,
        [Select.name]: Select,
		// BaseSelectorInput,
		BaseInput,
		BaseButton, 
		BaseDetail,
		StatsCard,
		CategoryCard,
		TrafficTrendLineChart,
	},
	props: {
		inStoreTrafficId: {
			type: [String, Number],
			required: true,
			default: "",
		},
		previousRoute: {
			type: String,
			required: false,
			default: "",
			description: "Previous Route"
		}
	},
	data() {
		let today = this.$moment();
		return {
			detail: {
				model: {},
				detailHeaders: {
					device_description: this.$t('property.name'),
                    device_mac_address: this.$t('property.macAddress'),
                    device_type: this.$t('property.type'),
				},
			},

			totalTrafficsSelectedDateRange: "today",
            totalTrafficsSelectedStartDate: today.format("YYYY-MM-DD"),
            totalTrafficsSelectedEndDate: today.add(1, 'days').format("YYYY-MM-DD"),
            totalTraffics: {
                enter: 0,
                exit: 0,
                return: 0,
                passing: 0,
            },

			trendLineChartLabels: [],
            trendLineChartLines: [],

		};
	},
	mounted() {
		this.init();
	},
	methods: {
		async init() {
            this.totalTraffics = {
                enter: 0,
                exit: 0,
                return: 0,
                passing: 0,
            };
            await this.initDevice().then(() => {
                this.getTotalTraffics();
            });
        },
		async initDevice() {
            await this.$store.dispatch('inStoreTraffic/getById', {
                id: this.inStoreTrafficId,
			}).then((response) => {
                let tmp = Object.entries(response);
                let tmp2 = tmp[0];
                this.detail.model = tmp2[tmp2.length - 1];
            });
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
		totalTrafficsDevicesChange() {
            this.getTotalTraffics();
        },
        async getTotalTraffics() {
            let param = `&device_id=${this.inStoreTrafficId}`;
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

		async trafficTrendChartChange(param) {
            let queries = [];
            if (param.chartType == 'daily') {
                if (param.dateRange == 'custom') {
                    let tmpTrendLineChartLabels = [];
                    let tmpStartDate = this.$moment(param.startDate);
                    let tmpEndDate = this.$moment(param.endDate);
                    let daysDifference = tmpEndDate.diff(tmpStartDate, 'days');
                    for (let i = 0; i < daysDifference + 1; i++) {
                        tmpTrendLineChartLabels.push(tmpStartDate.format('YYYY-MM-DD (ddd)'));
                        tmpStartDate.add(1, 'days');
                    }
                    this.trendLineChartLabels = tmpTrendLineChartLabels;

                    queries.push({
                        label: this.$t('dashboard.all'),
                        dateRange: `${param.startDate},${param.endDate}`,
                        daysDifference: daysDifference + 1,
                        query:  `&device_id=${this.inStoreTrafficId}`,
                    });
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
                            daysDifference: daysDifference + 1,
                            query: `&device_id=${this.inStoreTrafficId}`,
                        });
                    });
                }
                let lines = [];
                let tmpFlag = 0;
                for (let i = 0; i < queries.length; i++) {
                    await this.getDailyTrafficTrendChart(lines, queries[i].daysDifference, queries[i].label, queries[i].dateRange, queries[i].query).then(() => {
                        tmpFlag++;
                        if (tmpFlag == queries.length) {
                            this.trendLineChartLines = lines;
                        }
                    });
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
                    query: `&device_id=${this.inStoreTrafficId}`,
                });
                
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
                    query: `&device_id=${this.inStoreTrafficId}`,
                });
                
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
        async getDailyTrafficTrendChart(lines, daysDifference, label, dateRange, query) {
            await this.$store.dispatch('inStoreTraffic/getDailyTraffics', {
                param: `date=${dateRange}` + query
            }).then((response) => {
                if (response.length == daysDifference) {
                    lines.push({
                        label: label,
                        data: response.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
                    });
                } else if (response.length > daysDifference) {
                    response.splice(response.length - 1, response.length - daysDifference);
                    lines.push({
                        label: label,
                        data: response.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
                    });
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
                    lines.push({
                        label: label,
                        data: tmpData,
                    });
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

		handleBack() {
			if (this.previousRoute) {
				this.$router.push({
					name: this.previousRoute, 
					params: {
						previousRouteParam: this.previousRouteParam
					}
				});
			} else {
				this.$router.go(-1);
			}
		},
	},
};
</script>
<style>
</style>
