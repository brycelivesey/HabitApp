import axios from 'axios';
import { DailyGoal } from '../types';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const goalService = {
    async getGoals(): Promise<DailyGoal[]> {
        const { data } = await api.get('/goals');
        return data;
    },

    async addGoal(goal: DailyGoal): Promise<string> {
        const { data } = await api.post('/goals', goal);
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