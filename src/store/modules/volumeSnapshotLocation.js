import axios from "axios";

const state = {
  volumeSnapshotLocation: undefined,
  error: undefined,
  loading: false
};

const getters = {
  isError: state => !!state.error,
  isLoading: state => state.loading,
  volumeSnapshotLocation: state => state.volumeSnapshotLocation,
  keys: state => state.keys,
  error: state => state.error
};

const actions = {
  getVolumeSnapshotLocation({ commit }) {
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
  VSL_UPDATE(state, volumeSnapshotLocation) {
    state.volumeSnapshotLocation = volumeSnapshotLocation;
    state.loading = false;
  },
  VSL_LOADING(state) {
    state.loading = true;
  },
  VSL_ERROR(state, error) {
    state.volumeSnapshotLocation = undefined;
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
