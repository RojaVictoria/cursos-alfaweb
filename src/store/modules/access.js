import Firebase from "firebase";
import Router from "../../router/index";

export const accessModule = {
    namespaced: true,
    state: {
        currentUser: null,
    },
    mutations: {
        SET_CURRENT_USER(state, newUser) {
            state.currentUser = newUser;
        },
        CREATE_NEW_USER(state, newUser) {
            state.currentUser = newUser;
        },
        LOGOUT_USER(state) {
            state.currentUser = null
        },
    },
    actions: {
        subscribeToAuthStateChange(context) {
            Firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                Firebase.firestore()
                  .collection("usuarios")
                  .get()
                  .then((documents) => {
                    const newUser = {
                      email: user.email,
                    };
                    documents.forEach((document) => {
                      const data = document.data();
                      if (data.email === user.email) {
                        newUser.id = document.id;
                      }
                    });
                    context.commit("SET_CURRENT_USER", { ...newUser });
                    Router.push({ name: "Login" });
                  });
              } else {
                context.commit("SET_CURRENT_USER", null);
              }
            });
          },
        defineCurrentUser(context, user) {
            context.commit("SET_CURRENT_USER", user);
        },
        createNewUser(context, user) {
            context.commit("CREATE_NEW_USER", user);
        },
        logoutUser(context) {
            context.commit("LOGOUT_USER");
        },
    },
};