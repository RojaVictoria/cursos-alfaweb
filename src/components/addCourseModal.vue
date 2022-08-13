<template>
    <v-dialog v-model="show" persistent max-width="600px">
        <v-card>
            <v-card-title>
                <span class="text-h5">Agregando Curso</span>
            </v-card-title>
            <v-card-text>
                <v-container>
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
                        :rules=[enrolledRules]
                        type="number"
                        label="Inscritos en el curso"
                        required
                        ></v-text-field>
                        
                        <v-text-field
                        v-model.number="course.duracion"
                        type="number"
                        label="Duración del curso (meses)"
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

                        <div class="d-flex justify-center mt-8">
                            <v-btn
                            color="success"
                            class="mr-4"
                            @click="addCourse"
                            @click.stop="show=false"
                            >
                            Agregar
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
                        </div>
                    </v-form>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click.stop="show=false">
                    Cerrar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import Firebase from "firebase";

export default {
    data: () => ({
        course: {
            nombre: "",
            imagen: "",
            cupos: 0,
            inscritos: 0,
            duracion: 0,
            costo: 0,
            codigo: "",
            descripcion: "",
            estado: false,
            fecha: new Date().toISOString().slice(0,10),
        },
        nameRules: [
            v => !!v || 'Ingrese un nombre',
            v => (v && v.length <= 40) || 'El nombre debe tener menos de 40 caracteres',
        ],
        rules: [
            v => !!v || 'Complete la información',
        ],

    }),
    props: {
        value: Boolean
    },
    methods: {
        addCourse () {
            Firebase.firestore()
                .collection("cursos")
                .add(this.course)
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },
        enrolledRules () {
            if (this.course.inscritos > this.course.cupos) {
                return "El número de inscritos no puede superar los cupos"
            }
        }
    },
    computed: {
        show: {
            get () {
                return this.value
            },
            set (value) {
                this.$emit('input', value)
            }
        }
    },
}
</script>
