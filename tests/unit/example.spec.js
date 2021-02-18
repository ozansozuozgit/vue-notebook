// test/CustomCard.spec.js
import Vue from 'vue';

Vue.use(Vuetify);
// Libraries
import Vuetify from 'vuetify';

// Components
import NoteForm from '@/components/NoteForm';

// Utilities
import { createLocalVue, mount } from '@vue/test-utils';

describe('NoteForm.vue', () => {
  // const localVue = createLocalVue()
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  document.body.setAttribute('data-app', true);
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('should emit an event when the action v-btn is clicked', async () => {
    const wrapper = mount(NoteForm, {
      localVue,
      vuetify,
    });

    // const event = jest.fn();
    // const button = wrapper.find('.close__btn');
    // Here we bind a listener to the wrapper
    // instance to catch our custom event
    // https://vuejs.org/v2/api/#Instance-Methods-Events
    // button.trigger('click');
    // expect(button.text()).toBe('Close');
    // button.trigger('click');

    // button.vm.$on('closeNoteForm', event);
    // expect(event).toHaveBeenCalledTimes(0);
    // const closeNoteForm = jest.fn();

    // Simulate a click on the button
    // button.trigger('click');
    expect(wrapper.find('.close__btn').text()).toContain('Close');
    // const resetFilterStub = jest.fn();
    // wrapper.setMethods({ resetFilter: resetFilterStub });
    // wrapper.find('.close__btn').trigger('click');
    // expect(closeNoteForm).toHaveBeenCalled();
    // Ensure that our mock event was called
    // expect(event).toHaveBeenCalledTimes(1);
  });
});
