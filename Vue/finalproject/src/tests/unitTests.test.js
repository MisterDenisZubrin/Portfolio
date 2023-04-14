import { mount, flushPromises } from '@vue/test-utils';
import App from '../App.vue';
import Form from '../components/Form.vue';
import List from '../components/List.vue';
import store from '../store/index.js';
import router from "../router/index.js";

// vue3-jest, jest, babel-jest - все 27ой версии
// также нужно установить окружение "testEnvironment": "jsdom" в конфиге jest

const mockRoute = {
  params: {
    category: 'Test',
  },
  query: {
    value: 123
  }
};
const mockRouter = {
  push: jest.fn()
}

describe('Form tests', () => {
  const wrapper = mount(Form, {
    global: {
      plugins: [store],
      mocks: {
        $route: mockRoute,
        $router: mockRouter
      }
    }
  });

  test('Does form works', async () => {
    const note = {
      category: 'Test',
      value: 123,
      date: '2.9.2022',
      id: 5
    }
    await wrapper.find('input[id="date"]').setValue('2.9.2022');
    const button = wrapper.find('input[type="submit"]');
    button.trigger('click');
    expect(store.state.notes).toContainEqual(note);
  });
});

describe('List tests', () => {

  const wrapper = mount(List, {
    global: {
      plugins: [store],
      mocks: {
        $route: mockRoute,
        $router: mockRouter
      }
    }
  });

  test('Is List rendered', () => {
    if (store.state.notes) {
      const listElement = wrapper.find('span[class="table__col"]');
      expect(listElement.text()).toBe("1");
    }
  });

  test('Context menu check', () => {
    const button = wrapper.find('button[class="table__context-btn"]');
    button.trigger('click');
    expect(wrapper.find('.context').exists()).toBe(true);
  })
});

describe('Router Tests', () => {
  const wrapper = mount(App, {
    global: {
      plugins: [store, router]
    }
  });

  test('Router check', async () => {
    router.push('/');
    await router.isReady();
  });

  test('Routing to Form check', async () => {
    await wrapper.find('li[class="presets__preset"]').trigger('click');
    await flushPromises();
    const form = wrapper.find('form');
    expect(form).toBeTruthy();
  });
});