// import { AuthBindings } from "@refinedev/core";
// import { API_URL, dataProvider } from "./data";

// export const authCredentials = {
//   email: "michael.scott@dundermifflin.com",
//   password: "demodemo",
// };

// export const authProvider: AuthBindings = {
//   login: async ({ email }) => {
//     try {
//       const { data } = await dataProvider.custom({
//         url: API_URL,
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         meta: {
//           variables: {
//             email: email || authCredentials.email,
//           },
//           rawQuery: `
//                 mutation Login($email: String!, $password: String!){
//                     login(loginInput: {email: $email }) {
//                     accessToken
//                     }
//                 }
//              `,
//         },
//       });
//       if (data?.login?.access_token) {
//         localStorage.setItem("access_token", data.login.accessToken);
//         return {
//           success: true,
//           redirectTo: "/",
//         };
//       } else {
//         throw new Error("No access token received");
//       }
//     } catch (e) {
//       const error = e as Error;

//       return {
//         success: false,

//         error: {
//           message: error instanceof Error ? error.message : "Login Failed",
//         },
//       };
//     }
//   },

//   //   remove accessToken from local storage
//   logout: async () => {
//     localStorage.removeItem("access_token");

//     return {
//       success: true,
//       redirectTo: "/login",
//     };
//   },

//   onError: async (error) => {
//     if (error.statusCode === "UNUTHENTICATED") {
//       return {
//         logout: true,
//         ...error,
//       };
//     }
//     return { error };
//   },

//   check: async () => {
//     try {
//       await dataProvider.custom({
//         url: API_URL,
//         method: "post",
//         headers: {},
//         meta: {
//           rawQuery: `
//             query Me {
//                 me {
//                     name
//                 }
//             }
//         `,
//         },
//       });

//       return {
//         authenticated: true,
//         redirectTo: "/",
//       };
//     } catch (error) {
//       return {
//         authenticated: false,
//         redirectTo: "/login",
//       };
//     }
//   },

//   getIdentity: async () => {
//     const accessToken = localStorage.getItem("access_token");

//     try {
//       const { data } = await dataProvider.custom<{ me: any }>({
//         url: API_URL,
//         method: "post",
//         headers: accessToken
//           ? {
//               Authorization: `Bearer ${accessToken}`,
//             }
//           : {},

//         meta: {
//           rawQuery: `
//                  query Me {
//                     me {
//                         id
//                         name
//                         email
//                         phone
//                         timezone
//                         avatarUrl
//                     }
//                  }
//                 `,
//         },
//       });

//       return data.me;
//     } catch (error) {
//       return undefined;
//     }
//   },
// };

import { AuthBindings } from "@refinedev/core";
import { API_URL, dataProvider } from "./data";

export const authCredentials = {
  email: "michael.scott@dundermifflin.com",
  password: "demodemo",
};

export const authProvider: AuthBindings = {
  login: async ({ email }) => {
    try {
      const { data } = await dataProvider.custom({
        url: API_URL,
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        meta: {
          variables: {
            email: email || authCredentials.email,
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
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Login failed. Please check your credentials.",
        },
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
