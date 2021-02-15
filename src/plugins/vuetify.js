import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({  

    theme: {
      dark: true,
        themes: {
          light: {
            primary: '#212121',
            secondary: '#00C6CF',                       
            background:'#fff'
          },
          dark: {
            primary: '#fff',
            secondary: '#00C6CF',
            background:'#212121',     
          },
        },
      },
});
