<template>
  <div>
    <section class="row">
      <div class="col-12 title-component text-left">
        <h2>Eventos</h2>
        <span>Cadastre-se e participe!</span>
      </div>
      <tag-event
        v-for="(event, index) in events"
        :key="'event-' + index"
        class="col-md-3"
        :title="event.name"
        :description="event.description"
        :date="event.date"
        :textBtn="verifyUser ? 'PARTICIPAR' : ''"
      ></tag-event>
    </section>
  </div>
</template>
<script>
import TagEvent from "@/components/tagEvent/TagEvent.vue";
import * as axios from "@/Axios.js";
import * as Account from "@/Account";
export default {
  data() {
    return {
      events: [],
    };
  },
  components: {
    TagEvent,
  },
  computed: {
    verifyUser() {
      return Account.isAuthenticated();
    },
  },
  methods: {
    getAllEvents() {
      var url = this.verifyUser ? "/user-event/available" : "/events-available";

      axios
        .connection()
        .get(url)
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
  },
  created() {
    this.getAllEvents();
  },
};
</script>
<style scoped>
.title-component h2 {
  margin-bottom: 0;
}
.title-component span {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
}
</style>