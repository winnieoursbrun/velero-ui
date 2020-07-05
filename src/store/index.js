import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import backups from "./modules/backups";
import namespaces from "./modules/namespaces";
import volumeSnapshotLocation from "./modules/volumeSnapshotLocation";
import backupStorageLocation from "./modules/backupStorageLocation";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    auth,
    namespaces,
    backupStorageLocation,
    volumeSnapshotLocation,
    backups
  },
  strict: debug
});
