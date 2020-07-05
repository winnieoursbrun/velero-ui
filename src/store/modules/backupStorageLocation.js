import axios from "axios";

const state = {
  backupStorageLocation: undefined,
  error: undefined,
  loading: false
};

const getters = {
  isError: state => !!state.error,
  isLoading: state => state.loading,
  backupStorageLocation: state => state.backupStorageLocation,
  keys: state => state.keys,
  error: state => state.error
};

const actions = {
  getBackupStorageLocation({ commit }) {
    commit("VSL_LOADING");
    axios
      .get("/api/apis/velero.io/v1/namespaces/velero/volumesnapshotlocations")
      .then(result => {
        if (result.status == 200) {
          try {
            commit(
              "VSL_UPDATE",
              result.data.items.map(a => a.metadata.name)
            );
          } catch (error) {
            commit("VSL_ERROR", error);
          }
        } else {
          commit("VSL_ERROR", "Return Status: " + result.status);
        }
      })
      .catch(error => {
        commit("VSL_ERROR", error);
      });
  }
};

const mutations = {
  VSL_UPDATE(state, backupStorageLocation) {
    state.backupStorageLocation = backupStorageLocation;
    state.loading = false;
  },
  VSL_LOADING(state) {
    state.loading = true;
  },
  VSL_ERROR(state, error) {
    state.backupStorageLocation = undefined;
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
