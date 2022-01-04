import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { appKey } from '@/consts';

// Layouts
import AdminLayout from '@/views/admin/template/Layout.vue';
import PublicLayout from '@/views/public/template/Layout.vue';

// Views
const Home = () => import('@/views/admin/HomeView.vue');

const Turma = () => import('@/views/admin/TurmaView.vue');
const Aluno = () => import('@/views/admin/AlunoView.vue');
const Questao = () => import('@/views/admin/QuestaoView.vue');
const Questionario = () => import('@/views/admin/QuestionarioView.vue');
const Usuario = () => import('@/views/admin/UsuarioView.vue');

const Auth = () => import('@/views/public/AuthView.vue')
const Quiz = () => import('@/views/public/Quiz.vue');

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    // Admin pages
    {
        path: '/',
        component: AdminLayout,
        children: [
            {
                path: '/',
                component: Home,
            },
            {
                path: '/turmas',
                component: Turma
            },
            {
                path: '/alunos',
                component: Aluno
            },
            {
                path: '/questoes',
                component: Questao,
            },
            {
                path: '/questionarios',
                component: Questionario
            },
            {
                path: '/usuarios',
                component: Usuario,
                meta: { requiresAdmin: true },
            },
        ]
    },
    // Public pages
    {
        path: '/',
        component: PublicLayout,
        children: [
            {
                path: '/auth',
                component: Auth
            },
            {
                path: '/questionarios/:id/quiz',
                component: Quiz,
            }
        ]
    },
    // Not found route
    {
        path: '*',
        redirect: '/'
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAdmin)) {
        const appStateAsJson = localStorage.getItem(appKey);
        const appState = JSON.parse(appStateAsJson || '{}');
        const { auth = {} } = appState;

        auth.admin ? next() : next({ path: '/' })
    } else {
        next();
    }
});

export default router
