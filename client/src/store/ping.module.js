import axios from 'axios';

const state = {
  timeLeft: '',
  isPinging: false
}

const mutations = {
  setIsPinging(state, payload) {
    state.isPinging = payload.isPinging;
  },
  setTimeLeft(state, payload) {
    state.timeLeft = payload.timeLeft;
  },
};

const actions = {
  ping(context) {
    context.commit('setIsPinging', { isPinging: true });
    axios.get('ping').finally(() => {
      context.commit('setIsPinging', { isPinging: false });
    });
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
