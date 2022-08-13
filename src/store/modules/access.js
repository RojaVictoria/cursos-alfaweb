export const accessModule = {
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
    },
    actions: {
        defineCurrentUser(context, user) {
            context.commit("SET_CURRENT_USER", user);
        },
        createNewUser(context, user) {
            context.commit("CREATE_NEW_USER", user);
        },
        clearData (context) {
            context.commit('SET_CURRENT_USER', {})
        },
    },
};