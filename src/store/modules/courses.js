import Firebase from 'firebase'

export const coursesModule = {
    namespaced: true,
    state: {
        courses: [],
    },
    getters: {
        totalQuota(state) {
            return state.courses.reduce((accumulator, course) => {
                accumulator = accumulator + course.cupos;
                return accumulator;
            }, 0);
        },
        totalEnrolled(state) {
            return state.courses.reduce((accumulator, course) => {
            accumulator = accumulator + course.inscritos;
            return accumulator;
            }, 0);
        },
        availableQuota(state) {
        return state.courses.reduce((accumulator, course) => {
            accumulator = accumulator + course.cupos - course.inscritos;
            return accumulator;
            }, 0);
        },
        finishedCourses(state) {
        return state.courses.reduce((accumulator, course) => {
            accumulator = accumulator + course.estado;
            return accumulator;
            }, 0);
        },
        activeCourses(state) {
        return state.courses.reduce((accumulator, course) => {
            accumulator = accumulator + !course.estado;
            return accumulator;
            }, 0);
        },
        totalCourses(state) {
            return state.courses.length;
        },
    },
    mutations: {
        GET_COURSES(state, coursesData) {
            state.courses = coursesData;
        },
        ADD_COURSE(state, newCourse) {
            state.courses.push(newCourse)
        },    
        DELETE_COURSE(state, deletedCourse) {
            state.courses.splice(deletedCourse, 1)
        },
    },
    actions: {
        getCourses(context) {
            Firebase.firestore()
                .collection('cursos')
                .onSnapshot((documents) => {
                const courses = [];
                documents.forEach((document) => {
                    courses.push({id: document.id, ...document.data() });
                });
                context.commit('GET_COURSES', courses);
                });
        },
        addCourse(context, course) {
            Firebase.firestore()
              .collection('cursos')
              .add({
                ...course
              })
            context.commit('ADD_COURSE', course)
        },
        deleteCourse(context, deletedCourse) {
            Firebase.firestore()
              .collection('cursos')
              .doc(deletedCourse)
              .delete()
              context.commit('DELETE_COURSE', deletedCourse)
        },
    },
};