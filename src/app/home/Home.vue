<template>
  <div>
    <eventos class="section"></eventos>
  </div>
</template>
<script>
import * as Account from "@/Account";
import Eventos from "@/components/todosEventos/Eventos.vue";
export default {
  components: {
    Eventos,
  },
  computed: {
    verifyUser() {
      return Account.isAuthenticated();
    },
  },
};
</script>
<style scoped>
.top-page {
  width: 100%;
  height: 200px;
  border-radius: 10px;
  padding: 14px 0;
  overflow: hidden;
}

.top-page img {
  width: 100%;
  object-fit: cover;
}
</style>