<template>
    <div class="h-screen flex w-full bg-img" >
        <div class="vx-col w-4/5 sm:w-4/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
                <vx-card>
                    <div slot="no-body" class="full-page-bg-color">
                        <div class="vx-row">
                            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                                <img src="@/assets/images/pages/forgot-password.png" alt="login" class="mx-auto">
                            </div>
                            <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
                                <div class="p-8">
                                    <div class="vx-card__title mb-8">
                                        <h4 class="mb-4">Восстановить пароль</h4>
                                        <p  v-if="inputVisibility">
                                            Пожалуйста, введите свой адрес электронной почты, и мы вышлем вам инструкции о том, как сбросить пароль.
                                        </p>
                                        <vs-alert color="success" icon-pack="feather" icon="icon-info" active="true" v-if="alertSuccess">
                                            <p>
                                                Мы отправили вам на почту инструкции по восстановлению пароля. Чтобы восстановить
                                                доступ к аккаунту, пройдите по ссылке из письма. Если этого письма нет во «Входящих»,
                                                пожалуйста, проверьте «Спам».
                                            </p>
                                        </vs-alert>

                                    </div>
                                    <div class="vx-col mb-base">
                                        <vs-input name="email" v-validate="'required|email'"
                                                  v-if="inputVisibility"
                                                  type="email" label-placeholder="Email"
                                                  v-model="email" class="w-full" />
                                        <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
                                    </div>

                                    <vs-button type="border" to="/login" class="px-4 w-full md:w-auto">Назад</vs-button>

                                    <vs-button v-if="inputVisibility" @click="forgotPassword()"
                                               class="float-right px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0">
                                        Восстановить пароль
                                    </vs-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </vx-card>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                email: '',
                inputVisibility: true,
                alertSuccess: false,
                loading: false
            }
        },
        methods: {
            forgotPassword() {
                const self = this;
                this.$validator.validateAll().then(result => {
                    if (result) {
                        self.loading = true;
                        self.$http.post('/auth/forgot_password', {email: this.email}).then(function () {
                            self.inputVisibility = false;
                            self.alertSuccess = true;
                            self.loading = false;
                        }).catch((error) => {
                            if (error.response.status === 422) {
                                for (let key in error.response.data.errors) {
                                    for (let index in error.response.data.errors[key]) {
                                        this.$vs.notify({
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

            }
        },
    }
</script>
