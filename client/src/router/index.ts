import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { appKey } from '@/consts';

// Layouts
import AdminLayout from '@/pages/admin/template/Layout.vue';
import PublicLayout from '@/pages/public/template/Layout.vue';

// Views
const Home = () => import('@/pages/admin/HomePage.vue');

const Turma = () => import('@/pages/admin/TurmaPage.vue');
const Aluno = () => import('@/pages/admin/AlunoPage.vue');
const Questao = () => import('@/pages/admin/QuestaoPage.vue');
const Questionario = () => import('@/pages/admin/QuestionarioPage.vue');
const QuestionarioSearch = () => import('@/pages/admin/QuestionarioSearchPage.vue');
const QuestionarioReport = () => import('@/pages/admin/QuestionarioReportPage.vue');

const Usuario = () => import('@/pages/admin/UsuarioPage.vue');

const Auth = () => import('@/pages/public/AuthPage.vue')
const Quiz = () => import('@/pages/public/QuizPage.vue');

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
                path: '/questionarios/localizar',
                component: QuestionarioSearch,
            },
            {
                path: '/questionarios/:id/relatorio',
                component: QuestionarioReport,
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
        ]
    },
    {
        path: '/questionarios/:id/quiz',
        component: Quiz,
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
