<template>
  <v-data-table
    :headers="headers"
    :items="item"
    hide-default-footer
    disable-sort
    disable-filtering
    disable-pagination
    hide-default-header
  >
    <template v-slot:footer>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <v-btn color="primary" class="mb-2" @click="newRow()">New Row</v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.command="props">
      <v-text-field name="Command" v-model="props.item.command"></v-text-field>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      <v-icon small @click="reOrder(item, -1)" :disabled="item == value[0]">
        mdi-arrow-up
      </v-icon>
      <v-icon
        small
        @click="reOrder(item, 1)"
        :disabled="item == value[value.length - 1]"
      >
        mdi-arrow-down
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    item: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      headers: [
        {
          text: "Command",
          value: "command"
        },
        {
          text: "",
          value: "actions",
          align: "end",
          sortable: false
        }
      ]
    };
  },
  methods: {
    newRow() {
      if (!this.value) {
        this.value = [];
      }
      this.value.push({
        id: Math.round(Math.random() * 10000),
        command: ""
      });
      this.$emit("input", this.value);
    },
    deleteItem(item) {
      const index = this.value.indexOf(item);
      this.value.splice(index, 1);
    },
    reOrder(item, pos) {
      const index = this.value.indexOf(item);
      const value = this.value.splice(index, 1);
      this.value.splice(index + pos, 0, value[0]);
    }
  }
};
</script>
