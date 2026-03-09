import { useState, useEffect } from "react";
import { Link } from "wouter";
import { 
  ArrowRight, 
  TrendingUp, 
  Activity, 
  Target, 
  Share2, 
  CheckCircle2, 
  Clock, 
  Users, 
  BarChart3, 
  Search,
  Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from "recharts";

// Data for momentum chart
const momentumData = [
  { day: "0", pOutperformer: 100, baseline: 100 },
  { day: "15", pOutperformer: 105, baseline: 101 },
  { day: "30", pOutperformer: 112, baseline: 102 },
  { day: "45", pOutperformer: 125, baseline: 104 },
  { day: "60", pOutperformer: 140, baseline: 105 },
  { day: "75", pOutperformer: 155, baseline: 107 },
  { day: "90", pOutperformer: 180, baseline: 108 },
];

export default function Home() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    toast({
      title: "Access Requested",
      description: "You've been added to the early access list.",
    });
    setEmail("");
    setRole("");
  };

  return (
    <div className="min-h-screen bg-white selection:bg-primary/20 selection:text-primary">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-200 border-b ${isScrolled ? "bg-white/80 backdrop-blur-md border-border" : "bg-white border-transparent"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-white font-bold text-lg rounded flex items-center justify-center w-10 h-10">
              YC
            </div>
            <span className="font-semibold text-lg tracking-tight">YC Bench</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
            <a href="#leaderboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Leaderboard</a>
            <a href="#protocol" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Protocol</a>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6" onClick={() => document.getElementById("join")?.scrollIntoView({ behavior: "smooth" })}>
              Join the Benchmark
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20">
        {/* 1. Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 pt-16 pb-12 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/50 text-primary text-sm font-medium mb-8">
            <Activity className="w-4 h-4" />
            Live Benchmark - Startup Velocity
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 max-w-4xl mx-auto leading-tight">
            Predict the Next <br/>
            <span className="text-primary">YC Outperformers</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            YC Bench is a live benchmark evaluating models that predict which Y Combinator startups will outperform their batch peers over the next 90 days.
          </p>

          <Card className="max-w-xl mx-auto border border-border shadow-sm p-2 mb-8 bg-white/50 backdrop-blur-sm">
            <form onSubmit={handleJoin} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="h-12 border-0 bg-transparent shadow-none focus-visible:ring-0 px-4 text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="w-full sm:w-40 border-t sm:border-t-0 sm:border-l border-border pl-0 sm:pl-3 pt-3 sm:pt-0">
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="h-12 border-0 bg-transparent shadow-none focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="I am a..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="researcher">Researcher</SelectItem>
                    <SelectItem value="investor">Investor</SelectItem>
                    <SelectItem value="founder">Founder</SelectItem>
                    <SelectItem value="builder">Builder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="h-12 px-8 bg-primary hover:bg-primary/90 text-white rounded-md whitespace-nowrap">
                Get Early Access
              </Button>
            </form>
          </Card>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-muted-foreground">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Live evaluation</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Cohort-relative signals</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Fast iteration</span>
          </div>
        </section>

        {/* 2. YC Credibility Strip */}
        <section className="border-y border-border bg-secondary/50 py-4">
          <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 text-sm font-mono text-muted-foreground uppercase tracking-wider">
            <span>Built around Y Combinator batches</span>
            <span className="hidden sm:inline">•</span>
            <span>Cohort-relative benchmarking</span>
            <span className="hidden sm:inline">•</span>
            <span>Fast evaluation cycles</span>
          </div>
        </section>

        {/* 5. The Core Insight */}
        <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">The Core Insight</h2>
          <div className="prose prose-lg mx-auto text-muted-foreground space-y-6">
            <p className="text-2xl text-foreground font-medium">Predicting startup success normally takes years.<br/>YC Bench makes it measurable in months.</p>
            <p>
              Because Y Combinator startups launch in synchronized batches, they form natural peer cohorts. This allows models to measure relative execution and short-term outperformance, instead of waiting for distant outcomes like unicorns or exits.
            </p>
          </div>
        </section>

        {/* 3. Live Leaderboard Preview */}
        <section id="leaderboard" className="py-24 bg-secondary/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Benchmark Leaderboard</h2>
              <p className="text-muted-foreground">Leaderboard updates every evaluation cycle (90 days)</p>
            </div>

            <Card className="border border-border/50 shadow-md overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/50">
                      <TableHead className="font-semibold text-foreground py-4">Model</TableHead>
                      <TableHead className="font-semibold text-foreground text-right py-4">Top-Decile Precision</TableHead>
                      <TableHead className="font-semibold text-foreground text-right py-4">Rank Correlation</TableHead>
                      <TableHead className="font-semibold text-foreground text-right py-4">Reward Capture</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-primary/5 hover:bg-primary/10 transition-colors group">
                      <TableCell className="font-semibold text-primary py-4 flex items-center gap-2">
                        <Rocket className="w-4 h-4" />
                        VelocityNet v1
                      </TableCell>
                      <TableCell className="text-right font-mono py-4">0.62</TableCell>
                      <TableCell className="text-right font-mono py-4">0.41</TableCell>
                      <TableCell className="text-right font-mono text-emerald-600 font-medium py-4">+0.85σ</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium py-4">BatchRanker</TableCell>
                      <TableCell className="text-right font-mono py-4">0.58</TableCell>
                      <TableCell className="text-right font-mono py-4">0.36</TableCell>
                      <TableCell className="text-right font-mono text-emerald-600 font-medium py-4">+0.71σ</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-muted/50 transition-colors">
                      <TableCell className="text-muted-foreground py-4">YCbench Baseline</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground py-4">0.50</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground py-4">0.29</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground font-medium py-4">+0.55σ</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* 4. Batch Outperformer Radar */}
          <section className="py-24 px-4 sm:px-6 lg:px-12 bg-white border-r border-border">
            <div className="max-w-xl ml-auto">
              <h2 className="text-3xl font-bold mb-2">Batch Outperformer Radar</h2>
              <p className="text-muted-foreground mb-8">Updated every evaluation cycle (90 days)</p>
              
              <Card className="border border-border shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Top Predicted Outperformers
                  </h3>
                  <span className="text-sm font-medium bg-secondary px-2 py-1 rounded">W26 Batch</span>
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: "Company A", score: "+1.8σ", color: "text-primary", bg: "bg-primary/10" },
                    { name: "Company B", score: "+1.5σ", color: "text-foreground", bg: "bg-secondary" },
                    { name: "Company C", score: "+1.3σ", color: "text-foreground", bg: "bg-secondary" },
                    { name: "Company D", score: "+1.2σ", color: "text-foreground", bg: "bg-secondary" },
                    { name: "Company E", score: "+1.1σ", color: "text-foreground", bg: "bg-secondary" },
                  ].map((company, i) => (
                    <div key={i} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <span className={`w-6 text-center font-mono text-sm ${i === 0 ? 'text-primary font-bold' : 'text-muted-foreground'}`}>{i+1}</span>
                        <span className={`font-medium ${i === 0 ? 'text-lg' : ''}`}>{company.name}</span>
                      </div>
                      <div className={`flex items-center gap-1 font-mono text-sm px-2 py-1 rounded ${company.bg} ${company.color}`}>
                        <TrendingUp className="w-3 h-3" />
                        Velocity {company.score}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Button variant="outline" className="w-full sm:w-auto gap-2">
                <Share2 className="w-4 h-4" /> Share Radar
              </Button>
            </div>
          </section>

          {/* 10. Batch Momentum Chart */}
          <section className="py-24 px-4 sm:px-6 lg:px-12 bg-secondary/20">
            <div className="max-w-xl mr-auto">
              <h2 className="text-3xl font-bold mb-2">Batch Momentum Curve</h2>
              <p className="text-muted-foreground mb-8">Predicted outperformer velocity vs cohort median</p>
              
              <Card className="p-6 border border-border shadow-sm bg-white">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={momentumData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis 
                        dataKey="day" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 12, fill: '#6B7280'}}
                        tickFormatter={(val) => `Day ${val}`}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 12, fill: '#6B7280'}}
                      />
                      <RechartsTooltip 
                        contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        formatter={(value) => [`${value} idx`, '']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="pOutperformer" 
                        name="Predicted Outperformers"
                        stroke="#FF6600" 
                        strokeWidth={3} 
                        dot={{r: 4, strokeWidth: 2}} 
                        activeDot={{r: 6}} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="baseline" 
                        name="Batch Median"
                        stroke="#9CA3AF" 
                        strokeWidth={2} 
                        strokeDasharray="5 5"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-4 justify-center mt-4 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span>Predicted Outperformers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border-2 border-dashed border-muted-foreground"></div>
                    <span className="text-muted-foreground">Batch Median</span>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        </div>

        {/* 6. How It Works */}
        <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">A rigorous framework for evaluating predictive signals.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-secondary/80 -z-10"></div>
            
            {[
              {
                step: "1",
                title: "Models Predict",
                desc: "Models predict which YC startups will outperform their batch peers in terms of velocity signals.",
                icon: <Target className="w-6 h-6 text-primary" />
              },
              {
                step: "2",
                title: "Measure Velocity",
                desc: "Short-term velocity signals are measured over the next 90 days across the entire cohort.",
                icon: <Activity className="w-6 h-6 text-primary" />
              },
              {
                step: "3",
                title: "Evaluate & Rank",
                desc: "Predictions are evaluated against ground truth and ranked on a live leaderboard.",
                icon: <BarChart3 className="w-6 h-6 text-primary" />
              }
            ].map((item, i) => (
              <div key={i} className="relative bg-white pt-8 px-6 pb-8 border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow yc-shadow text-center group">
                <div className="w-16 h-16 mx-auto bg-accent rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-primary/10 group-hover:-translate-y-1 transition-transform">
                  {item.icon}
                </div>
                <div className="absolute top-4 left-4 text-xs font-mono font-bold text-muted-foreground bg-secondary px-2 py-1 rounded">
                  STEP {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Evaluation Metrics */}
        <section className="py-24 bg-foreground text-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">Evaluation Metrics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Top-Decile Precision", desc: "How often predicted leaders actually outperform their cohort." },
                { name: "Rank Correlation", desc: "Alignment between predicted and actual ranking across the batch." },
                { name: "Reward Capture", desc: "Average velocity achieved by top predictions relative to the batch median." },
              ].map((metric, i) => (
                <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <h3 className="text-lg font-semibold text-white mb-2">{metric.name}</h3>
                  <p className="text-zinc-400 text-sm">{metric.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Why YC Data & 9. Protocol */}
        <section id="protocol" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why YC Data Works</h2>
              <p className="text-lg text-muted-foreground mb-8">
                This structure enables low-noise relative benchmarking that is impossible in the general startup ecosystem.
              </p>
              <ul className="space-y-4">
                {[
                  "Batch-based cohorts",
                  "Shared time zero",
                  "Comparable funding environments",
                  "Large synchronized startup groups"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                    <span className="text-lg font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-secondary/50 p-8 rounded-2xl border border-border">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Search className="w-6 h-6 text-primary" /> Benchmark Protocol
              </h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="font-mono text-primary font-bold">01</span>
                  <span>Predictions are frozen at evaluation time</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-primary font-bold">02</span>
                  <span>Velocity is measured over the next 90 days</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-primary font-bold">03</span>
                  <span>Startups are ranked relative to their YC batch peers</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-primary font-bold">04</span>
                  <span>Model performance is computed using standardized velocity metrics</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-primary font-bold">05</span>
                  <span>Leaderboards update every evaluation cycle</span>
                </li>
              </ul>
              <div className="mt-8 p-4 bg-white rounded-lg text-sm font-medium border border-border text-foreground">
                This ensures fair, transparent, and reproducible evaluation.
              </div>
            </div>
          </div>
        </section>

        {/* 11. Use Cases */}
        <section className="py-24 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Who is this for?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-border">
                <CardHeader>
                  <Search className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Researchers</CardTitle>
                  <CardDescription>Study predictive signals in startup ecosystems.</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-border">
                <CardHeader>
                  <TrendingUp className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Investors</CardTitle>
                  <CardDescription>Identify emerging YC outliers early in the lifecycle.</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-border">
                <CardHeader>
                  <Rocket className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Founders</CardTitle>
                  <CardDescription>Benchmark company velocity relative to batch peers.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* 12. Roadmap */}
        <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">YC Bench Roadmap</h2>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {[
              { phase: "Phase 1", title: "Data aggregation", active: true },
              { phase: "Phase 2", title: "First benchmark release", active: false },
              { phase: "Phase 3", title: "Live model leaderboard", active: false },
              { phase: "Phase 4", title: "Open model submissions", active: false },
            ].map((step, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${step.active ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'}`}>
                  {step.active ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-border bg-white shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-foreground">{step.phase}</div>
                    {step.active && <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">Current</span>}
                  </div>
                  <div className="text-muted-foreground">{step.title}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 13. Final Conversion Section */}
        <section id="join" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <div className="bg-primary/5 rounded-3xl p-8 md:p-16 border border-primary/20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Join the YC Bench Early Access</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Be notified when the live benchmark and leaderboard launch.
            </p>
            
            <form onSubmit={handleJoin} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="h-14 bg-white text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="h-14 bg-white sm:w-48">
                  <SelectValue placeholder="Role (Optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="researcher">Researcher</SelectItem>
                  <SelectItem value="investor">Investor</SelectItem>
                  <SelectItem value="founder">Founder</SelectItem>
                  <SelectItem value="builder">Builder</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" className="h-14 px-8 bg-primary hover:bg-primary/90 text-white rounded-md whitespace-nowrap text-lg">
                Get Early Access
              </Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-white font-bold text-sm rounded flex items-center justify-center w-8 h-8">
              YC
            </div>
            <span className="font-semibold text-lg tracking-tight">YC Bench</span>
          </div>
          <p className="text-sm text-muted-foreground">
            A live benchmark for evaluating predictive models. Not affiliated with Y Combinator.
          </p>
        </div>
      </footer>
    </div>
  );
}
