<template>
    <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
        <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <category-card
                    :title="$t('dashboard.byShop')"
                >
                    
                </category-card>
            </div>
        </div>
    </div>
</template>
<script>
import {
    CategoryCard,
} from "@/components/index";

export default {
    components: {
        CategoryCard,
    },
    data() {
        return {
            
        }
    },
    mounted() {
        this.getResource();
    },
    methods: {
        async getResource() {
            let loader = this.$loading.show();
            try {
                console.log('asd');
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