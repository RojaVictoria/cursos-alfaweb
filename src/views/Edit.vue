<template>
    <v-container>
        <h1 class="display-3 text-center my-5">Editando el curso: {{ course.nombre }}</h1>
        <v-form
            ref="form"
            lazy-validation
        >

            <v-text-field
            v-model="course.nombre"
            :counter="40"
            :rules="nameRules"
            label="Nombre"
            required
            ></v-text-field>

            <v-text-field
            v-model="course.imagen"
            :rules="rules"
            label="URL de la imagen del curso"
            required
            ></v-text-field>

            <v-text-field
            v-model.number="course.cupos"
            type="number"
            label="Cupos del curso"
            required
            ></v-text-field>
            
            <v-text-field
            v-model.number="course.inscritos"
            type="number"
            label="Inscritos en el curso"
            required
            ></v-text-field>
            
            <v-text-field
            v-model.number="course.duracion"
            type="number"
            label="Duración del curso"
            required
            ></v-text-field>
            
            <v-text-field
            v-model.number="course.costo"
            type="number"
            label="Costo del curso"
            required
            ></v-text-field>

            <v-text-field
            v-model="course.codigo"
            :rules="rules"
            label="Código del curso"
            required
            ></v-text-field>

           <v-textarea
            v-model="course.descripcion"
            :rules="rules"
            outlined
            required
            name="input-7-4"
            label="Descripción del curso"
            value="Descripción del curso"
            ></v-textarea>

            <v-text-field
            v-model="course.fecha"
            :rules="rules"
            label="Fecha de Registro (dd-mm-aaaa)"
            required
            ></v-text-field>

            <v-switch
            v-model="course.estado"
            :label="`Terminado: ${course.estado ? 'Sí' : 'No'  }`"
            color="indigo"
            hide-details
            ></v-switch>

            <div class="d-flex justify-center mt-8">
                <v-btn
                color="success"
                class="mr-4"
                @click="editCourse"
                >
                Editar
                </v-btn>

                <v-btn
                color="error"
                class="mr-4"
                @click="reset"
                >
                Limpiar Formulario
                </v-btn>

                <v-btn
                color="warning"
                class="mr-4"
                @click="resetValidation"
                >
                Limpiar Validación
                </v-btn>

                <v-btn
                color="primary"
                @click="backToAdmin"
                >
                Regresar
                </v-btn>
            </div>
        </v-form>
    </v-container>
</template>

<script>
import Firebase from "firebase";

export default {
    data: () => ({
        course: {
            estado: false,
        },
        nameRules: [
            v => !!v || 'Ingrese un nombre',
            v => (v && v.length <= 40) || 'El nombre debe tener menos de 40 caracteres',
        ],
        rules: [
            v => !!v || 'Complete la información',
        ],
    }),
    methods: {
        editCourse () {
            Firebase.firestore()
                .collection("cursos")
                .doc(this.course.id)
                .update(this.course)
                .then(() => {
                    this.$router.push("/admin");
            })
        },
        backToAdmin () {
            this.$router.push("/admin")
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },
    },
    beforeRouteEnter(to, from, next) {
        Firebase.firestore()
        .collection("cursos")
        .doc(to.params.id)
        .get()
        .then((document) => {
            next((vm) => {
            vm.course = { id: document.id, ...document.data() };
            });
        });
    },
}
</script>