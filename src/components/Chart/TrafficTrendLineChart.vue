<template>
	<div class="row">
		<div class="col-12">
			<card type="chart">
				<div slot="header">
					<h2 class="card-title">
						{{  $t('chart.trafficTrendChart') }}
					</h2>
				</div>
				<div class="row">
					<div class="col-xl-3 col-lg-4 col-sm-6 col-12">
						<label class="col-12">{{$t('dashboard.type')}}</label>
						<el-select
							multiple
							class="select-info"
							size="large"
							v-model="displayTypes"
							:placeholder="$t('dashboard.type')"
							@change="displayTypesChange"
						>
							<el-option
								v-for="option in $t('multiTypeOptions')"
								class="select-info"
								:value="option.value"
								:label="option.label"
								:key="option.label"
							>
							</el-option>
						</el-select>
					</div>
					<div class="col-xl-3 col-lg-4 col-sm-6 col-12" v-if="storeOptions.length > 0">
						<label class="col-12">{{$t('component.stores')}}</label>
						<el-select
							multiple
							class="select-info"
							size="large"
							v-model="selectedStores"
							:placeholder="$t('component.stores')"
							@change="storesChange"
						>
							<el-option
								v-for="option in storeOptions"
								class="select-info"
								:value="option.value"
								:label="option.label"
								:key="option.label"
							>
							</el-option>
						</el-select>
					</div>
					<div class="col-xl-3 col-lg-4 col-sm-6 col-12" v-if="deviceOptions.length > 0">
						<label class="col-12">{{$t('component.inStoreTraffics')}}</label>
						<el-select
							multiple
							class="select-info"
							size="large"
							v-model="selectedDevices"
							:placeholder="$t('component.inStoreTraffics')"
							@change="devicesChange"
						>
							<el-option
								v-for="option in deviceOptions"
								class="select-info"
								:value="option.value"
								:label="option.label"
								:key="option.label"
							>
							</el-option>
						</el-select>
					</div>
					<div class="col-xl-3 col-lg-4 col-sm-6 col-12">
						<!-- <base-selector-input 
							:label="$t('chart.type')"
							:placeholder="$t('chart.type')"
							v-model="chartType"
							:options="$t('chartTypeOptions')"
							@input="chartTypeSelectorChange"
							>
						</base-selector-input> -->
						<label class="col-12">{{$t('chart.type')}}</label>
						<el-select
							class="select-info"
							size="large"
							v-model="chartType"
							:placeholder="$t('chart.type')"
							@change="chartTypeSelectorChange"
						>
							<el-option
								v-for="option in $t('chartTypeOptions')"
								class="select-info"
								:value="option.id"
								:label="option.name"
								:key="option.name"
							>
							</el-option>
						</el-select>
					</div>
					<div class="col-xl-3 col-lg-4 col-sm-6 col-12" v-show="chartType != 'daily'">
						<base-input 
							:label="$t('date.date')"
							:placeholder="$t('date.date')"
							v-model="date"
							type="date"
							@input="dateChange"
							>
						</base-input>
					</div>
					<div class="col-xl-3 col-lg-4 col-sm-6 col-12" v-show="chartType == 'daily'">
						<!-- <base-selector-input 
							:label="$t('date.dateRange')"
							:placeholder="$t('date.dateRange')"
							v-model="dateRange.dateRange"
							:options="$t('customDateRangeOptions')"
							@input="dateRangeSelectorChange"
							>
						</base-selector-input> -->
						<label class="col-12">{{$t('date.dateRange')}}</label>
						<el-select
							class="select-info"
							size="large"
							v-model="dateRange.dateRange"
							:placeholder="$t('date.dateRange')"
							@change="dateRangeSelectorChange"
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
					<div class="col-xl-3 col-lg-4 col-sm-6 col-12" v-show="chartType == 'daily' && dateRange.dateRange == 'custom'">
						<base-input 
							:label="$t('date.start')"
							:placeholder="$t('date.start')"
							v-model="dateRange.startDate"
							type="date"
							@input="dateRangeStartDateChange"
							>
						</base-input>
					</div>
					<div class="col-xl-3 col-lg-4 col-sm-6 col-12" v-show="chartType == 'daily' && dateRange.dateRange == 'custom'">
						<base-input 
							:label="$t('date.end')"
							:placeholder="$t('date.end')"
							v-model="dateRange.endDate"
							type="date"
							@input="dateRangeEndDateChange"
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
				<base-button slot="footer" type="primary" @click="generateExcel()" fill v-show="false">
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
	// BaseSelectorInput,
	Card,
	LineChart
} from "@/components/index";
import { Select, Option } from "element-ui";
import * as chartConfigs from "@/components/Chart/ChartConfig";
import download from "downloadjs";

