<template>
    <div class="content col-xl-10 col-lg-12 col-md-12 ml-auto mr-auto">
        <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <category-card
                    :title="$t('dashboard.byShop')"
                >
                    <div>
                        
                    </div>
                    <div class="row">
                        <div 
                            class="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-6 d-flex flex-column justify-content-center"
                            v-for="(value, i) in byShop"
                            :key="i"
                        >
                            <div class="mb-1 font-weight-bold">
                                <span>{{ value.name }}: </span>
                                <span class="font-italic">{{ value.count }}</span>
                            </div>
                            <div class="mb-1">
                                <i class="fa-solid fa-shop card-category-icon"></i>
                            </div>
                        </div>
                    </div>
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
            byShop: [],
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
                this.byShop = [
                    {
                        name: "asd",
                        count: 123
                    },
                ]
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