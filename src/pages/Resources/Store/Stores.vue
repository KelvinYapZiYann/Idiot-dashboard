<template>
	<div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
		<store-table
			:resource="resource"
			@getResource="getResource"
		></store-table>
	</div>
</template>
<script>
import StoreTable from "@/components/Resources/Store/StoreTable";

export default {
	components: {
		StoreTable
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
				this.resource.models = [];
				await this.$store.dispatch('store/getDetailAll').then(() => {
					let stores = this.$store.getters["store/models"];
					for (let i = 0; i < stores.length; i++) {
						let tmpStore = stores[i];
						tmpStore.enter = 0;
						tmpStore.exit = 0;
						this.$store.dispatch('decode/decodeDateRange', 'weekTillDate').then((dateRange) => {
							this.$store.dispatch('inStoreTraffic/getTotalTraffics', {
								param: `store_id=${tmpStore.id}&date=${dateRange}`
							}).then((response) => {
								let totalTraffics = response;
								tmpStore.enter = totalTraffics.enter;
								tmpStore.exit = totalTraffics.exit;
								tmpStore.return = totalTraffics.return;
								tmpStore.passing = totalTraffics.passing;
								console.log(tmpStore);
								this.resource.models.push(tmpStore);
							});
						});
					}
					loader.hide();
				});
			} catch (e) {
				console.error(e);
				loader.hide();
			} finally {
				loader.hide();
			}
		},
	}
};
</script>
<style>
</style>
