import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: [],
    text: '',
    currentNote: null,
    newNote:false
  },
  mutations: {
    ADD_NOTES: (state, payload) => {
      state.notes.push(payload);
    },
    ADD_DB_NOTES: (state, payload) => {
      state.notes = payload;
    },
    ADD_DB_TEXT: (state, payload) => {
      state.text = payload;
    },
    SET_CURRENT_NOTE: (state, payload) => {
      state.currentNote = payload;
    },
    DELETE_NOTE: (state, payload) => {
      state.notes = state.notes.filter((note) => {
        return note.uuid !== payload;
      });
    },
    SET_NEW_NOTE:(state,payload)=>{
      state.newNote = payload;
    }
  },
  actions: {
    addNotes: ({ commit }, payload) => {
      commit('ADD_NOTES', payload);
    },
    addDbNotes: ({ commit }, payload) => {
      commit('ADD_DB_NOTES', payload);
    },
    addDbText: ({ commit }, payload) => {
      commit('ADD_DB_TEXT', payload);
    },
    setCurrentNote: ({ commit }, payload) => {
      commit('SET_CURRENT_NOTE', payload);
    },
    deleteNote: ({ commit }, payload) => {
      commit('DELETE_NOTE', payload);
    },
    setNewNote:({commit},payload)=>{
      commit('SET_NEW_NOTE',payload);
    }

  },
  getters: {
    getNotes: (state) => {
      return state.notes;
    },
    getText: (state) => {
      return state.text;
    },
    getCurrentNote: (state) => {
      return state.currentNote;
    },

  },
});
