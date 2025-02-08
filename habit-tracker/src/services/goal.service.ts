import axios from 'axios';
import { DailyGoal } from '../types';
import { authService } from './auth.service';

const baseURL = '/api';

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authService.getToken()}`
});

export const goalService = {
    async getGoals(): Promise<DailyGoal[]> {
        const { data } = await axios.get(`${baseURL}/goals`, { headers: getHeaders() });
        return data;
    },

    async addGoal(goal: DailyGoal): Promise<string> {
        const { id, ...goalWithoutId } = goal;
        const { data } = await axios.post(`${baseURL}/goals`, goalWithoutId, { headers: getHeaders() });
        return data;
    },

    async updateGoal(goal: DailyGoal): Promise<void> {
        await axios.put(`${baseURL}/goals`, goal, { headers: getHeaders() });
    },

    async deleteGoal(goalId: string): Promise<void> {
        await axios.delete(`${baseURL}/goals/${goalId}`, { headers: getHeaders() });
    },

    async addContribution(goalId: string, date: string): Promise<void> {
        await axios.post(`${baseURL}/goals/${goalId}/contributions`, JSON.stringify(date), { headers: getHeaders() });
    }
};