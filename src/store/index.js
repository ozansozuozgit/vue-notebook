import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [],
    notes: [],
    text: '',
    currentCategory: null,
    currentNote: null,
  },
  mutations: {
    ADD_CATEGORY: (state, payload) => {
      return state.categories.push(payload);
    },
    ADD_NOTES: (state, payload) => {
      state.notes.push(payload);
    },
    ADD_DB_CATEGORIES: (state, payload) => {
      state.categories = payload;
    },
    ADD_DB_NOTES: (state, payload) => {
      state.notes = payload;
    },
    ADD_DB_TEXT: (state, payload) => {
      state.text = payload;
    },
    SET_CURRENT_CATEGORY: (state, payload) => {
      state.currentCategory = payload;
    },
    SET_CURRENT_NOTE: (state, payload) => {
      state.currentNote = payload;
    },
    DELETE_NOTE: (state, payload) => {
      state.notes = state.notes.filter((note) => {
        return note.uuid !== payload;
      });
    },
    DELETE_CATEGORY: (state, payload) => {
      state.categories = state.categories.filter((category) => {
        return category !== payload;
      });
    },
  },
  actions: {
    addCategory: ({ commit }, payload) => {
      commit('ADD_CATEGORY', payload);
    },
    addNotes: ({ commit }, payload) => {
      commit('ADD_NOTES', payload);
    },
    addDbCategories: ({ commit }, payload) => {
      commit('ADD_DB_CATEGORIES', payload);
    },
    addDbNotes: ({ commit }, payload) => {
      commit('ADD_DB_NOTES', payload);
    },
    addDbText: ({ commit }, payload) => {
      commit('ADD_DB_TEXT', payload);
    },
    setCurrentCategory: ({ commit }, payload) => {
      commit('SET_CURRENT_CATEGORY', payload);
    },
    setCurrentNote: ({ commit }, payload) => {
      commit('SET_CURRENT_NOTE', payload);
    },
    deleteNote: ({ commit }, payload) => {
      commit('DELETE_NOTE', payload);
    },
    deleteCategory: ({ commit }, payload) => {
      commit('DELETE_CATEGORY', payload);
    },
  },
  getters: {
    getCategories: (state) => {
      return state.categories;
    },
    getNotes: (state) => {
      return state.notes;
    },
    getText: (state) => {
      return state.text;
    },
    getCurrentNote: (state) => {
      return state.currentNote;
    },
    getCurrentCategory: (state) => {
      return state.currentCategory;
    },
  },
});
