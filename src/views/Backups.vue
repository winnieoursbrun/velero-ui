<template>
  <div id="backups">
    <TableBackups />
  </div>
</template>

<style scoped></style>

<script>
import { mapGetters } from "vuex";
import TableBackups from "@/components/TableBackups";

export default {
  name: "Backups",
  components: {
    TableBackups
  },
  computed: {
    ...mapGetters({
      error: "backups/error",
      loading: "backups/isLoading",
      backups: "backups/backups",
      namespaces: "namespaces/namespaces",
      volumeSnapshotLocation: "volumeSnapshotLocation/volumeSnapshotLocation",
      backupStorageLocation: "backupStorageLocation/backupStorageLocation",
      keysList: "backups/keys"
    })
  },
  methods: {
    getBackups: function() {
      this.$store.dispatch("backups/getBackups");
    },
    getBackup: function(id) {
      this.$store.dispatch("backups/getBackup", id);
    },
    getNamespaces: function() {
      this.$store.dispatch("namespaces/getNamespaces");
    },
    getVolumeSnapshotLocation: function() {
      this.$store.dispatch("volumeSnapshotLocation/getVolumeSnapshotLocation");
    },
    getBackupStorageLocation: function() {
      this.$store.dispatch("backupStorageLocation/getBackupStorageLocation");
    },
    deleteBackups: function(backups) {
      this.$store.dispatch("backups/deleteBackups", backups);
      this.getBackups();
    },
    alert: function(msg, status) {
      this.alertMsg = msg;
      this.alertColor = status;
    },
    createBackup: function(form) {
      this.$store.dispatch("backups/createBackup", form);
      this.dialog = false;
      this.getBackups();
      this.alert("Backup newly created", "success");
    },
    updateRow: function() {
      this.headers = [];
      this.settings.sort().forEach((value, index) => {
        this.headers[index] = {
          text: value.split(/[./]/).pop(),
          align: "start",
          value: value
        };
      });
    },
    selectedItems: function(items) {
      if (!items[0]) return;
      this.selectedItemsName = items.map(a => a.metadata.name);
    },
    submit() {
      this.createBackup(this.form);
    }
  },
  mounted() {
    this.getBackups();
    this.getNamespaces();
    this.getVolumeSnapshotLocation();
    this.getBackupStorageLocation();
    this.updateRow();
  }
};
</script>
