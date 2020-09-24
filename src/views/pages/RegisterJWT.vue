<template>
  <div class="clearfix">
    <vs-input
      v-validate="'required|alpha_dash|min:3'"
      data-vv-validate-on="blur"
      label-placeholder="Имя"
      name="name"
      placeholder="Имя"
      v-model="name"
      class="w-full" />
    <span class="text-danger text-sm"></span>

    <vs-input
      v-validate="'required|email'"
      data-vv-validate-on="blur"
      name="email"
      type="email"
      label-placeholder="Email"
      placeholder="Email"
      v-model="email"
      class="w-full mt-6" />
    <span class="text-danger text-sm"></span>

    <vs-input
      ref="password"
      type="password"
      data-vv-validate-on="blur"
      v-validate="'required|min:6|max:10'"
      name="password"
      label-placeholder="Пароль"
      placeholder="Пароль"
      v-model="password"
      class="w-full mt-6" />
    <span class="text-danger text-sm"></span>

    <vs-input
      type="password"
      v-validate="'min:6|max:10|confirmed:password'"
      data-vv-validate-on="blur"
      data-vv-as="password"
      name="confirm_password"
      label-placeholder="Повторить пароль"
      placeholder="Повторить пароль"
      v-model="confirm_password"
      class="w-full mt-6" />
    <span class="text-danger text-sm"></span>

    <!-- <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6">I accept the terms & conditions.</vs-checkbox> -->
    <router-link :to="{name:'login'}"><vs-button  type="border" to="/login" class="mt-6">Вход</vs-button></router-link>
    <vs-button class="float-right mt-6" @click="registerUserJWt" :disabled="!validateForm">Регистарция</vs-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      isTermsConditionAccepted: true
    }
  },
  computed: {
    validateForm () {
      return this.name !== '' && this.email !== '' && this.password !== '' && this.confirm_password !== '' && this.isTermsConditionAccepted === true
    }
  },
  methods: {
    registerUserJWt () {
      // If form is not validated or user is already login return
      if (!this.validateForm) return
      this.$store.dispatch('auth/REGISTER', this)
    }
  }
}
</script>
