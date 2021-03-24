<template>
  <div>
    <div class="container">
      <section class="row">
        <div class="col-12 title-component text-left">
          <h2>Meus eventos</h2>
        </div>
        <div v-if="events == null || events.length > 0" class="col-12">
          <div class="row">
            <tag-event
              v-for="(event, index) in events"
              :key="'my-event-' + index"
              :title="event.name"
              :description="event.description"
              :date="event.date"
              textBtn="CANCELAR EVENTO"
              :clickCardActive="true"
              @clickButton="cancelEvent(event)"
              @clickCard="clickCard(event)"
            ></tag-event>
          </div>
        </div>
        <div class="col-12" v-else>
          <h3>
            Você não registrou nenhum evento até o momento, tenten criar seu
            primeiro
          </h3>
        </div>
      </section>
    </div>
    <view-event :event="eventShow" v-if="eventShow"></view-event>
  </div>
</template>
<script>
import * as axios from "@/Axios.js";
import * as Account from "@/Account";
import TagEvent from "@/components/tagEvent/TagEvent.vue";
import ViewEvent from "@/components/viewEventModal/Event";
export default {
  data() {
    return {
      events: null,
      showModalEvent: false,
      eventShow: null,
    };
  },
  components: {
    TagEvent,
    ViewEvent,
  },
  methods: {
    getMyEvents() {
      var user = Account.getUser();
      user = JSON.parse(user);

      axios
        .connection()
        .post("/events/search", {
          id_user: user.id,
        })
        .then((response) => {
          if (response) {
            this.events = response.data;
          } else {
            this.events = [];
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    cancelEvent(dados) {
      axios
        .connection()
        .post("user-event/cancel/", {
          id_event: dados.id_event ? dados.id_event : dados.id,
        })
        .then((response) => {
          if (response) {
            this.getMyEvents();
          }
        })
        .catch((error) => {});
    },
    clickCard(dados) {
      this.showModalEvent = true;
      this.eventShow = dados;
    },
  },
  created() {
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