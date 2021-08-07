<template>
  <v-row>
    <v-col cols="1">
      <v-switch v-model="switcher"></v-switch>
    </v-col>
    <v-col v-if="!switcher">
      <v-combobox
        v-model="value"
        :items="namespaces"
        label="Included Ressource"
        multiple
        chips
      >
        <template v-slot:selection="data">
          <v-chip
            :key="JSON.stringify(data.item)"
            v-bind="data.attrs"
            :input-value="data.selected"
            :disabled="data.disabled"
            @click:close="data.parent.selectItem(data.item)"
          >
            <v-avatar
              class="accent white--text"
              left
              v-text="data.item.slice(0, 1).toUpperCase()"
            ></v-avatar>
            {{ data.item }}
          </v-chip>
        </template>
      </v-combobox> </v-col
    ><v-col v-else>
      <v-combobox
        v-model="form.excludedRessource"
        :items="namespaces"
        label="Excluded Ressource"
        multiple
        chips
      >
        <template v-slot:selection="data">
          <v-chip
            :key="JSON.stringify(data.item)"
            v-bind="data.attrs"
            :input-value="data.selected"
            :disabled="data.disabled"
            @click:close="data.parent.selectItem(data.item)"
          >
            <v-avatar
              class="accent white--text"
              left
              v-text="data.item.slice(0, 1).toUpperCase()"
            ></v-avatar>
            {{ data.item }}
          </v-chip>
        </template>
      </v-combobox>
    </v-col>
  </v-row>
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
      switcher: false
    };
  }
};
</script>

<style></style>
