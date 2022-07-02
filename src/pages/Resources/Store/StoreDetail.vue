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
                <base-selector-input
                    :label="$t('date.dateRange')"
                    v-model="totalTrafficsSelectedDateRange"
                    :options="$t('customDateRangeOptions')"
                    class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6"
                    @input="totalTrafficsDateRangeSelectorChange"
                ></base-selector-input>
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
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6">
                    <label class="col-12">{{$t('component.inStoreTraffics')}}</label>
                    <el-select
                        multiple
                        class="select-info"
                        size="large"
                        v-model="totalTrafficsSelectedDevices"
                        collapse-tags
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
            :deviceOptions="totalTrafficsDeviceOptions"
            @trend-chart-change="trafficTrendChartChange"
        >
        </traffic-trend-line-chart>

		<in-store-traffic-table
			:resource="inStoreTrafficResource"
		></in-store-traffic-table>

		<base-button slot="footer" type="primary" @click="handleBack()" fill>
			<i class="fas fa-chevron-left mr-1"></i>
			{{$t('component.back')}}
		</base-button>

        <vue-fab 
            mainBtnColor="#1d8cf8"
            size="big"
            :scrollAutoHide="false"
            icon="more_vert"
            activeIcon="add"
            >
            <fab-item 
                :idx="0"
                title="add"
                color="#1d8cf8"
                titleColor="#fff"
                titleBgColor="#1d8cf8"
                icon="description"
                @clickItem="handleFloatButtonClick" />
        </vue-fab>
	</div>
</template>
<script>
import { 
	BaseSelectorInput,
	BaseInput,
	BaseButton, 
	BaseDetail,
	StatsCard,
	CategoryCard,
	TrafficTrendLineChart,
} from "@/components/index";
import InStoreTrafficTable from "@/components/Resources/InStoreTraffic/InStoreTrafficTable";
import { Select, Option } from "element-ui";

