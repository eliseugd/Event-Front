<template>
  <div id="app">
    <top-bar
      @loginClick="showModalLogin = true"
      @registerClick="showModalRegister = true"
      @registerEvent="showModalRegisterEvent = true"
      class="top-bar"
    ></top-bar>
    <FlashMessage
      position="left top"
      time="5000"
      strategy="multiple"
      group="hints"
    ></FlashMessage>
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
import TopBar from "@/components/topbar/TopBar.vue";
import LoginModal from "@/components/loginModal/Login.vue";
import RegisterModal from "@/components/registerModal/Register.vue";
import RegisterEventModal from "@/components/registerEventModal/RegisterEvent.vue";

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

._vue-flash-msg-body {
  z-index: 10000;
  max-width: 300px;
  right: 20px;
  left: unset !important;
}
._vue-flash-msg-body ._vue-flash-msg-body__content {
  padding: 10px;
  font-size: 11px;
}
._vue-flash-msg-body ._vue-flash-msg-body__content .heading {
  font-weight: 800;
}
._vue-flash-msg-body ._vue-flash-msg-body__content ._vue-flash-msg-body__text {
}
</style>
