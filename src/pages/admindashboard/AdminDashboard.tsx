import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

import AppointmentsCard from "../../components/appointments/AppointmentsCard";
import RevenueCard from "../../components/revenuecard/RavenueCard";
import EngagementCard from "../../components/engagementcard/EngagementCard";
import SatisfactionCard from "../../components/satisfactioncard/SatisfactionCard";

import {
  AdminDashboardData,
  fetchAdminDashboard,
} from "../../services/adminDashboardApi"; // ajusta o caminho conforme sua estrutura

export default function AdminDashboard(): React.JSX.Element {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchAdminDashboard();
        setData(result);
      } catch (err) {
        console.error("Erro ao carregar dashboard admin:", err);
        setError("Não foi possível carregar os dados do painel.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="admin-dash-container">
        <header className="admin-dash-header">
          <h2 className="admin-dash-title">Painel do Administrador</h2>
        </header>

        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}

        <main className="admin-dash-grid">
          <AppointmentsCard
            appointments={data?.appointments ?? []}
            loading={loading}
          />
          <RevenueCard revenue={data?.revenue} loading={loading} />
          <EngagementCard engagement={data?.engagement} loading={loading} />
          <SatisfactionCard
            satisfaction={data?.satisfaction}
            loading={loading}
          />
        </main>
      </div>
    </div>
  );
}
