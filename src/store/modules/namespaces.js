import axios from "axios";

const state = {
  namespaces: undefined,
  error: undefined,
  loading: false
};

const getters = {
  isError: state => !!state.error,
  isLoading: state => state.loading,
  namespaces: state => state.namespaces,
  keys: state => state.keys,
  error: state => state.error
};

const actions = {
  getNamespaces({ commit }) {
    commit("NAMESPACES_LOADING");
    axios
      .get("/api/api/v1/namespaces")
      .then(result => {
        if (result.status == 200) {
          try {
            commit(
              "NAMESPACES_UPDATE",
              result.data.items.map(a => a.metadata.name)
            );
          } catch (error) {
            commit("NAMESPACES_ERROR", error);
          }
        } else {
          commit("NAMESPACES_ERROR", "Return Status: " + result.status);
        }
      })
      .catch(error => {
        commit("NAMESPACES_ERROR", error);
      });
  }
};

const mutations = {
  NAMESPACES_UPDATE(state, namespaces) {
    state.namespaces = namespaces;
    state.loading = false;
  },
  NAMESPACES_LOADING(state) {
    state.loading = true;
  },
  NAMESPACES_ERROR(state, error) {
    state.namespaces = undefined;
    state.error = error;
    state.loading = false;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
