import { useState } from "react";

const SCENARIOS = [
  {
    id: "job",
    emoji: "💼",
    title: "Job & Career",
    description: "Job offers, promotions, career changes",
    example: "Should I accept this new job offer or stay at my current job?",
    color: "#FF6B35",
  },
  {
    id: "money",
    emoji: "💰",
    title: "Money & Finance",
    description: "Big purchases, savings, investments",
    example: "Should I buy a car now or save more money first?",
    color: "#4ECDC4",
  },
  {
    id: "relationships",
    emoji: "❤️",
    title: "Relationships",
    description: "Family, friends, romantic decisions",
    example: "Should I move in with my partner or wait longer?",
    color: "#FF6B9D",
  },
  {
    id: "lifestyle",
    emoji: "🏠",
    title: "Lifestyle & Living",
    description: "Moving, housing, daily life choices",
    example: "Should I move to a new city for a fresh start?",
    color: "#A855F7",
  },
];

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=Space+Mono:wght@400;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Sora', sans-serif;
    background: #0a0a0f;
    min-height: 100vh;
  }

  .app {
    min-height: 100vh;
    background: #0a0a0f;
    color: #f0f0f0;
    position: relative;
    overflow-x: hidden;
  }

  .bg-orbs {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.15;
  }

  .orb-1 { width: 400px; height: 400px; background: #FF6B35; top: -100px; right: -100px; animation: float1 8s ease-in-out infinite; }
  .orb-2 { width: 300px; height: 300px; background: #A855F7; bottom: 10%; left: -80px; animation: float2 10s ease-in-out infinite; }
  .orb-3 { width: 200px; height: 200px; background: #4ECDC4; top: 50%; left: 50%; animation: float3 6s ease-in-out infinite; }

  @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(30px)} }
  @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-25px)} }
  @keyframes float3 { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.2)} }

  .content {
    position: relative;
    z-index: 1;
    max-width: 480px;
    margin: 0 auto;
    padding: 24px 16px 48px;
  }

  .header {
    text-align: center;
    padding: 32px 0 24px;
  }

  .logo-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,107,53,0.15);
    border: 1px solid rgba(255,107,53,0.3);
    border-radius: 100px;
    padding: 6px 16px;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: #FF6B35;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .pulse-dot {
    width: 6px; height: 6px;
    background: #FF6B35;
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }

  h1 {
    font-size: 36px;
    font-weight: 800;
    line-height: 1.1;
    background: linear-gradient(135deg, #fff 0%, #aaa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 10px;
  }

  h1 span {
    background: linear-gradient(135deg, #FF6B35, #FF6B9D);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 14px;
    color: #888;
    line-height: 1.6;
  }

  .section-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #666;
    margin-bottom: 14px;
  }

  .scenarios-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 24px;
  }

  .scenario-card {
    background: rgba(255,255,255,0.03);
    border: 1.5px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.25s ease;
    text-align: left;
  }

  .scenario-card:hover {
    background: rgba(255,255,255,0.06);
    transform: translateY(-2px);
  }

  .scenario-card.active {
    border-color: var(--card-color);
    background: rgba(255,255,255,0.07);
    box-shadow: 0 0 20px -5px var(--card-color);
  }

  .scenario-emoji { font-size: 26px; margin-bottom: 8px; display: block; }
  .scenario-title { font-size: 13px; font-weight: 700; color: #f0f0f0; margin-bottom: 4px; }
  .scenario-desc { font-size: 11px; color: #666; line-height: 1.4; }

  .input-section {
    background: rgba(255,255,255,0.03);
    border: 1.5px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 16px;
  }

  .input-label {
    font-size: 13px;
    font-weight: 600;
    color: #ccc;
    margin-bottom: 10px;
    display: block;
  }

  .example-hint {
    font-size: 11px;
    color: #555;
    margin-bottom: 12px;
    font-style: italic;
    line-height: 1.5;
  }

  textarea {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1.5px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    color: #f0f0f0;
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    padding: 14px;
    resize: none;
    outline: none;
    line-height: 1.6;
    transition: border-color 0.2s;
  }

  textarea:focus {
    border-color: rgba(255,107,53,0.4);
  }

  textarea::placeholder { color: #444; }

  .analyze-btn {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #FF6B35, #FF6B9D);
    border: none;
    border-radius: 14px;
    color: white;
    font-family: 'Sora', sans-serif;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.25s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 12px;
  }

  .analyze-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255,107,53,0.4);
  }

  .analyze-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .result-card {
    background: rgba(255,255,255,0.03);
    border: 1.5px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 20px;
    margin-top: 16px;
    animation: slideUp 0.4s ease;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .result-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
    padding-bottom: 14px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .result-icon {
    width: 40px; height: 40px;
    background: linear-gradient(135deg, #FF6B35, #FF6B9D);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }

  .result-title { font-size: 14px; font-weight: 700; color: #f0f0f0; }
  .result-subtitle { font-size: 11px; color: #666; }

  .ai-response {
    font-size: 14px;
    color: #ccc;
    line-height: 1.8;
    white-space: pre-wrap;
  }

  .ai-response strong {
    color: #FF6B35;
    font-weight: 700;
  }

  .reset-btn {
    width: 100%;
    padding: 13px;
    background: transparent;
    border: 1.5px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    color: #888;
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    cursor: pointer;
    margin-top: 12px;
    transition: all 0.2s;
  }

  .reset-btn:hover { border-color: rgba(255,255,255,0.2); color: #ccc; }

  .error-box {
    background: rgba(255,80,80,0.1);
    border: 1px solid rgba(255,80,80,0.2);
    border-radius: 12px;
    padding: 14px;
    color: #ff8080;
    font-size: 13px;
    margin-top: 12px;
  }

  .tag-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 16px;
  }

  .tag {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 100px;
    padding: 4px 12px;
    font-size: 11px;
    color: #666;
    font-family: 'Space Mono', monospace;
  }
`;

export default function App() {
  const [selected, setSelected] = useState(null);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const selectedScenario = SCENARIOS.find((s) => s.id === selected);

  const handleSelect = (id) => {
    setSelected(id);
    const scenario = SCENARIOS.find((s) => s.id === id);
    setQuestion(scenario.example);
    setResult(null);
    setError(null);
  };

  const analyze = async () => {
    if (!question.trim() || !selected) return;
    setLoading(true);
    setResult(null);
    setError(null);

    const systemPrompt = `You are LifeDecide AI — a warm, friendly, and smart daily life decision coach for everyday people.
Your job is to help users make better decisions by:
1. Understanding their situation clearly
2. Breaking down their options simply
3. Weighing the pros and cons of each option
4. Explaining your reasoning in plain language
5. Giving a clear, honest recommendation

Rules:
- Use simple, everyday language. No jargon.
- Be warm, supportive, and non-judgmental
- Structure your response with clear sections using emojis as headers
- Always explain WHY you recommend something
- Keep it concise but thorough — max 300 words
- Format: 
  🔍 UNDERSTANDING YOUR SITUATION (1-2 sentences)
  ⚖️ YOUR OPTIONS & TRADE-OFFS (bullet points for each option)
  💡 MY RECOMMENDATION (clear advice)
  🧠 WHY I THINK THIS (brief reasoning)
  ❓ ONE THING TO CONSIDER (a helpful follow-up thought)`;

    const userMessage = `Category: ${selectedScenario.title}
My decision: ${question}

Please help me think through this decision clearly.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: "user", content: userMessage }],
        }),
      });

      const data = await response.json();
      if (data.content && data.content[0]) {
        const text = data.content[0].text;
        // Bold the emoji section headers
        const formatted = text
          .replace(/(🔍[^\n]*)/g, "**$1**")
          .replace(/(⚖️[^\n]*)/g, "**$1**")
          .replace(/(💡[^\n]*)/g, "**$1**")
          .replace(/(🧠[^\n]*)/g, "**$1**")
          .replace(/(❓[^\n]*)/g, "**$1**");
        setResult(formatted);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Connection error. Please check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSelected(null);
    setQuestion("");
    setResult(null);
    setError(null);
  };

  const renderResult = (text) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    );
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        <div className="bg-orbs">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <div className="content">
          <div className="header">
            <div className="logo-badge">
              <div className="pulse-dot" />
              AI-Powered · Free · Instant
            </div>
            <h1>Life<span>Decide</span> AI</h1>
            <p className="subtitle">
              Not sure what to do? Tell me your situation and I'll help you think it through — clearly and honestly.
            </p>
          </div>

          <p className="section-label">Step 1 — What's your decision about?</p>
          <div className="scenarios-grid">
            {SCENARIOS.map((s) => (
              <div
                key={s.id}
                className={`scenario-card ${selected === s.id ? "active" : ""}`}
                style={{ "--card-color": s.color }}
                onClick={() => handleSelect(s.id)}
              >
                <span className="scenario-emoji">{s.emoji}</span>
                <div className="scenario-title">{s.title}</div>
                <div className="scenario-desc">{s.description}</div>
              </div>
            ))}
          </div>

          {selected && (
            <>
              <p className="section-label">Step 2 — Describe your situation</p>
              <div className="input-section">
                <span className="input-label">Tell me what's on your mind 💬</span>
                <p className="example-hint">
                  Be specific! The more details you share, the better I can help you.
                </p>
                <textarea
                  rows={4}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Describe your situation or question here..."
                />
              </div>

              <button
                className="analyze-btn"
                onClick={analyze}
                disabled={loading || !question.trim()}
              >
                {loading ? (
                  <>
                    <div className="spinner" />
                    Thinking through your decision...
                  </>
                ) : (
                  <>🧠 Analyze My Decision</>
                )}
              </button>
            </>
          )}

          {error && <div className="error-box">⚠️ {error}</div>}

          {result && (
            <div className="result-card">
              <div className="result-header">
                <div className="result-icon">🎯</div>
                <div>
                  <div className="result-title">Your Decision Analysis</div>
                  <div className="result-subtitle">{selectedScenario.title} · AI-powered insight</div>
                </div>
              </div>
              <div className="ai-response">{renderResult(result)}</div>
              <div className="tag-row">
                <span className="tag">Trade-offs analyzed</span>
                <span className="tag">Reasoning explained</span>
                <span className="tag">Personalized</span>
              </div>
              <button className="reset-btn" onClick={reset}>
                ↩ Start a new decision
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