export default {
	components: {
        [Option.name]: Option,
        [Select.name]: Select,
		BaseSelectorInput,
		BaseInput,
		BaseButton, 
		BaseDetail,
		StatsCard,
		CategoryCard,
		TrafficTrendLineChart,
		InStoreTrafficTable,
	},
	props: {
		storeId: {
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
					store_name: this.$t('property.name'),
					store_address: this.$t('property.address'),
				},
			},

			totalTrafficsSelectedDateRange: "today",
            totalTrafficsSelectedStartDate: today.format("YYYY-MM-DD"),
            totalTrafficsSelectedEndDate: today.add(1, 'days').format("YYYY-MM-DD"),
            totalTrafficsSelectedStores: "",
            totalTrafficsStoreOptions: [],
            totalTrafficsSelectedDevices: "",
            totalTrafficsDeviceOptions: [],
            totalTraffics: {
                enter: 0,
                exit: 0,
                return: 0,
                passing: 0,
            },

			trendLineChartLabels: [],
            trendLineChartLines: [],

			inStoreTrafficResource: {
				models: [],
				data: {}
			}
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
			await this.initStore();
            await this.initDevice().then(() => {
                this.getTotalTraffics();
            });
        },
		async initStore() {
			await this.$store.dispatch('store/getAll').then(() => {
                let stores = this.$store.getters["store/models"];
                // let tmpStoreOptions = [];
                for (let i = 0; i < stores.length; i++) {
					if (stores[i].store_id == this.storeId) {
						this.detail.model = stores[i];
					}
					// tmpStoreOptions.push({
                    //     value: stores[i].store_id,
                    //     label: stores[i].store_name,
                    // });
				}
                // this.totalTrafficsStoreOptions = tmpStoreOptions;
            });
		},
		async initDevice() {
            await this.$store.dispatch('inStoreTraffic/getAll', {
				param: {
					storeId: this.storeId,
				}
			}).then(() => {
                let devices = this.$store.getters["inStoreTraffic/models"];
                let tmpDeviceOptions = [];
				this.inStoreTrafficResource.models = [];
                for (let i = 0; i < devices.length; i++) {
					if (devices[i].store_id == this.storeId) {
						tmpDeviceOptions.push({
							value: devices[i].device_id,
							label: devices[i].device_description,
						});
					}
					this.$store.dispatch('decode/decodeDateRange', 'weekTillDate').then((dateRange) => {
						this.$store.dispatch('inStoreTraffic/getTotalTraffics', {
							param: `date=${dateRange}&device_id=${devices[i].device_id}`
						}).then((response) => {
							let tmpDevice = devices[i];
							tmpDevice.enter = response.enter;
							tmpDevice.exit = response.exit;
							tmpDevice.return = response.return;
							tmpDevice.passing = response.passing;
							this.inStoreTrafficResource.models.push(tmpDevice);
						});
					});
                }
                this.totalTrafficsDeviceOptions = tmpDeviceOptions;
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
            let param = `&store_id=${this.storeId}`;
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
                        query:  `&store_id=${this.storeId}`,
                    });
                    // for (let i = 0; i < param.stores.length; i++) {
                    //     for (let j = 0; j < this.totalTrafficsStoreOptions.length; j++) {
                    //         if (this.totalTrafficsStoreOptions[j].value == param.stores[i]) {
                    //             queries.push({
                    //                 label: this.totalTrafficsStoreOptions[j].label,
                    //                 dateRange: `${param.startDate},${param.endDate}`,
                    //                 daysDifference: daysDifference + 1,
                    //                 query: `&store_id=${param.stores[i]}`
                    //             });
                    //             break;
                    //         }
                    //     }
                    // }
                    for (let i = 0; i < param.devices.length; i++) {
                        for (let j = 0; j < this.totalTrafficsDeviceOptions.length; j++) {
                            if (this.totalTrafficsDeviceOptions[j].value == param.devices[i]) {
                                queries.push({
                                    label: this.totalTrafficsDeviceOptions[j].label,
                                    dateRange: `${param.startDate},${param.endDate}`,
                                    daysDifference: daysDifference + 1,
                                    query: `&store_id=${this.storeId}&device_id=${param.devices[i]}`
                                });
                                break;
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
                            daysDifference: daysDifference + 1,
                            query: `&store_id=${this.storeId}`,
                        });
                        // for (let i = 0; i < param.stores.length; i++) {
                        //     for (let j = 0; j < this.totalTrafficsStoreOptions.length; j++) {
                        //         if (this.totalTrafficsStoreOptions[j].value == param.stores[i]) {
                        //             queries.push({
                        //                 label: this.totalTrafficsStoreOptions[j].label,
                        //                 dateRange: dateRange,
                        //                 daysDifference: daysDifference + 1,
                        //                 query: `&store_id=${param.stores[i]}`
                        //             });
                        //             break;
                        //         }
                        //     }
                        // }
                        for (let i = 0; i < param.devices.length; i++) {
                            for (let j = 0; j < this.totalTrafficsDeviceOptions.length; j++) {
                                if (this.totalTrafficsDeviceOptions[j].value == param.devices[i]) {
                                    queries.push({
                                        label: this.totalTrafficsDeviceOptions[j].label,
                                        dateRange: dateRange,
                                        daysDifference: daysDifference + 1,
                                        query: `&store_id=${this.storeId}&device_id=${param.devices[i]}`
                                    });
                                    break;
                                }
                            }
                        }
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
                    query: `&store_id=${this.storeId}`,
                });
                // for (let i = 0; i < param.stores.length; i++) {
                //     for (let j = 0; j < this.totalTrafficsStoreOptions.length; j++) {
                //         if (this.totalTrafficsStoreOptions[j].value == param.stores[i]) {
                //             queries.push({
                //                 label: this.totalTrafficsStoreOptions[j].label,
                //                 date: tmpDate.format("YYYY-MM-DD"),
                //                 query: `&store_id=${param.stores[i]}`
                //             });
                //             break;
                //         }
                //     }
                // }
                for (let i = 0; i < param.devices.length; i++) {
                    for (let j = 0; j < this.totalTrafficsDeviceOptions.length; j++) {
                        if (this.totalTrafficsDeviceOptions[j].value == param.devices[i]) {
                            queries.push({
                                label: this.totalTrafficsDeviceOptions[j].label,
                                date: tmpDate.format("YYYY-MM-DD"),
                                query: `&store_id=${this.storeId}&device_id=${param.devices[i]}`
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
                    query: `&store_id=${this.storeId}`,
                });
                // for (let i = 0; i < param.stores.length; i++) {
                //     for (let j = 0; j < this.totalTrafficsStoreOptions.length; j++) {
                //         if (this.totalTrafficsStoreOptions[j].value == param.stores[i]) {
                //             queries.push({
                //                 label: this.totalTrafficsStoreOptions[j].label,
                //                 date: tmpDate.format("YYYY-MM-DD"),
                //                 query: `&store_id=${param.stores[i]}`
                //             });
                //             break;
                //         }
                //     }
                // }
                for (let i = 0; i < param.devices.length; i++) {
                    for (let j = 0; j < this.totalTrafficsDeviceOptions.length; j++) {
                        if (this.totalTrafficsDeviceOptions[j].value == param.devices[i]) {
                            queries.push({
                                label: this.totalTrafficsDeviceOptions[j].label,
                                date: tmpDate.format("YYYY-MM-DD"),
                                query: `&store_id=${this.storeId}&device_id=${param.devices[i]}`
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
        handleFloatButtonClick(idx) {
            if (idx.idx == 0) {
                console.log(idx.idx);
            }
        },
	},
};
</script>
<style>
</style>
