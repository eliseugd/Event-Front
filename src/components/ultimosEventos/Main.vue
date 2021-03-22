<template>
  <div>
    <section class="row">
      <div class="col-12 title-component text-left">
        <h2>Últimos eventos adicionados</h2>
      </div>
      <tag-event
        v-for="(event, index) in events"
        :key="'event-' + index"
        class="col-md-3"
        :title="event.name"
        :description="event.description"
        :date="event.date"
        textBtn="PARTICIPAR"
      ></tag-event>
    </section>
  </div>
</template>
<script>
import TagEvent from "@/components/tagEvent/Main.vue";
import * as axios from "@/Axios.js";
export default {
  data() {
    return {
      events: [],
    };
  },
  components: {
    TagEvent,
  },
  methods: {
    getLastEvents() {
      axios
        .connection()
        .post("/events-search/", { limit: 4 })
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
    this.getLastEvents();
  },
};
</script>
<style scoped>
</style>