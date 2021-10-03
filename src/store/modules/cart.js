export default {
  namespaced: true,
  state() {
    return {
      items: [],
      total: 0,
      qty: 0
    };
  },
  mutations: {
    ADD_PRODUCT_TO_CART(state, payload) {
      const productData = payload;
      const productInCartIndex = state.items.findIndex(
        ci => ci.productId === productData.id
      );

      if (productInCartIndex >= 0) {
        state.items[productInCartIndex].qty++;
      } else {
        const newItem = {
          productId: productData.id,
          title: productData.title,
          image: productData.image,
          price: productData.price,
          qty: 1
        };
        state.items.push(newItem);
      }
      state.qty++;
      state.total += productData.price;
    },

    REMOVE_PRODUCT_FROM_CART(state, payload) {
      const prodId = payload;
      const productInCartIndex = state.items.findIndex(
        cartItem => cartItem.productId === prodId
      );
      const prodData = state.items[productInCartIndex];
      state.items.splice(productInCartIndex, 1);
      state.qty -= prodData.qty;
      state.total -= prodData.price * prodData.qty;
    }
  },
  actions: {
    addToCart({ commit, rootGetters }, payload) {
      const prodId = payload;
      const products = rootGetters['products/products'];
      const selectedProduct = products.find(product => product.id === prodId);
      commit('ADD_PRODUCT_TO_CART', selectedProduct);
    },
    removeFromCart({ commit }, payload) {
      commit('REMOVE_PRODUCT_FROM_CART', payload);
    }
  },
  getters: {
    products(state) {
      return state.items;
    },
    totalSum(state) {
      return state.total;
    },
    cartQty(state) {
      return state.qty;
    }
  }
};
