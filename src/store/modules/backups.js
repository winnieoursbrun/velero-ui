import axios from "axios";

const state = {
  backups: undefined,
  error: undefined,
  loading: false
};

const getters = {
  isError: state => !!state.error,
  isLoading: state => state.loading,
  backups: state => state.backups,
  error: state => state.error
};

const actions = {
  get({ commit }) {
    commit("BACKUPS_LOADING");
    axios
      .get("/api/apis/velero.io/v1/namespaces/velero/backups")
      .then(result => {
        if (result.status == 200) {
          let newList = [];
          try {
            result.data.items.forEach(item => {
              let tmp = {};
              tmp["id"] = item.metadata.uid;
              tmp["name"] = item.metadata.name;
              tmp["creationTimestamp"] = item.metadata.creationTimestamp;
              tmp["namespace"] = item.metadata.namespace;
              tmp["ttl"] = item.spec.ttl;
              tmp["volumeSnapshotLocations"] =
                item.spec.volumeSnapshotLocations[0];
              tmp["errors"] = item.status.errors;
              newList.push(tmp);
            });
            commit("BACKUPS_UPDATE", newList);
          } catch (error) {
            commit("BACKUPS_ERROR", error);
          }
        } else {
          commit("BACKUPS_ERROR", "Return Status: " + result.status);
        }
      })
      .catch(error => {
        commit("BACKUPS_ERROR", error);
      });
  }
};

const mutations = {
  BACKUPS_UPDATE(state, backups) {
    state.backups = backups;
    state.loading = false;
  },
  BACKUPS_LOADING(state) {
    state.loading = true;
  },
  BACKUPS_ERROR(state, error) {
    state.backups = undefined;
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
