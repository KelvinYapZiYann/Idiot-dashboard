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
            <div 
                :class="`col-${displayTypes.length != 0 ? (12 / displayTypes.length) : 12}`"
                v-if="decodeDisplayType('enter')"
            >
                <div class="info-icon text-center ml-auto mr-auto icon-primary">
                    <i class="fas fa-sign-in-alt"></i>
                </div>
                <span class="traffic-title">{{$t('property.enter')}}</span>
            </div>
            <div 
                :class="`col-${displayTypes.length != 0 ? (12 / displayTypes.length) : 12}`"
                v-if="decodeDisplayType('exit')"
            >
                <div class="info-icon text-center ml-auto mr-auto icon-warning">
                    <i class="fas fa-sign-out-alt"></i>
                </div>
                <span class="traffic-title">{{$t('property.exit')}}</span>
            </div>
            <div 
                :class="`col-${displayTypes.length != 0 ? (12 / displayTypes.length) : 12}`"
                v-if="decodeDisplayType('return')"
            >
                <div class="info-icon text-center ml-auto mr-auto icon-success">
                    <i class="fas fa-undo-alt"></i>
                </div>
                <span class="traffic-title">{{$t('property.return')}}</span>
            </div>
            <div 
                :class="`col-${displayTypes.length != 0 ? (12 / displayTypes.length) : 12}`"
                v-if="decodeDisplayType('passing')"
            >
                <div class="info-icon text-center ml-auto mr-auto icon-neutral">
                    <i class="fas fa-times"></i>
                </div>
                <span class="traffic-title">{{$t('property.passing')}}</span>
            </div>
            <div 
                :class="`col-${displayTypes.length != 0 ? (12 / displayTypes.length) : 12}`"
                v-if="decodeDisplayType('enter')"
            >
                <h3 class="traffic-value mb-0">{{currentData.enter ? currentData.enter : '0'}}</h3>
            </div>
            <div 
                :class="`col-${displayTypes.length != 0 ? (12 / displayTypes.length) : 12}`"
                v-if="decodeDisplayType('exit')"
            >
                <h3 class="traffic-value mb-0">{{currentData.exit ? currentData.exit : '0'}}</h3>
            </div>
            <div 
                :class="`col-${displayTypes.length != 0 ? (12 / displayTypes.length) : 12}`"
                v-if="decodeDisplayType('return')"
            >
                <h3 class="traffic-value mb-0">{{currentData.return ? currentData.return : '0'}}</h3>
            </div>
            <div 
                :class="`col-${displayTypes.length != 0 ? (12 / displayTypes.length) : 12}`"
                v-if="decodeDisplayType('passing')"
            >
                <h3 class="traffic-value mb-0">{{currentData.passing ? currentData.passing : '0'}}</h3>
            </div>
            <div 
                :class="`col-${displayTypes.length != 0 ? (12 / displayTypes.length) : 12}`"
                v-if="decodeDisplayType('enter')"
            >
                <i class="fas fa-chevron-up text-success" v-if="currentData.enter >= previousData.enter"></i>
                <i class="fas fa-chevron-down text-danger" v-else></i>
                <span class="traffic-value ml-1">{{ratio(currentData.enter, previousData.enter)}}</span>
            </div>
            <div 
                :class="`col-${displayTypes.length != 0 ? (12 / displayTypes.length) : 12}`"
                v-if="decodeDisplayType('exit')"
            >
                <i class="fas fa-chevron-up text-success" v-if="currentData.exit >= previousData.exit"></i>
                <i class="fas fa-chevron-down text-danger" v-else></i>
                <span class="traffic-value ml-1">{{ratio(currentData.exit, previousData.exit)}}</span>
            </div>
            <div 
                :class="`col-${displayTypes.length != 0 ? (12 / displayTypes.length) : 12}`"
                v-if="decodeDisplayType('return')"
            >
                <i class="fas fa-chevron-up text-success" v-if="currentData.return >= previousData.return"></i>
                <i class="fas fa-chevron-down text-danger" v-else></i>
                <span class="traffic-value ml-1">{{ratio(currentData.return, previousData.return)}}</span>
            </div>
            <div 
                :class="`col-${displayTypes.length != 0 ? (12 / displayTypes.length) : 12}`"
                v-if="decodeDisplayType('passing')"
            >
                <i class="fas fa-chevron-up text-success" v-if="currentData.passing >= previousData.passing"></i>
                <i class="fas fa-chevron-down text-danger" v-else></i>
                <span class="traffic-value ml-1">{{ratio(currentData.passing, previousData.passing)}}</span>
            </div>
        </div>
        <div slot="footer">
            <div class="row">
                <div class="col-12" v-if="previousTitle">
                    <p v-if="previousTitle" class="previous-traffic-title">{{ previousTitle }}</p>
                </div>
                <div 
                    :class="`col-${displayTypes.length != 0 ? (12 / displayTypes.length) : 12}`"
                    v-if="decodeDisplayType('enter')"
                >
                    <h3 class="traffic-value mb-0">{{previousData.enter ? previousData.enter : '0'}}</h3>
                </div>
                <div 
                    :class="`col-${displayTypes.length != 0 ? (12 / displayTypes.length) : 12}`"
                    v-if="decodeDisplayType('exit')"
                >
                    <h3 class="traffic-value mb-0">{{previousData.exit ? previousData.exit : '0'}}</h3>
                </div>
                <div 
                    :class="`col-${displayTypes.length != 0 ? (12 / displayTypes.length) : 12}`"
                    v-if="decodeDisplayType('return')"
                >
                    <h3 class="traffic-value mb-0">{{previousData.return ? previousData.return : '0'}}</h3>
                </div>
                <div 
                    :class="`col-${displayTypes.length != 0 ? (12 / displayTypes.length) : 12}`"
                    v-if="decodeDisplayType('passing')"
                >
                    <h3 class="traffic-value mb-0">{{previousData.passing ? previousData.passing : '0'}}</h3>
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
        displayTypes: {
            type: Array,
            default: () => {
                return [];
            }
        },
        currentData: {
            type: Object,
            default: () => {
                return {};
            }
        },
        previousData: {
            type: Object,
            default: () => {
                return {};
            }
        },
        // enter: Number,
        // exit: Number,
        // previousEnter: Number,
        // previousExit: Number,
    },
    methods: {
        ratio(current, previous) {
            if (current == 0) {
                return `${-(previous * 100).toFixed(2)}%`;
            } else {
                return `${(((current - previous) / current) * 100).toFixed(2)}%`;
            }
        },
        decodeDisplayType(type) {
            for (let i = 0; i < this.displayTypes.length; i++) {
                if (this.displayTypes[i] == type) {
                    return true;
                }
            }
            return false;
        },
    }
};
</script>
<style></style>
