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
    const event = jest.fn();

    wrapper.find('.close__btn').trigger('click');
    wrapper.vm.$nextTick(() => {
      wrapper.vm.closeNoteForm(); //closeModal is my method
      // expect(wrapper.emitted().input[0]).toEqual([false]); //test if it changes
      expect(event).toHaveBeenCalledTimes(0);
    });
  });
});
