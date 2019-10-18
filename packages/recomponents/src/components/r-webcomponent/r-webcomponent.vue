<template>
    <div class="r-webcomponent">
        <slot/>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {
        RTooltip,
    } from '../../index';

    Vue.directive('tooltip', RTooltip);

    export default {
        name: 'RWebcomponent',

        mounted() {
            console.log('%c '.concat('Recomponents', ' %c ').concat('Webcomponent Mode', ' %c'), 'background:#0044D4 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff; border:1px solid #0044D4;', 'background:#ffffff ; padding: 1px; border:1px solid #0044D4; border-radius: 0 3px 3px 0;  color: #0044D4', 'background:transparent');
        },
    };
</script>
