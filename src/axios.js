import axios from 'axios'
import store from './store/store'
import router from './router'
import Vue from 'vue'

const apiUrl = process.env.VUE_APP_API_URL;

export default () => {

    const http = axios.create({
        baseURL: apiUrl,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    http.interceptors.request.use(config => {
        config.headers.Authorization = 'Bearer ' + store.getters['auth/getToken'];
        return config
    });

    http.interceptors.response.use(response => {
        // do some staff like notifications and others
        return response
    }, error => {
        // нет соединения с интернетом
        if (!error.response) {

            errorMessageNotification('Нет соединения с интернетом. Перезагрузите страницу', 'warning');

            // router.push('/no-internet-connection');
            console.log('NO INTERNET CONNECTION');
        }
        // когда неавторизован
        if (error.response.status === 401) {

            errorMessageNotification('Вы не авторизованы, выполните вход', 'danger');

            store.commit('auth/UNSET_TOKEN');
            router.push('/login');
        }

        // нет доступа
        if (error.response.status === 403 || error.response.data.message === 'Access Denied!') {

            if(error.response.data.invalidAccount) {
                errorMessageNotification(error.response.data.invalidAccount, 'warning');
                return;
            }

            const permissionName = error.response.data.permission ? error.response.data.permission : '';

            const text = 'У вас недостаточно прав: <br/>' + '<strong>' + permissionName + '</strong>';

            errorMessageNotification(text, 'warning');
        }

        return Promise.reject(error);
    });

    function errorMessageNotification(text, color, time) {

        if (typeof time === 'undefined') {
            time = 5000;
        }
        const notify = new Vue()
        notify.$vs.notify({
            title: 'О, нет...',
            text: text,
            color: color,
            time: time,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            position: 'top-center',
        });

    }

    Vue.prototype.$http = http
}
