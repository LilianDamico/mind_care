// src/services/adminDashboardApi.ts
import api from "./api"; // ajusta o caminho se seu api.ts estiver em outra pasta

export type AdminAppointment = {
  time: string;
  period: "Manhã" | "Tarde" | "Noite";
  patient: string;
  status: "Confirmado" | "Pendente" | "Cancelado";
};

export type AdminRevenue = {
  currentMonth: number;
  goal: number;
  percent: number;
};

export type AdminEngagement = {
  feedbackCollected: number;
  communityPosts: number;
  chatbotSessions: number;
};

export type AdminSatisfaction = {
  average: number;
  totalRatings: number;
};

export type AdminDashboardData = {
  appointments: AdminAppointment[];
  revenue: AdminRevenue;
  engagement: AdminEngagement;
  satisfaction: AdminSatisfaction;
};

export async function fetchAdminDashboard(): Promise<AdminDashboardData> {
  const response = await api.get<AdminDashboardData>("/admin/dashboard");
  return response.data;
}
