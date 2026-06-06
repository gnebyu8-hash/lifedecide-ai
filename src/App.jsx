import { useState } from "react";

const FREE_LIMIT = 3;

const SCENARIOS = [
  { id: "job", emoji: "💼", title: "Job & Career", description: "Job offers, promotions, career changes", example: "Should I accept this new job offer or stay at my current job?", color: "#FF6B35", premium: false },
  { id: "money", emoji: "💰", title: "Money & Finance", description: "Big purchases, savings, investments", example: "Should I buy a car now or save more money first?", color: "#4ECDC4", premium: false },
  { id: "relationships", emoji: "❤️", title: "Relationships", description: "Family, friends, romantic decisions", example: "Should I move in with my partner or wait longer?", color: "#FF6B9D", premium: false },
  { id: "lifestyle", emoji: "🏠", title: "Lifestyle & Living", description: "Moving, housing, daily life choices", example: "Should I move to a new city for a fresh start?", color: "#A855F7", premium: false },
  { id: "education", emoji: "🎓", title: "Education", description: "Courses, degrees, skills to learn", example: "Should I pursue a master's degree or get work experience?", color: "#F59E0B", premium: true },
  { id: "health", emoji: "💪", title: "Health & Wellness", description: "Fitness, diet, mental health choices", example: "Should I join a gym or work out at home?", color: "#10B981", premium: true },
  { id: "business", emoji: "🚀", title: "Business & Startup", description: "Business ideas, partnerships, investments", example: "Should I start my own business or freelance first?", color: "#3B82F6", premium: true },
  { id: "tech", emoji: "💻", title: "Tech & Tools", description: "Software, gadgets, tech decisions", example: "Should I learn Python or JavaScript first?", color: "#8B5CF6", premium: true },
];

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { width: 100%; min-height: 100vh; }
  body { font-family: 'Sora', sans-serif; background: #0a0a0f; }

  .app { min-height: 100vh; width: 100%; background: #0a0a0f; color: #f0f0f0; position: relative; overflow-x: hidden; }
  .bg-orbs { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
  .orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.12; }
  .orb-1 { width: 500px; height: 500px; background: #FF6B35; top: -150px; right: -150px; animation: float1 8s ease-in-out infinite; }
  .orb-2 { width: 400px; height: 400px; background: #A855F7; bottom: 5%; left: -100px; animation: float2 10s ease-in-out infinite; }
  .orb-3 { width: 300px; height: 300px; background: #4ECDC4; top: 50%; left: 50%; animation: float3 6s ease-in-out infinite; }
  @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(30px)} }
  @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-25px)} }
  @keyframes float3 { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.2)} }

  .content { position: relative; z-index: 1; max-width: 640px; width: 100%; margin: 0 auto; padding: 24px 16px 60px; }

  .header { text-align: center; padding: 32px 0 28px; }
  .logo-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,107,53,0.15); border: 1px solid rgba(255,107,53,0.3); border-radius: 100px; padding: 6px 16px; font-family: 'Space Mono', monospace; font-size: 11px; color: #FF6B35; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 20px; }
  .pulse-dot { width: 6px; height: 6px; background: #FF6B35; border-radius: 50%; animation: pulse 2s ease-in-out infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }
  h1 { font-size: 42px; font-weight: 800; line-height: 1.1; background: linear-gradient(135deg, #fff 0%, #aaa 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 10px; }
  h1 span { background: linear-gradient(135deg, #FF6B35, #FF6B9D); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .subtitle { font-size: 15px; color: #888; line-height: 1.6; max-width: 400px; margin: 0 auto; }

  .plan-bar { display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 12px 16px; margin-bottom: 24px; }
  .plan-info { display: flex; align-items: center; gap: 10px; }
  .plan-badge { font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 100px; font-family: 'Space Mono', monospace; letter-spacing: 1px; }
  .plan-badge.free { background: rgba(255,255,255,0.08); color: #888; }
  .plan-badge.premium { background: linear-gradient(135deg, #F59E0B, #FF6B35); color: white; }
  .plan-text { font-size: 12px; color: #666; }
  .upgrade-btn { font-size: 12px; font-weight: 700; color: #FF6B35; background: rgba(255,107,53,0.1); border: 1px solid rgba(255,107,53,0.2); border-radius: 8px; padding: 6px 12px; cursor: pointer; transition: all 0.2s; }
  .upgrade-btn:hover { background: rgba(255,107,53,0.2); }

  .section-label { font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #666; margin-bottom: 14px; }
  .scenarios-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 24px; }
  .scenario-card { background: rgba(255,255,255,0.03); border: 1.5px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 16px; cursor: pointer; transition: all 0.25s ease; text-align: left; position: relative; overflow: hidden; }
  .scenario-card:hover { background: rgba(255,255,255,0.06); transform: translateY(-2px); }
  .scenario-card.active { border-color: var(--card-color); background: rgba(255,255,255,0.07); box-shadow: 0 0 20px -5px var(--card-color); }
  .scenario-card.locked { opacity: 0.5; cursor: not-allowed; }
  .lock-overlay { position: absolute; top: 8px; right: 8px; font-size: 14px; }
  .scenario-emoji { font-size: 26px; margin-bottom: 8px; display: block; }
  .scenario-title { font-size: 13px; font-weight: 700; color: #f0f0f0; margin-bottom: 4px; }
  .scenario-desc { font-size: 11px; color: #666; line-height: 1.4; }

  .input-section { background: rgba(255,255,255,0.03); border: 1.5px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 20px; margin-bottom: 16px; }
  .input-label { font-size: 13px; font-weight: 600; color: #ccc; margin-bottom: 10px; display: block; }
  .example-hint { font-size: 11px; color: #555; margin-bottom: 12px; font-style: italic; line-height: 1.5; }
  textarea { width: 100%; background: rgba(255,255,255,0.05); border: 1.5px solid rgba(255,255,255,0.1); border-radius: 12px; color: #f0f0f0; font-family: 'Sora', sans-serif; font-size: 14px; padding: 14px; resize: none; outline: none; line-height: 1.6; transition: border-color 0.2s; }
  textarea:focus { border-color: rgba(255,107,53,0.4); }
  textarea::placeholder { color: #444; }

  .analyze-btn { width: 100%; padding: 16px; background: linear-gradient(135deg, #FF6B35, #FF6B9D); border: none; border-radius: 14px; color: white; font-family: 'Sora', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.25s ease; display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 12px; }
  .analyze-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255,107,53,0.4); }
  .analyze-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  .result-card { background: rgba(255,255,255,0.03); border: 1.5px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 20px; margin-top: 16px; animation: slideUp 0.4s ease; }
  @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  .result-header { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .result-icon { width: 40px; height: 40px; background: linear-gradient(135deg, #FF6B35, #FF6B9D); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
  .result-title { font-size: 14px; font-weight: 700; color: #f0f0f0; }
  .result-subtitle { font-size: 11px; color: #666; }
  .ai-response { font-size: 14px; color: #ccc; line-height: 1.9; white-space: pre-wrap; }
  .ai-response strong { color: #FF6B35; font-weight: 700; }

  .tag-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px; }
  .tag { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 100px; padding: 4px 12px; font-size: 11px; color: #666; font-family: 'Space Mono', monospace; }

  .reset-btn { width: 100%; padding: 13px; background: transparent; border: 1.5px solid rgba(255,255,255,0.1); border-radius: 12px; color: #888; font-family: 'Sora', sans-serif; font-size: 14px; cursor: pointer; margin-top: 12px; transition: all 0.2s; }
  .reset-btn:hover { border-color: rgba(255,255,255,0.2); color: #ccc; }

  .error-box { background: rgba(255,80,80,0.1); border: 1px solid rgba(255,80,80,0.2); border-radius: 12px; padding: 14px; color: #ff8080; font-size: 13px; margin-top: 12px; }

  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(8px); }
  .modal { background: #13131a; border: 1.5px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 28px; max-width: 380px; width: 100%; animation: slideUp 0.3s ease; }
  .modal-title { font-size: 22px; font-weight: 800; text-align: center; margin-bottom: 6px; }
  .modal-title span { background: linear-gradient(135deg, #F59E0B, #FF6B35); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .modal-subtitle { font-size: 13px; color: #888; text-align: center; margin-bottom: 24px; }
  .feature-list { list-style: none; margin-bottom: 24px; display: flex; flex-direction: column; gap: 10px; }
  .feature-list li { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #ccc; }
  .feature-list li span { font-size: 16px; }
  .plans { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; }
  .plan-card { border: 1.5px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 16px; text-align: center; cursor: pointer; transition: all 0.2s; }
  .plan-card.selected { border-color: #FF6B35; background: rgba(255,107,53,0.1); }
  .plan-price { font-size: 22px; font-weight: 800; color: #f0f0f0; }
  .plan-period { font-size: 11px; color: #666; }
  .plan-name { font-size: 12px; font-weight: 700; color: #FF6B35; margin-top: 4px; }
  .pay-btn { width: 100%; padding: 14px; background: linear-gradient(135deg, #F59E0B, #FF6B35); border: none; border-radius: 12px; color: white; font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; margin-bottom: 10px; }
  .close-btn { width: 100%; padding: 12px; background: transparent; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: #666; font-family: 'Sora', sans-serif; font-size: 13px; cursor: pointer; }

  .limit-banner { background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.2); border-radius: 12px; padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .limit-text { font-size: 12px; color: #F59E0B; }
  .limit-btn { font-size: 12px; font-weight: 700; color: white; background: linear-gradient(135deg, #F59E0B, #FF6B35); border: none; border-radius: 8px; padding: 6px 12px; cursor: pointer; }
`;

export default function App() {
  const [selected, setSelected] = useState(null);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("monthly");

  const selectedScenario = SCENARIOS.find((s) => s.id === selected);
  const remainingFree = Math.max(0, FREE_LIMIT - usageCount);

  const handleSelect = (scenario) => {
    if (scenario.premium && !isPremium) { setShowUpgrade(true); return; }
    setSelected(scenario.id);
    setQuestion(scenario.example);
    setResult(null);
    setError(null);
  };

  const analyze = async () => {
    if (!question.trim() || !selected) return;
    if (!isPremium && usageCount >= FREE_LIMIT) { setShowUpgrade(true); return; }
    setLoading(true); setResult(null); setError(null);

    const systemPrompt = `You are LifeDecide AI — a warm, friendly, and smart daily life decision coach for everyday people.
Your job is to help users make better decisions by analyzing options, evaluating trade-offs, and explaining reasoning clearly.
Rules:
- Use simple everyday language. No jargon.
- Be warm, supportive, and non-judgmental
- Structure response with emoji headers
- Always explain WHY you recommend something
- Keep it concise but thorough — max 350 words
Format exactly:
🔍 UNDERSTANDING YOUR SITUATION
[1-2 sentences about their situation]

⚖️ YOUR OPTIONS & TRADE-OFFS
[bullet points for each option with pros/cons]

💡 MY RECOMMENDATION
[clear direct advice]

🧠 WHY I THINK THIS
[brief reasoning]

❓ ONE THING TO CONSIDER
[a helpful follow-up thought]`;

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Bearer " + import.meta.env.VITE_GROQ_API_KEY
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 1000,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Category: ${selectedScenario.title}\nMy decision: ${question}\n\nPlease help me think through this decision clearly.` }
          ],
        }),
      });

      if (!response.ok) {
        const e = await response.json().catch(() => ({}));
        throw new Error(e.error?.message || "API error " + response.status);
      }

      const data = await response.json();
      if (data.choices?.[0]) {
        const text = data.choices[0].message.content;
        const formatted = text
          .replace(/(🔍[^\n]*)/g, "**$1**")
          .replace(/(⚖️[^\n]*)/g, "**$1**")
          .replace(/(💡[^\n]*)/g, "**$1**")
          .replace(/(🧠[^\n]*)/g, "**$1**")
          .replace(/(❓[^\n]*)/g, "**$1**");
        setResult(formatted);
        setUsageCount(c => c + 1);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Connection error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setSelected(null); setQuestion(""); setResult(null); setError(null); };

  const renderResult = (text) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part);
  };

  const handleUpgrade = () => {
    setIsPremium(true);
    setShowUpgrade(false);
    setUsageCount(0);
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        <div className="bg-orbs">
          <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
        </div>

        {showUpgrade && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-title">Unlock <span>Premium</span> 👑</div>
              <div className="modal-subtitle">Get unlimited decisions & all 8 categories</div>
              <ul className="feature-list">
                <li><span>✅</span> Unlimited daily decisions</li>
                <li><span>🎓</span> Education & career planning</li>
                <li><span>💪</span> Health & wellness decisions</li>
                <li><span>🚀</span> Business & startup guidance</li>
                <li><span>💻</span> Tech & tools advice</li>
                <li><span>📊</span> Deep analysis mode</li>
              </ul>
              <div className="plans">
                <div className={`plan-card ${selectedPlan === "monthly" ? "selected" : ""}`} onClick={() => setSelectedPlan("monthly")}>
                  <div className="plan-price">$4.99</div>
                  <div className="plan-period">per month</div>
                  <div className="plan-name">Monthly</div>
                </div>
                <div className={`plan-card ${selectedPlan === "yearly" ? "selected" : ""}`} onClick={() => setSelectedPlan("yearly")}>
                  <div className="plan-price">$29.99</div>
                  <div className="plan-period">per year</div>
                  <div className="plan-name">Yearly 🔥</div>
                </div>
              </div>
              <button className="pay-btn" onClick={handleUpgrade}>✨ Activate Premium (Demo)</button>
              <button className="close-btn" onClick={() => setShowUpgrade(false)}>Maybe later</button>
            </div>
          </div>
        )}

        <div className="content">
          <div className="header">
            <div className="logo-badge"><div className="pulse-dot" />AI-Powered · Smart · Instant</div>
            <h1>Life<span>Decide</span> AI</h1>
            <p className="subtitle">Not sure what to do? Tell me your situation and I'll help you think it through — clearly and honestly.</p>
          </div>

          <div className="plan-bar">
            <div className="plan-info">
              <span className={`plan-badge ${isPremium ? "premium" : "free"}`}>{isPremium ? "👑 PREMIUM" : "FREE"}</span>
              <span className="plan-text">{isPremium ? "Unlimited decisions · All categories" : `${remainingFree} free decisions left today`}</span>
            </div>
            {!isPremium && <button className="upgrade-btn" onClick={() => setShowUpgrade(true)}>Upgrade ✨</button>}
          </div>

          {!isPremium && usageCount >= FREE_LIMIT - 1 && usageCount < FREE_LIMIT && (
            <div className="limit-banner">
              <span className="limit-text">⚠️ Last free decision today!</span>
              <button className="limit-btn" onClick={() => setShowUpgrade(true)}>Get Unlimited</button>
            </div>
          )}

          <p className="section-label">Step 1 — What's your decision about?</p>
          <div className="scenarios-grid">
            {SCENARIOS.map((s) => (
              <div key={s.id} className={`scenario-card ${selected === s.id ? "active" : ""} ${s.premium && !isPremium ? "locked" : ""}`} style={{ "--card-color": s.color }} onClick={() => handleSelect(s)}>
                {s.premium && !isPremium && <span className="lock-overlay">🔒</span>}
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
                <p className="example-hint">Be specific! The more details you share, the better I can help you.</p>
                <textarea rows={4} value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Describe your situation or question here..." />
              </div>
              <button className="analyze-btn" onClick={analyze} disabled={loading || !question.trim()}>
                {loading ? <><div className="spinner" />Thinking through your decision...</> : <>🧠 Analyze My Decision</>}
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
              <button className="reset-btn" onClick={reset}>↩ Start a new decision</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
