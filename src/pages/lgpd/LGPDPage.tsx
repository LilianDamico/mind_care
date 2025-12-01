import React from "react";
import LgpdStatus from "../../components/lgpdstatus/LgpdStatus";

const LGPDPage = () => {
  return (
    <div style={{ padding: "24px", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 8 }}>Privacidade & LGPD</h1>

      <p style={{ marginBottom: 24, opacity: 0.8 }}>
        Você controla sua privacidade — aceite, revogue e baixe seus dados quando quiser.
      </p>

      <LgpdStatus />
    </div>
  );
};

export default LGPDPage;
