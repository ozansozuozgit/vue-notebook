import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{  
    categories:[],
    notes:[],
    text:'',
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
      appendDbText:(state,payload)=>{
        state.text = payload
      },
      setCurrentCategory:(state,payload)=>{
        state.currentCategory = payload;
      },
      setCurrentNote:(state,payload)=>{
        state.currentNote = payload;
      },
      removeNote:(state,payload)=>{
         state.notes = state.notes.filter(note=>{return note.uuid !== payload })
      },
      removeCategory:(state,payload)=>{
        state.categories = state.categories.filter(category=>{return category.uuid !== payload })
     },
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
      addDbText:({commit},payload)=>{
        commit('appendDbText',payload)
      },
      updateCurrentCategory:({commit},payload)=>{
        commit('setCurrentCategory',payload)
      },
      updateCurrentNote:({commit},payload)=>{
        commit('setCurrentNote',payload)
      },
      deleteNote:({commit},payload)=>{
        commit('removeNote',payload)
      },
      deleteCategory:({commit},payload)=>{
        commit('removeCategory',payload)
      }
    },
    getters:{
      getCategories: (state) => {
        return state.categories;
      },
      getNotes: (state) => {
        return state.notes;
      },
      getText:(state)=>{
        return state.text;
      },
      getCurrentNote:(state)=>{
          return state.currentNote;
      },
      getCurrentCategory:(state)=>{
          return state.currentCategory;
      }
    }
})
