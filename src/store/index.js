import { createStore } from 'vuex';

import productsModule from './modules/product';
import cartModule from './modules/cart';

const store = createStore({
  modules: {
    products: productsModule,
    cart: cartModule
  },
  state() {
    return {
      isLoggedIn: false
    };
  },
  mutations: {
    LOGIN(state) {
      state.isLoggedIn = true;
    },
    LOGOUT(state) {
      state.isLoggedIn = false;
    }
  },
  actions: {
    login({ commit }) {
      commit('LOGIN');
    },
    logout({ commit }) {
      commit('LOGOUT');
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isLoggedIn;
    }
  }
});

export default store;
