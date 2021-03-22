import { defaults, get } from "lodash";
import axios from "axios";
// import store from "./vuex";
import cookie from "vue-cookie";
import def from "@/../node_modules/axios/lib/defaults";
import * as Account from "./Account";
// import bus from "@/utils/events/bus";

export const CancelToken = () => {
    return axios.CancelToken;
};

export const connection = (options = {}) => {
    def.baseURL = 'http://127.0.0.1:8000';

    const instance = axios.create(defaults(def, options));

    //EXECUTADO ANTES DA REQUISIÇÃO NO SERVIDOR
    instance.interceptors.request.use(
        function(config) {
            // VERIFICANDO SE ESTÁ AUTENTICADO
            if (Account.isAuthenticated()) {
                config.url += "?token=" + cookie.get('token');
            }

            return config;
        },
        function(error) {
            console.error("erro antes da requisicao");

            return Promise.reject(error);
        }
    );

    //EXECUTADO DEPOIS DA REQUISIÇÃO NO SERVIDOR
    instance.interceptors.response.use(
        function(response) {
            if (response.data.error == 'TOKEN_INVALID') {
                Account.logoff();
            }
            const newtoken = get(response, "headers.authorization");
            if (newtoken) {
                cookie.set("token", newtoken, 365);
                var user = localStorage.setItem("token", newToken);
            }

            return response;
        },
        function(error) {
            if (error != "Cancel") {
                //bus.$emit('close-blackmodal');

                // switch (error.response.status) {
                //     case 401:
                //         Account.lockScreen();
                //         // bus.$emit('login-fail');
                //         break;
                //     case 400:
                //         Account.lockScreen();
                //         // bus.$emit('logoff');
                //         break;
                //     default:
                //         console.error(error.response);
                // }
            }

            return Promise.reject(error);
        }

    );

    return instance;
};