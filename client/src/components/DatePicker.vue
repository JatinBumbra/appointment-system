<template>
  <div>
    <v-date-picker
      :show-current="false"
      :min="min"
      :disabled="loading"
      @change="setDate"
      width="100%"
    >
    </v-date-picker>
    <div class="mt-5">
      <v-select
        outlined
        :value="timezone"
        :items="items"
        :disabled="!date && true"
        @change="setTimezone"
        label="Select Timezone"
      ></v-select>
    </div>
    <div>
      <v-btn
        class="darken-2 subtitle-1 blue--text text--lighten-5"
        color="blue"
        :ripple="true"
        :disabled="(!date && true) || (!timezone && true)"
        :loading="loading"
        @click="setSlots"
        >Search
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "DatePicker",
  data: () => ({
    items: [
      "Asia/Kolkata",
      "America/New_York",
      "Australia/Sydney",
      "Asia/Tokyo",
      "Europe/London",
    ],
  }),
  props: {
    min: String,
    date: String,
    timezone: String,
    loading: Boolean,
    setSlots: Function,
    setDate: Function,
    setTimezone: Function,
  },
};
</script>
