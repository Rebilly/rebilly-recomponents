<template>
    <div>
        <div class="r-tab" :class="[{'r-tab-divided': divided}, menuClass]" role="tablist">
            <div v-for="(tab, index) in tabs" class="r-tab-item" :key="index">
                <button v-if="tab.to"
                        :to="tab.to"
                        role="tab"
                        :id="tab.tabId"
                        :aria-controls="tab.tabPanelId"
                        class="r-tab-item-link"
                        @click="selectTab(tab, index)"
                        :class="{'r-is-active': tab.isActive}"
                >
                    {{tab.name}}
                </button>
                <button v-else
                        @click="selectTab(tab, index)"
                        role="tab"
                        :id="tab.tabId"
                        :aria-controls="tab.tabPanelId"
                        class="r-tab-item-link"
                        :class="{'r-is-active': tab.isActive}"
                >
                    {{tab.name}}
                </button>
            </div>
        </div>
        <div class="r-tab-content" :class="contentClass">
            <!-- @slot Tab content -->
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'r-tabs',
        props: {
            /**
             * Define style of the tabs, are them divided or not
             */
            divided: {
                type: Boolean,
                default: false,
            },
            /**
             * Specify classes of the tabs
             */
            menuClass: {
                type: String,
                default: '',
            },
            /**
             * Specify classes of the content
             */
            contentClass: {
                type: String,
                default: '',
            },
            /**
             * Define preselected tab
             */
            preselectedTab: {
                type: Number,
                default: 0,
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
            selectTab({name, value, to}, index = null) {
                /**
                 * Trigger router update for tabs with route
                 */
                if (!this.goingToSameRoute(to)) {
                    this.$router.push(to);
                    return;
                }
                if (index) {
                    /**
                     * Apply change by index for regular tabs
                     */
                    this.tabs.forEach((tab, i) => {
                        tab.isActive = (index === i);
                    });
                } else {
                    /**
                     * Apply change by name for route tabs
                     */
                    this.tabs.forEach((tab) => {
                        tab.isActive = tab.name === name;
                    });
                }
                if (index !== null) {
                    /**
                     * When the tab is selected
                     * @type {Event}
                     */
                    this.$emit('tab-selected', {name, value, index});
                }
            },
            getRouteTab() {
                // try to set active tab by route
                // get all tabs with route param
                const routableTabs = this.tabs.filter(tab => tab.to);

                return routableTabs.find(tab => this.goingToSameRoute(tab.to));
            },
            goingToSameRoute(to) {
                if (!to || !this.$route || !this.$route) return true;

                // We use endWith cause we want to detect nested routes
                return to && this.$route.fullPath.endsWith(this.$router.resolve(to).href.replace(/^#/, ''));
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

                // set first or preselected tab as active
                this.selectTab(this.tabs[this.preselectedTab]);
            },
        },
        mounted() {
            this.bootstrap();
        },
    };
</script>

<style lang="scss">
    @import 'r-tabs.scss';
</style>
