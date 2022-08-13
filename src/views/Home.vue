<template>
    <v-container>
        <h1 class="display-3 text-center my-5">Lista de Cursos</h1>
        <v-row justify="space-around">
            <v-col cols="12" sm="4" v-for="course in $store.state.courses.courses" :key="course.id">
            <v-card width="400" class="my-5">
                <v-img
                    height="350px"
                    contain
                    :src="course.imagen"
                >
                </v-img>
                <v-card-text class="grey lighten-4">
                    <v-card-title>{{ course.nombre }}</v-card-title>
                    <div class="font-weight-bold ml-8 mb-2">
                        Información
                    </div>

                    <v-timeline align-top dense>
                        <v-timeline-item small color="deep-purple lighten-1">
                            <div>
                                <div class="font-weight-normal">
                                    Costo: <strong>{{ course.costo }}</strong> 
                                </div>
                                <div>Duración: {{ course.duracion }} {{ course.duracion === 1 ? `mes` : `meses` }}</div>
                            </div>
                        </v-timeline-item>
                        <v-timeline-item small color="green">
                            <div>
                                <div class="font-weight-normal">
                                    Cupos: <strong>{{ course.cupos }}</strong> 
                                </div>
                                <div>Completado: No</div>
                            </div>
                        </v-timeline-item>
                        <v-timeline-item small color="deep-purple lighten-1">
                            <div>
                                <div class="font-weight-normal">
                                    Fecha de registro:
                                </div>
                                <div>{{ course.fecha }}</div>
                            </div>
                        </v-timeline-item>
                        <v-timeline-item small color="green">
                            <div>
                                <div class="font-weight-normal">
                                    Descripción:
                                </div>
                                <div>{{ course.descripcion }}</div>
                            </div>
                        </v-timeline-item>
                    </v-timeline>
                </v-card-text>
            </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Store from "../store";
export default {
    data: () => ({
    }),
     beforeRouteEnter(to, from, next) {
        Store.dispatch("courses/getCourses");
        next();
    },
}
</script>