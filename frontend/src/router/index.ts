import Vue from 'vue';
import VueRouter from 'vue-router';

// Layouts
import Layout from '@/views/template/Layout.vue';

// Views
const Home = () => import('@/views/Home.vue');

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
