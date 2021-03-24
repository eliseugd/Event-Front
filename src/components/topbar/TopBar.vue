<template>
  <div>
    <div class="top-bar" v-if="!verifyUser">
      <div class="container">
        <a href="#" class="top-bar-option" @click="loginClick()">ENTRAR</a>
        <button class="top-bar-option btn" @click="registerClick()">
          CADASTRAR
        </button>
      </div>
    </div>
    <div class="top-bar" v-if="verifyUser">
      <div class="container">
        <router-link :to="{ name: 'Home' }" class="top-bar-option"
          >EVENTOS</router-link
        >
        <router-link
          :to="{ name: 'EventosParticipantes' }"
          class="top-bar-option"
          >EVENTOS PARTICIPANTES</router-link
        >
        <router-link :to="{ name: 'ConvitesEventos' }" class="top-bar-option"
          >CONVITES EVENTOS</router-link
        >
        <router-link :to="{ name: 'MeusEventos' }" class="top-bar-option"
          >MEUS EVENTOS</router-link
        >
        <a href="#" class="top-bar-option" @click="registerEvent()"
          >CADASTRAR EVENTO</a
        >
        <button class="top-bar-option btn" @click="logoff()">SAIR</button>
      </div>
    </div>
  </div>
</template>
<script>
import * as Account from "@/Account";
export default {
  data() {
    return {};
  },
  computed: {
    verifyUser() {
      return Account.isAuthenticated();
    },
  },
  methods: {
    loginClick() {
      this.$emit("loginClick");
    },
    registerClick() {
      this.$emit("registerClick");
    },
    logoff() {
      Account.logoff();
    },
    registerEvent() {
      this.$emit("registerEvent");
    },
  },
};
</script>
<style scoped>
.top-bar {
  background-color: #8129ff;
  width: 100%;
  height: 70px;
  padding: 20px 0;
  text-align: right;
}

.top-bar .top-bar-option {
  color: #fff;
  text-decoration: none;
  font-size: 12px;
  margin-right: 20px;
  transition: 0.5s;
  height: 30px;
}

.top-bar .top-bar-option.btn {
  border: 1px solid #fff;
  padding: 5px 10px;
  letter-spacing: 2px;
  margin-right: 0;
}

.top-bar .top-bar-option.btn:hover {
  color: #8129ff;
  background-color: #fff;
}
</style>