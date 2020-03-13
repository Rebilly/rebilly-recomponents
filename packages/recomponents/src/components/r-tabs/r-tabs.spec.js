import Vue from 'vue';
import {shallowMount, mount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RTabs from './r-tabs.vue';
import RTab from './r-tab.vue';

describe('r-tabs.vue', () => {
    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RTabs);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = await renderToString(RTabs);

        expect(wrapper).toMatchSnapshot();
    });

    it('should set a class if the props are set', async () => {
        const wrapper = shallowMount(RTabs, {
            components: {RTab},
            props: {
                menuClass: 'test',
                contentClass: 'test',
            },
            slots: {
                default: await renderToString(RTab, {props: {name: 'test1'}, slots: {default: '<p>Test 1</p>'}}),
            },
        });

        expect(wrapper.find('.tab.test')).not.toBe(undefined);
        expect(wrapper.find('.tab-content.test')).not.toBe(undefined);
    });

    it('should use plain active tab if specified', async () => {
        const wrapper = await mount(RTabs, {
            render(h) {
                return h(RTabs, {}, [
                    h(RTab, {
                        props: {
                            name: 'Tab 1',
                        },
                    }, [
                        h('p', 'Lorem ipsum'),
                    ]),
                    h(RTab, {
                        props: {
                            name: 'Tab 2',
                            active: true,
                        },
                    }, [
                        h('p', 'Domus anthem'),
                    ]),
                ]);
            },
        });

        const links = wrapper.findAll('.r-tab-item-link');
        expect(links.at(0).classes().includes('r-is-active')).toBeFalsy();
        expect(links.at(1).classes().includes('r-is-active')).toBeTruthy();
    });

    it('should switch tab on click', async () => {
        const wrapper = await mount(RTabs, {
            render(h) {
                return h(RTabs, {}, [
                    h(RTab, {
                        props: {
                            name: 'Tab 1',
                        },
                    }, [
                        h('p', 'Lorem ipsum'),
                    ]),
                    h(RTab, {
                        props: {
                            name: 'Tab 2',
                        },
                    }, [
                        h('p', 'Domus anthem'),
                    ]),
                ]);
            },
        });

        const links = wrapper.findAll('.r-tab-item-link');
        expect(links.at(0).classes().includes('r-is-active')).toBeTruthy();
        links.at(1).trigger('click');

        await Vue.nextTick();

        expect(links.at(0).classes().includes('r-is-active')).toBeFalsy();
    });

    it('should open current route tab', async () => {
        const wrapper = await mount({
            render(h) {
                return h(RTabs, {}, [
                    h(RTab, {
                        props: {
                            name: 'Tab 1',
                            to: {
                                fullPath: 'default-route',
                            },
                            panelId: 'custom-id-1',
                        },
                    }, [
                        h('p', 'Lorem ipsum'),
                    ]),
                    h(RTab, {
                        props: {
                            name: 'Tab 2',
                            to: {
                                fullPath: 'test-route',
                            },
                            panelId: 'custom-id-2',
                        },
                    }, [
                        h('p', 'Domus anthem'),
                    ]),
                ]);
            },
        }, {
            mocks: {
                $route: {
                    fullPath: 'test-route',
                },
                $router: {
                    resolve: route => ({route}),
                },
            },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should match all incoming props types', () => {
        const {divided, menuClass, contentClass} = RTabs.props;

        expect(divided.type).toBe(Boolean);
        expect(menuClass.type).toBe(String);
        expect(contentClass.type).toBe(String);
    });

    it('should set the correct IDs when panelId is provided', async () => {
        const customId1 = 'custom-id-1';
        const tabA11yId = `tab-${customId1}`;
        const tabPanelA11yId = `tabpanel-${customId1}`;

        const wrapper = await mount(RTabs, {
            render(h) {
                return h(RTabs, {}, [
                    h(RTab, {
                        props: {
                            name: 'Tab 1',
                            panelId: customId1,
                        },
                    }, [
                        h('p', 'Lorem ipsum'),
                    ]),
                ]);
            },
        });

        const tab = wrapper.findAll('.r-tab-item-link').at(0);
        const tabPanel = wrapper.find('.r-tab-content > div');

        expect(tab.attributes('id')).toBe(tabA11yId);
        expect(tab.attributes('aria-controls')).toBe(tabPanelA11yId);

        expect(tabPanel.attributes('id')).toBe(tabPanelA11yId);
        expect(tabPanel.attributes('aria-labelledby')).toBe(tabA11yId);
    });

    it('should generate IDs when panelId is not provided', async () => {
        const wrapper = await mount(RTabs, {
            render(h) {
                return h(RTabs, {}, [
                    h(RTab, {
                        props: {
                            name: 'Tab 1',
                        },
                    }, [
                        h('p', 'Lorem ipsum'),
                    ]),
                ]);
            },
        });

        const tab = wrapper.findAll('.r-tab-item-link').at(0);
        const tabPanel = wrapper.find('.r-tab-content > div');

        const generatedShortId = tab.attributes('id').replace('tab-', '');
        const tabA11yId = `tab-${generatedShortId}`;
        const tabPanelA11yId = `tabpanel-${generatedShortId}`;

        expect(tab.attributes('id')).toBe(tabA11yId);
        expect(tab.attributes('aria-controls')).toBe(tabPanelA11yId);

        expect(tabPanel.attributes('id')).toBe(tabPanelA11yId);
        expect(tabPanel.attributes('aria-labelledby')).toBe(tabA11yId);
    });
});
