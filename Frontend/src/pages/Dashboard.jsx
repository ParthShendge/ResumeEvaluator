import { useState, useEffect, useRef, useCallback } from "react";
import {
  LayoutDashboard, Users, MessageSquare, Settings, Search,
  Upload, FileText, Zap, Brain, Network, ChevronRight,
  CheckCircle2, Clock, Star, TrendingUp, Shield, Cpu,
  BarChart3, ArrowUpRight, X, ChevronDown, Bot, User,
  Sparkles, GitBranch, Database, Activity, AlertCircle,
  Award, Target, Eye
} from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip, RadialBarChart, RadialBar, Cell,
  AreaChart, Area, XAxis, YAxis
} from "recharts";

// ─── DUMMY DATA ───────────────────────────────────────────────────────────────

const CANDIDATES = [
  {
    id: 1, rank: 1, name: "Priya Mehta", role: "Senior Frontend Engineer",
    avatar: "PM", overall: 94, hardSkills: 97, context: 91,
    verified: true, status: "hired",
    radarData: [
      { skill: "React", candidate: 98, jd: 95 },
      { skill: "Next.js", candidate: 92, jd: 90 },
      { skill: "TypeScript", candidate: 95, jd: 88 },
      { skill: "GraphQL", candidate: 80, jd: 75 },
      { skill: "Node.js", candidate: 70, jd: 65 },
      { skill: "Testing", candidate: 88, jd: 80 },
    ],
    kgExpansions: [
      { original: "React", expanded: "Next.js", score: 0.94, path: ["React", "React Ecosystem", "Next.js"], type: "framework" },
      { original: "React", expanded: "Redux", score: 0.88, path: ["React", "State Management", "Redux"], type: "library" },
      { original: "TypeScript", expanded: "Type-safe APIs", score: 0.91, path: ["TypeScript", "Type Safety", "API Design"], type: "concept" },
      { original: "Performance", expanded: "Lighthouse Optimization", score: 0.79, path: ["Performance", "Web Vitals", "Lighthouse"], type: "tool" },
    ],
    interview: [
      { q: "You have React listed as your primary skill. Walk me through how you've used server-side rendering in a production Next.js app — what caching strategy did you use?", a: "In my last role at FinTech startup Fluxr, we migrated our dashboard to Next.js 13 with the App Router. I implemented ISR with a 60-second revalidate window for market data pages, and full SSR for user-specific portfolio views. For caching, we used a Redis layer with SWR on the client — it dropped our TTFB from 1.2s to under 200ms.", role: "bot" },
      { q: "Impressive. Our JD mentions GraphQL expertise. Describe a time you debugged an N+1 query problem in a GraphQL API.", a: "Sure — we hit this hard with our transaction history feature. Used DataLoader to batch-resolve related account objects. Each query was triggering 50-100 DB hits. After batching, we were down to 3 queries per request. I also added persisted queries to reduce payload size on mobile clients.", role: "bot" },
      { q: "Last one: The role involves leading a team of 4 engineers. How do you balance code quality with sprint velocity?", a: "I run async PR reviews with a 24-hour SLA — never blocking merges for style nits, only for correctness. I introduced Architecture Decision Records for anything that affects more than one service. Velocity improved by 30% in Q3 because engineers stopped waiting for synchronous approvals.", role: "bot" },
    ],
  },
  {
    id: 2, rank: 2, name: "Arjun Sharma", role: "Full Stack Engineer",
    avatar: "AS", overall: 87, hardSkills: 89, context: 85,
    verified: true, status: "interview",
    radarData: [
      { skill: "React", candidate: 88, jd: 95 },
      { skill: "Next.js", candidate: 79, jd: 90 },
      { skill: "TypeScript", candidate: 85, jd: 88 },
      { skill: "GraphQL", candidate: 72, jd: 75 },
      { skill: "Node.js", candidate: 91, jd: 65 },
      { skill: "Testing", candidate: 75, jd: 80 },
    ],
    kgExpansions: [
      { original: "Node.js", expanded: "Express.js", score: 0.96, path: ["Node.js", "HTTP Framework", "Express.js"], type: "framework" },
      { original: "React", expanded: "React Query", score: 0.82, path: ["React", "Data Fetching", "React Query"], type: "library" },
      { original: "Docker", expanded: "Container Orchestration", score: 0.87, path: ["Docker", "DevOps", "Orchestration"], type: "concept" },
    ],
    interview: [
      { q: "Your resume shows strong Node.js background. How have you structured a multi-tenant REST API at scale?", a: "At my previous company I designed a middleware-driven tenant resolution system. Each request carries a tenant ID in the JWT, and we resolve to a schema-per-tenant PostgreSQL setup. Rate limiting and quota enforcement happen at the gateway level using Kong.", role: "bot" },
      { q: "Tell me about your experience with CI/CD pipelines.", a: "I set up GitHub Actions pipelines with matrix builds for Node 18 and 20. Staging deploys happen on every PR merge, production requires a manual approval gate. I also wired in Snyk for dependency scanning — blocked 3 critical CVEs last quarter.", role: "bot" },
      { q: "How do you approach database migrations in a zero-downtime deployment?", a: "Expand-contract pattern strictly. First deploy adds the new column as nullable, second deploy backfills and adds the constraint, third removes the old column. I use Flyway with a migration lock to prevent concurrent execution.", role: "bot" },
    ],
  },
  {
    id: 3, rank: 3, name: "Sara O'Brien", role: "Frontend Developer",
    avatar: "SO", overall: 81, hardSkills: 78, context: 84,
    verified: false, status: "pending",
    radarData: [
      { skill: "React", candidate: 82, jd: 95 },
      { skill: "Next.js", candidate: 70, jd: 90 },
      { skill: "TypeScript", candidate: 75, jd: 88 },
      { skill: "GraphQL", candidate: 60, jd: 75 },
      { skill: "Node.js", candidate: 50, jd: 65 },
      { skill: "Testing", candidate: 90, jd: 80 },
    ],
    kgExpansions: [
      { original: "CSS", expanded: "Tailwind CSS", score: 0.93, path: ["CSS", "Utility CSS", "Tailwind"], type: "framework" },
      { original: "Testing", expanded: "Cypress E2E", score: 0.88, path: ["Testing", "E2E Testing", "Cypress"], type: "tool" },
    ],
    interview: [],
  },
  {
    id: 4, rank: 4, name: "Kenji Watanabe", role: "React Developer",
    avatar: "KW", overall: 74, hardSkills: 80, context: 68,
    verified: false, status: "review",
    radarData: [
      { skill: "React", candidate: 85, jd: 95 },
      { skill: "Next.js", candidate: 60, jd: 90 },
      { skill: "TypeScript", candidate: 78, jd: 88 },
      { skill: "GraphQL", candidate: 45, jd: 75 },
      { skill: "Node.js", candidate: 40, jd: 65 },
      { skill: "Testing", candidate: 65, jd: 80 },
    ],
    kgExpansions: [
      { original: "React", expanded: "React Native", score: 0.71, path: ["React", "Mobile", "React Native"], type: "framework" },
    ],
    interview: [],
  },
  {
    id: 5, rank: 5, name: "Amara Diallo", role: "UI Engineer",
    avatar: "AD", overall: 69, hardSkills: 65, context: 73,
    verified: false, status: "review",
    radarData: [
      { skill: "React", candidate: 70, jd: 95 },
      { skill: "Next.js", candidate: 55, jd: 90 },
      { skill: "TypeScript", candidate: 60, jd: 88 },
      { skill: "GraphQL", candidate: 40, jd: 75 },
      { skill: "Node.js", candidate: 35, jd: 65 },
      { skill: "Testing", candidate: 72, jd: 80 },
    ],
    kgExpansions: [
      { original: "Figma", expanded: "Design Systems", score: 0.85, path: ["Figma", "Design", "Systems"], type: "concept" },
    ],
    interview: [],
  },
];

