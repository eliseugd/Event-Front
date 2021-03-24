<template>
  <div>
    <div class="container">
      <section class="row">
        <div class="col-12 title-component text-left">
          <h2>Convites eventos</h2>
        </div>
        <div v-if="events == null || events.length > 0" class="col-12">
          <div class="row">
            <tag-event
              v-for="(event, index) in events"
              :key="'my-event-' + index"
              :title="event.name_event"
              :description="event.description"
              :date="event.date"
              textBtn="PARTICIPAR"
              @clickButton="aprovarParticipation(event)"
            ></tag-event>
          </div>
        </div>
        <div class="col-12" v-else>
          <h3>No momento não há convites pendentes de aprovação</h3>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import * as axios from "@/Axios.js";
import * as Account from "@/Account";
import TagEvent from "@/components/tagEvent/TagEvent.vue";
export default {
  data() {
    return {
      events: null,
    };
  },
  components: {
    TagEvent,
  },
  methods: {
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
            this.events = response.data;
          } else {
            this.events = [];
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
            this.getEventsPending();
          }
        })
        .catch((error) => {});
    },
  },
  created() {
    this.getEventsPending();
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