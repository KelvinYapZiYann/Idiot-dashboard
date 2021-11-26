<template>
    <card class="card-traffics" :show-footer-line="true">
        <div class="row">
            <div class="col-12" v-if="subTitle">
                <div class="numbers">
                    <slot>
                        <p v-if="subTitle" class="card-category">{{ subTitle }}</p>
                    </slot>
                </div>
            </div>
            <div class="col-6">
                <div class="info-icon text-center ml-auto mr-auto icon-primary">
                    <i class="fas fa-sign-in-alt"></i>
                </div>
                <span class="traffic-title">{{$t('property.enter')}}</span>
            </div>
            <div class="col-6">
                <div class="info-icon text-center ml-auto mr-auto icon-warning">
                    <i class="fas fa-sign-out-alt"></i>
                </div>
                <span class="traffic-title">{{$t('property.exit')}}</span>
            </div>
            <div class="col-6">
                <h3 class="traffic-value mb-0">{{enter ? enter : '0'}}</h3>
            </div>
            <div class="col-6">
                <h3 class="traffic-value mb-0">{{exit ? exit : '0'}}</h3>
            </div>
            <div class="col-6">
                <i class="fas fa-chevron-up text-success" v-if="enter >= previousEnter"></i>
                <i class="fas fa-chevron-down text-danger" v-else></i>
                <span class="traffic-value ml-1">{{ratio()}}</span>
            </div>
        </div>
        <div slot="footer">
            <div class="row">
                <div class="col-12" v-if="previousTitle">
                    <p v-if="previousTitle" class="previous-traffic-title">{{ previousTitle }}</p>
                </div>
                <div class="col-6">
                    <h3 class="traffic-value mb-0">{{previousEnter ? previousEnter : '0'}}</h3>
                </div>
                <div class="col-6">
                    <h3 class="traffic-value mb-0">{{previousExit ? previousExit : '0'}}</h3>
                </div>
            </div>
        </div>
    </card>
</template>
<script>
import Card from "./Card.vue";

export default {
    name: "traffics-card",
    components: {
        Card
    },
    props: {
        subTitle: String,
        previousTitle: String,
        enter: Number,
        exit: Number,
        previousEnter: Number,
        previousExit: Number,
    },
    methods: {
        ratio() {
            return `${(((this.enter - this.previousEnter) / this.enter) * 100).toFixed(2)}%`;
        }
    }
};
</script>
<style></style>
