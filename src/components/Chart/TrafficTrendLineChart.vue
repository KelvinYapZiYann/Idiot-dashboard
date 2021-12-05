<template>
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
</template>
<script>
import { 
  BaseInput, 
  Card,
  LineChart
} from "@/components/index";
import * as chartConfigs from "@/components/Chart/ChartConfig";

export default {
  components: {
    BaseInput,
    Card,
    LineChart
  },
  data() {
    return {
        lineChart: {
            extraOptions: chartConfigs.chartOptions,
            dateRange: {
                startDate: null,
                endDate: null
            }
        },
    };
  },
  props: {
    labels: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
      description: "Traffic Trend Line Labels"
    },
    enters: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
      description: "Traffic Trend Line Enters"
    },
    exits: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
      description: "Traffic Trend Line Exits"
    },
  },
  methods: {
    getLineChartDateRange() {
        this.$emit('getLineChartDateRange', {
            startDate: this.lineChart.dateRange.startDate,
            endDate: this.lineChart.dateRange.endDate,
        });
    }
  },
  mounted() {
    let today = this.$moment();
    let todayDateString = today.add(1, 'days').format('YYYY-MM-DD');
    today = this.$moment();
    let wholeMonthStartDateString = this.$store.getters["mobileLayout/isMobileLayout"] ? today.subtract(7, 'days').format('YYYY-MM-DD') : today.subtract(1, 'months').format('YYYY-MM-DD');

    this.lineChart.dateRange.startDate = wholeMonthStartDateString;
    this.lineChart.dateRange.endDate = todayDateString;
    this.getLineChartDateRange();
  },
  computed: {
        chartData() {
            return {
                labels: this.labels,
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
                        data: this.enters
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
                        data: this.exits
                    }
                ]
            };
        }
    }
};
</script>
<style>
</style>
