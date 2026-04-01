import { useState, useEffect, useRef, useCallback } from "react";
import {
  Eye, EyeOff, Mail, Lock, User, Building2, Briefcase,
  ChevronRight, Sparkles, Shield, Zap, Brain, Network,
  CheckCircle2, ArrowRight, RefreshCw, Check, AlertCircle,
  Linkedin, Chrome, Target, Cpu, BarChart3, TrendingUp,
} from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const DEMO_CREDENTIALS = { email: "alex@talentsync.ai", password: "Demo@2025!" };

const RADAR_FRAMES = [
  [
    { skill: "React", candidate: 98, jd: 95 },
    { skill: "Next.js", candidate: 92, jd: 90 },
    { skill: "TypeScript", candidate: 95, jd: 88 },
    { skill: "GraphQL", candidate: 80, jd: 75 },
    { skill: "Node.js", candidate: 70, jd: 65 },
    { skill: "Testing", candidate: 88, jd: 80 },
  ],
  [
    { skill: "Python", candidate: 94, jd: 90 },
    { skill: "ML/AI", candidate: 89, jd: 85 },
    { skill: "FastAPI", candidate: 82, jd: 78 },
    { skill: "Docker", candidate: 91, jd: 88 },
    { skill: "Postgres", candidate: 76, jd: 70 },
    { skill: "Redis", candidate: 85, jd: 80 },
  ],
  [
    { skill: "AWS", candidate: 96, jd: 90 },
    { skill: "Terraform", candidate: 88, jd: 85 },
    { skill: "K8s", candidate: 79, jd: 82 },
    { skill: "CI/CD", candidate: 93, jd: 88 },
    { skill: "Monitoring", candidate: 84, jd: 75 },
    { skill: "Security", candidate: 77, jd: 80 },
  ],
];

const USP_LINES = [
  { stat: "95%", label: "faster technical screening" },
  { stat: "3.2×", label: "better signal-to-noise ratio" },
  { stat: "Zero", label: "black-box AI decisions" },
  { stat: "12.8K", label: "knowledge graph nodes" },
];

const JOB_ROLES = [
  { value: "", label: "Select your role…" },
  { value: "technical_recruiter", label: "Technical Recruiter" },
  { value: "hiring_manager", label: "Hiring Manager" },
  { value: "hr_director", label: "HR Director" },
];

const generateCaptcha = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

// ─── PARTICLE FIELD ───────────────────────────────────────────────────────────

