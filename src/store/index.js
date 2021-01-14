import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{  
    categories:[],
    notes:[],
    currentCategory:null,
    currentNote:null,
  },
    mutations:{
      appendCategory: (state,payload) => {
        state.categories.push(payload)
      },
      appendNotes: (state,payload) => {
        state.notes.push(payload)
      },
      appendDbCategories:(state,payload)=>{
        state.categories = payload
      },
      appendDbNotes:(state,payload)=>{
        state.notes = payload
      },
      setCurrentCategory:(state,payload)=>{
        state.currentCategory = payload;
      },
      setCurrentNote:(state,payload)=>{
        state.currentNote = payload;
      }
    },
    actions:{
      addCategory: ({ commit }, payload) => {
        commit('appendCategory', payload)
      },
      addNotes:({commit},payload)=>{
          commit('appendNotes',payload)
      },
      addDbCategories:({commit},payload)=>{
        commit('appendDbCategories',payload)
      },
      addDbNotes:({commit},payload)=>{
        commit('appendDbNotes',payload)
      },
      updateCurrentCategory:({commit},payload)=>{
        commit('setCurrentCategory',payload)
      },
      updateCurrentNote:({commit},payload)=>{
        commit('setCurrentNote',payload)
      }
    },
    getters:{
      getCategories: (state) => {
        return state.categories;
      },
      getNotes: (state) => {
        return state.notes;
      },
      getCurrentNote:(state)=>{
          return state.currentNote;
      },
      getCurrentCategory:(state)=>{
          return state.currentCategory;
      }
    }
})
