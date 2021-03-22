<template>
  <div>
    <ultimos-eventos class="section"></ultimos-eventos>
    <meus-eventos class="section" v-if="verifyUser"></meus-eventos>
  </div>
</template>
<script>
import * as Account from "@/Account";
import UltimosEventos from "@/components/ultimosEventos/Main.vue";
import MeusEventos from "@/components/relacaoMeusEventos/Main.vue";
export default {
  components: {
    UltimosEventos,
    MeusEventos,
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