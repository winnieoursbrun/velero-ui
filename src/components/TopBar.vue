<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Velero Logo"
        class="shrink mr-2"
        contain
        src="@/assets/velero.svg"
        transition="scale-transition"
        width="200"
      />
    </div>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style>
.svg_white:svg {
  fill: white;
}
</style>
