<template>
    <div class="h-screen flex w-full bg-img">
        <div class="vx-col sm:w-3/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
            <vx-loading :loading="loading">
                <vx-card>
                    <div slot="no-body" class="full-page-bg-color">
                        <div class="vx-row">
                            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                                <img src="@/assets/images/pages/reset-password.png" alt="login" class="mx-auto">
                            </div>
                            <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg">
                                <div class="p-8">
                                    <div class="vx-card__title mb-8">
                                        <h4 class="mb-4">Сброс пароля</h4>
                                        <p>Пожалуйста, введите ваш новый пароль.</p>
                                    </div>
                                    <div class="vx-col mb-base">
                                        <vs-input type="email" label-placeholder="Email" v-model="email" v-validate="'required|email'" class="w-full"  name="email"/>
                                        <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
                                    </div>
                                    <div class="vx-col mb-base">
                                        <vs-input type="password" name="password" v-model="password" label-placeholder="Новый пароль"
                                                  ref="password"  v-validate="{required: true,min:6}" class="w-full" />
                                        <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>
                                    </div>
                                    <div class="vx-col mb-base">
                                        <vs-input type="password"  v-validate="'required|min:6|confirmed:password'" data-vv-as="password_confirm"
                                                  name="password_confirm" label-placeholder="Подтвердите пароль" v-model="password_comfirm" class="w-full" />
                                        <span class="text-danger text-sm" v-show="errors.has('password_confirm')">{{ errors.first('password_confirm') }}</span>
                                    </div>
                                    <div class="flex flex-wrap justify-between flex-col-reverse sm:flex-row">
                                        <vs-button type="border" to="/pages/login" class="w-full sm:w-auto mb-8 sm:mb-auto mt-3 sm:mt-auto">Назад</vs-button>
                                        <vs-button class="w-full sm:w-auto" @click="resetPassword()">Сбросить</vs-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </vx-card>
            </vx-loading>
        </div>
    </div>
</template>

<script>
    import { Validator } from 'vee-validate';
    const dict = {
        custom: {
            password: {
                required: "Поле 'Новый пароль' обязательно для заполнения.",
                min: "Поле 'Новый пароль' должно быть не менее 6 символов.",
                regex: 'Пароль должен содержать символы хотя бы из 3 следующих категорий: ' +
                    '1. Латинские буквы в верхнем регистре (A-Z). ' +
                    '2. Латинские буквы в нижнем регистре (a-z). ' +
                    '3. Цифры (0-9).  ' +
                    '4. Символы (например, !, $, #, или %). ' +
                    '5. Символы Unicode'
            },
            password_confirm: {
                required: "Поле 'Подтвердите Пароль' обязательно для заполнения.",
                min: "Поле 'Поле 'Новый пароль' должно быть не менее 6 символов.",
                confirmed: "Поле 'Подтвердите Пароль' не совпадает с 'Новый пароль'.",
            },
        }
    };
    Validator.localize('ru', dict);

    export default {
        data() {
            return {
                email: this.$route.params.email,
                password: '',
                password_comfirm: '',
                loading: false
            }
        },
        methods: {
            resetPassword() {
                const self = this;
                self.$validator.validateAll().then(result => {
                    if (result) {
                        self.loading = true;
                        const data = {
                            email: self.email,
                            password: self.password,
                            reset_password_token: self.$route.params.token
                        };
                        self.$http.post('/auth/reset_password', data).then(function () {
                            self.$vs.notify({
                                title: 'Урааа',
                                text: 'Поздравляем! Ваш пароль успешно сменён. При следущем входе в кабинет вам потребуется ввести новый установленный пароль.)',
                                color: 'success',
                                iconPack: 'feather',
                                position: 'top-center',
                                icon: 'icon-alert-circle'
                            });
                            self.$router.push('/login');
                        }).catch((error) => {
                            self.loading = false;
                            if (error.response.status === 422) {
                                for (let key in error.response.data.errors) {
                                    for (let index in error.response.data.errors[key]) {
                                        self.$vs.notify({
                                            title: 'ООО НЕТ',
                                            text: error.response.data.errors[key][index],
                                            color: 'warning',
                                            iconPack: 'feather',
                                            position: 'top-center',
                                            icon: 'icon-alert-circle'
                                        })
                                    }
                                }
                                self.loading = false;
                            } else {
                                this.$vs.notify({
                                    title: 'Что-то пошло не так((',
                                    text: 'Кажется что-то пошло не так. повторите попытку позже.',
                                    color: 'warning',
                                    iconPack: 'feather',
                                    position: 'top-center',
                                    icon: 'icon-alert-circle'
                                })
                            }
                        });
                    }
                });
            },
        },
    }
</script>
