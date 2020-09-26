<template>
  <div>
    <div class="d-flex justify-space-between">
      <!-- Selected Date -->
      <v-simple-table>
        <template v-slot:default>
          <thead class="blue darken-2">
            <tr>
              <th class="text-center subtitle-1 blue--text text--lighten-5">
                Selected Date
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center">
              <td>{{ date ? date : "-" }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <!-- Selected Timezone -->
      <v-simple-table class="mx-2">
        <template v-slot:default>
          <thead class="blue darken-2">
            <tr>
              <th class="text-center subtitle-1 blue--text text--lighten-5">
                Selected Timezone
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center">
              <td>{{ timezone ? timezone : "-" }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <!-- Selected Time -->
      <v-simple-table>
        <template v-slot:default>
          <thead class="blue darken-2">
            <tr>
              <th class="text-center subtitle-1 blue--text text--lighten-5">
                Selected Time
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center">
              <td>{{ time ? time : "-" }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <!-- Buttons -->
    <div class="my-5 d-flex text-center">
      <v-btn
        class="darken-2 subtitle-1 blue--text text--lighten-5"
        color="green"
        :ripple="true"
        :disabled="!time || !date"
        :loading="loading"
        @click="bookSlot"
      >
        Book Slot
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        class="darken-2 subtitle-1 blue--text text--lighten-5"
        color="red"
        :ripple="true"
        @click="clearFields"
        :disabled="loading"
      >
        Cancel
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Display",
  props: {
    loading: Boolean,
    date: String,
    time: String,
    timezone: String,
    clearFields: Function,
    bookSlot: Function,
  },
};
</script>