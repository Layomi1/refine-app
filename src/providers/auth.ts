import { AuthBindings } from "@refinedev/core";
import { API_URL, dataProvider } from "./data";

export const authCredentials = {
  email: "michael.scott@dundermifflin.com",
  password: "demodemo",
};

export const authProvider: AuthBindings = {
  login: async ({ email }: { email: String }) => {
    try {
      const { data } = await dataProvider.custom({
        url: API_URL,
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        meta: {
          variables: {
            email,
          },
          rawQuery: `
            mutation Login($email: String!) {
              login(loginInput: { email: $email }) {
                accessToken
              }
            }
          `,
        },
      });

      if (data?.login?.accessToken) {
        localStorage.setItem("access_token", data.login.accessToken);
        return {
          success: true,
          redirectTo: "/",
        };
      } else {
        throw new Error("No access token received");
      }
    } catch (error) {
      console.error("Login error:", error);

      return {
        success: false,
        error: new Error(
          error instanceof Error
            ? error.message
            : "Login failed. Please check your credentials."
        ),
      };
    }
  },

  logout: async () => {
    localStorage.removeItem("access_token");
    return {
      success: true,
      redirectTo: "/login",
    };
  },

  check: async () => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }

    try {
      await dataProvider.custom({
        url: API_URL,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        meta: {
          rawQuery: `
            query Me {
              me {
                id
                name
              }
            }
          `,
        },
      });

      return {
        authenticated: true,
      };
    } catch (error) {
      console.error("Auth check error:", error);

      // Remove invalid token
      localStorage.removeItem("access_token");

      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }
  },

  onError: async (error) => {
    // Check for various authentication error conditions
    if (
      error?.statusCode === "UNAUTHENTICATED" ||
      error?.statusCode === 401 ||
      error?.status === 401 ||
      error?.message?.includes("UNAUTHENTICATED")
    ) {
      return {
        logout: true,
        redirectTo: "/login",
      };
    }

    return { error };
  },

  getIdentity: async () => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      return null;
    }

    try {
      const { data } = await dataProvider.custom<{ me: any }>({
        url: API_URL,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        meta: {
          rawQuery: `
            query Me {
              me {
                id
                name
                email
                phone
                timezone
                avatarUrl
              }
            }
          `,
        },
      });

      return data?.me || null;
    } catch (error) {
      console.error("Get identity error:", error);
      return null;
    }
  },
};
