import {shallowMount, mount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RTabs from './r-tabs.vue';
import RTab from './r-tab.vue';

const extractIdSegment = str => str.replace('tab-', '');

describe('r-tabs.vue', () => {
    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RTabs);

        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RTabs);

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
                default: renderToString(RTab, {props: {name: 'test1'}, slots: {default: '<p>Test 1</p>'}}),
            },
        });

        expect(wrapper.find('.tab.test')).not.toBe(undefined);
        expect(wrapper.find('.tab-content.test')).not.toBe(undefined);
    });

    it('should use plain active tab if specified', async () => {
        const wrapper = mount(RTabs, {
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

        const links = wrapper.findAll('.r-tab-link');
        expect(links.at(0).classes().includes('is-active')).toBeFalsy();
        expect(links.at(1).classes().includes('is-active')).toBeTruthy();
    });

    it('should switch tab on click', async () => {
        const wrapper = mount(RTabs, {
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

        const links = wrapper.findAll('.r-tab-link');
        expect(links.at(0).classes().includes('is-active')).toBeTruthy();
        links.at(1).trigger('click');
        expect(links.at(0).classes().includes('is-active')).toBeFalsy();
    });

    it('should open current route tab', async () => {
        const wrapper = mount({
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
        const {
            divided, menuClass, contentClass, tabHeaderMode,
        } = RTabs.props;

        expect(divided.type).toBe(Boolean);
        expect(menuClass.type).toBe(String);
        expect(contentClass.type).toBe(String);
        expect(tabHeaderMode.type).toBe(Boolean);
    });

    describe('tabHeaderMode', () => {
        const customId = 'custom-panel-id';
        const wrapper = mount(RTabs, {
            render(h) {
                return h(RTabs, {
                    props: {
                        tabHeaderMode: true,
                    },
                }, [
                    h(RTab, {
                        props: {
                            name: 'Tab 1',
                            panelId: customId,
                        },
                    }),
                    h(RTab, {
                        props: {
                            name: 'Tab 2',
                        },
                    }),
                ]);
            },
        });

        const tabHeaderWrapper = wrapper.find('div:first-child > div');
        const tabPanel = wrapper.find('.r-tab-content');
        let tabs;
        let tabWithPanelId;
        let tabWithoutPanelId;

        beforeEach(() => {
            tabs = wrapper.findAll('.r-tab-link');
            tabWithPanelId = tabs.at(0);
            tabWithoutPanelId = tabs.at(1);
        });

        it('should hide tabpanel contents', () => {
            expect(tabPanel.isEmpty()).toBe(true);
        });

        it('should remove a11y attributes from tabs header', () => {
            expect(tabHeaderWrapper.attributes('role')).toBeUndefined();

            expect(tabWithPanelId.attributes('role')).toBeUndefined();
            expect(tabWithPanelId.attributes('aria-controls')).toBeUndefined();

            expect(tabWithoutPanelId.attributes('role')).toBeUndefined();
            expect(tabWithoutPanelId.attributes('aria-controls')).toBeUndefined();
        });

        it(`should keep id from r-tab's panelId when provided`, () => {
            const appendedIdString = extractIdSegment(tabWithPanelId.attributes('id'));
            expect(appendedIdString).toEqual(customId);
        });

        it('should generate random short IDs if panelId is not provided in r-tab', () => {
            expect(tabWithoutPanelId.attributes('id')).toBeDefined();
        });
    });

    describe('accessibility', () => {
        it('should set the correct IDs when panelId is provided', () => {
            const customId1 = 'custom-id-1';
            const tabA11yId = `tab-${customId1}`;
            const tabPanelA11yId = `tabpanel-${customId1}`;

            const wrapper = mount(RTabs, {
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

            const tabHeaderWrapper = wrapper.find('div:first-child > div');
            const tab = wrapper.findAll('.r-tab-link').at(0);
            const tabPanel = wrapper.find('.r-tab-content > div');

            expect(tabHeaderWrapper.attributes('role')).toBe('tablist');

            expect(tab.attributes('id')).toBe(tabA11yId);
            expect(tab.attributes('aria-controls')).toBe(tabPanelA11yId);

            expect(tabPanel.attributes('id')).toBe(tabPanelA11yId);
            expect(tabPanel.attributes('aria-labelledby')).toBe(tabA11yId);
        });

        it('should generate IDs when panelId is not provided', () => {
            const wrapper = mount(RTabs, {
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

            const tab = wrapper.findAll('.r-tab-link').at(0);
            const tabPanel = wrapper.find('.r-tab-content > div');

            const generatedShortId = extractIdSegment(tab.attributes('id'));
            const tabA11yId = `tab-${generatedShortId}`;
            const tabPanelA11yId = `tabpanel-${generatedShortId}`;

            expect(tab.attributes('id')).toBe(tabA11yId);
            expect(tab.attributes('aria-controls')).toBe(tabPanelA11yId);

            expect(tabPanel.attributes('id')).toBe(tabPanelA11yId);
            expect(tabPanel.attributes('aria-labelledby')).toBe(tabA11yId);
        });
    });
});
