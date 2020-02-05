import {shallowMount, mount, createLocalVue} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RAvatar from './r-avatar.vue';
import RIcon from '../r-icon/r-icon.vue';
import RImg from '../r-img/r-img.vue';
import RFsBlock from '../../directives/r-fs-block';

global.console.warn = jest.fn();

const localVue = createLocalVue();

localVue.directive('fb-block', RFsBlock);

describe('r-avatar.vue', () => {
    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RAvatar, {
            localVue,
            propsData: {
                initials: 'RB',
            },
            slots: {
                default: 'Avatar component',
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = await renderToString(RAvatar, {
            localVue,
            propsData: {
                initials: 'VP',
            },
            slots: {
                default: 'Avatar component',
            },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should render icon', async () => {
        const wrapper = mount(RAvatar, {
            localVue,
            propsData: {
                icon: 'heart',
            },
            stubs: {
                'r-icon': RIcon,
            },
        });

        expect(wrapper.find('.r-avatar-icon').exists()).toBeTruthy();
        expect(wrapper.find(RIcon).exists()).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    it('should render image', async () => {
        const wrapper = mount(RAvatar, {
            localVue,
            propsData: {
                image: 'https://www.meme-arsenal.com/memes/86b1de6ff6981be012d40bf26c6992ab.jpg',
            },
            stubs: {
                'r-img': RImg,
            },
        });

        expect(wrapper.find('.r-avatar-image').exists()).toBeTruthy();
        expect(wrapper.find(RImg).exists()).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    it('should trigger validation warning', async () => {
        const wrapper = shallowMount(RAvatar, {
            localVue,
            propsData: {
                initials: 'Rebilly',
                color: 'green',
            },
        });

        expect(global.console.warn).toBeCalled();
        expect(wrapper).toMatchSnapshot();
    });
});
