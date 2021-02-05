import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({  

    theme: {
        themes: {
          light: {
            primary: colors.red,
            secondary: colors.blue.darken1,
            accent: colors.shades.black,
            error: colors.red.accent3,
          },
          dark: {
            primary: colors.orange,
            secondary:colors.white,
            background: colors.indigo.base,
          },
        },
      },
});
