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
        <a href="#" class="top-bar-option" @click="registerEvent()"
          >Cadastrar Evento</a
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
  letter-spacing: 2px;
  font-size: 12px;
  margin-right: 15px;
  transition: 0.5s;
  height: 30px;
}

.top-bar .top-bar-option.btn {
  border: 1px solid #fff;
  padding: 5px 10px;
}

.top-bar .top-bar-option.btn:hover {
  color: #8129ff;
  background-color: #fff;
}
</style>