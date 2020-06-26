let getBackups = () => {
  const baseURI = "/api/apis/velero.io/v1/namespaces/velero/backups";
  this.$http
    .get(baseURI)
    .then(result => {
      if (result.status == 200) {
        let backups = [];
        result.data.items.forEach(item => {
          let tmp = {};
          tmp["id"] = item.metadata.uid;
          tmp["name"] = item.metadata.name;
          tmp["creationTimestamp"] = item.metadata.creationTimestamp;
          tmp["namespace"] = item.metadata.namespace;
          tmp["ttl"] = item.spec.ttl;
          tmp["volumeSnapshotLocations"] = item.spec.volumeSnapshotLocations[0];
          tmp["errors"] = item.status.errors;
          backups.push(tmp);
        });
        return backups;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.log(error);
      return error;
    });
};

export default {
  getBackups
};
