<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <base-detail
     :title="$t('component.store')"
     :model="resource.model"
     :headers="detail.detailHeaders"
     thead-classes="text-primary"
    ></base-detail>

    <div class="row">
        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
            <stats-card
                :title="todayTrafficResource.enter ? todayTrafficResource.enter : '0'"
                :sub-title="$t('date.today') + ' ' + $t('property.enter')"
                type="primary"
                icon="fas fa-sign-in-alt"
                >
            </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
            <stats-card
                :title="todayTrafficResource.exit ? todayTrafficResource.exit : '0'"
                :sub-title="$t('date.today') + ' ' + $t('property.exit')"
                type="warning"
                icon="fas fa-sign-out-alt"
                >
            </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
            <stats-card
                :title="todayTrafficResource.return ? todayTrafficResource.return : '0'"
                :sub-title="$t('date.today') + ' ' + $t('property.return')"
                type="success"
                icon="fas fa-undo-alt"
                >
            </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
            <stats-card
                :title="todayTrafficResource.passing ? todayTrafficResource.passing : '0'"
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
                :title="totalTrafficResource.enter ? totalTrafficResource.enter : '0'"
                :sub-title="$t('date.today') + ' ' + $t('property.enter')"
                type="primary"
                icon="fas fa-sign-in-alt"
                >
            </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
            <stats-card
                :title="totalTrafficResource.exit ? totalTrafficResource.exit : '0'"
                :sub-title="$t('component.total') + ' ' + $t('property.exit')"
                type="warning"
                icon="fas fa-sign-out-alt"
                >
            </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
            <stats-card
                :title="totalTrafficResource.return ? totalTrafficResource.return : '0'"
                :sub-title="$t('component.total') + ' ' + $t('property.return')"
                type="success"
                icon="fas fa-undo-alt"
                >
            </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
            <stats-card
                :title="totalTrafficResource.passing ? totalTrafficResource.passing : '0'"
                :sub-title="$t('component.total') + ' ' + $t('property.passing')"
                type="neutral"
                icon="fas fa-times"
                >
            </stats-card>
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

                

    <in-store-traffic-table
      :resource="inStoreTrafficResource"
      @getResource="getResource"
    ></in-store-traffic-table>

    <base-button slot="footer" type="primary" @click="handleBack()" fill>
      <i class="fas fa-chevron-left mr-1"></i>
      {{$t('component.back')}}
    </base-button>
    <!-- <base-button slot="footer" type="primary" @click="handleEdit()" fill>
      <i class="fas fa-edit mr-1"></i>
      {{$t('component.edit')}} {{$t('component.store')}}
    </base-button> -->
  </div>
</template>
<script>
import { 
  BaseButton, 
  BaseDetail,
  // BaseInput,
  // Card,
  StatsCard,
  // LineChart
  TrafficTrendLineChart
} from "@/components/index";
import InStoreTrafficTable from "@/components/Resources/InStoreTraffic/InStoreTrafficTable";
import router from "@/router";
// import * as chartConfigs from "@/components/Chart/ChartConfig";

