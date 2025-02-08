import axios from 'axios';
import { DailyGoal } from '../types';
import { authService } from './auth.service';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(config => {
    const token = authService.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const goalService = {
    async getGoals(): Promise<DailyGoal[]> {
        const { data } = await api.get('/goals');
        return data;
    },

    async addGoal(goal: DailyGoal): Promise<string> {
        const cleanedGoal = {
            ...goal,
            goalTasks: goal.goalTasks.map(({ id, isTemp, ...task }) => task)
        };
        const { data } = await api.post('/goals', cleanedGoal);
        return data;
    },

    async updateGoal(goal: DailyGoal): Promise<void> {
        await api.put('/goals', goal);
    },

    async deleteGoal(goalId: string): Promise<void> {
        await api.delete(`/goals/${goalId}`);
    },

    async addContribution(goalId: string, date: string): Promise<void> {
        await api.post(`/goals/${goalId}/contributions`, JSON.stringify(date));
    }
};