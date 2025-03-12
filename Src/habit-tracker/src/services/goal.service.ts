import axios from 'axios';
import { DailyGoal } from '../types';
import { authService } from './auth.service';

const baseURL = '/api';
const api = axios.create({

    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const goalService = {
    async getGoals(): Promise<DailyGoal[]> {
        return authService.makeAuthenticatedRequest(async () => {
            const { data } = await api.get('/goals', {
                headers: { Authorization: `Bearer ${authService.getToken()}` }
            });
            return data;
        });
    },

    async addGoal(goal: DailyGoal): Promise<string> {
        const { id, ...goalWithoutId } = goal;
        return authService.makeAuthenticatedRequest(async () => {
            const { data } = await api.post('/goals', goalWithoutId, {
                headers: { Authorization: `Bearer ${authService.getToken()}` }
            });
            return data;
        });
    },

    async updateGoal(goal: DailyGoal): Promise<void> {
        return authService.makeAuthenticatedRequest(async () => {
            await api.put('/goals', goal, {
                headers: { Authorization: `Bearer ${authService.getToken()}` }
            });
        });
    },

    async deleteGoal(goalId: string): Promise<void> {
        return authService.makeAuthenticatedRequest(async () => {
            await api.delete(`/goals/${goalId}`, {
                headers: { Authorization: `Bearer ${authService.getToken()}` }
            });
        });
    },

    async addContribution(goalId: string, date: string): Promise<void> {
        return authService.makeAuthenticatedRequest(async () => {
            await api.post(`/goals/${goalId}/contributions`, JSON.stringify(date), {
                headers: { Authorization: `Bearer ${authService.getToken()}` }
            });
        });
    }
};