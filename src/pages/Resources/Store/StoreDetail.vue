<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <base-detail
     :title="$t('component.store')"
     :model="resource.model"
     :headers="detail.detailHeaders"
     thead-classes="text-primary"
    ></base-detail>

    <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6 col-6">
            <stats-card
                :title="trafficResource.enter ? trafficResource.enter : '0'"
                :sub-title="$t('property.enter')"
                type="primary"
                icon="fas fa-sign-in-alt"
                >
            </stats-card>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-6">
            <stats-card
                :title="trafficResource.exit ? trafficResource.exit : '0'"
                :sub-title="$t('property.exit')"
                type="warning"
                icon="fas fa-sign-out-alt"
                >
            </stats-card>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-6">
            <stats-card
                :title="trafficResource.return ? trafficResource.return : '0'"
                :sub-title="$t('property.return')"
                type="success"
                icon="fas fa-undo-alt"
                >
            </stats-card>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-6">
            <stats-card
                :title="trafficResource.passing ? trafficResource.passing : '0'"
                :sub-title="$t('property.passing')"
                type="neutral"
                icon="fas fa-times"
                >
            </stats-card>
        </div>
    </div>

    <div class="row">
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
    </div>

                

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
  BaseInput,
  Card,
  StatsCard,
  LineChart
} from "@/components/index";
import * as chartConfigs from "@/components/Chart/ChartConfig";
import InStoreTrafficTable from "@/components/Resources/InStoreTraffic/InStoreTrafficTable";
import router from "@/router";

export default {
  components: {
    BaseButton,
    BaseDetail,
    BaseInput,
    Card,
    StatsCard,
    InStoreTrafficTable,
    LineChart
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
      trafficResource: {
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
      lineChart: {
          extraOptions: chartConfigs.chartOptions,
          labels: [],
          enters: [],
          exits: [],
          dateRange: {
              startDate: null,
              endDate: null
          }
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
        this.trafficResource.enter = 0;
        this.trafficResource.exit = 0;
        this.trafficResource.return = 0;
        this.trafficResource.passing = 0;

        this.lineChart.labels = [];
        this.lineChart.enters = [];
        this.lineChart.exits = [];

        let today = this.$moment();
        let todayDateString = today.add(1, 'days').format('YYYY-MM-DD');
        today = this.$moment();
        let wholeMonthStartDateString = today.subtract(1, 'months').format('YYYY-MM-DD');
        this.lineChart.dateRange.startDate = wholeMonthStartDateString;
        this.lineChart.dateRange.endDate = todayDateString;

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
                  obj.enter = model.enter;
                  obj.exit = model.exit;
                  this.trafficResource.enter += model.enter;
                  this.trafficResource.exit += model.exit;
                  this.trafficResource.return += model.return;
                  this.trafficResource.passing += model.passing;
                  this.inStoreTrafficResource.models.push(obj);
                });

                let tmpToday = today;

                this.$store.dispatch('dashboard/getDailyTrafficsInCustomDateRange', {storeId: store.store_id, deviceId: device.device_id, startDate: this.lineChart.dateRange.startDate, endDate: this.lineChart.dateRange.endDate}).then(() => {
                    let models = this.$store.getters["dashboard/models"];

                    let duration = this.$moment.duration(this.$moment().diff(tmpToday));
                    let durationDiffDays = Math.floor(duration.asDays());
                    mainLoop: for (let i = 0; i < durationDiffDays; i++) {
                        let tmpDate = tmpToday.format('YYYY-MM-DD');
                        for (let j = 0; j < models.length; j++) {
                            if (tmpDate == models[j].date) {
                                this.lineChart.labels.push(tmpToday.format('YYYY-MM-DD (ddd)'));
                                this.lineChart.enters.push(models[j].enter);
                                this.lineChart.exits.push(models[j].exit);
                                tmpToday.add(1, 'days');
                                continue mainLoop;
                            }
                        }
                        this.lineChart.labels.push(tmpToday.format('YYYY-MM-DD (ddd)'));
                        this.lineChart.enters.push(0);
                        this.lineChart.exits.push(0);
                        tmpToday.add(1, 'days');
                    }
                });

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
    async getLineChartDateRange() {
          if (this.lineChart.dateRange.endDate <= this.lineChart.dateRange.startDate) {
              return;
          }
          let startDateMoment = this.$moment(this.lineChart.dateRange.startDate);
          let endDateMoment = this.$moment(this.lineChart.dateRange.endDate);
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
                      this.$store.dispatch('dashboard/getDailyTrafficsInCustomDateRange', {storeId: store.store_id, deviceId: device.device_id, startDate: this.lineChart.dateRange.startDate, endDate: this.lineChart.dateRange.endDate}).then(() => {
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