const KPI_STATS = [
  { label: "Resumes Processed", value: "500", unit: "locally", icon: FileText, color: "cyan" },
  { label: "Cloud Compute Saved", value: "95%", unit: "vs baseline", icon: Cpu, color: "emerald" },
  { label: "Avg Match Accuracy", value: "91.4%", unit: "F1 score", icon: Target, color: "purple" },
  { label: "KG Nodes", value: "12.8K", unit: "expanded", icon: Network, color: "cyan" },
];

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "candidates", label: "Candidates", icon: Users },
  { id: "interviews", label: "Interviews", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: Settings },
];

const PIPELINE_PHASES = [
  { label: "Parsing", icon: FileText, color: "#06b6d4", desc: "Extracting structured data from PDFs" },
  { label: "KG Expansion", icon: Network, color: "#a855f7", desc: "Traversing skill knowledge graph" },
  { label: "Vector Math", icon: Brain, color: "#06b6d4", desc: "Computing dual-vector embeddings" },
  { label: "RRF Scoring", icon: BarChart3, color: "#10b981", desc: "Reciprocal Rank Fusion scoring" },
];

// ─── HELPER COMPONENTS ────────────────────────────────────────────────────────

const GlowDot = ({ color = "cyan" }) => {
  const colors = { cyan: "bg-cyan-400", purple: "bg-purple-400", emerald: "bg-emerald-400" };
  return (
    <span className="relative flex h-2 w-2">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colors[color]} opacity-75`} />
      <span className={`relative inline-flex rounded-full h-2 w-2 ${colors[color]}`} />
    </span>
  );
};

const ScorePill = ({ value, color = "cyan" }) => {
  const configs = {
    cyan: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30",
    purple: "bg-purple-500/10 text-purple-300 border border-purple-500/30",
    emerald: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30",
    amber: "bg-amber-500/10 text-amber-300 border border-amber-500/30",
    red: "bg-red-500/10 text-red-300 border border-red-500/30",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-bold ${configs[color]}`}>
      {value}%
    </span>
  );
};

