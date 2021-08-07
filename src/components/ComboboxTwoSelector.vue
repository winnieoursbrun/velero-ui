<template>
  <v-row>
    <v-col cols="1">
      <v-switch v-model="switching"></v-switch>
    </v-col>
    <v-col v-if="!switching">
      <v-combobox
        v-model="selectedItems"
        :items="items"
        :label="labels[0]"
        multiple
        :chips="chips"
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
              v-if="avatar"
            ></v-avatar>
            {{ data.item }}
          </v-chip>
        </template>
      </v-combobox>
    </v-col>
    <v-col v-else>
      <v-combobox
        v-model="selectedItems"
        :items="items"
        :label="labels[1]"
        multiple
        :chips="chips"
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
              v-if="avatar"
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
    switching: {
      type: Boolean,
      required: false,
      default: false
    },
    avatar: {
      type: Boolean,
      required: false,
      default: false
    },
    chips: {
      type: Boolean,
      required: false,
      default: false
    },
    selectedItems: {
      type: Array,
      required: false,
      default: function() {
        return [];
      }
    },
    items: {
      type: Array,
      required: false,
      default: function() {
        return [];
      }
    },
    labels: {
      type: Array,
      required: false,
      default: function() {
        return ["FirstElement", "SecondElement"];
      },
      validator: function(value) {
        return value.length === 2;
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style></style>
