<template>
    <div>
        <ul class="tab" :class="[{'tab-divided': divided}, menuClass]">
            <li v-for="(tab, index) in tabs" class="tab-item">
                <a v-if="tab.to"
                   :to="tab.to"
                   class="tab-link"
                   @click="selectTab(tab, index)"
                   :class="{'is-active': tab.isActive}">
                    {{tab.name}}
                </a>
                <a v-else class="tab-link"
                   @click="selectTab(tab, index)"
                   :class="{'is-active': tab.isActive}">
                    {{tab.name}}
                </a>
            </li>
        </ul>
        <div class="tab-content" :class="contentClass">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'r-tabs',
        props: {
            divided: {
                type: Boolean,
                default: false,
            },
            menuClass: {
                type: String,
                default: '',
            },
            contentClass: {
                type: String,
                default: '',
            },
        },
        watch: {
            $route(to, from) {
                // enable history to work for tabs
                // when going back or forward
                if (to.name === from.name) {
                    const routeTab = this.getRouteTab();
                    // select tab if found or fallback to the
                    // first one
                    this.selectTab(routeTab || this.tabs[0]);
                }
            },
        },
        data() {
            return {
                tabs: [],
            };
        },
        methods: {
            selectTab({name, value}, index = null) {
                this.tabs.forEach((tab, i) => {
                    tab.isActive = (index === i);
                });
                if (index !== null) {
                    this.$emit('tab-selected', {name, value, index});
                }
            },
            getRouteTab() {
                // try to set active tab by route
                // get all tabs with route param
                const routableTabs = this.tabs.filter(tab => tab.to);

                // current route full path
                const currentPath = this.$route && this.$route.fullPath;

                // get active route tab
                return routableTabs
                    .find(tab => this.$router &&
                        this.$router.resolve(tab.to).route.fullPath &&
                        this.$router.resolve(tab.to).route.fullPath === currentPath);
            },
            bootstrap() {
                this.tabs = this.$children;

                // Set active tab on init
                if (!this.tabs.length) {
                    return;
                }

                // if has active tab - return
                if (this.tabs.find(tab => tab.isActive)) {
                    return;
                }

                // get active route tab
                const matchingTab = this.getRouteTab();
                if (matchingTab) {
                    matchingTab.isActive = true;
                    return;
                }

                // set first tab as active
                this.tabs[0].isActive = true;
            },
        },
        mounted() {
            this.bootstrap();
        },
    };
</script>

<style>
    @import 'r-tabs.scss';
</style>