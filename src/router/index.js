import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/trans',
    name: 'Trans',
    component: () => import('@/views/Transcript.vue')
  },
  {
    path: '/create',
    name: 'CreateCourse',
    component: () => import('@/views/CourseCreate.vue')
  },
  {
    path: '/edit/:title',
    name: 'EditCourse',
    component: () => import('@/views/CourseCreate.vue')
  },
  {
    path: '/compare',
    name: 'CreateCompare',
    component: () => import('@/views/CourseCompare.vue'),
  },
]

const router = new VueRouter({
  routes
})
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
export default router
