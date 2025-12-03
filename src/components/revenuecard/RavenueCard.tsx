import React from "react";
import "./RevenueCard.css";
import { AdminRevenue } from "../../services/adminDashboardApi";

type Props = {
  revenue?: AdminRevenue;
  loading?: boolean;
};

export default function RevenueCard({ revenue, loading }: Props) {
  const value = revenue?.currentMonth ?? 0;
  const goal = revenue?.goal ?? 0;
  const percent = revenue?.percent ?? 0;

  return (
    <section className="adm-card">
      <h3 className="adm-card-title">Receita Mensal</h3>

      {loading && <div>Calculando receita...</div>}

      {!loading && (
        <>
          <div className="adm-revenue-value">
            R${value.toLocaleString("pt-BR")}
          </div>

          <div className="adm-progress">
            <div className="adm-progress-bg">
              <div
                className="adm-progress-fill"
                style={{ width: `${Math.min(percent, 100)}%` }}
              />
            </div>
            <span className="adm-progress-text">
              {percent}% da meta {goal > 0 && `(R$${goal.toLocaleString("pt-BR")})`}
            </span>
          </div>
        </>
      )}
    </section>
  );
}
