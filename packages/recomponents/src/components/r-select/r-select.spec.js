import Vue from 'vue';
import {shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RSelect from './r-select.vue';

describe('r-select.vue', () => {
    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                value: null,
                id: 'id',
                options: [{val: 1, label: '1'}, {val: 2, label: '2'}],
            },
        });

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.vm.internalValue).toEqual([]);
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = await renderToString(RSelect, {
            propsData: {
                value: null,
                id: 'id',
                options: [{val: 1, label: '1'}, {val: 2, label: '2'}],
            },
        });

        expect(wrapper).toMatchSnapshot();
    });


    it('should call @input whenever the value changes passing the new value and id', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                value: ['3'],
                options: ['1', '2', '3'],
                id: 'id',
                multiple: true,
            },
        });
        wrapper.vm.select(wrapper.vm.options[0]);
        expect(wrapper.emitted().input).toEqual([[['3', '1'], 'id']]);
    });

    it('should  call @select after each select passing the selected option and id', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                value: ['3'],
                options: ['1', '2', '3'],
                id: 'id',
                multiple: true,
            },
        });
        wrapper.vm.select(wrapper.vm.options[1]);
        expect(wrapper.emitted().select).toEqual([['2', 'id']]);
    });

    it('should call @remove after removing an option, passing the removed option and id', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                value: ['3'],
                options: ['1', '2', '3'],
                id: 'id',
                multiple: true,
            },
        });
        wrapper.vm.select(wrapper.vm.options[2]);
        expect(wrapper.emitted().remove).toEqual([['3', 'id'], ['3']]);
    });

    it('should preselect passed array of values', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                value: ['1', '2'],
                options: ['1', '2', '3'],
                multiple: true,
            },
        });
        expect(wrapper.vm.internalValue).toEqual(['1', '2']);
        expect(wrapper.findAll('.r-select-tag').at(0)).not.toEqual(undefined);
        expect(wrapper.findAll('.r-select-tag').at(1)).not.toEqual(undefined);
    });

    it('should change autocomplete value', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                autocomplete: 'none',
                value: ['1', '2'],
                options: ['1', '2', '3'],
                multiple: true,
            },
        });
        const autocomplete = wrapper.find('input.r-select-input').attributes('autocomplete');
        expect(autocomplete).toEqual('none');
    });

    it('should preselect passed simple value', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                value: '1',
                options: ['1', '2', '3'],
            },
        });
        expect(wrapper.vm.internalValue).toEqual(['1']);
        expect(wrapper.find('.r-select-single').text()).toContainEqual('1');
    });

    it('should do nothing when DISABLED == true', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                value: [],
                options: ['1', '2', '3'],
                multiple: true,
                disabled: true,
            },
        });
        wrapper.vm.select(wrapper.vm.options[0]);
        expect(wrapper.emitted().input).toEqual(undefined);
    });

    it('should add values to selected array', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                multiple: true,
                value: ['1'],
                options: ['1', '2', '3'],
                id: 'id',
            },
        });
        wrapper.vm.select(wrapper.vm.options[1]);
        expect(wrapper.emitted().input).toEqual([[['1', '2'], 'id']]);
    });

    it('should add objects to selected array', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                value: [{id: '1'}],
                options: [{id: '1'}, {id: '2'}, {id: '3'}],
                optionLabel: 'id',
                optionKey: 'id',
                multiple: true,
                id: 'id',
            },
        });
        wrapper.vm.select(wrapper.vm.options[1]);
        expect(wrapper.emitted().input).toEqual([
            [['1', '2'], 'id'],
        ]);
    });

    it('should remove already selected object', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                value: [{id: '2'}],
                options: [{id: '1'}, {id: '2'}, {id: '3'}],
                optionLabel: 'id',
                optionKey: 'id',
                multiple: true,
                id: 'id',
            },
        });
        wrapper.vm.select(wrapper.vm.options[1]);
        expect(wrapper.emitted().input).toEqual([[[], 'id']]);
    });


    it('should prevent from adding more than 3 elements', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                value: [{id: '1'}, {id: '2'}, {id: '3'}],
                options: [{id: '1'}, {id: '2'}, {id: '3'}, {id: '4'}],
                optionLabel: 'id',
                optionKey: 'id',
                multiple: true,
                id: 'id',
                max: 3,
            },
        });
        wrapper.vm.select(wrapper.vm.options[3]);
        expect(wrapper.emitted().input).toEqual(undefined);
    });

    it('should remove passed element', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                value: [{id: '1'}],
                options: [{id: '1'}, {id: '2'}, {id: '3'}],
                id: 'id',
                multiple: true,
                optionLabel: 'id',
                optionKey: 'id',
            },
        });
        wrapper.vm.removeElement(wrapper.vm.value[0]);
        expect(wrapper.emitted().input).toEqual([[[], 'id']]);
    });

    it('should NOT remove passed element when allowEmpty == FALSE & 1 element is left', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                value: [{id: '1'}],
                options: [{id: '1'}, {id: '2'}, {id: '3'}],
                multiple: true,
                optionLabel: 'id',
                id: 'id',
                optionKey: 'id',
                allowEmpty: false,
            },
        });
        wrapper.vm.removeElement(wrapper.vm.internalValue[0]);
        expect(wrapper.emitted().input).toEqual(undefined);
    });
    it('should select() currently pointed option', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                value: [],
                options: [{id: '1'}, {id: '2'}, {id: '3'}],
                id: 'id',
                optionLabel: 'id',
                optionKey: 'id',
                multiple: true,
            },
        });
        wrapper.vm.pointer = 2;
        wrapper.vm.addPointerElement();
        expect(wrapper.emitted().input).toEqual([[['3'], 'id']]);
    });

    it('should increase the pointer value by 1', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                value: [],
                options: [{id: '1'}, {id: '2'}, {id: '3'}],
                optionLabel: 'id',
                optionKey: 'id',
                multiple: true,
            },
        });
        wrapper.vm.activate();
        wrapper.vm.pointer = 1;
        wrapper.vm.pointerForward();
        expect(wrapper.vm.pointer).toBe(2);
    });

    it('should NOT increase the pointer value if pointed at last element', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                value: [],
                options: [{id: '1'}, {id: '2'}, {id: '3'}],
                optionLabel: 'id',
                optionKey: 'id',
                multiple: true,
            },
        });
        wrapper.vm.activate();
        wrapper.vm.pointer = 2;
        wrapper.vm.pointerForward();
        expect(wrapper.vm.pointer).toBe(2);
    });

    it('should call @search-change event callback whenever search value changes', async () => {
        const wrapper = await shallowMount(RSelect, {
            propsData: {
                value: null,
                options: [{id: '1'}, {id: '2'}, {id: '3'}],
                id: 'id',
                optionLabel: 'id',
                optionKey: 'id',
                clearOnSelect: false,
            },
        });
        wrapper.setData({search: 'test'});

        await Vue.nextTick();

        expect(wrapper.emitted()['search-change']).toEqual([['test', 'id']]);
    });
    it('should set isOpen value to true', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                value: [],
                options: [{id: '1'}, {id: '2'}, {id: '3'}],
                optionLabel: 'id',
                optionKey: 'id',
                multiple: true,
            },
        });
        wrapper.vm.isOpen = false;
        wrapper.vm.activate();
        expect(wrapper.vm.isOpen).toBe(true);
    });

    it('should set isOpen value to FALSE when it is TRUE', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                optionLabel: 'id',
                optionKey: 'id',
                searchable: false,
                value: null,
                options: [{id: '1'}, {id: '2'}, {id: '3'}],
            },
        });
        wrapper.vm.isOpen = false;
        wrapper.vm.toggle();
        expect(wrapper.vm.isOpen).toBe(true);
        wrapper.vm.toggle();
        expect(wrapper.vm.isOpen).toBe(false);
        wrapper.vm.toggle();
        expect(wrapper.vm.isOpen).toBe(true);
    });

    it('should set isOpen value to false', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                value: [],
                options: [{id: '1'}, {id: '2'}, {id: '3'}],
                optionLabel: 'id',
                optionKey: 'id',
                multiple: true,
            },
        });
        wrapper.vm.isOpen = true;
        wrapper.vm.deactivate();
        expect(wrapper.vm.isOpen).toBe(false);
    });

    it('should return TRUE when passed option is selected when multiple == TRUE', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                multiple: true,
                value: ['1'],
                options: ['1', '2', '3'],
            },
        });
        const option = wrapper.vm.options[0];
        expect(wrapper.vm.isSelected(option)).toBe(true);
    });

    it('should return FALSE when passed option is selected when multiple == TRUE', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                multiple: true,
                value: ['1'],
                options: ['1', '2', '3'],
            },
        });
        const option = wrapper.vm.options[1];
        expect(wrapper.vm.isSelected(option)).toBe(false);
    });

    it('should return empty string for undefined option', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                options: ['1', '2', '3'],
            },
        });
        expect(wrapper.vm.getOptionLabel(undefined)).toBe('');
    });
    it('should return value for passed option when simple value', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                multiple: true,
                value: [],
                options: ['1', '2', '3'],
            },
        });
        const option = wrapper.vm.options[1];
        expect(wrapper.vm.getOptionLabel(option)).toBe('2');
    });

    it('should return option.optionLabel for passed option', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                value: [],
                options: [{id: '1'}, {id: '2'}, {id: '3'}],
                optionLabel: 'id',
                optionKey: 'id',
                multiple: true,
            },
        });
        const option = wrapper.vm.options[1];
        expect(wrapper.vm.getOptionLabel(option)).toBe('2');
    });


    it('should return matched options according to search value', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                optionLabel: 'id',
                value: [],
                options: [{id: '1'}, {id: '2'}, {id: '3'}],
                optionKey: 'id',
                searchable: true,
                multiple: true,
            },
        });
        const comp = wrapper.vm;
        expect(comp.filteredOptions).toEqual([
            {id: '1'},
            {id: '2'},
            {id: '3'},
        ]);
        comp.search = '2';
        expect(comp.filteredOptions).toEqual([{id: '2'}]);
    });

    it('should return no options when there are no matches with search value', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                optionLabel: 'id',
                value: [],
                options: [{id: '1'}, {id: '2'}, {id: '3'}],
                optionKey: 'id',
                searchable: true,
                multiple: true,
            },
        });
        const comp = wrapper.vm;
        expect(comp.filteredOptions).toEqual([
            {id: '1'},
            {id: '2'},
            {id: '3'},
        ]);
        comp.search = '4';
        expect(comp.filteredOptions).toEqual([]);
    });

    it('should hide already selected elements when :hide-selected is set to true', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                optionLabel: 'id',
                optionKey: 'id',
                value: [{id: '2'}],
                options: [{id: '1'}, {id: '2'}, {id: '3'}],
                searchable: true,
                hideSelected: true,
                multiple: true,
            },
        });
        expect(wrapper.vm.filteredOptions).toEqual([{id: '1'}, {id: '3'}]);
    });

    it('should add additional option at the begining when search is filled and :taggable is TRUE', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                searchable: true,
                multiple: true,
                taggable: true,
                value: [],
                options: [10, 20, 30],
            },
        });
        expect(wrapper.vm.filteredOptions).toEqual([10, 20, 30]);
        expect(wrapper.vm.filteredOptions.length).toBe(3);
        wrapper.vm.search = 'test';
        expect(wrapper.vm.filteredOptions).toEqual([
            {isTag: true, label: 'test'},
        ]);
        expect(wrapper.vm.filteredOptions.length).toBe(1);
        wrapper.vm.search = '1';
        expect(wrapper.vm.filteredOptions).toEqual([
            {isTag: true, label: '1'},
            10,
        ]);
        expect(wrapper.vm.filteredOptions.length).toBe(2);
    });

    it('should return only as many options as set in the :options-limit prop.', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                multiple: true,
                optionsLimit: 2,
                value: [],
                options: ['test', 'production', 'testing'],
            },
        });
        expect(wrapper.vm.filteredOptions).toEqual(['test', 'production']);
        expect(wrapper.vm.filteredOptions.length).toBe(2);
        wrapper.vm.search = 'test';
        expect(wrapper.vm.filteredOptions).toEqual(['test', 'testing']);
        expect(wrapper.vm.filteredOptions.length).toBe(2);
    });


    it('should push to value and options with default settings and :taggable is TRUE', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                searchable: true,
                multiple: true,
                taggable: true,
                id: 'id',
                value: ['1'],
                options: ['1', '2', '3'],
            },
        });
        wrapper.vm.updateSearch('TEST');
        wrapper.vm.select(wrapper.vm.filteredOptions[0]);
        expect(wrapper.emitted().tag).toEqual([['TEST', 'id']]);
    });

    it('should call deactivate() if closeOnSelect is true and it is not multiple ', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                searchable: true,
                multiple: false,
                closeOnSelect: true,
                id: 'id',
                value: null,
                options: ['1', '2', '3'],
            },
        });
        wrapper.vm.deactivate = jest.fn();
        wrapper.vm.select(wrapper.vm.filteredOptions[0]);
        expect(wrapper.emitted().input).toEqual([['1', 'id']]);
        expect(wrapper.vm.deactivate).toBeCalled();
    });

    it('should remove last element when removeLastElement is called', () => {
        const wrapper = shallowMount(RSelect, {
            propsData: {
                multiple: true,
                closeOnSelect: true,
                id: 'id',
                value: ['1', '2'],
                options: ['1', '2', '3'],
            },
        });

        wrapper.vm.removeLastElement();
        expect(wrapper.emitted().input).toEqual([[['1'], 'id']]);
    });

    it('should search asynchronous based on keyword', async () => {
        const asyncFind = () => [1, 2, 3];
        const asyncGetInitValue = () => [];
        const wrapper = shallowMount(RSelect, {
            propsData: {
                id: 'id',
                value: [],
                asyncFind,
                asyncGetInitValue,
            },
        });
        jest.spyOn(wrapper.vm, 'handleAsyncFind');

        await Vue.nextTick();
        expect(wrapper.vm.filteredOptions.length).toBe(3);

        await wrapper.setData({search: 'acme'});
        expect(wrapper.vm.handleAsyncFind).toHaveBeenCalledTimes(1);
    });
});
