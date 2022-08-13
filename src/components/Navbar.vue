<template>
    <div>
        <v-app-bar color="deep-purple" dark>
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
            <v-toolbar-title>Cursos AlfaWeb</v-toolbar-title>
            <v-spacer></v-spacer>
            <div v-if="$store.state.access.currentUser">
                <span>{{ $store.state.access.currentUser.email }}</span>
                <v-btn icon @click="logout">
                    <v-icon>mdi-logout</v-icon>
                </v-btn>
            </div>
            <div v-else>
                <v-btn icon>
                    <v-icon>mdi-login</v-icon>
                </v-btn>
            </div>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list nav dense>
                <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
                    <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                        <v-list-item-icon>
                            <v-icon>{{ link.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{ link.text }}</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import Firebase from 'firebase';
export default {
    data: () => ({
        drawer: false,
        group: null,
        links: [
            {
                text: "Inicio",
                icon: "mdi-home",
                route: "/home",
            },
            {
                text: "Login",
                icon: "mdi-login",
                route: "/login",
            },
            {
                text: "Registrarse",
                icon: "mdi-account-plus",
                route: "/register",
            },
            {
                text: "Administración",
                icon: "mdi-laptop",
                route: "/admin",
            },
        ],
    }),
    methods: {
        logout() {
            Firebase.auth()
            .signOut()
            .then(() => {
                this.$router.push("/login");
                this.$store.dispatch('clearData', {})
            });
        }
    }
}
</script>