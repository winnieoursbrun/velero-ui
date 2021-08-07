<template>
  <v-expansion-panels accordion>
    <v-expansion-panel expand focusable>
      <v-expansion-panel-header>Storage</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row>
          <v-col>
            <v-autocomplete
              :items="volumeSnapshotLocation"
              v-model="form.volumeSnapshotLocations"
              label="volumeSnapshotLocations"
              multiple
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.ttl"
                  label="Ttl"
                  required
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="form.ttl"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col>
            <v-autocomplete
              :items="backupStorageLocation"
              label="Storage Location"
              v-model="form.backupStorageLocation"
              required
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel expand focusable>
      <v-expansion-panel-header>Rules</v-expansion-panel-header>
      <v-expansion-panel-content>
        <SwitchNamespace v-model="form.namespace" />
        <SwitchRessource v-model="form.ressource" />

        <v-row>
          <v-col>
            <DataTableLabelSelectorExpression v-model="form.label" />
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel expand focusable v-for="item in hooks" :key="item.id">
      <v-expansion-panel-header v-if="item.name"
        >Hook - {{ item.name }}</v-expansion-panel-header
      >
      <v-expansion-panel-header v-else>Hook</v-expansion-panel-header>
      <v-expansion-panel-content>
        <Hooks :item="(hooks[0] = {})" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import DataTableLabelSelectorExpression from "@/components/DataTableLabelSelectorExpression";
import SwitchNamespace from "@/components/SwitchNamespace";
import SwitchRessource from "@/components/SwitchRessource";
import Hooks from "@/components/Hooks";
export default {
  components: {
    DataTableLabelSelectorExpression,
    SwitchNamespace,
    SwitchRessource,
    Hooks
  },
  props: {
    form: {
      type: Object,
      required: true
    },
    hooks: {
      type: Array,
      required: true
    }
  }
};
</script>

<style></style>
