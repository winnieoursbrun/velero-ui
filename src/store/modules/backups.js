import axios from "axios";
import { flattenObject } from "@/tools";

const state = {
  backups: undefined,
  keys: undefined,
  error: undefined,
  loading: false
};

const getters = {
  isError: state => !!state.error,
  isLoading: state => state.loading,
  backups: state => state.backups,
  keys: state => state.keys,
  error: state => state.error
};

const actions = {
  getBackups({ commit }) {
    commit("BACKUPS_LOADING");
    axios
      .get("/api/apis/velero.io/v1/namespaces/velero/backups")
      .then(result => {
        if (result.status == 200) {
          // let newList = [];
          try {
            // result.data.items.forEach(item => {
            //   let tmp = {};
            //   // tmp["id"] = item.metadata.uid;
            //   // tmp["name"] = item.metadata.name;
            //   // tmp["creationTimestamp"] = item.metadata.creationTimestamp;
            //   // tmp["namespace"] = item.metadata.namespace;
            //   // tmp["ttl"] = item.spec.ttl;
            //   // tmp["volumeSnapshotLocations"] =
            //   //   item.spec.volumeSnapshotLocations[0];
            //   // tmp["errors"] = item.status.errors;
            //   newList.push(tmp);
            // });
            commit("BACKUPS_UPDATE", result.data.items);
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
  },
  getBackup({ commit }, id) {
    commit("BACKUPS_LOADING");
    axios
      .get(`/api/apis/velero.io/v1/namespaces/velero/backups/${id}`)
      .then(result => {
        if (result.status == 200) {
          // let newList = [];
          console.log(result.data);
          // try {
          //   result.data.items.forEach(item => {
          //     let tmp = {};
          //     tmp["id"] = item.metadata.uid;
          //     tmp["name"] = item.metadata.name;
          //     tmp["creationTimestamp"] = item.metadata.creationTimestamp;
          //     tmp["namespace"] = item.metadata.namespace;
          //     tmp["ttl"] = item.spec.ttl;
          //     tmp["volumeSnapshotLocations"] =
          //       item.spec.volumeSnapshotLocations[0];
          //     tmp["errors"] = item.status.errors;
          //     newList.push(tmp);
          //   });
          //   commit("BACKUPS_UPDATE", newList);
          // } catch (error) {
          //   commit("BACKUPS_ERROR", error);
          // }
          commit("BACKUPS_UPDATE", result.data.items);
        } else {
          commit("BACKUPS_ERROR", "Return Status: " + result.status);
        }
      })
      .catch(error => {
        commit("BACKUPS_ERROR", error);
      });
  },
  deleteBackups({ commit }, backups) {
    console.log(backups);
    backups.forEach(backup => {
      axios
        .delete(`/api/apis/velero.io/v1/namespaces/velero/backups/${backup}`)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          commit("BACKUPS_ERROR", error);
        });
    });
  }
};

const mutations = {
  BACKUPS_UPDATE(state, backups) {
    state.backups = backups;
    state.keys = flattenObject(backups[0]);
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
