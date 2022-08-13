<template>
    <v-container fluid>
      <v-container>
        <h1>Registro de Usuario</h1>
        <v-form
            ref="form"
            :model="form"
            lazy-validation
        >

            <v-text-field
            v-model="form.email"
            :rules="emailRules"
            label="E-mail"
            required
            ></v-text-field>

            <v-text-field
            v-model="form.password"
            :counter="20"
            :rules="passwordRules"
            label="Password"
            required
            type="password"
            ></v-text-field>

            <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4 mb-2"
            @click="registerForm"
            >
            Registrar
            </v-btn>

            <v-btn
            color="error"
            class="mr-4 mb-2"
            @click="reset"
            >
            Limpiar Formulario
            </v-btn>

            <v-btn
            color="warning"
            class="mr-4 mb-2"
            @click="resetValidation"
            >
            Limpiar Validación
            </v-btn>

        </v-form>
      </v-container>
    </v-container>
</template>

<script>
import Firebase from 'firebase';
import Swal from 'sweetalert2';
export default {
    data: () => ({
      form: {
        email: "",
        password: "",
      },
      valid: true,
      passwordRules: [
        v => !!v || 'Ingrese una contraseña',
        v => (v && v.length <= 20) || 'La contraseña debe tener menos de 20 caracteres',
      ],
      emailRules: [
        v => !!v || 'Ingrese un correo',
        v => /.+@.+\..+/.test(v) || 'El correo debe ser válido',
      ],
    }),

    methods: {
      registerForm() {
        Firebase.auth()
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then((response) => {
            this.$store.dispatch('createNewUser', {email: response.user.email})
            this.$router.push('/home')
          },
          () => {
          Swal.fire({
            icon: 'error',
            title: 'Algo salió mal',
            text: `El correo o la contraseña son incorrectos. Intente nuevamente`
            })
          })
          .catch((error) => {
            console.log(error)
          })
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>
