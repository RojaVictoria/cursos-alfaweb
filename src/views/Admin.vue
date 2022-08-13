<template>
    <v-container>
        <div class="d-flex justify-center">
            <h1 class="display-3 my-5">Administración</h1>
            <v-btn class="align-self-center ml-5" depressed color="primary" @click.stop="showAddCourse=true">
            Agregar curso
            </v-btn>  
            <AddCourseModal v-model="showAddCourse" />
        </div>
        <v-data-table :headers="headers" :items="$store.state.courses.courses" class="elevation-1">
            
            <template v-slot:[`item.duracion`]="{ item }">
              {{ item.duracion }} {{ item.duracion === 1 ? `mes` : `meses` }}
            </template>
            
            <template v-slot:[`item.costo`]="{ item }">
              <v-chip color="success">${{ item.costo.toLocaleString() }}</v-chip>
            </template>

            <template v-slot:[`item.estado`]="{ item }">
              <v-chip :color="item.estado ? 'info' : 'grey'">
                {{ item.estado ? "Si" : "No" }}
              </v-chip>
            </template>

            <template v-slot:[`item.fecha`]="{ item }">
              <v-chip color="success">
                {{ item.fecha ? item.fecha : "Sin información" }}
              </v-chip>
            </template>
            
            <template v-slot:[`item.acciones`]="{ item }">
              <div>
                <v-btn icon @click="editCourse(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="deleteCourse(item)" >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </template>
        </v-data-table>
        <br>

        <v-alert dense outlined color="purple" icon="mdi-account-group">
          Cantidad total de alumnos permitidos: <strong> {{ $store.getters['courses/totalQuota'] }} </strong> alumnos
        </v-alert>
        
        <v-alert dense outlined color="blue" icon="mdi-account-multiple-check">
          Cantidad total de alumnos inscritos: <strong> {{ $store.getters['courses/totalEnrolled'] }} </strong> alumnos
        </v-alert>
        
        <v-alert dense outlined color="red" icon="mdi-account-clock">
          Cantidad total de cupos restantes: <strong> {{ $store.getters['courses/availableQuota'] }} </strong> alumnos
        </v-alert>
        
        <v-alert dense outlined color="pink" icon="mdi-block-helper">
          Cantidad total de cursos terminados: <strong> {{ $store.getters['courses/finishedCourses'] }} </strong> cursos
        </v-alert>
        
        <v-alert dense outlined color="brown" icon="mdi-bell-ring">
          Cantidad total de cursos activos: <strong> {{ $store.getters['courses/activeCourses'] }} </strong> cursos
        </v-alert>

        <v-alert dense outlined color="deep-orange" icon="mdi-bell-ring">
          Cantidad total de cursos: <strong> {{ $store.getters['courses/totalCourses'] }} </strong> cursos
        </v-alert>
    </v-container>
</template>

<script>
import Store from "../store";
import Firebase from "firebase";
import AddCourseModal from '../components/addCourseModal'

export default {
    components: { AddCourseModal },
    data: () => ({
        showAddCourse: false,
        showDeleteCourse: false,
        headers: [
          {
            text: 'Curso',
            align: 'start',
            value: 'nombre',
          },
          { text: 'Cupos', value: 'cupos' },
          { text: 'Inscritos', value: 'inscritos' },
          { text: 'Duración', value: 'duracion' },
          { text: 'Costo', value: 'costo' },
          { text: 'Terminado', value: 'estado' },
          { text: 'Fecha', value: 'fecha' },
          { text: 'Acciones', value: 'acciones' },
        ],
        courses: [],
    }),
    methods: {
      editCourse(item) {
        this.$router.push(`/admin/${item.id}`);
      },
      deleteCourse(item) {
        if(confirm('¿Seguro que quieres borrar este curso?')){
          Firebase.firestore()
              .collection("cursos")
              .doc(item.id)
              .delete()
        }
      }
    },
    beforeRouteEnter(to, from, next) {
    Store.dispatch("courses/getCourses");
    next();
  },
  }
</script>