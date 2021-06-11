import { shallowMount } from '@vue/test-utils';
import RDateRangeButtonGroup from './r-date-range-button-group.vue';
import RButtonGroup from '../r-button-group/r-button-group.vue';

describe('r-calendar-manager.vue', () => {
  const period = {
    start: '2019-01-01T00:00:00Z',
    end: '2020-01-01T23:59:59Z',
  };

  it('renders the group button', () => {
    const wrapper = shallowMount(RDateRangeButtonGroup, {
      propsData: {
        value: period,
      },
      stubs: ['no-ssr'],
    });
    expect(wrapper.contains(RButtonGroup)).toBe(true);
    expect(wrapper.contains('.r-date-range-preset-picker')).toBe(true);
  });

  it('should format selected date period', () => {
    const wrapper = shallowMount(RDateRangeButtonGroup, {
      propsData: {
        value: period,
      },
      stubs: ['no-ssr'],
    });
    expect(wrapper.vm.selectedDateLabel).toEqual('Jan 1, 2019 - Jan 1, 2020');
  });

  it('should emit input when relativeFilterChange is called', () => {
    const wrapper = shallowMount(RDateRangeButtonGroup, {
      propsData: {
        value: period,
      },
      stubs: ['no-ssr'],
    });
    wrapper.vm.relativeFilterChange('lastYear');
    const lastYear = new Date().getFullYear() - 1;
    const { input } = wrapper.emitted();
    expect(input).not.toBe(undefined);
    expect(input[0][0].start).toContain(`${lastYear}-01-01T00:00:00`);
    expect(input[0][0].end).toContain(`${lastYear}-12-31T23:59:59`);
  });
});
