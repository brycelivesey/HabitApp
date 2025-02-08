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
        const cleanedGoal = {
            ...goalWithoutId,
            goalTasks: goalWithoutId.goalTasks.map(({ id, isTemp, ...task }) => task)
        };
        const { data } = await axios.post(`${baseURL}/goals`, cleanedGoal, { headers: getHeaders() });
        return data;
    },

    async updateGoal(goal: DailyGoal): Promise<void> {
        const cleanedGoal = {
            ...goal,
            goalTasks: goal.goalTasks.map(({ id, isTemp, ...task }) => isTemp ? task : { id, task })
        };
        await axios.put(`${baseURL}/goals`, cleanedGoal, { headers: getHeaders() });
    },

    async deleteGoal(goalId: string): Promise<void> {
        await axios.delete(`${baseURL}/goals/${goalId}`, { headers: getHeaders() });
    },

    async addContribution(goalId: string, date: string): Promise<void> {
        await axios.post(`${baseURL}/goals/${goalId}/contributions`, JSON.stringify(date), { headers: getHeaders() });
    }
};