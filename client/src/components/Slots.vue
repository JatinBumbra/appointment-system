<template>
  <v-simple-table>
    <template v-slot:default>
      <thead class="blue darken-2">
        <tr>
          <th class="text-center subtitle-1 blue--text text--lighten-5">
            Available Slots (30 mins)
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <v-progress-linear
            color="blue darken-2"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </tr>
        <tr v-if="!date">
          <td>Please select a date.</td>
        </tr>
        <tr v-if="date && !timezone">
          <td>Please select a timezone.</td>
        </tr>
        <tr v-if="date && timezone && !slots.length">
          <td>Click Search to fetch all Available Slots.</td>
        </tr>
        <tr v-for="slot in slots" :key="slot">
          <td @click="setTime" class="text-center">{{ slot }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: 'Slots',
  props: {
    loading: Boolean,
    date: String,
    timezone: String,
    slots: Array,
    setTime: Function,
  },
};
</script>

<style scoped>
.v-data-table table tbody tr td {
  cursor: pointer;
}
</style>
