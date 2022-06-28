<template>
    <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
		<in-store-traffic-table
			:resource="resource"
			@getResource="getResource"
		></in-store-traffic-table>
    </div>
</template>
<script>
import InStoreTrafficTable from "@/components/Resources/InStoreTraffic/InStoreTrafficTable";

export default {
	components: {
		InStoreTrafficTable
	},
	data() {
		return {
			resource: {
				models: [],
				data: {}
			}
		};
	},
	props: {
		previousRouteParam: {
			type: Object,
			required: false,
			default: () => {return {}},
			description: "Previous Route Param"
		}
	},
	mounted() {
		this.getResource();
	},
	methods: {
		async getResource() {
			let loader = this.$loading.show();
			try {
				await this.$store.dispatch('inStoreTraffic/getAll').then(() => {
					let devices = this.$store.getters["inStoreTraffic/models"];
					this.resource.models = [];
					this.$store.dispatch('decode/decodeDateRange', 'weekTillDate').then((dateRange) => {
						for (let i = 0; i < devices.length; i++) {
							this.$store.dispatch('inStoreTraffic/getTotalTraffics', {
								param: `date=${dateRange}&device_id=${devices[i].device_id}`
							}).then((response) => {
								let tmpDevice = devices[i];
								tmpDevice.enter = response.enter;
								tmpDevice.exit = response.exit;
								tmpDevice.return = response.return;
								tmpDevice.passing = response.passing;
								this.resource.models.push(tmpDevice);
							});
						}
					});
				});
			} catch (e) {
				console.error(e);
			} finally {
				loader.hide();
			}
		},
	}
};
</script>
<style>
</style>
