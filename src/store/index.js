import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { accessModule } from "./modules/access";
import { coursesModule } from "./modules/courses";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    access: accessModule,
    courses: coursesModule,
  },
});
