<template>
  <div id="app">
    <top-bar
      @loginClick="showModalLogin = true"
      @registerClick="showModalRegister = true"
      @registerEvent="showModalRegisterEvent = true"
      class="top-bar"
    ></top-bar>
    <!-- Modal para realizar Login -->
    <login-modal
      :showModal="showModalLogin"
      @editShowModal="editShowModalLogin"
      v-if="showModalLogin"
    ></login-modal>
    <!-- Modal para registrar um novo Usuário -->
    <register-modal
      :showModal="showModalRegister"
      @editShowModal="editShowModalRegister"
      v-if="showModalRegister"
      @userCreatedSuccess="
        {
          (showModalRegister = false), (showModalLogin = true);
        }
      "
    ></register-modal>
    <!-- Modal para registrar um novo evento -->
    <register-event-modal
      :showModal="showModalRegisterEvent"
      v-if="showModalRegisterEvent"
      @editShowModal="editShowModalRegisterEvent"
      @eventRegisterSuccess="
        {
          showModalRegisterEvent = false;
        }
      "
    ></register-event-modal>
    <div class="container app">
      <router-view />
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/topbar/Main.vue";
import LoginModal from "@/components/loginModal/Main.vue";
import RegisterModal from "@/components/registerModal/Main.vue";
import RegisterEventModal from "@/components/registerEventModal/Main.vue";

export default {
  name: "App",
  data() {
    return {
      showModalLogin: false,
      showModalRegister: false,
      showModalRegisterEvent: false,
    };
  },
  components: {
    TopBar,
    LoginModal,
    RegisterModal,
    RegisterEventModal,
  },
  methods: {
    editShowModalLogin(newValue) {
      this.showModalLogin = newValue;
    },
    editShowModalRegister(newValue) {
      this.showModalRegister = newValue;
    },
    editShowModalRegisterEvent(newValue) {
      this.showModalRegisterEvent = newValue;
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.app {
  margin-top: 70px;
}
.top-bar {
  position: fixed;
  top: 0;
  z-index: 100;
}
</style>
