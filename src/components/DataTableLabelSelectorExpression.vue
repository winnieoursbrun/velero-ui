<template>
  <v-data-table :headers="headers" :items="value" hide-default-footer>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title> Label Selector Expression </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" class="mb-2" @click="newRow()">New Row</v-btn>
      </v-toolbar>
    </template>

    <template v-slot:item.key="props">
      <v-text-field v-model="props.item.key"></v-text-field>
    </template>

    <template v-slot:item.operator="props">
      <v-select
        v-model="props.item.operator"
        :items="['In', 'NotIn', 'Exists', 'DoesNotExist']"
      ></v-select>
    </template>

    <template v-slot:item.values="props">
      <v-combobox
        v-model="props.item.values"
        multiple
        small-chips
        clearable
        deletable-chips
      >
      </v-combobox>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      headers: [
        {
          text: "Key",
          value: "key"
        },
        {
          text: "Operator",
          value: "operator"
        },
        {
          text: "Value",
          value: "values"
        },
        {
          text: "",
          value: "actions",
          align: "center",
          sortable: false
        }
      ]
    };
  },
  methods: {
    deleteItem(item) {
      const index = this.value.indexOf(item);
      this.value.splice(index, 1);
    },
    newRow() {
      if (this.value === undefined) {
        this.value = [];
      }
      this.value.push({
        key: "",
        operator: "In",
        values: []
      });
      this.$emit("input", this.value);
    }
  }
};
</script>

<style></style>
