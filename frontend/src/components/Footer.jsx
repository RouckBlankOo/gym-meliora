import React from "react";

export default function Footer({ t }) {
  return (
    <footer
      className="reveal-up"
      style={{
        backgroundColor: "#080808",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "4rem 0",
        textAlign: "center",
      }}
    >
      <div className="container">
        <a
          href="#top"
          style={{
            fontFamily: "var(--font-header)",
            fontSize: "1.4rem",
            fontWeight: 800,
            color: "#ffffff",
            textDecoration: "none",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            display: "inline-block",
            marginBottom: "1.5rem"
          }}
        >
          MELIORA
        </a>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            letterSpacing: "0.05em"
          }}
        >
          &copy; {new Date().getFullYear()} Meliora Gym. {t?.rights || "All rights reserved. Designed for elite performance."}
        </p>
      </div>
    </footer>
  );
}
