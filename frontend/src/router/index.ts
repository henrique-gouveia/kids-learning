import Vue from 'vue';
import VueRouter from 'vue-router';

// Layouts
import Layout from '@/views/template/Layout.vue';

// Views
const Home = () => import('@/views/Home.vue');

const Turma = () => import('@/views/admin/Turma.vue');
const Aluno = () => import('@/views/admin/Aluno.vue');
const Questao = () => import('@/views/admin/Questao.vue');

const Questionario = () => import('@/views/admin/Questionario.vue');

const Usuario = () => import('@/views/admin/Usuario.vue');

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		// Admin pages
		{
			path: '/',
			component: Layout,
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
					path: '/questionario',
					component: Questionario
				},
				{
					path: '/usuarios',
					component: Usuario,
				},
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