export default {
  components: {
    BaseButton,
    BaseDetail,
    // BaseInput,
    // Card,
    StatsCard,
    InStoreTrafficTable,
    // LineChart
    TrafficTrendLineChart
  },
  data() {
    return {
      storeId: this.$route.params.storeId,
      resource: {
        model: {},
        data: {}
      },
      inStoreTrafficResource: {
        models: [],
        data: {}
      },
      todayTrafficResource: {
        enter: 0,
        exit: 0,
        return: 0,
        passing: 0
      },
      totalTrafficResource: {
        enter: 0,
        exit: 0,
        return: 0,
        passing: 0
      },
      detail: {
        detailHeaders: {
          store_name: this.$t('property.name'),
          store_address: this.$t('property.address'),
        },
      },
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
    };
  },
  props: {
    previousRoute: {
      type: String,
      required: false,
      default: "",
      description: "Previous Route"
    }
  },
  mounted() {
    this.getResource();
  },
  methods: {
    async getResource() {
      let loader = this.$loading.show();
      try {
        // await this.$store.dispatch('store/getById', this.storeId).then(() => {
        //   this.resource.model = this.$store.getters["store/models"][0];
        //   this.resource.data = this.$store.getters["asset/data"];
        // });
        this.inStoreTrafficResource.models = [];
        this.totalTrafficResource.enter = 0;
        this.totalTrafficResource.exit = 0;
        this.totalTrafficResource.return = 0;
        this.totalTrafficResource.passing = 0;
        this.todayTrafficResource.enter = 0;
        this.todayTrafficResource.exit = 0;
        this.todayTrafficResource.return = 0;
        this.todayTrafficResource.passing = 0;

        // this.lineChart.labels = [];
        // this.lineChart.enters = [];
        // this.lineChart.exits = [];

        let today = this.$moment();
        let todayDateString = today.format('YYYY-MM-DD');
        // today = this.$moment();
        // let wholeMonthStartDateString = this.$store.getters["mobileLayout/isMobileLayout"] ? today.subtract(7, 'days').format('YYYY-MM-DD') : today.subtract(1, 'months').format('YYYY-MM-DD');
        // this.lineChart.dateRange.startDate = wholeMonthStartDateString;
        // this.lineChart.dateRange.endDate = todayDateString;

        await this.$store.dispatch('store/getAll').then(() => {
          let tmpModels = this.$store.getters["store/models"];
          tmpModels.forEach((store) => {
            if (store.store_id == this.storeId) {
              this.resource.model = store;
              store.devices.forEach((device) => {
                let obj = device;
                obj.id = device.device_id;
                // this.inStoreTrafficResource.models.push(obj);
                this.$store.dispatch('dashboard/getTotalTraffics', {storeId: store.store_id, deviceId: device.device_id}).then(() => {
                  let model = this.$store.getters["dashboard/models"][0];
                  if (model) {
                    obj.enter = model.enter;
                    obj.exit = model.exit;
                    this.totalTrafficResource.enter += model.enter;
                    this.totalTrafficResource.exit += model.exit;
                    this.totalTrafficResource.return += model.return;
                    this.totalTrafficResource.passing += model.passing;
                  }
                  this.inStoreTrafficResource.models.push(obj);
                });

                this.$store.dispatch('dashboard/getHourlyTrafficsInDay', {storeId: store.store_id, deviceId: device.device_id, date: todayDateString}).then(() => {
                  let models = this.$store.getters["dashboard/models"];
                  for (let i = 0; i < models.length; i++) {
                    this.todayTrafficResource.enter += models[i].enter;
                    this.todayTrafficResource.exit += models[i].exit;
                    this.todayTrafficResource.return += models[i].return;
                    this.todayTrafficResource.passing += models[i].passing;
                  }
                });
                // this.getLineChartDateRange();

              });
            }
          });
          // this.resource.models = this.$store.getters["store/models"];
          // this.resource.data = Object.assign({}, this.$store.getters["store/data"]);
        });
        // let param = {
        //   storeId: this.storeId
        // };
        // await this.$store.dispatch('inStoreTraffic/get', param).then(() => {
        //   this.inStoreTrafficResource.model = this.$store.getters["inStoreTraffic/models"];
        //   this.inStoreTrafficResource.data = this.$store.getters["inStoreTraffic/data"];
        // });
      } catch (e) {
        console.error(e);
      } finally {
        loader.hide();
      }
    },
    async handleBack() {
      if (this.previousRoute) {
        router.push({
          name: this.previousRoute, 
          params: {
            previousRouteParam: this.previousRouteParam
          }
        });
      } else {
        router.go(-1);
      }
    },
    async handleEdit() {
      router.push({
        name: "Edit Store",
        params: {
          storeId: this.storeId,
          previousRoute: router.currentRoute.name,
        }
      });
    },
    async getLineChartTimeRange(value) {
            if (!value.date) {
                return;
            }
            this.minuteLineChart.labels = [];
            // this.hourlyLineChart.enters = [];
            // this.hourlyLineChart.exits = [];
            // this.hourlyLineChart.returns = [];
            // this.hourlyLineChart.passings = [];

            let tmpLabels = [];
            let tmpEnters = [];
            let tmpExits = [];
            let tmpReturns = [];
            let tmpPassings = [];
            
            // let today = this.$moment();
            // let totalHour = 24;
            // if (date == today.format('YYYY-MM-DD')) {
            //     totalHour = parseInt(today.format('H')) + 1;
            // }
            // let time = this.$t('date.am');
            // for (let i = 0; i < totalHour; i++) {
            //     if (i >= 12) {
            //         time = this.$t('date.pm');
            //     }
            //     this.minuteLineChart.labels.push(i + ':00' + time);
            //     tmpEnters.push(0);
            //     tmpExits.push(0);
            //     tmpPassings.push(0);
            //     tmpReturns.push(0);
            // }

            await this.$store.dispatch('store/getAll').then(() => {
                let stores = this.$store.getters["store/models"];
                stores.forEach((store) => {
                    store.devices.forEach((device) => {
                    // if (device.device_id == this.inStoreTrafficId) {
                        this.$store.dispatch('dashboard/getMinuteTrafficsInDay', {
              storeId: store.store_id, 
              deviceId: device.device_id, 
              date: value.date, 
              interval: 15
            }).then(() => {
                            let models = this.$store.getters["dashboard/models"];
                            for (let i = 0; i < models.length; i++) {
                            //     let tmpTime = parseInt(models[i].hour);
                            //     tmpEnters[tmpTime] += models[i].enter;
                            //     tmpExits[tmpTime] += models[i].exit;
                            //     tmpReturns[tmpTime] += models[i].return;
                            //     tmpPassings[tmpTime] += models[i].passing;
                              if (parseInt(models[i].end_time.substring(0, 2)) <= 12) {
                                tmpLabels.push(models[i].end_time.substring(0, 5) + "AM");
                              } else {
                                tmpLabels.push(models[i].end_time.substring(0, 5) + "PM");
                              }
                              // tmpLabels.push(models[i].end_time);
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
                    // }
                    });
                });
            });
        },
    async getLineChartDate(value) {
        if (!value.date) {
            return;
        }
        this.hourlyLineChart.labels = [];
        // this.hourlyLineChart.enters = [];
        // this.hourlyLineChart.exits = [];
        // this.hourlyLineChart.returns = [];
        // this.hourlyLineChart.passings = [];

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
              if (store.store_id == this.storeId) {
                store.devices.forEach((device) => {
                    this.$store.dispatch('dashboard/getHourlyTrafficsInDay', {storeId: store.store_id, deviceId: device.device_id, date: value.date}).then(() => {
                        let models = this.$store.getters["dashboard/models"];
                        for (let i = 0; i < models.length; i++) {
                        //     this.hourlyLineChart.labels.push(models[i].hour);
                        //     this.hourlyLineChart.enters.push(models[i].enter);
                        //     this.hourlyLineChart.exits.push(models[i].exit);
                        //     this.hourlyLineChart.returns.push(models[i].return);
                        //     this.hourlyLineChart.passings.push(models[i].passing);
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
                    });
                });
              }
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
          // if (this.lineChart.dateRange.endDate <= this.lineChart.dateRange.startDate) {
          //     return;
          // }
          let startDateMoment = this.$moment(value.startDate);
          let tmpStartDateMoment = startDateMoment;
          let endDateMoment = this.$moment(value.endDate);
          let duration = this.$moment.duration(endDateMoment.diff(startDateMoment));
          let durationDiffDays = Math.floor(duration.asDays());
          if (duration._milliseconds <= 0) {
              return;
          }
          this.dailyLineChart.labels = [];
          // this.dailyLineChart.enters = [];
          // this.dailyLineChart.exits = [];
          // this.dailyLineChart.returns = [];
          // this.dailyLineChart.passings = [];
          let tmpEnters = [];
          let tmpExits = [];
          let tmpReturns = [];
          let tmpPassings = [];

          for (let i = 0; i < durationDiffDays; i++) {
            this.dailyLineChart.labels.push(tmpStartDateMoment.format('YYYY-MM-DD (ddd)'));
            // this.dailyLineChart.enters.push(0);
            // this.dailyLineChart.exits.push(0);
            // this.dailyLineChart.returns.push(0);
            // this.dailyLineChart.passings.push(0);
            tmpEnters.push(0);
            tmpExits.push(0);
            tmpReturns.push(0);
            tmpPassings.push(0);
            tmpStartDateMoment.add(1, 'days');
          }

          await this.$store.dispatch('store/getAll').then(() => {
              let stores = this.$store.getters["store/models"];
              
              stores.forEach((store) => {
                  if (store.store_id == this.storeId) {
                    store.devices.forEach((device) => {
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
                    });
                  }
              });
          });
      }
  },
  // computed: {
  //       chartData() {
  //           return {
  //               labels: this.lineChart.labels,
  //               datasets: [
  //                   {
  //                       label: this.$t('property.enter'),
  //                       fill: true,
  //                       borderColor: "#00f2c3",
  //                       borderWidth: 2,
  //                       borderDash: [],
  //                       borderDashOffset: 0.0,
  //                       pointBackgroundColor: "#00f2c3",
  //                       pointBorderColor: "rgba(255,255,255,0)",
  //                       pointHoverBackgroundColor: "#00f2c3",
  //                       pointBorderWidth: 20,
  //                       pointHoverRadius: 4,
  //                       pointHoverBorderWidth: 15,
  //                       pointRadius: 4,
  //                       data: this.lineChart.enters
  //                   },
  //                   {
  //                       label: this.$t('property.exit'),
  //                       fill: true,
  //                       borderColor: "#fd5d93",
  //                       borderWidth: 2,
  //                       borderDash: [],
  //                       borderDashOffset: 0.0,
  //                       pointBackgroundColor: "#fd5d93",
  //                       pointBorderColor: "rgba(255,255,255,0)",
  //                       pointHoverBackgroundColor: "#fd5d93",
  //                       pointBorderWidth: 20,
  //                       pointHoverRadius: 4,
  //                       pointHoverBorderWidth: 15,
  //                       pointRadius: 4,
  //                       data: this.lineChart.exits
  //                   }
  //               ]
  //           };
  //       }
  //   }
};
</script>
<style>
</style>
