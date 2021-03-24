<template>
  <b-modal id="modal-1" v-model="showModalRegister" title="Registrar">
    <!-- <flash-message class="myCustomClass"></flash-message> -->
    <div class="row">
      <div class="col-md-12 form-group user">
        <label for="#input-user">Usuário</label>
        <input
          type="text"
          name="input-user"
          id="input-user"
          class="form-control"
          v-model="dados.username"
        />
      </div>
      <div class="col-md-12 form-group email">
        <label for="#input-email">E-mail</label>
        <input
          type="text"
          name="input-email"
          id="input-email"
          class="form-control"
          v-model="dados.email"
        />
      </div>
      <div class="col-md-12 form-group name">
        <label for="#input-name">Nome completo</label>
        <input
          type="text"
          name="input-name"
          id="input-name"
          class="form-control"
          v-model="dados.name"
        />
      </div>
      <div class="col-md-6 form-group birth-date">
        <label for="#input-birth-date">Data de nascimento</label>
        <input
          type="date"
          name="input-birth-date"
          id="input-birth-date"
          class="form-control"
          v-model="dados.birth_date"
        />
      </div>
      <div class="col-md-6 form-group phone">
        <label for="#input-phone">Telefone</label>
        <input
          type="phone"
          name="input-phone"
          id="input-phone"
          class="form-control"
          v-model="dados.phone"
        />
      </div>
      <div class="col-md-12 form-group password">
        <label for="#input-password">Senha</label>
        <input
          type="password"
          name="input-password"
          id="input-password"
          class="form-control"
          v-model="dados.password"
        />
      </div>
    </div>
    <template #modal-footer>
      <div>
        <b-button
          variant="primary"
          class="float-right"
          @click="registerAccount"
        >
          Registrar
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import * as axios from "@/Axios.js";
// import axios from "axios";
export default {
  data() {
    return {
      dados: {
        username: "",
        email: "",
        password: "",
        name: "",
        phone: "",
        birth_date: "",
      },
      showAlertInvalid: "false",
      showBlackModal: "true",
      messageAlert: "",
    };
  },
  props: {
    showModal: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    showModalRegister: {
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
  methods: {
    registerAccount() {
      var campos_vazios = [];
      $.each(this.dados, function (key, value) {
        if (value == "") {
          campos_vazios.push(key);
        }
      });

      if (campos_vazios.length <= 0) {
        axios
          .connection()
          .post("/user-register/", this.dados)
          .then((response) => {
            if (response.data.error == 0) {
              this.flashMessage.success({
                time: 5000,
                title: "Usuário cadastrado com SUCESSO",
                message:
                  "Seu usuário foi cadastrado com sucesso, faça login para continuar",
              });
              this.$emit("userCreatedSuccess");
            } else {
              var messageError = response.data.message;
              if (messageError.includes("username_unique", 0)) {
                this.flashMessage.error({
                  time: 5000,
                  title: "Usuário já cadastrado",
                  message:
                    "O usuário que você deseja cadastrar é inválido pois outra pessoa já o cadastrou, tente outro por favor.",
                });
              } else if (messageError.includes("email_unique", 0)) {
                this.flashMessage.error({
                  time: 5000,
                  title: "E-mail já cadastrado",
                  message:
                    "Este e-mail já esta cadastrado em outro usuário, informe outro por favor",
                });
              } else {
                this.flashMessage.error({
                  time: 5000,
                  title: "Erro",
                  message:
                    "Ocorreu um erro, tente novamente mais tarde ou entre em contato com nosso suporte",
                });
              }
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        alert("Preencha todos os campos");
      }
    },
  },
};
</script>
<style scoped>
</style>