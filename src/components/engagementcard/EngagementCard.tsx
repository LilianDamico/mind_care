import React from "react";
import "./EngagementCard.css";
import { AdminEngagement } from "../../services/adminDashboardApi";

type Props = {
  engagement?: AdminEngagement;
  loading?: boolean;
};

export default function EngagementCard({ engagement, loading }: Props) {
  const feedback = engagement?.feedbackCollected ?? 0;
  const posts = engagement?.communityPosts ?? 0;
  const sessions = engagement?.chatbotSessions ?? 0;

  return (
    <section className="adm-card">
      <h3 className="adm-card-title">Indicadores de Engajamento</h3>

      {loading && <div>Carregando engajamento...</div>}

      {!loading && (
        <div className="adm-kpi-list">
          <div className="adm-kpi">
            <span>Feedbacks:</span>
            <strong>{feedback}</strong>
          </div>
          <div className="adm-kpi">
            <span>Postagens:</span>
            <strong>{posts}</strong>
          </div>
          <div className="adm-kpi">
            <span>Sessões Chatbot:</span>
            <strong>{sessions}</strong>
          </div>
        </div>
      )}
    </section>
  );
}
