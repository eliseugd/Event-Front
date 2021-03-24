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

              this.flashMessage.success({
                time: 5000,
                title: "Login realizado com sucesso",
                icon: true,
              });

              Account.login(token, user);
            } else {
              // console.error(response, response.status, response.error);
            }
          })
          .catch((error) => {
            if (error.response.status == 401) {
              this.flashMessage.error({
                time: 5000,
                title: "Login inválido",
                message:
                  "Usuário ou senha inválidos, verifique e tente novamente",
              });
            }
          });
      } else {
        this.flashMessage.info({
          time: 5000,
          title: "Dados incompletos",
          message: "Favor preencher usuário e senha corretamente",
        });
      }
    },
  },
};
</script>
<style scoped>
</style>