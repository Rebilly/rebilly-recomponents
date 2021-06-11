import { createLocalVue, shallowMount } from '@vue/test-utils';
import { renderToString } from '@vue/server-test-utils';
import RToast from './r-toast.vue';
import RToastPlugin from '../../plugins/r-toast-manager';

describe('r-toast.vue', () => {
  const props = {
    type: 'test',
    message: 'test toast',
    title: '',
    visible: true,
  };
  const localVue = createLocalVue();
  localVue.use(RToastPlugin);
  const createToastFromError = (...args) => localVue.$toast.fromError(...args);

  it('should render Wrapper and match snapshot', async () => {
    // const wrapper = localVue.$toast.positive(props.message, {autoHide: false});
    const wrapper = shallowMount(RToast, {
      props,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render via SSR and match snapshot', async () => {
    const wrapper = await renderToString(RToast, {
      propsData: {
        ...props,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should set a class by type prop', async () => {
    const type = 'test';
    const wrapper = shallowMount(RToast, {
      propsData: {
        type,
      },
    });
    expect(wrapper.classes()).toContain(`r-toast-${type}`);
  });

  it('should create toasts via toast-manager', async () => {
    const message = 'This is a manager\'s toast!';
    localVue.$toast.positive(message, { autoHide: false });
    localVue.$toast.negative(message, { autoHide: false });
    localVue.$toast.warning(message, { autoHide: false });
    localVue.$toast.info(message, { autoHide: false });
    const managerToasts = [...document.getElementsByClassName('r-toast')]
    /* eslint-disable no-underscore-dangle */
      .map((toast) => toast.__vue__)
      .filter((toast) => toast._props && toast._props.message === message);
    /* eslint-enable no-underscore-dangle */

    expect(managerToasts).toHaveLength(4);
  });

  it('should create toasts from errors via toast-manager', async () => {
    const error = new Error();
    const toastMessage = 'Custom error text';
    createToastFromError(error, toastMessage);
    const hasToastAppeared = [...document.getElementsByClassName('r-toast')]
    /* eslint-disable no-underscore-dangle */
      .map((toast) => toast.__vue__)
      .some((toast) => toast._props && toast._props.message === toastMessage);
    /* eslint-enable no-underscore-dangle */

    expect(hasToastAppeared).toBe(true);
  });

  describe('r-toast-manager default error handling', () => {
    it('should handle errors without a supplied default message', async () => {
      const error = new Error();
      createToastFromError(error);
      const hasToastAppeared = [...document.getElementsByClassName('r-toast')]
      /* eslint-disable no-underscore-dangle */
        .map((toast) => toast.__vue__)
        .some((toast) => toast._props && toast._props.message === 'Something went wrong, please try again or contact support');
      /* eslint-enable no-underscore-dangle */

      expect(hasToastAppeared).toBe(true);
    });

    it('should handle errors with a status property', async () => {
      const errorMessage = 'Not found';
      const error = new Error();
      error.status = 404;
      error.message = errorMessage;
      createToastFromError(error);
      const hasToastAppeared = [...document.getElementsByClassName('r-toast')]
      /* eslint-disable no-underscore-dangle */
        .map((toast) => toast.__vue__)
        .some((toast) => toast._props && toast._props.message === errorMessage);
      /* eslint-enable no-underscore-dangle */

      expect(hasToastAppeared).toBe(true);
    });

    it('should handle errors with a 422 status', async () => {
      const errorDetails = 'Details why the entity was unprocessable';
      const error = new Error();
      error.status = 422;
      error.details = [errorDetails];
      createToastFromError(error);
      const hasToastAppeared = [...document.getElementsByClassName('r-toast')]
      /* eslint-disable no-underscore-dangle */
        .map((toast) => toast.__vue__)
        .some((toast) => toast._props && toast._props.message === errorDetails);
      /* eslint-enable no-underscore-dangle */

      expect(hasToastAppeared).toBe(true);
    });

    it('should handle errors with a 500 status', async () => {
      const error = new Error();
      error.status = 500;
      createToastFromError(error);
      const hasToastAppeared = [...document.getElementsByClassName('r-toast')]
      /* eslint-disable no-underscore-dangle */
        .map((toast) => toast.__vue__)
        .some((toast) => toast._props && toast._props.message === 'Something went wrong on our servers, please contact support.');
      /* eslint-enable no-underscore-dangle */

      expect(hasToastAppeared).toBe(true);
    });

    it('should handle RebillyConflictErrors', async () => {
      const errorMessage = 'Useful error message';
      const error = new Error();
      error.name = 'RebillyConflictError';
      error.message = errorMessage;
      createToastFromError(error);
      const hasToastAppeared = [...document.getElementsByClassName('r-toast')]
      /* eslint-disable no-underscore-dangle */
        .map((toast) => toast.__vue__)
        .some((toast) => toast._props && toast._props.message === errorMessage);
      /* eslint-enable no-underscore-dangle */

      expect(hasToastAppeared).toBe(true);
    });

    it('should ignore RebillyCanceledErrors', async () => {
      const error = new Error();
      error.name = 'RebillyCanceledError';
      createToastFromError(error);
      const hasToastAppeared = [...document.getElementsByClassName('r-toast')]
      /* eslint-disable no-underscore-dangle */
        .map((toast) => toast.__vue__)
        .some((toast) => toast._props && toast._props.message === 'Something went wrong, please try again or contact support');
      /* eslint-enable no-underscore-dangle */

      expect(hasToastAppeared).toBe(true);
    });
  });
});