const StatusBadge = ({ verified, status }) => {
  if (verified) return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
      <Shield size={10} />
      AI Verified
    </span>
  );
  const configs = {
    pending: { cls: "bg-amber-500/10 text-amber-300 border-amber-500/30", label: "Pending" },
    review: { cls: "bg-gray-500/10 text-gray-400 border-gray-500/30", label: "In Review" },
    interview: { cls: "bg-blue-500/10 text-blue-300 border-blue-500/30", label: "Interview" },
  };
  const c = configs[status] || configs.review;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${c.cls}`}>
      <Clock size={10} />
      {c.label}
    </span>
  );
};

const AvatarRing = ({ initials, rank, size = "md" }) => {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-lg" };
  const colors = ["from-cyan-500 to-blue-600", "from-purple-500 to-pink-600", "from-emerald-500 to-teal-600", "from-amber-500 to-orange-600", "from-red-500 to-rose-600"];
  return (
    <div className={`relative ${sizes[size]} rounded-full bg-gradient-to-br ${colors[(rank - 1) % colors.length]} flex items-center justify-center font-bold text-white shadow-lg`}>
      {initials}
    </div>
  );
};

// ─── GAUGE CHART ──────────────────────────────────────────────────────────────

const GaugeChart = ({ value }) => {
  const data = [{ value, fill: value >= 90 ? "#10b981" : value >= 75 ? "#06b6d4" : "#a855f7" }];
  return (
    <div className="relative w-48 h-28 mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="85%" innerRadius="70%" outerRadius="100%"
          startAngle={180} endAngle={0} data={[{ value: 100, fill: "#1f2937" }, ...data]}>
          <RadialBar dataKey="value" cornerRadius={8} background={false} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
        <span className="text-3xl font-black text-white font-mono">{value}</span>
        <span className="text-xs text-gray-400 -mt-0.5">Fused Score</span>
      </div>
    </div>
  );
};

// ─── 1. DASHBOARD LAYOUT ──────────────────────────────────────────────────────

const DashboardLayout = ({ children, activeNav, setActiveNav, onNavigate }) => {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="flex h-screen bg-gray-950 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-black text-white tracking-tight">TalentSync</div>
              <div className="text-[10px] text-cyan-400 font-mono tracking-widest">NEURO-SYMBOLIC AI</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = activeNav === item.id;
            return (
              <button key={item.id} onClick={() => { setActiveNav(item.id); onNavigate?.(item.id); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  active
                    ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                }`}>
                <Icon size={16} className={active ? "text-cyan-400" : "text-gray-500 group-hover:text-gray-300"} />
                {item.label}
                {active && <ChevronRight size={14} className="ml-auto text-cyan-500" />}
              </button>
            );
          })}
        </nav>

        {/* System Status */}
        <div className="px-4 py-4 border-t border-gray-800">
          <div className="bg-gray-800/50 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">System Status</span>
              <GlowDot color="emerald" />
            </div>
            <div className="space-y-1.5">
              {[
                { label: "Neural Engine", color: "cyan" },
                { label: "Knowledge Graph", color: "purple" },
                { label: "Vector Store", color: "emerald" },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">{s.label}</span>
                  <div className={`h-1 w-12 rounded-full bg-gray-700 overflow-hidden`}>
                    <div className={`h-full w-full rounded-full ${s.color === "cyan" ? "bg-cyan-500" : s.color === "purple" ? "bg-purple-500" : "bg-emerald-500"} animate-pulse`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-gray-900/80 backdrop-blur border-b border-gray-800 flex items-center px-6 gap-6 flex-shrink-0">
          {/* Search */}
          <div className={`relative flex-1 max-w-md transition-all duration-300 ${searchFocused ? "max-w-lg" : ""}`}>
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full bg-gray-800 border border-gray-700 focus:border-cyan-500/50 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none transition-all font-mono"
              placeholder="Search candidates, roles, skills..."
            />
          </div>

          {/* KPI Pills */}
          <div className="hidden lg:flex items-center gap-3">
            {KPI_STATS.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div key={kpi.label} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs ${
                  kpi.color === "cyan" ? "bg-cyan-500/5 border-cyan-500/20 text-cyan-300" :
                  kpi.color === "emerald" ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-300" :
                  "bg-purple-500/5 border-purple-500/20 text-purple-300"
                }`}>
                  <Icon size={12} />
                  <span className="font-black font-mono">{kpi.value}</span>
                  <span className="text-gray-500">{kpi.label}</span>
                </div>
              );
            })}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto bg-gray-950">
          {children}
        </main>
      </div>
    </div>
  );
};

// ─── 2. INGESTION ZONE ────────────────────────────────────────────────────────

const IngestionZone = ({ onComplete }) => {
  const [jdDragging, setJdDragging] = useState(false);
  const [resDragging, setResDragging] = useState(false);
  const [jdFile, setJdFile] = useState(null);
  const [resFiles, setResFiles] = useState(null);
  const [pipeline, setPipeline] = useState(null); // null | running | done
  const [phaseIndex, setPhaseIndex] = useState(-1);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const intervalRef = useRef(null);

  const runPipeline = useCallback(() => {
    if (!jdFile || !resFiles) return;
    setPipeline("running");
    setPhaseIndex(0);
    setPhaseProgress(0);
    let phase = 0;
    let progress = 0;
    intervalRef.current = setInterval(() => {
      progress += Math.random() * 18 + 8;
      if (progress >= 100) {
        progress = 100;
        setPhaseProgress(100);
        setTimeout(() => {
          phase++;
          if (phase >= PIPELINE_PHASES.length) {
            clearInterval(intervalRef.current);
            setPipeline("done");
            setPhaseIndex(PIPELINE_PHASES.length);
            setTimeout(() => onComplete?.(), 800);
          } else {
            setPhaseIndex(phase);
            setPhaseProgress(0);
            progress = 0;
          }
        }, 300);
      } else {
        setPhaseProgress(Math.min(progress, 99));
      }
    }, 120);
  }, [jdFile, resFiles, onComplete]);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const DropZone = ({ side, dragging, setDragging, file, setFile, label, accept, icon: Icon }) => (
    <div
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => { e.preventDefault(); setDragging(false); setFile(e.dataTransfer.files[0]?.name || "file.pdf"); }}
      className={`relative flex-1 rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-4 p-8 cursor-pointer group
        ${dragging ? (side === "jd" ? "border-cyan-400 bg-cyan-500/5" : "border-purple-400 bg-purple-500/5") : "border-gray-700 hover:border-gray-600 bg-gray-900/50"}
        ${file ? (side === "jd" ? "border-cyan-500/40 bg-cyan-500/5" : "border-purple-500/40 bg-purple-500/5") : ""}
      `}
    >
      {file ? (
        <div className="text-center space-y-3">
          <div className={`w-12 h-12 rounded-xl mx-auto flex items-center justify-center ${side === "jd" ? "bg-cyan-500/20" : "bg-purple-500/20"}`}>
            <CheckCircle2 size={24} className={side === "jd" ? "text-cyan-400" : "text-purple-400"} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white truncate max-w-48">{file}</p>
            <p className="text-xs text-gray-500 mt-1">{side === "jd" ? "Job Description loaded" : "Candidate batch loaded"}</p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); setFile(null); }}
            className="text-xs text-gray-500 hover:text-red-400 transition-colors">
            Remove
          </button>
        </div>
      ) : (
        <>
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
            side === "jd" ? "bg-cyan-500/10 group-hover:bg-cyan-500/20" : "bg-purple-500/10 group-hover:bg-purple-500/20"
          }`}>
            <Icon size={28} className={side === "jd" ? "text-cyan-400" : "text-purple-400"} />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-200">{label}</p>
            <p className="text-xs text-gray-500 mt-1">{accept}</p>
            <p className="text-xs text-gray-600 mt-2">Drag & drop or click to browse</p>
          </div>
          <button
            onClick={() => setFile(side === "jd" ? "senior_frontend_engineer_jd.pdf" : "candidates_batch_47.zip")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              side === "jd"
                ? "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                : "bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30"
            }`}>
            Browse Files
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-xl font-black text-white tracking-tight">Ingestion Pipeline</h2>
        <p className="text-sm text-gray-400 mt-1">Upload a Job Description and candidate resumes to begin the matching engine.</p>
      </div>

      {/* Drop Zones */}
      <div className="flex gap-4 h-64">
        <DropZone side="jd" dragging={jdDragging} setDragging={setJdDragging}
          file={jdFile} setFile={setJdFile} label="Upload Job Description"
          accept="PDF files accepted" icon={FileText} />
        <div className="flex items-center justify-center flex-shrink-0">
          <div className="w-px h-full bg-gray-800" />
          <div className="absolute bg-gray-950 px-2">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
              <Zap size={14} className="text-cyan-400" />
            </div>
          </div>
        </div>
        <DropZone side="res" dragging={resDragging} setDragging={setResDragging}
          file={resFiles} setFile={setResFiles} label="Upload Candidate Resumes"
          accept="PDF or ZIP batch" icon={Users} />
      </div>

      {/* Run Button */}
      {pipeline === null && (
        <div className="flex justify-center">
          <button
            onClick={runPipeline}
            disabled={!jdFile || !resFiles}
            className={`flex items-center gap-3 px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
              jdFile && resFiles
                ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105"
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            }`}>
            <Brain size={18} />
            Run Neuro-Symbolic Matching Engine
            <ArrowUpRight size={16} />
          </button>
        </div>
      )}

      {/* Pipeline Progress */}
      {pipeline && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-cyan-400 animate-pulse" />
              <span className="text-sm font-bold text-white">
                {pipeline === "done" ? "Pipeline Complete" : "Processing Pipeline"}
              </span>
            </div>
            {pipeline === "done" && (
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 size={14} />
                500 candidates ranked
              </span>
            )}
          </div>

          {/* Phase Steps */}
          <div className="grid grid-cols-4 gap-3">
            {PIPELINE_PHASES.map((phase, i) => {
              const Icon = phase.icon;
              const done = phaseIndex > i || pipeline === "done";
              const active = phaseIndex === i && pipeline === "running";
              return (
                <div key={phase.label} className={`relative rounded-lg p-3 border transition-all duration-500 ${
                  done ? "bg-emerald-500/5 border-emerald-500/20"
                  : active ? "bg-gray-800 border-cyan-500/30"
                  : "bg-gray-800/50 border-gray-800"
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {done
                      ? <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                      : active
                        ? <Icon size={14} className="text-cyan-400 animate-pulse flex-shrink-0" />
                        : <Icon size={14} className="text-gray-600 flex-shrink-0" />
                    }
                    <span className={`text-xs font-semibold truncate ${done ? "text-emerald-300" : active ? "text-cyan-300" : "text-gray-500"}`}>
                      {phase.label}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-tight">{phase.desc}</p>
                  {active && (
                    <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-500 rounded-full transition-all duration-150"
                        style={{ width: `${phaseProgress}%` }} />
                    </div>
                  )}
                  {done && (
                    <div className="mt-2 h-1 bg-emerald-500 rounded-full" />
                  )}
                  {!active && !done && (
                    <div className="mt-2 h-1 bg-gray-700 rounded-full" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Overall bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Overall Progress</span>
              <span className="font-mono">{pipeline === "done" ? "100" : Math.round((phaseIndex / PIPELINE_PHASES.length) * 100 + phaseProgress / PIPELINE_PHASES.length)}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: pipeline === "done" ? "100%" : `${(phaseIndex / PIPELINE_PHASES.length) * 100 + phaseProgress / PIPELINE_PHASES.length}%`,
                  background: "linear-gradient(90deg, #06b6d4, #a855f7, #10b981)"
                }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── 3. CANDIDATE LEADERBOARD ─────────────────────────────────────────────────

const CandidateLeaderboard = ({ onSelect }) => {
  const [sortCol, setSortCol] = useState("overall");
  const [hovered, setHovered] = useState(null);

  const sorted = [...CANDIDATES].sort((a, b) => b[sortCol] - a[sortCol]);

  const getScoreColor = (v) => v >= 90 ? "emerald" : v >= 80 ? "cyan" : v >= 70 ? "purple" : "amber";

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight">Candidate Leaderboard</h2>
          <p className="text-sm text-gray-400 mt-1">Ranked by RRF-fused Neuro-Symbolic score</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg">
            <GlowDot color="cyan" />
            <span>Neural</span>
            <span className="text-gray-600 mx-1">+</span>
            <GlowDot color="purple" />
            <span>Symbolic</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[40px_1fr_140px_130px_130px_160px_100px] gap-0 border-b border-gray-800 px-4 py-3">
          {[
            { key: null, label: "#" },
            { key: null, label: "Candidate" },
            { key: "overall", label: "Overall Match" },
            { key: "hardSkills", label: "Hard Skills" },
            { key: "context", label: "Context Fit" },
            { key: null, label: "Verification" },
            { key: null, label: "" },
          ].map((col, i) => (
            <div key={i} onClick={() => col.key && setSortCol(col.key)}
              className={`text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1
                ${col.key ? "cursor-pointer hover:text-gray-300 transition-colors" : ""}
                ${sortCol === col.key ? "text-cyan-400" : ""}
              `}>
              {col.label}
              {col.key && <ChevronDown size={10} className={sortCol === col.key ? "text-cyan-400" : ""} />}
            </div>
          ))}
        </div>

        {/* Rows */}
        {sorted.map((c) => (
          <div key={c.id}
            onMouseEnter={() => setHovered(c.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelect(c)}
            className={`grid grid-cols-[40px_1fr_140px_130px_130px_160px_100px] gap-0 items-center px-4 py-3.5 border-b border-gray-800/60 cursor-pointer transition-all duration-150
              ${hovered === c.id ? "bg-gray-800/50" : ""}
            `}>
            {/* Rank */}
            <div className="flex items-center">
              {c.rank <= 3
                ? <span className={`text-sm font-black ${c.rank === 1 ? "text-amber-400" : c.rank === 2 ? "text-gray-400" : "text-amber-700"}`}>
                    {c.rank === 1 ? "🥇" : c.rank === 2 ? "🥈" : "🥉"}
                  </span>
                : <span className="text-sm font-mono text-gray-600">{c.rank}</span>
              }
            </div>
            {/* Candidate */}
            <div className="flex items-center gap-3">
              <AvatarRing initials={c.avatar} rank={c.rank} />
              <div>
                <p className="text-sm font-semibold text-white">{c.name}</p>
                <p className="text-xs text-gray-500">{c.role}</p>
              </div>
            </div>
            {/* Overall */}
            <div className="flex items-center gap-2">
              <div className="flex-1 max-w-20 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${c.overall}%`,
                    background: c.overall >= 90 ? "#10b981" : c.overall >= 80 ? "#06b6d4" : "#a855f7"
                  }} />
              </div>
              <ScorePill value={c.overall} color={getScoreColor(c.overall)} />
            </div>
            {/* Hard Skills */}
            <div><ScorePill value={c.hardSkills} color="cyan" /></div>
            {/* Context */}
            <div><ScorePill value={c.context} color="purple" /></div>
            {/* Verification */}
            <div><StatusBadge verified={c.verified} status={c.status} /></div>
            {/* CTA */}
            <div className="flex justify-end">
              <button onClick={(e) => { e.stopPropagation(); onSelect(c); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200
                  ${hovered === c.id ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30" : "text-gray-600 border border-transparent"}
                `}>
                <Eye size={12} />
                View XAI
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── KG NODE ──────────────────────────────────────────────────────────────────

const KGExpansionLog = ({ expansions }) => {
  const [expanded, setExpanded] = useState(null);
  const typeColors = {
    framework: { bg: "bg-cyan-500/10", text: "text-cyan-300", border: "border-cyan-500/20" },
    library: { bg: "bg-purple-500/10", text: "text-purple-300", border: "border-purple-500/20" },
    concept: { bg: "bg-amber-500/10", text: "text-amber-300", border: "border-amber-500/20" },
    tool: { bg: "bg-emerald-500/10", text: "text-emerald-300", border: "border-emerald-500/20" },
  };

  return (
    <div className="space-y-2">
      {expansions.map((exp, i) => {
        const tc = typeColors[exp.type];
        const isOpen = expanded === i;
        return (
          <div key={i} className={`rounded-lg border transition-all duration-200 overflow-hidden ${isOpen ? "border-purple-500/30 bg-purple-500/5" : "border-gray-800 bg-gray-800/30 hover:border-gray-700"}`}>
            <button className="w-full flex items-center gap-3 px-3 py-2.5" onClick={() => setExpanded(isOpen ? null : i)}>
              <Network size={13} className="text-purple-400 flex-shrink-0" />
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono text-gray-300">"{exp.original}"</span>
                  <ChevronRight size={10} className="text-gray-600" />
                  <span className="text-xs font-mono text-purple-300">"{exp.expanded}"</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border ${tc.bg} ${tc.text} ${tc.border}`}>{exp.type}</span>
                </div>
              </div>
              <span className={`text-xs font-mono font-bold ${exp.score >= 0.9 ? "text-emerald-400" : "text-cyan-400"}`}>
                {(exp.score * 100).toFixed(0)}%
              </span>
              <ChevronDown size={12} className={`text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && (
              <div className="px-3 pb-3 space-y-2">
                {/* Path */}
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-[10px] text-gray-500 mr-1 font-mono">KG PATH:</span>
                  {exp.path.map((node, ni) => (
                    <span key={ni} className="flex items-center gap-1">
                      <span className="text-[10px] bg-gray-700 px-2 py-0.5 rounded text-gray-300 font-mono">{node}</span>
                      {ni < exp.path.length - 1 && <ChevronRight size={8} className="text-gray-600" />}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed bg-gray-900/50 rounded p-2 border border-gray-800">
                  <span className="text-purple-400 font-semibold">KG Reasoning:</span> Candidate listed <span className="text-cyan-300 font-mono">"{exp.expanded}"</span> which was traversed upward via the <span className="text-gray-300">{exp.path.join(" → ")}</span> knowledge graph path, satisfying the JD requirement for <span className="text-cyan-300 font-mono">"{exp.original}"</span> with a similarity weight of <span className="text-emerald-400 font-bold">{exp.score.toFixed(2)}</span>.
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ─── MICRO-INTERVIEW TRANSCRIPT ───────────────────────────────────────────────

const MicroInterviewTranscript = ({ interview, candidateName }) => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVisibleCount(i * 2);
      if (i * 2 >= interview.length * 2) clearInterval(id);
    }, 180);
    return () => clearInterval(id);
  }, [interview]);

  if (interview.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 gap-3 text-center">
        <Clock size={28} className="text-gray-700" />
        <p className="text-sm text-gray-500">Micro-interview not yet scheduled</p>
        <button className="px-4 py-2 text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 transition-all">
          Schedule Interview
        </button>
      </div>
    );
  }

  const bubbles = interview.flatMap((turn, i) => [
    { type: "bot", text: turn.q, idx: i * 2 },
    { type: "user", text: turn.a, idx: i * 2 + 1 },
  ]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-800">
        <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center">
          <Bot size={11} className="text-cyan-400" />
        </div>
        <span className="text-[11px] text-gray-400 font-mono">AI Screener ↔ {candidateName.split(" ")[0]}</span>
        <span className="ml-auto text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
          3 Questions
        </span>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1 scrollbar-thin">
        {bubbles.map((b, i) => (
          i < visibleCount ? (
            <div key={b.idx} className={`flex gap-2 ${b.type === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold
                ${b.type === "bot" ? "bg-cyan-500/20 text-cyan-400" : "bg-purple-500/20 text-purple-400"}`}>
                {b.type === "bot" ? <Bot size={12} /> : <User size={12} />}
              </div>
              <div className={`max-w-[85%] rounded-xl px-3 py-2 text-[11px] leading-relaxed
                ${b.type === "bot"
                  ? "bg-gray-800 text-gray-300 rounded-tl-none border border-gray-700"
                  : "bg-purple-500/15 text-purple-100 rounded-tr-none border border-purple-500/20"
                }`}>
                {b.text}
              </div>
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
};

// ─── 4. XAI CANDIDATE SCORECARD ───────────────────────────────────────────────

const XAICandidateScorecard = ({ candidate, onBack }) => {
  if (!candidate) return null;

  const customTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs shadow-xl">
          <p className="text-gray-300 font-semibold">{payload[0]?.payload?.skill}</p>
          <p className="text-cyan-400">Candidate: <span className="font-mono font-bold">{payload[0]?.value}</span></p>
          {payload[1] && <p className="text-purple-400">JD Req: <span className="font-mono font-bold">{payload[1]?.value}</span></p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-start gap-4">
        <button onClick={onBack} className="mt-1 p-2 rounded-lg hover:bg-gray-800 text-gray-500 hover:text-gray-200 transition-colors">
          <ChevronRight size={18} className="rotate-180" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-black text-white">{candidate.name}</h2>
            <ScorePill value={candidate.overall} color={candidate.overall >= 90 ? "emerald" : "cyan"} />
            <StatusBadge verified={candidate.verified} status={candidate.status} />
          </div>
          <p className="text-sm text-gray-400 mt-1">{candidate.role} · Rank #{candidate.rank}</p>
        </div>
        <GaugeChart value={candidate.overall} />
      </div>

      {/* Score Sub-cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Hard Skill Fit", value: candidate.hardSkills, color: "cyan", icon: Cpu, desc: "Dense vector similarity" },
          { label: "Context Fit", value: candidate.context, color: "purple", icon: Brain, desc: "Sparse semantic alignment" },
          { label: "KG Expansion Bonus", value: Math.round((candidate.hardSkills + candidate.context) / 2 * 0.12), color: "emerald", icon: Network, desc: "Knowledge graph traversal score" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`bg-gray-900 border rounded-xl p-4 ${
              s.color === "cyan" ? "border-cyan-500/20" : s.color === "purple" ? "border-purple-500/20" : "border-emerald-500/20"
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} className={s.color === "cyan" ? "text-cyan-400" : s.color === "purple" ? "text-purple-400" : "text-emerald-400"} />
                <span className="text-xs text-gray-400">{s.label}</span>
              </div>
              <p className={`text-2xl font-black font-mono ${s.color === "cyan" ? "text-cyan-300" : s.color === "purple" ? "text-purple-300" : "text-emerald-300"}`}>
                {s.value}<span className="text-sm">%</span>
              </p>
              <p className="text-[10px] text-gray-600 mt-1">{s.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left: Radar */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 size={14} className="text-cyan-400" />
            <span className="text-sm font-bold text-white">Skill Radar</span>
          </div>
          <div className="flex gap-3 mb-3">
            <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />Candidate
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
              <div className="w-2 h-2 rounded-full bg-purple-400" />JD Required
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={candidate.radarData} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: "#9ca3af" }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Candidate" dataKey="candidate" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="JD" dataKey="jd" stroke="#a855f7" fill="#a855f7" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 4" />
              <Tooltip content={customTooltip} />
            </RadarChart>
          </ResponsiveContainer>
          {/* Score Breakdown */}
          <div className="space-y-1.5 mt-2">
            {candidate.radarData.map((d) => (
              <div key={d.skill} className="flex items-center gap-2">
                <span className="text-[10px] text-gray-500 w-16 flex-shrink-0">{d.skill}</span>
                <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full transition-all" style={{ width: `${d.candidate}%` }} />
                </div>
                <span className="text-[10px] font-mono text-gray-400 w-8 text-right">{d.candidate}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Middle: KG */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Network size={14} className="text-purple-400" />
            <span className="text-sm font-bold text-white">KG Expansion Log</span>
            <span className="ml-auto text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full">
              {candidate.kgExpansions.length} matches
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">
            The Symbolic AI traversed the knowledge graph to find these skill equivalences between the JD and candidate's resume.
          </p>
          <KGExpansionLog expansions={candidate.kgExpansions} />
        </div>

        {/* Right: Interview */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare size={14} className="text-emerald-400" />
            <span className="text-sm font-bold text-white">Micro-Interview</span>
            {candidate.verified && (
              <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-400">
                <Shield size={10} />
                Verified
              </span>
            )}
          </div>
          <MicroInterviewTranscript interview={candidate.interview} candidateName={candidate.name} />
        </div>
      </div>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [view, setView] = useState("ingest"); // ingest | leaderboard | scorecard
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [pipelineDone, setPipelineDone] = useState(false);

  const handlePipelineComplete = () => {
    setPipelineDone(true);
    setTimeout(() => setView("leaderboard"), 300);
    setActiveNav("candidates");
  };

  const handleSelectCandidate = (c) => {
    setSelectedCandidate(c);
    setView("scorecard");
  };

  const handleNavigate = (nav) => {
    if (nav === "dashboard") setView("ingest");
    if (nav === "candidates") setView(pipelineDone ? "leaderboard" : "ingest");
    if (nav === "interviews") setView(pipelineDone ? "leaderboard" : "ingest");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Sora:wght@300;400;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #030712; }
        .font-sans { font-family: 'Sora', sans-serif; }
        .font-mono { font-family: 'Space Mono', monospace; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #111827; }
        ::-webkit-scrollbar-thumb { background: #374151; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #4b5563; }
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        .animate-ping { animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}</style>
      <DashboardLayout activeNav={activeNav} setActiveNav={setActiveNav} onNavigate={handleNavigate}>
        {view === "ingest" && <IngestionZone onComplete={handlePipelineComplete} />}
        {view === "leaderboard" && <CandidateLeaderboard onSelect={handleSelectCandidate} />}
        {view === "scorecard" && <XAICandidateScorecard candidate={selectedCandidate} onBack={() => setView("leaderboard")} />}
      </DashboardLayout>
    </>
  );
}
