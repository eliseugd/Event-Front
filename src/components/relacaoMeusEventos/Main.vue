<template>
  <div>
    <section class="row">
      <div class="col-md-6 col-lg-4 title-component text-left">
        <h2>Eventos que estou participando</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Evento</th>
              <th>Data</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(event, index) in eventsParticipation" :key="index">
              <td>{{ event.name_event }}</td>
              <td>{{ event.date }}</td>
              <td>
                <div class="div-btn-event">
                  <button
                    class="btn btn-error"
                    @click="cancelParticipation(event)"
                  >
                    Cancelar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6 col-lg-4 title-component text-left">
        <h2>Convites pendentes</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Evento</th>
              <th>Data</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(event, index) in eventsPending" :key="index">
              <td>{{ event.name_event }}</td>
              <td>{{ event.date }}</td>
              <td>
                <div class="div-btn-event">
                  <button
                    class="btn btn-error"
                    @click="aprovarParticipation(event)"
                  >
                    Aprovar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6 col-lg-4 title-component text-left">
        <h2>Meus eventos</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Evento</th>
              <th>Data</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(event, index) in myEvents" :key="index">
              <td>{{ event.name }}</td>
              <td>{{ event.date }}</td>
              <td>
                <div class="div-btn-event" v-if="event.status == 'A'">
                  <button
                    class="btn btn-error"
                    @click="cancelParticipation(event)"
                  >
                    Cancelar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
<script>
import * as axios from "@/Axios.js";
import * as Account from "@/Account";
export default {
  data() {
    return {
      eventsParticipation: [],
      eventsPending: [],
      myEvents: [],
    };
  },
  methods: {
    getEventsParticipation() {
      var user = Account.getUser();
      user = JSON.parse(user);

      axios
        .connection()
        .post("/user-event/search/", {
          id_user: user.id,
          participation_situation: "A",
        })
        .then((response) => {
          if (response) {
            this.eventsParticipation = response.data;
          } else {
            this.eventsParticipation = [];
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getEventsPending() {
      var user = Account.getUser();
      user = JSON.parse(user);

      axios
        .connection()
        .post("/user-event/search/", {
          id_user: user.id,
          participation_situation: "P",
        })
        .then((response) => {
          if (response) {
            this.eventsPending = response.data;
          } else {
            this.eventsPending = [];
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getMyEvents() {
      var user = Account.getUser();
      user = JSON.parse(user);

      axios
        .connection()
        .post("/events-search/", {
          id_user: user.id,
        })
        .then((response) => {
          if (response) {
            this.myEvents = response.data;
          } else {
            this.myEvents = [];
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    aprovarParticipation(dados) {
      axios
        .connection()
        .post("user-event/aprovar/", { id_user_event: dados.id_user_event })
        .then((response) => {
          if (response) {
            this.getEventsParticipation();
            this.getEventsPending();
          }
        })
        .catch((error) => {});
    },
    cancelParticipation(dados) {
      axios
        .connection()
        .post("user-event/cancel/", {
          id_event: dados.id_event ? dados.id_event : dados.id,
        })
        .then((response) => {
          if (response) {
            this.getEventsParticipation();
            this.getEventsPending();
            this.getMyEvents();
          }
        })
        .catch((error) => {});
    },
  },
  created() {
    this.getEventsParticipation();
    this.getEventsPending();
    this.getMyEvents();
  },
};
</script>
<style scoped>
thead {
  font-size: 14px;
}
tbody {
  font-size: 12px;
}
tbody button {
  font-size: 12px;
  background: #ddd;
}
</style>