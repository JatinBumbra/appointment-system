<template>
  <v-dialog v-model="dialog" persistent max-width="700px">
    <v-card>
      <v-card-text>
        <v-row>
          <v-btn
            class="darken-2 subtitle-1 blue--text text--lighten-5"
            color="red"
            :ripple="true"
            @click="handleClose"
            absolute
            right
            top
          >
            Close
          </v-btn>
        </v-row>
        <v-row class="mt-5">
          <v-col class="mt-5" lg="6">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="start_date"
                  label="Select Start Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                :min="min"
                v-model="start_date"
                @input="setEvents"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col class="mt-5" lg="6">
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
                  v-model="end_date"
                  label="Select End Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                :min="start_date"
                v-model="end_date"
                @input="setEvents"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <div v-if="loading" class="text-center mb-5">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
        <v-row
          v-if="events.length"
          class="blue darken-2 blue--text text--lighten-5"
        >
          <v-col lg="3">Date</v-col>
          <v-col lg="7">Events</v-col>
        </v-row>
        <v-row v-for="(event, index) in events" :key="index">
          <v-col lg="3">{{ event.date }}</v-col>
          <v-col lg="7">
            <span v-for="(event, index) in event.events.events" :key="index">
              {{ event.slice(-9) }},
            </span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Events",
  data: () => ({
    min: new Date().toISOString().slice(0, 10),
    menu: false,
    menu2: false,
    start_date: null,
    end_date: null,
    loading: false,
    events: [],
  }),
  props: {
    dialog: Boolean,
    setModal: Function,
  },
  methods: {
    handleClose() {
      this.setModal();
      this.start_date = this.end_date = null;
      this.events = [];
    },
    async setEvents() {
      this.menu = false;
      this.menu2 = false;
      if (!this.start_date || !this.end_date) return;
      this.loading = true;
      try {
        const res = await fetch("/getevents", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            start_date: this.start_date,
            end_date: this.end_date,
          }),
        });
        const data = await res.json();
        // Check for server error
        if (res.status == 500) this.setAlert(data.msg, "error");
        this.events = data.data;
      } catch (error) {
        this.setAlert("Unable to connect", "error");
        console.log(error);
      }
      this.loading = false;
    },
  },
};
</script>