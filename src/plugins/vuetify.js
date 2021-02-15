import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({  

    theme: {
      dark: false,

        themes: {
          light: {
            primary: '#212121',
            secondary: '#00C6CF',                       
            text:colors.orange.darken3,
            accent: '#BD1E00',
            error: colors.red.accent3,
            // primary: '#1976D2',
            // secondary: '#1976D2',
            // accent: '#1976D2',
            // error: '#1976D2',
            // info: '#1976D2',
            // success: '#1976D2',
            // warning: '#1976D2',
          },
          dark: {
            // primary: colors.orange,
            // secondary:colors.red,
            // text:colors.orange.darken3,
            // background: colors.red.darken4,
            primary: '#1976D2',
            secondary: '#1976D2',
            accent: '#1976D2',
            error: '#1976D2',
            info: '#1976D2',
            success: '#1976D2',
            warning: '#1976D2',
          },
        },
      },
});
