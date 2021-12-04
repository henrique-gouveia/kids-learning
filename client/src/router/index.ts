import Vue from 'vue';
import VueRouter from 'vue-router';

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

const Quiz = () => import('@/views/public/Quiz.vue');

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		// Admin pages
		{
			path: '/',
			component: AdminLayout,
			children: [
				{
					path: '/',
					component: Home
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
				},
			]
		},
		// public
		{
			path: '/',
			component: PublicLayout,
			children: [
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
	]
});

export default router
