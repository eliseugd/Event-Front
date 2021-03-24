<template>
  <b-modal id="modal-1" v-model="showModalEvent" title="Evento">
    <div class="row">
      <div class="col-md-12 form-group name">
        <label for="#input-name">Nome</label>
        <input
          type="text"
          name="input-name"
          id="input-name"
          class="form-control"
          v-model="dados.name"
          disabled
        />
      </div>
      <div class="col-md-6 form-group date">
        <label for="#input-date">Data</label>
        <input
          type="date"
          name="input-date"
          id="input-date"
          class="form-control"
          v-model="dados.date"
          disabled
        />
      </div>
      <div class="col-md-6 form-group category">
        <label for="#input-category">Categoria</label>
        <select
          name="input-category"
          id="input-category"
          class="form-control"
          v-model="dados.category"
          disabled
        >
          <option value="">Selecionar</option>
          <option
            :value="category.id"
            v-for="(category, index) in categories"
            :key="index"
          >
            {{ category.description }}
          </option>
        </select>
      </div>
      <div class="col-md-12 form-group description">
        <label for="#input-email">Descrição</label>
        <textarea
          type="text"
          name="input-description"
          id="input-description"
          class="form-control"
          maxlength="255"
          v-model="dados.description"
          disabled
        />
      </div>
    </div>
    <!-- <div class="row border-top" style="padding-top: 10px">
      <div class="col-md-12">
        <h3>Convidar usuários para o evento</h3>
      </div>
      <div class="col-md-8 form-group">
        <label for="insert-user">Usuário</label>
        <select
          name="insert-user"
          class="form-control"
          id="insert-user"
          v-model="user"
        >
          <option value="">Selecione</option>
          <option
            :value="user.id"
            v-for="(user, index) in activeUsers"
            :key="index"
          >
            {{ user.username }}
          </option>
        </select>
      </div>
      <div class="col-md-4 form-group">
        <button
          class="btn btn-success"
          style="margin-top: 23px"
          @click="addUserInviteEvent"
        >
          Adicionar
        </button>
      </div>
      <div class="col-md-12">
        <table class="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Usuario</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in usersInvite" :key="index">
              <td>{{ user.name }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> -->
    <template #modal-footer>
      <div></div>
    </template>
  </b-modal>
</template>
<script>
import * as axios from "@/Axios.js";
import * as Account from "@/Account";
export default {
  data() {
    return {
      dados: {
        name: "",
        date: "",
        description: "",
        category: "",
      },
      categories: [],
      users: [],
      user: "",
      usersInvite: [],
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
    dados: {
      default: null,
    },
  },
  computed: {
    getUser: function () {
      return JSON.parse(Account.getUser());
    },
    activeUsers: function () {
      return this.users.filter(function (u) {
        var user = JSON.parse(Account.getUser());
        return u.id != user.id;
      });
    },
    showModalEvent: {
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
    async registerEvent() {
      var that = this;

      var campos_vazios = [];
      $.each(this.dados, function (key, value) {
        if (value == "") {
          campos_vazios.push(key);
        }
      });

      if (campos_vazios.length <= 0) {
        await axios
          .connection()
          .post("/events/", this.dados)
          .then((response) => {
            if (response.data.error == 0) {
              //REGISTRA OS USUARIOS CONVIDADOS PARA O EVENTO
              if (that.usersInvite.length > 0) {
                axios
                  .connection()
                  .post("/user-event/", {
                    usersInvite: that.usersInvite,
                    id_event: response.data.data.id,
                  })
                  .then((response) => {
                    if (response.data.error == 0) {
                      that.$emit("eventRegisterSuccess");
                      this.flashMessage.success({
                        time: 5000,
                        title: "Evento registrado com sucesso",
                        icon: true,
                      });
                    } else {
                      this.flashMessage.warning({
                        time: 5000,
                        title: "Erro ao registrar CONVITES",
                        message:
                          "Ocorreu um erro ao tentar salvar os CONVITES do seu evento",
                      });
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              } else {
                that.$emit("eventRegisterSuccess");

                this.flashMessage.success({
                  time: 5000,
                  title: "Evento registrado com sucesso",
                  icon: true,
                });
              }
            } else {
              this.flashMessage.error({
                time: 5000,
                title: "Erro ao registrar EVENTO",
                message:
                  "Ocorreu um erro ao registrar seu evento, tente novamente mais tarde ou entre em contato com o suporte",
              });
            }
          })
          .catch((error) => {
            this.flashMessage.error({
              time: 5000,
              title: "Erro ao registrar EVENTO",
              message:
                "Ocorreu um erro ao registrar seu evento, tente novamente mais tarde ou entre em contato com o suporte",
            });
          });
      } else {
        this.flashMessage.info({
          time: 5000,
          title: "Preencha todos os campos",
        });
      }
    },
    addUserInviteEvent() {
      var that = this;
      var userAdd = "";

      $.each(this.users, function (index, user) {
        if (that.user == user.id) {
          userAdd = user;
        }
      });
      if (userAdd != "" && $.inArray(userAdd, this.usersInvite) < 0) {
        this.usersInvite.push(userAdd);
      }
    },
    getUsers() {
      axios
        .connection()
        .get("/users/")
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error(error);
          this.users = [];
        });
    },
    getCategories() {
      axios
        .connection()
        .get("/category-event/")
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.error(error);
          this.users = [];
        });
    },
  },
  created() {
    this.getUsers();
    this.getCategories();
  },
};
</script>
<style scoped>
textarea {
  resize: none;
}
</style>