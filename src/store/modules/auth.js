import axios from "axios";
import { Promise } from "core-js";

const state = {
  token: localStorage.getItem("user-token") || "",
  status: ""
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
};

const actions = {
  login({ commit }, token) {
    return new Promise((resolve, reject) => {
      commit("AUTH_REQUEST");
      axios("/api/healthz/ping", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
        .then(() => {
          localStorage.setItem("user-token", token);
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          commit("AUTH_SUCCESS", token);
          resolve(token);
        })
        .catch(err => {
          commit("AUTH_ERROR", err);
          localStorage.removeItem("user-token");
          reject(err);
        });
    });
  },
  logout({ commit }) {
    localStorage.removeItem("user-token");
    delete axios.defaults.headers.common["Authorization"];
    commit("AUTH_LOGOUT");
  },
  tryConnection() {
    return axios("/api/healthz/ping");
  }
};

const mutations = {
  AUTH_REQUEST(state) {
    state.status = "loading";
  },
  AUTH_SUCCESS(state, token) {
    state.status = "success";
    state.token = token;
  },
  AUTH_LOGOUT(state) {
    state.status = "";
    state.token = "";
    localStorage.removeItem("user-token");
  },
  AUTH_ERROR(state) {
    state.status = "error";
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
