import {renderToString} from '@vue/server-test-utils';
import RIconButton from './r-icon-button.vue';

describe('r-icon-button.vue', () => {
    it('should render via SSR and match snapshot', async () => {
        const wrapper = await renderToString(RIconButton, {});

        expect(wrapper).toMatchSnapshot();
    });
});