export default {
	components: {
        [Option.name]: Option,
        [Select.name]: Select,
		BaseButton,
		BaseInput,
		// BaseSelectorInput,
		Card,
		LineChart,
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
		lines: {
			type: Array,
			required: true,
			default: () => {
				return [];
			},
			description: "Traffic Trend Line Data"
		},
		storeOptions: {
			type: Array,
			required: false,
			default: () => {
				return [];
			},
			description: "Traffic Trend Line Store Options"
		},
		deviceOptions: {
			type: Array,
			required: false,
			default: () => {
				return [];
			},
			description: "Traffic Trend Line Device Options"
		},
	},
	data() {
		let today = this.$moment();
		return {
			lineChart: {
				extraOptions: chartConfigs.chartOptions,
			},
			dateRange: {
				dateRange: "weekTillDate",
				startDate: today.format("YYYY-MM-DD"),
				endDate: today.add(1, 'days').format("YYYY-MM-DD")
			},
			date: today.subtract(1, 'days').format("YYYY-MM-DD"),
			chartType: "daily",
			displayTypes: ["enter"],
			selectedStores: [],
			selectedDevices: [],
		};
	},
	methods: {
		async export(data, filename, mime) {
			let blob = this.base64ToBlob(data, mime);
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
						// for (let i = 0; i < this.labels.length; i++) {
						// 	excelData.push({
						// 		date: this.labels[i],
						// 		enter: this.enters[i],
						// 		exit: this.exits[i],
						// 		return: this.returns[i],
						// 		passing: this.passings[i],
						// 	});
						// }
						let finalExcelData = this.jsonToXLS(excelData);
						let fileName;
						// if (this.type == "daily") {
						// 	fileName = `Traffic Daily Trend Data (${this.lineChart.dateRange.startDate + ' to ' + this.lineChart.dateRange.endDate})`;
						// } else if (this.type == "hourly") {
						// 	fileName = `Traffic Hourly Trend Data (${this.lineChart.date})`;
						// } else if (this.type == "15min") {
						// 	fileName = `Traffic 15 Minute Trend Data (${this.lineChart.date})`;
						// }
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
			// this.enters.forEach(function(count) {
			// 	tmpTotal += count;
			// });
			xlsData += "<td>" + tmpTotal + "</td>";
			tmpTotal = 0;
			// this.exits.forEach(function(count) {
			// 	tmpTotal += count;
			// });
			xlsData += "<td>" + tmpTotal + "</td>";
			tmpTotal = 0;
			// this.returns.forEach(function(count) {
			// 	tmpTotal += count;
			// });
			xlsData += "<td>" + tmpTotal + "</td>";
			tmpTotal = 0;
			// this.passings.forEach(function(count) {
			// 	tmpTotal += count;
			// });
			xlsData += "<td>" + tmpTotal + "</td>";
			xlsData += "</tr>";

			xlsData += "</tbody>";
			return xlsTemp.replace("${table}", xlsData).replace("${worksheet}", this.worksheet);
		},
		
		displayTypesChange() {

		},
		storesChange() {
			this.trafficTrendChartChange();
		},
		devicesChange() {
			this.trafficTrendChartChange();
		},
		chartTypeSelectorChange() {
			this.trafficTrendChartChange();
		},
		dateChange() {
			this.trafficTrendChartChange();
		},
		dateRangeSelectorChange() {
			this.trafficTrendChartChange();
		},
		dateRangeStartDateChange() {
			this.trafficTrendChartChange();
		},
		dateRangeEndDateChange() {
			this.trafficTrendChartChange();
		},
		trafficTrendChartChange() {
			this.$emit("trend-chart-change", {
				stores: this.selectedStores,
				devices: this.selectedDevices,
				chartType: this.chartType,
				date: this.date,
				dateRange: this.dateRange.dateRange,
				startDate: this.dateRange.startDate,
				endDate: this.dateRange.endDate,
			});
		},
	},
	mounted() {
		this.trafficTrendChartChange();
		// if (this.type == 'daily') {
		// 	let today = this.$moment();
		// 	let todayDateString = today.add(1, 'days').format('YYYY-MM-DD');
		// 	today = this.$moment();
		// 	let wholeMonthStartDateString = this.$store.getters["mobileLayout/isMobileLayout"] ? today.subtract(7, 'days').format('YYYY-MM-DD') : today.subtract(1, 'months').format('YYYY-MM-DD');

		// 	this.lineChart.dateRange.startDate = wholeMonthStartDateString;
		// 	this.lineChart.dateRange.endDate = todayDateString;
		// 	this.getLineChartDateRange();
		// } else if (this.type == 'hourly') {
		// 	let todayDateString = this.$moment().format('YYYY-MM-DD');
		// 	this.lineChart.date = todayDateString;
		// 	this.getLineChartDate();
		// } else if (this.type == '15min') {
		// 	let todayDateString = this.$moment().format('YYYY-MM-DD');
		// 	this.lineChart.date = todayDateString;
		// 	this.getLineChartTimeRange();
		// }
	},
	computed: {
		chartData() {
			let tmpDatasets = [];
			let colors = [
				"#1d8cf8",
				"#fcba03",
				"#fc6203",
				"#18fc03",
				"#ce03fc",
				"#fc0339",
			];
			for (let i = 0; i < this.lines.length; i++) {
				for (let j = 0; j < this.displayTypes.length; j++) {
					let tmpLines = [];
					if (this.displayTypes[j] == 'enter') {
						for (let k = 0; k < this.lines[i].data.length; k++) {
							tmpLines.push(this.lines[i].data[k].enter);
						}
						tmpDatasets.push({
							label: this.lines[i].label + ' ' + this.$t('property.enter'),
							fill: true,
							borderColor: colors[i] + "ff",
							borderWidth: 2,
							borderDash: [],
							borderDashOffset: 0.0,
							pointBackgroundColor: colors[i] + "ff",
							pointBorderColor: "rgba(255,255,255,0)",
							pointHoverBackgroundColor: colors[i] + "ff",
							pointBorderWidth: 20,
							pointHoverRadius: 4,
							pointHoverBorderWidth: 15,
							pointRadius: 4,
							data: tmpLines
						});
					} else if (this.displayTypes[j] == 'exit') {
						for (let k = 0; k < this.lines[i].data.length; k++) {
							tmpLines.push(this.lines[i].data[k].exit);
						}
						tmpDatasets.push({
							label: this.lines[i].label + ' ' + this.$t('property.exit'),
							fill: true,
							borderColor: colors[i] + "c1",
							borderWidth: 2,
							borderDash: [],
							borderDashOffset: 0.0,
							pointBackgroundColor: colors[i] + "c1",
							pointBorderColor: "rgba(255,255,255,0)",
							pointHoverBackgroundColor: colors[i] + "c1",
							pointBorderWidth: 20,
							pointHoverRadius: 4,
							pointHoverBorderWidth: 15,
							pointRadius: 4,
							data: tmpLines
						});
					} else if (this.displayTypes[j] == 'return') {
						for (let k = 0; k < this.lines[i].data.length; k++) {
							tmpLines.push(this.lines[i].data[k].return);
						}
						tmpDatasets.push({
							label: this.lines[i].label + ' ' + this.$t('property.return'),
							fill: true,
							borderColor: colors[i] + "a1",
							borderWidth: 2,
							borderDash: [],
							borderDashOffset: 0.0,
							pointBackgroundColor: colors[i] + "a1",
							pointBorderColor: "rgba(255,255,255,0)",
							pointHoverBackgroundColor: colors[i] + "a1",
							pointBorderWidth: 20,
							pointHoverRadius: 4,
							pointHoverBorderWidth: 15,
							pointRadius: 4,
							data: tmpLines
						});
					} else if (this.displayTypes[j] == 'passing') {
						for (let k = 0; k < this.lines[i].data.length; k++) {
							tmpLines.push(this.lines[i].data[k].passing);
						}
						tmpDatasets.push({
							label: this.lines[i].label + ' ' + this.$t('property.passing'),
							fill: true,
							borderColor: colors[i] + "71",
							borderWidth: 2,
							borderDash: [],
							borderDashOffset: 0.0,
							pointBackgroundColor: colors[i] + "71",
							pointBorderColor: "rgba(255,255,255,0)",
							pointHoverBackgroundColor: colors[i] + "71",
							pointBorderWidth: 20,
							pointHoverRadius: 4,
							pointHoverBorderWidth: 15,
							pointRadius: 4,
							data: tmpLines
						});
					}
				}
			}
			return {
				labels: this.labels,
				datasets: tmpDatasets
				// [
					// {
					// 	label: this.$t('property.enter'),
					// 	fill: true,
					// 	borderColor: "#1d8cf8",
					// 	borderWidth: 2,
					// 	borderDash: [],
					// 	borderDashOffset: 0.0,
					// 	pointBackgroundColor: "#1d8cf8",
					// 	pointBorderColor: "rgba(255,255,255,0)",
					// 	pointHoverBackgroundColor: "#1d8cf8",
					// 	pointBorderWidth: 20,
					// 	pointHoverRadius: 4,
					// 	pointHoverBorderWidth: 15,
					// 	pointRadius: 4,
					// 	data: tmpLines
					// },
					// {
					// 	label: this.$t('property.exit'),
					// 	fill: true,
					// 	borderColor: "#fd5d93",
					// 	borderWidth: 2,
					// 	borderDash: [],
					// 	borderDashOffset: 0.0,
					// 	pointBackgroundColor: "#fd5d93",
					// 	pointBorderColor: "rgba(255,255,255,0)",
					// 	pointHoverBackgroundColor: "#fd5d93",
					// 	pointBorderWidth: 20,
					// 	pointHoverRadius: 4,
					// 	pointHoverBorderWidth: 15,
					// 	pointRadius: 4,
					// 	data: this.exits
					// },
					// {
					// 	label: this.$t('property.return'),
					// 	fill: true,
					// 	borderColor: "#00f2c3",
					// 	borderWidth: 2,
					// 	borderDash: [],
					// 	borderDashOffset: 0.0,
					// 	pointBackgroundColor: "#00f2c3",
					// 	pointBorderColor: "rgba(255,255,255,0)",
					// 	pointHoverBackgroundColor: "#00f2c3",
					// 	pointBorderWidth: 20,
					// 	pointHoverRadius: 4,
					// 	pointHoverBorderWidth: 15,
					// 	pointRadius: 4,
					// 	data: this.returns
					// },
					// {
					// 	label: this.$t('property.passing'),
					// 	fill: true,
					// 	borderColor: "#ffd600",
					// 	borderWidth: 2,
					// 	borderDash: [],
					// 	borderDashOffset: 0.0,
					// 	pointBackgroundColor: "#ffd600",
					// 	pointBorderColor: "rgba(255,255,255,0)",
					// 	pointHoverBackgroundColor: "#ffd600",
					// 	pointBorderWidth: 20,
					// 	pointHoverRadius: 4,
					// 	pointHoverBorderWidth: 15,
					// 	pointRadius: 4,
					// 	data: this.passings
					// }
				// ]
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
