import { createRouter, createWebHistory} from 'vue-router';
import Home from "../pages/Home.vue";
import IntroduceInterviewProcess from "../pages/IntroduceInterviewProcess.vue";
import StartChallenge from "../pages/StartChallenge.vue";
import CompleteChallenge from "../pages/completeChallenge.vue";


const routes: Array<any> = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path:'/introduceInterviewProcess',
        name:"interview",
        component: IntroduceInterviewProcess
    },
    {
        path:'/StartChallenge',
        name:"startChallenge",
        component:StartChallenge
    },
    {
        path:'/CompleteChallenge',
        name:"completeChallenge",
        component:CompleteChallenge
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;



