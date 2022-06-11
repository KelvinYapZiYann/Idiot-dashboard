<template>
    <card class="card-category" :show-footer-line="true">
        <span class="card-title">{{ title }}</span>
        <slot>

        </slot>
    </card>
</template>
<script>
import Card from "./Card.vue";

export default {
    name: "category-card",
    components: {
        Card
    },
    props: {
        type: {
            type: String,
            default: "primary"
        },
        title: [String, Number],
    }
};
</script>
<style></style>