const ParticleField = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.5 ? "#06b6d4" : "#a855f7",
    }));
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "99";
        ctx.fill();
      });
      particles.forEach((a, i) => particles.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(6,182,212,${0.12 * (1 - d / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }));
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

// ─── LOOPING RADAR PANEL ──────────────────────────────────────────────────────

const LiveRadarPanel = () => {
  const [frameIdx, setFrameIdx] = useState(0);
  const [uspIdx, setUspIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setFrameIdx(i => (i + 1) % RADAR_FRAMES.length);
        setUspIdx(i => (i + 1) % USP_LINES.length);
        setFade(true);
      }, 400);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  const data = RADAR_FRAMES[frameIdx];
  const usp = USP_LINES[uspIdx];

  return (
    <div
      className="relative flex flex-col h-full overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0f1a 0%, #0d1424 50%, #080d18 100%)",
      }}
    >
      {/* Particle Network Background */}
      <ParticleField />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }} />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full blur-3xl opacity-10"
        style={{ background: "radial-gradient(circle, #a855f7, transparent)" }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-10 py-10 justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
            style={{ background: "linear-gradient(135deg, #06b6d4, #a855f7)" }}>
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <div className="text-base font-black text-white tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>TalentSync</div>
            <div className="text-[9px] tracking-widest font-bold" style={{ fontFamily: "'Space Mono', monospace", color: "#06b6d4" }}>NEURO-SYMBOLIC AI</div>
          </div>
        </div>

        {/* Main headline */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-xs font-semibold tracking-widest text-cyan-400 uppercase" style={{ fontFamily: "'Space Mono', monospace" }}>
              The Matching Engine
            </div>
            <h1 className="text-4xl font-black text-white leading-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              Stop guessing.<br />
              <span style={{ background: "linear-gradient(90deg, #06b6d4, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Start hiring.
              </span>
            </h1>
          </div>

          {/* Animated USP */}
          <div
            className="transition-all duration-400"
            style={{ opacity: fade ? 1 : 0, transform: fade ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.4s ease, transform 0.4s ease" }}
          >
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-black" style={{ fontFamily: "'Space Mono', monospace", color: "#10b981" }}>{usp.stat}</span>
              <span className="text-lg text-gray-300 font-medium" style={{ fontFamily: "'Sora', sans-serif" }}>{usp.label}</span>
            </div>
          </div>

          {/* Live Radar */}
          <div
            className="rounded-2xl border p-4"
            style={{
              background: "rgba(6, 182, 212, 0.04)",
              borderColor: "rgba(6, 182, 212, 0.15)",
              opacity: fade ? 1 : 0.6,
              transition: "opacity 0.4s ease",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] text-cyan-400 font-mono tracking-widest">LIVE SKILL ANALYSIS</span>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#06b6d4" }} />Candidate
                </span>
                <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#a855f7" }} />JD
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <RadarChart data={data} margin={{ top: 5, right: 25, bottom: 5, left: 25 }}>
                <PolarGrid stroke="rgba(55,65,81,0.6)" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 9, fill: "#6b7280", fontFamily: "'Space Mono', monospace" }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar dataKey="candidate" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.18} strokeWidth={2} dot={false} />
                <Radar dataKey="jd" stroke="#a855f7" fill="#a855f7" fillOpacity={0.08} strokeWidth={1.5} strokeDasharray="4 3" dot={false} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: Brain, label: "Neural Context Engine", color: "#06b6d4" },
            { icon: Network, label: "Knowledge Graph AI", color: "#a855f7" },
            { icon: Shield, label: "Bias-Audited Scoring", color: "#10b981" },
            { icon: Cpu, label: "Local-First Privacy", color: "#06b6d4" },
          ].map(({ icon: Icon, label, color }) => (
            <div key={label}
              className="flex items-center gap-2 rounded-lg px-3 py-2"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <Icon size={12} style={{ color }} />
              <span className="text-[10px] text-gray-400" style={{ fontFamily: "'Sora', sans-serif" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── INPUT FIELD ──────────────────────────────────────────────────────────────

const InputField = ({ label, id, icon: Icon, type = "text", placeholder, value, onChange, error, rightEl, autoComplete }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold text-gray-400 tracking-wide" style={{ fontFamily: "'Sora', sans-serif" }}>
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon size={14} className={focused ? "text-cyan-400" : "text-gray-600"} style={{ transition: "color 0.2s" }} />
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full rounded-xl px-3 py-3 text-sm text-gray-100 placeholder-gray-600 outline-none transition-all duration-200"
          style={{
            fontFamily: "'Sora', sans-serif",
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${error ? "#f87171" : focused ? "#06b6d4" : "rgba(255,255,255,0.08)"}`,
            boxShadow: focused ? "0 0 0 3px rgba(6,182,212,0.12)" : "none",
            paddingLeft: Icon ? "2.25rem" : "0.75rem",
            paddingRight: rightEl ? "2.75rem" : "0.75rem",
          }}
        />
        {rightEl && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightEl}</div>}
      </div>
      {error && (
        <p className="flex items-center gap-1 text-[11px] text-red-400" style={{ fontFamily: "'Sora', sans-serif" }}>
          <AlertCircle size={10} />{error}
        </p>
      )}
    </div>
  );
};

// ─── SELECT FIELD ─────────────────────────────────────────────────────────────

const SelectField = ({ label, id, icon: Icon, value, onChange, options, error }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold text-gray-400 tracking-wide" style={{ fontFamily: "'Sora', sans-serif" }}>
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
            <Icon size={14} className={focused ? "text-cyan-400" : "text-gray-600"} style={{ transition: "color 0.2s" }} />
          </div>
        )}
        <select
          id={id} value={value} onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full rounded-xl pl-9 pr-4 py-3 text-sm outline-none appearance-none transition-all duration-200 cursor-pointer"
          style={{
            fontFamily: "'Sora', sans-serif",
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${error ? "#f87171" : focused ? "#06b6d4" : "rgba(255,255,255,0.08)"}`,
            boxShadow: focused ? "0 0 0 3px rgba(6,182,212,0.12)" : "none",
            color: value ? "#f3f4f6" : "#4b5563",
          }}
        >
          {options.map(o => <option key={o.value} value={o.value} style={{ background: "#111827", color: o.value ? "#f3f4f6" : "#6b7280" }}>{o.label}</option>)}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronRight size={12} className="text-gray-600 rotate-90" />
        </div>
      </div>
      {error && <p className="flex items-center gap-1 text-[11px] text-red-400"><AlertCircle size={10} />{error}</p>}
    </div>
  );
};

// ─── CAPTCHA ──────────────────────────────────────────────────────────────────

const CaptchaWidget = ({ value, onChange, error }) => {
  const [code, setCode] = useState(generateCaptcha);
  const [focused, setFocused] = useState(false);
  const refresh = () => { setCode(generateCaptcha()); onChange(""); };

  const chars = code.split("").map((ch, i) => ({
    ch,
    rot: (Math.random() - 0.5) * 18,
    color: i % 3 === 0 ? "#06b6d4" : i % 3 === 1 ? "#a855f7" : "#94a3b8",
    size: 15 + Math.floor(Math.random() * 5),
  }));

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-400 tracking-wide" style={{ fontFamily: "'Sora', sans-serif" }}>
        CAPTCHA Verification
      </label>
      <div className="flex gap-2">
        {/* Captcha display */}
        <div className="flex-shrink-0 rounded-xl flex items-center justify-center gap-0.5 px-4 select-none"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", height: "46px", minWidth: "140px" }}>
          {/* noise lines */}
          <svg width="140" height="46" style={{ position: "absolute", pointerEvents: "none", opacity: 0.08 }}>
            {Array.from({ length: 4 }, (_, i) => (
              <line key={i}
                x1={Math.random() * 140} y1={Math.random() * 46}
                x2={Math.random() * 140} y2={Math.random() * 46}
                stroke="#94a3b8" strokeWidth="1" />
            ))}
          </svg>
          {chars.map((c, i) => (
            <span key={i} className="font-black inline-block"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: c.size,
                color: c.color,
                transform: `rotate(${c.rot}deg)`,
                display: "inline-block",
                lineHeight: 1,
                letterSpacing: "2px",
              }}>
              {c.ch}
            </span>
          ))}
        </div>
        {/* Refresh */}
        <button type="button" onClick={refresh}
          className="flex-shrink-0 rounded-xl px-3 flex items-center justify-center transition-all duration-200 hover:text-cyan-400"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#6b7280" }}
          title="Refresh CAPTCHA">
          <RefreshCw size={14} />
        </button>
        {/* Input */}
        <div className="relative flex-1">
          <input
            type="text"
            maxLength={6}
            placeholder="Type above code"
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full h-full rounded-xl px-3 py-3 text-sm text-gray-100 placeholder-gray-600 outline-none transition-all duration-200 font-mono"
            style={{
              fontFamily: "'Space Mono', monospace",
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${error ? "#f87171" : focused ? "#06b6d4" : "rgba(255,255,255,0.08)"}`,
              boxShadow: focused ? "0 0 0 3px rgba(6,182,212,0.12)" : "none",
              letterSpacing: "4px",
              textAlign: "center",
            }}
          />
          {value.toUpperCase() === code && value.length === 6 && (
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
              <CheckCircle2 size={14} className="text-emerald-400" />
            </div>
          )}
        </div>
      </div>
      {error && <p className="flex items-center gap-1 text-[11px] text-red-400"><AlertCircle size={10} />{error}</p>}
      {/* Store code so form can validate */}
      <input type="hidden" id="captcha-answer" value={code} />
    </div>
  );
};

// ─── SSO BUTTONS ──────────────────────────────────────────────────────────────

const SSOButtons = () => (
  <div className="grid grid-cols-2 gap-2">
    {[
      {
        label: "Sign in with Google",
        icon: () => (
          <svg width="15" height="15" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
        ),
      },
      {
        label: "Sign in with LinkedIn",
        icon: () => <Linkedin size={14} style={{ color: "#0A66C2" }} />,
      },
    ].map(({ label, icon: Icon }) => (
      <button
        key={label}
        type="button"
        className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold text-gray-300 transition-all duration-200 hover:text-white"
        style={{
          fontFamily: "'Sora', sans-serif",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.09)",
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(6,182,212,0.3)"}
        onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"}
      >
        <Icon />
        {label.replace("Sign in with ", "")}
      </button>
    ))}
  </div>
);

// ─── LOGIN FORM ───────────────────────────────────────────────────────────────

const LoginForm = ({ onSwitch, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaVal, setCaptchaVal] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [demoFlash, setDemoFlash] = useState(false);
  const captchaAnswerRef = useRef(generateCaptcha());

  const handleDemo = () => {
    setDemoFlash(true);
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setCaptchaVal("BYPASS");
    setTimeout(() => setDemoFlash(false), 600);
    setTimeout(() => handleSubmit(true), 900);
  };

  const handleSubmit = (isDemo = false) => {
    const errs = {};
    const em = isDemo ? DEMO_CREDENTIALS.email : email;
    const pw = isDemo ? DEMO_CREDENTIALS.password : password;
    const cap = isDemo ? "BYPASS" : captchaVal;

    if (!em) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(em)) errs.email = "Invalid email format";
    if (!pw) errs.password = "Password is required";
    if (!isDemo) {
      const storedCode = document.getElementById("captcha-answer")?.value;
      if (!cap) errs.captcha = "Please enter the CAPTCHA";
      else if (cap.toUpperCase() !== storedCode && cap !== "BYPASS") errs.captcha = "CAPTCHA doesn't match";
    }
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin?.(); }, 1200);
  };

  return (
    <div className="space-y-5">
      {/* Demo button */}
      <button
        type="button"
        onClick={handleDemo}
        className="w-full rounded-xl py-3.5 flex items-center justify-center gap-2.5 font-bold text-sm transition-all duration-300 relative overflow-hidden group"
        style={{
          fontFamily: "'Sora', sans-serif",
          background: demoFlash
            ? "linear-gradient(135deg, #10b981, #06b6d4)"
            : "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(168,85,247,0.15))",
          border: "1px solid",
          borderColor: demoFlash ? "#10b981" : "rgba(6,182,212,0.35)",
          color: demoFlash ? "#fff" : "#06b6d4",
          boxShadow: demoFlash ? "0 0 20px rgba(16,185,129,0.4)" : "0 0 0 0 transparent",
          transition: "all 0.3s ease",
        }}
      >
        <Zap size={15} />
        {demoFlash ? "Logging in…" : "Login as Demo User (Judges)"}
        <span className="text-[10px] px-2 py-0.5 rounded font-mono"
          style={{ background: "rgba(6,182,212,0.2)", color: "#67e8f9" }}>
          alex@talentsync.ai
        </span>
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
        <span className="text-xs text-gray-600" style={{ fontFamily: "'Space Mono', monospace" }}>or sign in manually</span>
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
      </div>

      {/* SSO */}
      <SSOButtons />

      {/* Fields */}
      <InputField label="Work Email" id="login-email" icon={Mail} type="email"
        placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)}
        error={errors.email} autoComplete="email" />

      <InputField label="Password" id="login-pwd" icon={Lock} type={showPwd ? "text" : "password"}
        placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
        error={errors.password}
        rightEl={
          <button type="button" onClick={() => setShowPwd(v => !v)}
            className="text-gray-500 hover:text-cyan-400 transition-colors">
            {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        } />

      <CaptchaWidget value={captchaVal} onChange={setCaptchaVal} error={errors.captcha} />

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer group">
          <div
            onClick={() => setRememberMe(v => !v)}
            className="w-4 h-4 rounded flex items-center justify-center transition-all duration-200 flex-shrink-0"
            style={{
              background: rememberMe ? "linear-gradient(135deg, #06b6d4, #a855f7)" : "rgba(255,255,255,0.06)",
              border: `1px solid ${rememberMe ? "transparent" : "rgba(255,255,255,0.12)"}`,
            }}
          >
            {rememberMe && <Check size={10} className="text-white" />}
          </div>
          <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors select-none"
            style={{ fontFamily: "'Sora', sans-serif" }}>
            Remember me
          </span>
        </label>
        <button type="button" className="text-xs text-cyan-500 hover:text-cyan-300 transition-colors"
          style={{ fontFamily: "'Sora', sans-serif" }}>
          Forgot password?
        </button>
      </div>

      {/* Submit */}
      <button
        type="button"
        onClick={() => handleSubmit(false)}
        disabled={loading}
        className="w-full rounded-xl py-3.5 font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60"
        style={{
          fontFamily: "'Sora', sans-serif",
          background: loading ? "rgba(6,182,212,0.3)" : "linear-gradient(135deg, #06b6d4 0%, #a855f7 100%)",
          boxShadow: loading ? "none" : "0 4px 24px rgba(6,182,212,0.25)",
        }}
      >
        {loading ? (
          <>
            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Authenticating…
          </>
        ) : (
          <>Sign In <ArrowRight size={14} /></>
        )}
      </button>

      <p className="text-center text-xs text-gray-500" style={{ fontFamily: "'Sora', sans-serif" }}>
        No account?{" "}
        <button type="button" onClick={onSwitch}
          className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
          Create one free →
        </button>
      </p>
    </div>
  );
};

// ─── SIGNUP FORM ──────────────────────────────────────────────────────────────

const SignupForm = ({ onSwitch, onLogin }) => {
  const [fields, setFields] = useState({
    fullName: "", workEmail: "", companyName: "",
    jobTitle: "", password: "", confirmPassword: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const set = (k) => (e) => setFields(f => ({ ...f, [k]: e.target.value }));

  const pwStrength = (() => {
    const p = fields.password;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const pwColor = ["#ef4444", "#f97316", "#eab308", "#10b981"][pwStrength - 1] || "#374151";
  const pwLabel = ["", "Weak", "Fair", "Good", "Strong"][pwStrength];

  const validate = () => {
    const e = {};
    if (!fields.fullName.trim()) e.fullName = "Full name is required";
    if (!fields.workEmail) e.workEmail = "Work email is required";
    else if (!/\S+@\S+\.\S+/.test(fields.workEmail)) e.workEmail = "Invalid email";
    if (!fields.companyName.trim()) e.companyName = "Company name is required";
    if (!fields.jobTitle) e.jobTitle = "Please select your role";
    if (!fields.password) e.password = "Password is required";
    else if (fields.password.length < 8) e.password = "Minimum 8 characters";
    if (fields.confirmPassword !== fields.password) e.confirmPassword = "Passwords don't match";
    if (!agreed) e.agreed = "You must accept the terms";
    return e;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin?.(); }, 1400);
  };

  return (
    <div className="space-y-4">
      {/* SSO */}
      <SSOButtons />
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
        <span className="text-xs text-gray-600" style={{ fontFamily: "'Space Mono', monospace" }}>or register with email</span>
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <InputField label="Full Name" id="su-name" icon={User} placeholder="Alex Rivera"
          value={fields.fullName} onChange={set("fullName")} error={errors.fullName} />
        <InputField label="Company Name" id="su-company" icon={Building2} placeholder="Acme Corp"
          value={fields.companyName} onChange={set("companyName")} error={errors.companyName} />
      </div>

      <InputField label="Work Email" id="su-email" icon={Mail} type="email"
        placeholder="alex@acmecorp.com" value={fields.workEmail}
        onChange={set("workEmail")} error={errors.workEmail} />

      <SelectField label="Job Title / Role" id="su-role" icon={Briefcase}
        value={fields.jobTitle} onChange={set("jobTitle")}
        options={JOB_ROLES} error={errors.jobTitle} />

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <InputField label="Password" id="su-pwd" icon={Lock}
            type={showPwd ? "text" : "password"} placeholder="Min. 8 characters"
            value={fields.password} onChange={set("password")} error={errors.password}
            rightEl={
              <button type="button" onClick={() => setShowPwd(v => !v)}
                className="text-gray-500 hover:text-cyan-400 transition-colors">
                {showPwd ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            } />
          {fields.password && (
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5 flex-1">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
                    style={{ background: i <= pwStrength ? pwColor : "#1f2937" }} />
                ))}
              </div>
              <span className="text-[10px] font-semibold" style={{ color: pwColor, fontFamily: "'Space Mono', monospace" }}>
                {pwLabel}
              </span>
            </div>
          )}
        </div>
        <InputField label="Confirm Password" id="su-confirm" icon={Lock}
          type={showConfirm ? "text" : "password"} placeholder="Repeat password"
          value={fields.confirmPassword} onChange={set("confirmPassword")} error={errors.confirmPassword}
          rightEl={
            <button type="button" onClick={() => setShowConfirm(v => !v)}
              className="text-gray-500 hover:text-cyan-400 transition-colors">
              {showConfirm ? <EyeOff size={13} /> : <Eye size={13} />}
            </button>
          } />
      </div>

      {/* RBAC badge */}
      {fields.jobTitle && (
        <div className="flex items-center gap-2 rounded-lg px-3 py-2"
          style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.2)" }}>
          <Shield size={12} className="text-purple-400 flex-shrink-0" />
          <p className="text-[11px] text-purple-300" style={{ fontFamily: "'Sora', sans-serif" }}>
            <strong>Role-Based Access:</strong>{" "}
            {fields.jobTitle === "technical_recruiter" && "You'll access candidate scoring, interview transcripts, and pipeline management."}
            {fields.jobTitle === "hiring_manager" && "You'll access team dashboards, approval workflows, and headcount analytics."}
            {fields.jobTitle === "hr_director" && "You'll access org-wide metrics, audit logs, bias reports, and RBAC configuration."}
          </p>
        </div>
      )}

      {/* Terms */}
      <label className="flex items-start gap-2.5 cursor-pointer group">
        <div
          onClick={() => setAgreed(v => !v)}
          className="w-4 h-4 rounded mt-0.5 flex items-center justify-center transition-all duration-200 flex-shrink-0"
          style={{
            background: agreed ? "linear-gradient(135deg, #06b6d4, #a855f7)" : "rgba(255,255,255,0.06)",
            border: `1px solid ${errors.agreed ? "#f87171" : agreed ? "transparent" : "rgba(255,255,255,0.12)"}`,
          }}
        >
          {agreed && <Check size={10} className="text-white" />}
        </div>
        <span className="text-xs text-gray-400 leading-relaxed select-none" style={{ fontFamily: "'Sora', sans-serif" }}>
          I agree to the{" "}
          <button type="button" className="text-cyan-400 hover:underline">Terms of Service</button>
          {" "}and{" "}
          <button type="button" className="text-cyan-400 hover:underline">Privacy Policy</button>
          . TalentSync processes resume data locally.
        </span>
      </label>
      {errors.agreed && <p className="flex items-center gap-1 text-[11px] text-red-400"><AlertCircle size={10} />{errors.agreed}</p>}

      {/* Submit */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="w-full rounded-xl py-3.5 font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60"
        style={{
          fontFamily: "'Sora', sans-serif",
          background: loading ? "rgba(168,85,247,0.3)" : "linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)",
          boxShadow: loading ? "none" : "0 4px 24px rgba(168,85,247,0.25)",
        }}
      >
        {loading ? (
          <>
            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Creating workspace…
          </>
        ) : (
          <>Create Free Account <ArrowRight size={14} /></>
        )}
      </button>

      <p className="text-center text-xs text-gray-500" style={{ fontFamily: "'Sora', sans-serif" }}>
        Already have an account?{" "}
        <button type="button" onClick={onSwitch}
          className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
          Sign in →
        </button>
      </p>
    </div>
  );
};

// ─── SUCCESS SCREEN ───────────────────────────────────────────────────────────

const SuccessScreen = () => (
  <div className="flex flex-col items-center justify-center h-full gap-6 text-center px-8">
    <div className="w-20 h-20 rounded-full flex items-center justify-center"
      style={{ background: "rgba(16,185,129,0.1)", border: "2px solid rgba(16,185,129,0.3)", boxShadow: "0 0 40px rgba(16,185,129,0.2)" }}>
      <CheckCircle2 size={40} className="text-emerald-400" />
    </div>
    <div>
      <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>You're in.</h3>
      <p className="text-sm text-gray-400" style={{ fontFamily: "'Sora', sans-serif" }}>
        Redirecting to your TalentSync dashboard…
      </p>
    </div>
    <div className="w-48 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
      <div className="h-full rounded-full" style={{
        background: "linear-gradient(90deg, #10b981, #06b6d4)",
        animation: "loadbar 1.2s ease forwards",
      }} />
    </div>
    <style>{`@keyframes loadbar { from { width: 0% } to { width: 100% } }`}</style>
  </div>
);

// ─── MAIN AUTH PAGE ───────────────────────────────────────────────────────────

export default function SignUp() {
  const [mode, setMode] = useState("login"); // login | signup | success
  const [mounted, setMounted] = useState(false);
  const [panelKey, setPanelKey] = useState(0);

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  const switchMode = (next) => {
    setPanelKey(k => k + 1);
    setMode(next);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Sora:wght@300;400;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body, #root { height: 100%; margin: 0; padding: 0; }
        body { background: #030712; }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin { animation: spin 0.8s linear infinite; }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
        .auth-panel { animation: fadeSlideIn 0.5s ease forwards; }
        .form-panel { animation: slideInRight 0.4s ease forwards; }
      `}</style>

      <div className="flex w-full min-h-screen" style={{ fontFamily: "'Sora', sans-serif", background: "#050a14" }}>

        {/* ── LEFT: Form Panel ── */}
        <div
          className="flex flex-col justify-center w-full lg:w-[45%] xl:w-[42%] min-h-screen relative"
          style={{
            background: "linear-gradient(160deg, #080d1a 0%, #060b14 100%)",
            borderRight: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* top-right corner decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle at top right, rgba(6,182,212,0.06), transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle at bottom left, rgba(168,85,247,0.06), transparent 70%)" }} />

          <div className="relative z-10 w-full max-w-md mx-auto px-8 py-10">
            {/* Mobile logo */}
            <div className="flex items-center gap-3 mb-8 lg:hidden">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #06b6d4, #a855f7)" }}>
                <Sparkles size={15} className="text-white" />
              </div>
              <div>
                <div className="text-sm font-black text-white">TalentSync</div>
                <div className="text-[9px] tracking-widest" style={{ fontFamily: "'Space Mono', monospace", color: "#06b6d4" }}>NEURO-SYMBOLIC AI</div>
              </div>
            </div>

            {mode === "success" ? (
              <div className="h-80 auth-panel">
                <SuccessScreen />
              </div>
            ) : (
              <div key={panelKey} className="form-panel">
                {/* Mode toggle tabs */}
                <div className="flex rounded-xl p-1 mb-7" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  {["login", "signup"].map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => switchMode(m)}
                      className="flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 capitalize"
                      style={{
                        fontFamily: "'Sora', sans-serif",
                        background: mode === m ? "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(168,85,247,0.2))" : "transparent",
                        border: mode === m ? "1px solid rgba(6,182,212,0.3)" : "1px solid transparent",
                        color: mode === m ? "#e2e8f0" : "#6b7280",
                        boxShadow: mode === m ? "0 0 12px rgba(6,182,212,0.1)" : "none",
                      }}
                    >
                      {m === "login" ? "Sign In" : "Create Account"}
                    </button>
                  ))}
                </div>

                {/* Heading */}
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {mode === "login" ? "Welcome back" : "Start for free"}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {mode === "login"
                      ? "Sign in to your TalentSync workspace"
                      : "Build your AI-powered hiring pipeline today"}
                  </p>
                </div>

                {mode === "login" ? (
                  <LoginForm onSwitch={() => switchMode("signup")} onLogin={() => setMode("success")} />
                ) : (
                  <SignupForm onSwitch={() => switchMode("login")} onLogin={() => setMode("success")} />
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: Visual Panel ── */}
        <div className="hidden lg:block flex-1 relative overflow-hidden">
          <LiveRadarPanel />
        </div>
      </div>
    </>
  );
}
