<template>
  <!-- Login Form -->
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="login_show_alert"
    :class="login_alert_variant"
  >
    {{ login_alert_msg }}
  </div>
  <vee-form :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <button
      :disabled="login_in_submission"
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { mapActions } from 'pinia';
import { useUserStore } from '../stores/user';


export default {
  name: "loginForm",
  data() {
    return {
      loginSchema: {
        email: "required|email",
        password: "required|min:3|max:100|excluded:password",
      },
      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: "bg-blue-500",
      login_alert_msg: "please wait ! your account is being created ",
    };
  },
  methods: {
    ...mapActions(useUserStore,['authenticate']),
    async login(value) {
      console.log(value);
      this.login_in_submission=true,
      this.login_show_alert=true

    try{
      await this.authenticate(value)
    }catch(error){
      this.login_in_submission=false;
      this.login_alert_variant= "bg-red-500";
      this.login_alert_msg = error.message;
      return;
    }

      this.login_alert_variant='bg-green-600'
      this.login_alert_msg=' success ! your account has been loged in'
    },
  },
};
</script>
