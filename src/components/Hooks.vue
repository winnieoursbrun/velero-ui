<template>
  <v-card>
    <v-row>
      <v-col>
        <v-text-field label="Name" v-model="item.name" required></v-text-field>
      </v-col>
    </v-row>
    <SwitchNamespace v-model="item.namespace" />
    <SwitchRessource v-model="item.ressource" />
    <v-row>
      <v-col>
        <DataTableLabelSelectorExpression v-model="item.label" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-tabs v-model="tab" background-color="primary" grow>
            <v-tab>Pre</v-tab>
            <v-tab>Post</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <DataTableCommand :item="(item.commands = [])" />
            </v-tab-item>

            <v-tab-item>
              <DataTableCommand :item="(item.commands = [])" />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import DataTableCommand from "@/components/DataTableCommand";
import DataTableLabelSelectorExpression from "@/components/DataTableLabelSelectorExpression";
export default {
  data() {
    return {
      tab: 0
    };
  },
  components: {
    DataTableCommand,
    DataTableLabelSelectorExpression
  },
  props: {
    item: {
      required: true
    }
  }
};
</script>

<style></style>
