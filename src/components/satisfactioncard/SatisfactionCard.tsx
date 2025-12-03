import React from "react";
import "./SatisfactionCard.css";
import { AdminSatisfaction } from "../../services/adminDashboardApi";

type Props = {
  satisfaction?: AdminSatisfaction;
  loading?: boolean;
};

export default function SatisfactionCard({ satisfaction, loading }: Props) {
  const avg = satisfaction?.average ?? 0;
  const filled = Math.floor(avg);
  const hasHalf = avg - filled >= 0.5;

  return (
    <section className="adm-card">
      <h3 className="adm-card-title">Índice de Satisfação</h3>

      {loading && <div>Carregando satisfação...</div>}

      {!loading && (
        <div className="adm-sat-header">
          <span className="adm-sat-value">{avg.toFixed(1)}</span>

          <div className="adm-stars">
            {Array.from({ length: 5 }).map((_, i) => {
              const full = i < filled;
              const half = i === filled && hasHalf;

              return (
                <svg key={i} className="adm-star" viewBox="0 0 24 24">
                  {half ? (
                    <>
                      <defs>
                        <linearGradient id={`half${i}`}>
                          <stop offset="50%" stopColor="#FBBF24" />
                          <stop offset="50%" stopColor="transparent" />
                        </linearGradient>
                      </defs>
                      <path
                        fill={`url(#half${i})`}
                        stroke="#FBBF24"
                        d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"
                      />
                    </>
                  ) : (
                    <path
                      fill={full ? "#FBBF24" : "none"}
                      stroke="#FBBF24"
                      d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"
                    />
                  )}
                </svg>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
