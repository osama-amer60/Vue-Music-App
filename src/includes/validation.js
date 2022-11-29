import {
  Form as veeForm,
  Field as veeField,
  defineRule,
  ErrorMessage,
} from "vee-validate";
import {
  required,
  min,
  max,
  alpha_spaces,
  email,
  min_value,
  max_value,
  confirmed,
  not_one_of as excluded
} from "@vee-validate/rules";

export default {
  install(app) {
    app.component("veeForm", veeForm), app.component("veeField", veeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("alpha_spaces", alpha_spaces);
    defineRule("email", email);
    defineRule("min_value", min_value);
    defineRule("max_value", max_value);
    defineRule("confirmed", confirmed);
    defineRule('excluded',excluded)
  },
};
