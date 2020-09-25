<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-container>
        <v-toolbar-title>Appointment System</v-toolbar-title>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row v-if="alert" class="my-5">
          <v-alert :type="alert_type">
            {{ alert }}
          </v-alert>
        </v-row>
        <v-row class="mt-4">
          <v-col lg="6" align-self="start">
            <DatePicker :min="min" :setSlots="setSlots" :loading="loading" />
            <div class="py-5"></div>
            <Display
              class="my-5"
              :date="selected_date"
              :time="selected_time"
              :clearFields="clearFields"
              :bookSlot="bookSlot"
              :loading="loading"
            />
          </v-col>
          <v-col lg="5" offset-lg="1">
            <Slots :slots="slots" :loading="loading" :setTime="setTime" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import DatePicker from "./components/DatePicker";
import Slots from "./components/Slots";
import Display from "./components/Display";

export default {
  name: "App",
  components: {
    DatePicker,
    Slots,
    Display,
  },
  data: () => ({
    slots: [],
    selected_date: null,
    selected_time: null,
    loading: false,
    alert: null,
    alert_type: null,
    min: new Date().toISOString().slice(0, 10),
  }),
  methods: {
    // Set loading
    setLoading() {
      this.loading = !this.loading;
    },
    // Set time
    setTime(e) {
      this.selected_time = e.target.innerHTML;
    },
    // Clear fields
    clearFields() {
      this.selected_date = null;
      this.selected_time = null;
      this.slots = [];
    },
    // Set the alert
    setAlert(msg, type) {
      this.alert = msg;
      this.alert_type = type;
      setTimeout(() => {
        this.alert = null;
        this.alert_type = null;
      }, 3000);
    },
    // Set the slots
    async setSlots(selected_date) {
      this.setLoading();
      try {
        this.selected_date = selected_date;
        const res = await fetch("http://localhost:5000/freeslots", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ selected_date }),
        });
        const data = await res.json();
        // Check for server error
        if (res.status == 500) this.setAlert(data.msg, "error");
        else this.slots = [...data.data];
      } catch (error) {
        this.setAlert("Unable to connect", "error");
        this.clearFields()
      }
      this.setLoading();
    },
    // Book slot
    async bookSlot() {
      this.setLoading();
      try {
        const res = await fetch("http://localhost:5000/createevent", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            selected_date: this.selected_date,
            selected_time: this.selected_time,
          }),
        });
        const data = await res.json();
        // Check for server error
        if (res.status == 500) this.setAlert(data.msg, "error");
        else this.setAlert(data.msg, "success");
      } catch (error) {
        this.setAlert("Unable to connect", "error");
      }
      this.clearFields();
      this.setLoading();
    },
  },
};
</script>

<style>
.v-data-table,
.v-picker {
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
}
</style>