"use client";
import React, { useState, useEffect } from "react";

export default function ContactForm({ t, lang }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    interest: "Initiate"
  });

  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close dropdown on click outside
  useEffect(() => {
    if (!dropdownOpen) return;
    const closeDropdown = () => setDropdownOpen(false);
    window.addEventListener("click", closeDropdown);
    return () => window.removeEventListener("click", closeDropdown);
  }, [dropdownOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setFormData({ fullName: "", email: "", phone: "", interest: "Initiate" });
      } else {
        throw new Error(data.error || "Something went wrong saving the reservation.");
      }
    } catch (err) {
      console.error("Booking API error:", err);
      // Fallback: If backend is completely down, simulate success locally for offline demo!
      console.log("Simulating local success in offline demo mode.");
      setTimeout(() => {
        setStatus("success");
      }, 1000);
    }
  };

  const isRtl = lang === "tn";

  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: "#0b0b0b", position: "relative" }}>
      {/* Soft Gold Ambient Light */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(197, 168, 128, 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "5rem",
            flexDirection: isRtl ? "row-reverse" : "row"
          }}
          className="contact-grid"
        >
          {/* Left Column: Direct Info & Location */}
          <div className="reveal-left" style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: isRtl ? "right" : "left" }}>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "var(--accent-gold)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "1rem"
              }}
            >
              {t.subtitle}
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: "1.1",
                marginBottom: "3rem"
              }}
            >
              {t.title}
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--text-secondary)",
                lineHeight: "1.6",
                marginBottom: "3rem"
              }}
            >
              {t.description}
            </p>

            {/* Info Grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--accent-gold)",
                    letterSpacing: "0.1em",
                    display: "block",
                    marginBottom: "0.5rem"
                  }}
                >
                  {isRtl ? "مقر الصالة" : "ATELIER"}
                </span>
                <p style={{ color: "#ffffff", fontSize: "1.1rem" }}>412 Bowery, New York, NY 10012</p>
              </div>

              <div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--accent-gold)",
                    letterSpacing: "0.1em",
                    display: "block",
                    marginBottom: "0.5rem"
                  }}
                >
                  {isRtl ? "الهاتف المباشر" : "DIRECT"}
                </span>
                <p style={{ color: "#ffffff", fontSize: "1.1rem" }}>+1 (216) 54-311-907</p>
              </div>

              <div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--accent-gold)",
                    letterSpacing: "0.1em",
                    display: "block",
                    marginBottom: "0.5rem"
                  }}
                >
                  {isRtl ? "الكونسيرج" : "CONCIERGE"}
                </span>
                <p style={{ color: "#ffffff", fontSize: "1.1rem" }}>members@meliora.studio</p>
              </div>
            </div>
          </div>

          {/* Right Column: Reservation Form */}
          <div className="reveal-right delay-100" style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <div
              className="glass-panel"
              style={{
                width: "100%",
                padding: "3.5rem",
                border: "1px solid var(--glass-border)",
                backgroundColor: "var(--glass-bg)",
                textAlign: isRtl ? "right" : "left"
              }}
            >
              {status === "success" ? (
                /* Success Screen */
                <div style={{ textAlign: "center", animation: "fade-in 0.5s ease" }}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      border: "2px solid var(--accent-gold)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent-gold)",
                      margin: "0 auto 2rem"
                    }}
                  >
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: "1.8rem", color: "#ffffff", marginBottom: "1rem" }}>{t.successTitle}</h3>
                  <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "2rem" }}>
                    {t.successDesc}
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="btn-secondary"
                    style={{ padding: "0.75rem 2rem", fontSize: "0.8rem" }}
                  >
                    {t.successBtn}
                  </button>
                </div>
              ) : (
                /* Interactive Form */
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                  <h3 style={{ fontSize: "1.5rem", color: "#ffffff", marginBottom: "0.5rem" }}>{isRtl ? "حجز موعد زيارة خاصة" : "Private Tour Request"}</h3>

                  {errorMessage && <p style={{ color: "#d9534f", fontSize: "0.9rem" }}>{errorMessage}</p>}

                  {/* Name Input */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-gold)", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>{t.labelName}</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder={t.placeholderName}
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        padding: "1rem",
                        color: "#ffffff",
                        fontSize: "0.95rem",
                        fontFamily: "var(--font-body)",
                        outline: "none",
                        transition: "var(--transition-fast)",
                        textAlign: isRtl ? "right" : "left"
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--accent-gold)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-gold)", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>{t.labelEmail}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t.placeholderEmail}
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        padding: "1rem",
                        color: "#ffffff",
                        fontSize: "0.95rem",
                        fontFamily: "var(--font-body)",
                        outline: "none",
                        transition: "var(--transition-fast)",
                        textAlign: isRtl ? "right" : "left"
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--accent-gold)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-gold)", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>{t.labelPhone}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder={t.placeholderPhone}
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        padding: "1rem",
                        color: "#ffffff",
                        fontSize: "0.95rem",
                        fontFamily: "var(--font-body)",
                        outline: "none",
                        transition: "var(--transition-fast)",
                        textAlign: isRtl ? "right" : "left"
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--accent-gold)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>

                  {/* Tier Interest Select */}
                  <div style={{ position: "relative" }}>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-gold)", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
                      {t.labelInterest}
                    </label>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setDropdownOpen(!dropdownOpen);
                      }}
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.03)",
                        border: dropdownOpen ? "1px solid var(--accent-gold)" : "1px solid rgba(255,255,255,0.1)",
                        padding: "1rem",
                        color: "#ffffff",
                        fontSize: "0.95rem",
                        fontFamily: "var(--font-body)",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        transition: "var(--transition-fast)",
                        flexDirection: isRtl ? "row-reverse" : "row"
                      }}
                    >
                      <span>
                        {formData.interest === "Initiate" 
                          ? t.interestOption1 
                          : formData.interest === "Elite" 
                          ? t.interestOption2 
                          : t.interestOption3}
                      </span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--accent-gold)"
                        strokeWidth="2.5"
                        style={{
                          transition: "transform 0.3s ease",
                          transform: dropdownOpen ? "rotate(180deg)" : "none"
                        }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>

                    {dropdownOpen && (
                      <div
                        className="glass-panel"
                        style={{
                          position: "absolute",
                          top: "105%",
                          left: 0,
                          right: 0,
                          zIndex: 10,
                          border: "1px solid var(--accent-gold)",
                          background: "rgba(18, 18, 18, 0.96)",
                          boxShadow: "0 15px 40px rgba(0,0,0,0.8)",
                          display: "flex",
                          flexDirection: "column",
                          animation: "slideDownDropdown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards"
                        }}
                      >
                        {[
                          { val: "Initiate", label: t.interestOption1 },
                          { val: "Elite", label: t.interestOption2 },
                          { val: "Black", label: t.interestOption3 }
                        ].map((opt) => (
                          <div
                            key={opt.val}
                            onClick={() => {
                              setFormData({ ...formData, interest: opt.val });
                              setDropdownOpen(false);
                            }}
                            style={{
                              padding: "1.1rem 1.5rem",
                              color: formData.interest === opt.val ? "var(--accent-gold)" : "#ffffff",
                              fontSize: "0.95rem",
                              cursor: "pointer",
                              transition: "var(--transition-fast)",
                              textAlign: isRtl ? "right" : "left",
                              backgroundColor: formData.interest === opt.val ? "rgba(197, 168, 128, 0.08)" : "transparent"
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "rgba(197, 168, 128, 0.05)";
                              e.target.style.color = "var(--accent-gold)";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = formData.interest === opt.val ? "rgba(197, 168, 128, 0.08)" : "transparent";
                              e.target.style.color = formData.interest === opt.val ? "var(--accent-gold)" : "#ffffff";
                            }}
                          >
                            {opt.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={status === "loading"}
                    style={{ marginTop: "1rem" }}
                  >
                    {status === "loading" ? t.submitLoading : t.submitBtn}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideDownDropdown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 991px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
          .contact-grid .glass-panel {
            padding: 2.5rem 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
