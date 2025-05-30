import { AuthPage } from "@refinedev/antd";
import { authCredientials } from "../../providers";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: authCredientials,
      }}
    />
  );
};
