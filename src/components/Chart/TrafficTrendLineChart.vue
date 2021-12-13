<template>
  <div class="row">
    <div class="col-12">
        <card type="chart">
            <div slot="header">
                <h2 class="card-title">
                    {{ type == 'daily' ? $t('chart.trafficTrendChart.dailyTitle') : $t('chart.trafficTrendChart.hourlyTitle')}}
                </h2>
            </div>
            <div class="row" v-if="this.type == 'daily'">
                <div class="col-xl-3 col-lg-4 col-sm-6 col-12">
                    <base-input 
                        :placeholder="$t('date.start')"
                        v-model="lineChart.dateRange.startDate"
                        type="date"
                        @input="getLineChartDateRange"
                        >
                    </base-input>
                </div>
                <div class="col-xl-3 col-lg-4 col-sm-6 col-12">
                    <base-input 
                        :placeholder="$t('date.end')"
                        v-model="lineChart.dateRange.endDate"
                        type="date"
                        @input="getLineChartDateRange"
                        >
                    </base-input>
                </div>
            </div>
            <div class="row" v-else-if="this.type == 'hourly'">
                <div class="col-xl-3 col-lg-4 col-sm-6 col-12">
                    <base-input 
                        :placeholder="$t('date.date')"
                        v-model="lineChart.date"
                        type="date"
                        @input="getLineChartDate"
                        >
                    </base-input>
                </div>
            </div>
            <line-chart
                chart-id="green-line-chart"
                :chart-data="chartData"
                :extra-options="lineChart.extraOptions"
            >
            </line-chart>
            <base-button slot="footer" type="primary" @click="generateExcel()" fill>
                <i class="fas fa-table mr-1"></i>
                {{$t('chart.generateExcel')}}
            </base-button>
        </card>
    </div>
  </div>
</template>
<script>
import { 
  BaseButton,
  BaseInput,
  Card,
  LineChart
} from "@/components/index";
import * as chartConfigs from "@/components/Chart/ChartConfig";
import download from "downloadjs";

export default {
  components: {
    BaseButton,
    BaseInput,
    Card,
    LineChart,
    // JsonExcel
  },
  data() {
    return {
        lineChart: {
            extraOptions: chartConfigs.chartOptions,
            dateRange: {
                startDate: null,
                endDate: null
            },
            date: null
        },
    };
  },
  props: {
    type: {
      type: String,
      required: false,
      default: () => {
        return "daily";
      },
      description: "Traffic Trend Line Type"
    },
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
    returns: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
      description: "Traffic Trend Line Returns"
    },
    passings: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
      description: "Traffic Trend Line Passings"
    },
  },
  methods: {
    getLineChartDate() {
      this.$emit('getLineChartDate', this.lineChart.date);
    },
    getLineChartDateRange() {
        this.$emit('getLineChartDateRange', {
            startDate: this.lineChart.dateRange.startDate,
            endDate: this.lineChart.dateRange.endDate,
        });
    },
    async export(data, filename, mime) {
      let blob = this.base64ToBlob(data, mime);
      // if (typeof this.beforeFinish === "function") await this.beforeFinish();
      download(blob, filename, mime);
    },
    base64ToBlob(data, mime) {
      let base64 = window.btoa(window.unescape(encodeURIComponent(data)));
      let bstr = atob(base64);
      let n = bstr.length;
      let u8arr = new Uint8ClampedArray(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    generateExcel() {
      this.$swal.fire({
        title: this.$t('component.download'),
        text: this.$t('alert.downloadExcelConfirmation'),
        icon: "info",
        showCancelButton: true,
        confirmButtonText: this.$t('component.download'),
        cancelButtonText: this.$t('component.cancel'),
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            let excelData = [];
            for (let i = 0; i < this.labels.length; i++) {
              excelData.push({
                date: this.labels[i],
                enter: this.enters[i],
                exit: this.exits[i],
                return: this.returns[i],
                passing: this.passings[i],
              });
            }
            let finalExcelData = this.jsonToXLS(excelData);
            let fileName = `Traffic ${this.type == "daily" ? "Daily" : "Hourly"} Trend Data (${this.type == "daily" ? this.lineChart.dateRange.startDate + ' to ' + this.lineChart.dateRange.endDate : this.lineChart.date})`;
            this.export(finalExcelData, fileName, "application/vnd.ms-excel");
          } catch (e) {
            console.error(e);
          }
        }
      });
    },
    jsonToXLS(data) {
      let xlsTemp =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta name=ProgId content=Excel.Sheet> <meta name=Generator content="Microsoft Excel 11"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><style>br {mso-data-placement: same-cell;}</style></head><body><table>${table}</table></body></html>';
      let xlsData = "<thead>";
      //Fields
      xlsData += "<tr>";
      for (let key in data[0]) {
        xlsData += "<th>" + key + "</th>";
      }
      xlsData += "</tr>";
      xlsData += "</thead>";
      //Data
      xlsData += "<tbody>";
      data.map(function (item) {
        xlsData += "<tr>";
        for (let key in item) {
          xlsData += "<td>" + item[key] + "</td>";
        }
        xlsData += "</tr>";
      });
      xlsData += "<tr></tr>";
      xlsData += "<tr>";
      xlsData += "<td>total</td>";
      let tmpTotal = 0;
      this.enters.forEach(function(count) {
        tmpTotal += count;
      });
      xlsData += "<td>" + tmpTotal + "</td>";
      tmpTotal = 0;
      this.exits.forEach(function(count) {
        tmpTotal += count;
      });
      xlsData += "<td>" + tmpTotal + "</td>";
      tmpTotal = 0;
      this.returns.forEach(function(count) {
        tmpTotal += count;
      });
      xlsData += "<td>" + tmpTotal + "</td>";
      tmpTotal = 0;
      this.passings.forEach(function(count) {
        tmpTotal += count;
      });
      xlsData += "<td>" + tmpTotal + "</td>";
      xlsData += "</tr>";

      xlsData += "</tbody>";
      return xlsTemp
        .replace("${table}", xlsData)
        .replace("${worksheet}", this.worksheet);
    },
  },
  mounted() {
    if (this.type == 'daily') {
      let today = this.$moment();
      let todayDateString = today.add(1, 'days').format('YYYY-MM-DD');
      today = this.$moment();
      let wholeMonthStartDateString = this.$store.getters["mobileLayout/isMobileLayout"] ? today.subtract(7, 'days').format('YYYY-MM-DD') : today.subtract(1, 'months').format('YYYY-MM-DD');

      this.lineChart.dateRange.startDate = wholeMonthStartDateString;
      this.lineChart.dateRange.endDate = todayDateString;
      this.getLineChartDateRange();
    } else if (this.type == 'hourly') {
      let todayDateString = this.$moment().format('YYYY-MM-DD');
      this.lineChart.date = todayDateString;
      this.getLineChartDate();
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: this.$t('property.enter'),
            fill: true,
            borderColor: "#1d8cf8",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1d8cf8",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1d8cf8",
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
          },
          {
            label: this.$t('property.return'),
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
            data: this.returns
          },
          {
            label: this.$t('property.passing'),
            fill: true,
            borderColor: "#ffd600",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#ffd600",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#ffd600",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.passings
          }
        ]
      };
    }
  }
};
</script>
<style>
.card-chart .card-footer {
    margin-top: 0;
    padding-top: 0;
}
</style>
