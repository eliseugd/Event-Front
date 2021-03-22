<template>
  <b-modal id="modal-1" v-model="showModalLogin" title="Login">
    <div class="container">
      <div class="col-12 form-group user">
        <label for="#input-user">Usuário</label>
        <input
          type="text"
          name="input-user"
          id="input-user"
          class="form-control"
          v-model="user"
        />
      </div>
      <div class="col-12 form-group password">
        <label for="#input-password">Senha</label>
        <input
          type="password"
          name="input-password"
          id="input-password"
          class="form-control"
          v-model="password"
        />
      </div>
      <span v-if="messageErro" class="col-12">Usuario ou senha inválido</span>
    </div>
    <template #modal-footer>
      <div>
        <b-button variant="primary" class="float-right" @click="startLogin">
          Entrar
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import * as Account from "@/Account";
import * as axios from "@/Axios.js";
export default {
  data() {
    return {
      user: "",
      password: "",
      messageErro: false,
    };
  },
  computed: {
    showModalLogin: {
      // getter
      get: function () {
        return this.showModal;
      },
      // setter
      set: function (newValue) {
        this.$emit("editShowModal", newValue);
      },
    },
  },
  props: {
    showModal: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    startLogin() {
      if (this.user != "" && this.password != "") {
        axios
          .connection()
          .post("/signin/", { user: this.user, password: this.password })
          .then((response) => {
            if (response.data.error == 0) {
              const token = response.data.token;
              const user = response.data.user;

              Account.login(token, user);
            } else {
              console.error(response);
              this.showMessageError();
            }
          })
          .catch((error) => {
            console.error(error);
            this.showMessageError();
          });
      } else {
        alert("Favor preencher Usuário e Senha");
      }
    },
    showMessageError() {
      var that = this;
      this.messageErro = true;
      setTimeout(function () {
        that.messageErro = false;
      }, 3000);
    },
  },
};
</script>
<style scoped>
</style>