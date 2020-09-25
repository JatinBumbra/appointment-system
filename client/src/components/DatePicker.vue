<template>
  <v-date-picker
    :show-current="false"
    :min="min"
    :disabled="loading"
    @change="setSlots"
    width="100%"
  >
  </v-date-picker>
</template>

<script>
export default {
  name: "DatePicker",
  props: {
    min: String,
    loading: Boolean,
    setSlots: Function,
  },
};
</script>
