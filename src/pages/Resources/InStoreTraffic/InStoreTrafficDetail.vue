<template>
  <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
    <base-detail
     :title="$t('component.inStoreTraffic')"
     :model="resource.model"
     :headers="detail.detailHeaders"
     :detailDisplayValue="detail.detailDisplayValue"
     thead-classes="text-primary"
    ></base-detail>

    <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6 col-6">
            <stats-card
                :title="inStoreTrafficResource.enter ? inStoreTrafficResource.enter : '0'"
                :sub-title="$t('property.enter')"
                type="primary"
                icon="fas fa-sign-in-alt"
                >
            </stats-card>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-6">
            <stats-card
                :title="inStoreTrafficResource.exit ? inStoreTrafficResource.exit : '0'"
                :sub-title="$t('property.exit')"
                type="warning"
                icon="fas fa-sign-out-alt"
                >
            </stats-card>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-6">
            <stats-card
                :title="inStoreTrafficResource.return ? inStoreTrafficResource.return : '0'"
                :sub-title="$t('property.return')"
                type="success"
                icon="fas fa-undo-alt"
                >
            </stats-card>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-6">
            <stats-card
                :title="inStoreTrafficResource.passing ? inStoreTrafficResource.passing : '0'"
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

    <base-button slot="footer" type="primary" @click="handleBack()" fill>
      <i class="fas fa-chevron-left mr-1"></i>
      {{$t('component.back')}}
    </base-button>
    <!-- <base-button slot="footer" type="primary" @click="handleEdit()" fill>
      <i class="fas fa-edit mr-1"></i>
      {{$t('component.edit')}} {{$t('component.inStoreTraffic')}}
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
import router from "@/router";
import * as chartConfigs from "@/components/Chart/ChartConfig";

export default {
  components: {
    BaseButton,
    BaseDetail,
    BaseInput, 
    Card,
    StatsCard,
    LineChart
  },
  data() {
    return {
      inStoreTrafficId: this.$route.params.inStoreTrafficId,
      resource: {
        model: {},
        data: {}
      },
      inStoreTrafficResource: {
        enter: 0,
        exit: 0,
        return: 0,
        passing: 0
      },
      detail: {
        detailHeaders: {
          device_description: this.$t('property.name'),
          device_mac_address: this.$t('property.macAddress'),
          // status: this.$t('property.status'),
          device_type: this.$t('property.type'),
        },
        detailDisplayValue: {
          device_type: this.$t('inStoreTrafficType')
        }
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
        // await this.$store.dispatch('inStoreTraffic/getById', this.storeId).then(() => {
        //   this.resource.model = this.$store.getters["store/models"][0];
        //   this.resource.data = this.$store.getters["asset/data"];
        // });
        await this.$store.dispatch('store/getAll').then(() => {
          let tmp = this.$store.getters["store/models"];
          tmp.forEach((store) => {
            store.devices.forEach((device) => {
              if (device.device_id == this.inStoreTrafficId) {
                this.resource.model = device;
                let param = {
                  storeId: store.store_id,
                  deviceId: device.device_id,
                };
                this.$store.dispatch('dashboard/getTotalTraffics', param).then(() => {
                  this.inStoreTrafficResource = this.$store.getters["dashboard/models"][0];
                });

                this.lineChart.labels = [];
                this.lineChart.enters = [];
                this.lineChart.exits = [];
                
                let today = this.$moment();
                let todayDateString = today.add(1, 'days').format('YYYY-MM-DD');
                today = this.$moment();
                let wholeMonthStartDateString = this.$store.getters["mobileLayout/isMobileLayout"] ? today.subtract(7, 'days').format('YYYY-MM-DD') : today.subtract(1, 'months').format('YYYY-MM-DD');
                this.lineChart.dateRange.startDate = wholeMonthStartDateString;
                this.lineChart.dateRange.endDate = todayDateString;

                this.getLineChartDateRange();
              }
            });
          });
          // this.resource.data = this.$store.getters["asset/data"];
        });
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
        name: "Edit In Store Traffic",
        params: {
          inStoreTrafficId: this.inStoreTrafficId,
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
