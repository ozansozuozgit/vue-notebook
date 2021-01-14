import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{  
    categories:[],
    notes:[]
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
      }
    },
    actions:{
      addCategory: ({ commit }, payload) => {
        commit('appendCategory', payload)
      },
      addDbCategories:({commit},payload)=>{
        commit('appendDbCategories',payload)
      }
    },
    getters:{
      getCategories: (state) => {
        return state.categories;
      },
      getNotes: (state) => {
        return state.notes;
      },
    }
})



// export default new Vuex.Store({
//   state: {
//     currentJoke: "This is a joke",
//     allJokes: []
//   },
//   mutations: {
//     //syncrous
//     setCurrentJoke(state, payload) {
//       state.currentJoke = payload;
//       state.allJokes.push(payload);
//     }
//   },
//   actions: {
//     //asyncronous
//     async setCurrentJoke(state) {
//       const joke = await fetch(url, { headers });
//       const j = await joke.json();
//       state.commit("setCurrentJoke", j.joke);
//     }
//   },
//   modules: {},
//   getters: {
//     getCurrentJoke: state => state.currentJoke,
//     getAllJokes: state => state.allJokes
//   }
// });