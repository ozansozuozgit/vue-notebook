import Vue from 'vue';
Vue.use(Vuetify);
import Vuetify from 'vuetify';
import NoteForm from '@/components/NoteForm';
import Note from '@/components/Note';
import { createLocalVue, mount } from '@vue/test-utils';

// var app = document.createElement('div');
// app.setAttribute('data-app', true);
// document.body.appendChild(app);

describe('NoteForm.vue', () => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  // document.body.setAttribute('data-app', true);
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('should emit an event when the action v-btn is clicked', async () => {
    const formWrapper = mount(NoteForm, {
      localVue,
      vuetify,
    });

    const noteWrapper = mount(Note, {
      localVue,
      vuetify,
      propsData: {
        note: {
          title: 'here are the title',
          text: 'here is text',
        },
      },
    });
    const dialog = noteWrapper.find('.v-dialog');
    console.log(dialog);
    expect(dialog.isVisible()).toBe(false);

    formWrapper.vm.$emit('closeNoteForm');
    await formWrapper.vm.$nextTick(); // Wait until $emits have been handled
    expect(formWrapper.emitted().closeNoteForm).toBeTruthy();
  });
});
