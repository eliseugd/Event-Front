import cookie from "vue-cookie";
// import bus from "@/utils/events/bus";

export const login = (token = "", user = {}) => {
    cookie.set("token", token, 365);
    cookie.set("user", JSON.stringify(user), 365);
    window.location.href = "/";
};

export const reLogin = (token = "", user = {}, ) => {
    cookie.set("token", token, 365);
    cookie.set("user", JSON.stringify(user), 365);

    location.reload();
};

export const lockScreen = () => {
    cookie.delete("token");
    cookie.delete("user");
};

export const logoff = () => {
    cookie.delete("token");
    cookie.delete("user");
    window.location.href = "/";
};

export const isAuthenticated = () => {
    var tokenCookie = cookie.get("token");
    var userCookie = cookie.get("user");

    if (tokenCookie == undefined || userCookie == undefined) {
        return false;
    } else {
        return true;
    }
};

export const validateSession = () => {;
    var token = cookie.get("token");
    var user = cookie.get("user");

    if (token == null || token == "" || user == null || user == "") {
        logoff();
    }

};

export const getUser = () => {
    var user = cookie.get("user");

    return user;
};