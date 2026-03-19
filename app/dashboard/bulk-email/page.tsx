"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { 
  Mail, 
  Upload, 
  Type, 
  Hash, 
  Send, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  X, 
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Info,
  RefreshCcw,
  Download,
  Columns
} from "lucide-react";
import Papa from "papaparse";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface Lead {
  email: string;
  first_name?: string;
  company?: string;
  [key: string]: any;
}

export default function BulkEmailPage() {
  const [subject, setSubject] = useState("Quick update regarding {{company}}");
  const [body, setBody] = useState("Hi {{first_name}},\n\nI noticed what you're doing at {{company}} and wanted to reach out...\n\nBest regards,\nLeadGenius Team");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [manualInput, setManualInput] = useState("");
  const [importMode, setImportMode] = useState<'csv' | 'manual'>('manual');
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, success: 0, failed: 0 });
  const [previewIndex, setPreviewIndex] = useState(0);
  const [showProgressUI, setShowProgressUI] = useState(false);
  
  // New Preview States
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [rawParsedData, setRawParsedData] = useState<any[]>([]);
  const [mappedHeaders, setMappedHeaders] = useState<Record<string, string>>({});
  const [availableHeaders, setAvailableHeaders] = useState<string[]>([]);
  const [invalidRows, setInvalidRows] = useState<Set<number>>(new Set());
  const [failedLeads, setFailedLeads] = useState<any[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateEmail = (email: string) => {
    return email && email.includes('@') && email.includes('.');
  };

  const downloadFailureReport = () => {
    if (failedLeads.length === 0) return;
    const csv = Papa.unparse(failedLeads);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `failure_report_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const retryFailed = () => {
    const retryable = failedLeads.map(f => ({
        ...f,
        email: f.email === "N/A" ? "" : f.email
    }));
    setRawParsedData(retryable);
    setCsvFile(new File([], "retried_leads.csv"));
    setLeads([]);
    setFailedLeads([]);
    setShowProgressUI(false);
    toast.info("Failed leads re-loaded for correction.");
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvFile(file);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as any[];
        if (data.length === 0) {
          toast.error("CSV file is empty");
          return;
        }

        const headers = Object.keys(data[0]);
        setAvailableHeaders(headers);
        setRawParsedData(data);

        // Auto-mapping logic
        const mappings: Record<string, string> = {};
        const invalid = new Set<number>();

        headers.forEach(h => {
          const lower = h.toLowerCase();
          if (lower.includes('email') || lower.includes('mail')) mappings['email'] = h;
          if (lower.includes('first') || lower.includes('name')) mappings['first_name'] = h;
          if (lower.includes('comp') || lower.includes('org')) mappings['company'] = h;
        });

        // Initial validation
        data.forEach((row, idx) => {
          const emailKey = mappings['email'];
          if (!emailKey || !validateEmail(row[emailKey])) {
            invalid.add(idx);
          }
        });

        setMappedHeaders(mappings);
        setInvalidRows(invalid);
        toast.info(`Parsed ${data.length} rows. Please verify mapping.`);
      },
      error: (error) => {
        toast.error("Failed to parse CSV file");
        console.error(error);
      }
    });
  };

  const applyImport = () => {
    if (rawParsedData.length === 0) return;
    
    const emailKey = mappedHeaders['email'];
    if (!emailKey) {
      toast.error("Please map the 'Email' column");
      return;
    }

    const finalLeads = rawParsedData
      .filter((_, idx) => !invalidRows.has(idx))
      .map(row => ({
        email: row[mappedHeaders['email']] || "",
        first_name: row[mappedHeaders['first_name']] || "",
        company: row[mappedHeaders['company']] || "",
        ...row // Include other fields for custom variables
      }));

    setLeads(finalLeads);
    toast.success(`Imported ${finalLeads.length} valid leads`);
  };

  const handleManualImport = () => {
    const lines = manualInput.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const newLeads: Lead[] = lines.map(line => {
      const parts = line.split(',').map(p => p.trim());
      return {
        email: parts[0],
        first_name: parts[1] || "",
        company: parts[2] || ""
      };
    }).filter(l => validateEmail(l.email));

    setLeads(newLeads);
    setPreviewIndex(0);
    toast.success(`Loaded ${newLeads.length} leads manually`);
  };

  const handleSendBatch = async () => {
    if (leads.length === 0) {
      toast.error("Please add at least one valid lead");
      return;
    }

    setIsSending(true);
    setShowProgressUI(true);
    setProgress({ current: 0, total: leads.length, success: 0, failed: 0 });
    setFailedLeads([]);

    try {
      const response = await api.post<any>("/api/email/batch-send", {
        template: { subject, body },
        leads: leads
      });

      if (response.data) {
        // Slow down update for visual effect
        for (let i = 0; i <= 100; i += 5) {
            setProgress(prev => ({ ...prev, current: Math.floor((i / 100) * leads.length) }));
            await new Promise(r => setTimeout(r, 50));
        }
        
        setProgress(prev => ({ 
            ...prev, 
            current: leads.length, 
            success: response.data.success || 0,
            failed: response.data.failed || 0
        }));
        
        if (response.data.errors && response.data.errors.length > 0) {
            setFailedLeads(response.data.errors);
            toast.warning(`${response.data.errors.length} rows failed during processing.`);
        } else {
            toast.success("All emails have been queued for sending!");
        }
      } else {
        toast.error(response.error?.detail || "Failed to initiate bulk send");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSending(false);
    }
  };

  const insertVariable = (variable: string) => {
    setBody(prev => prev + ` {{${variable}}}`);
  };

  const resetImport = () => {
    setCsvFile(null);
    setRawParsedData([]);
    setLeads([]);
    setInvalidRows(new Set());
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto bg-background p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600 shadow-inner">
            <Mail className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Bulk Mailer</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-purple-500" />
              Revolutionize your outreach with AI-personalized batch sending.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-all">
            Cancel
          </Link>
          <button
            onClick={handleSendBatch}
            disabled={isSending || leads.length === 0}
            className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-blue-600 px-8 py-3 text-sm font-bold text-white shadow-xl shadow-blue-500/30 transition-all hover:bg-blue-500 hover:shadow-blue-500/40 disabled:opacity-50 active:scale-95"
          >
            {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
            {isSending ? `Processing...` : `Start Import & Send Emails (${leads.length})`}
          </button>
        </div>
      </div>

      {/* Progress Monitor */}
      {showProgressUI && (
        <div className="mb-8 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 animate-in fade-in duration-500">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
              {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              {isSending ? "Processing Batch..." : "Workflow Completed"}
            </h3>
            <span className="text-xs font-mono font-bold text-blue-500">
              {progress.current} / {progress.total} Emails
            </span>
          </div>
          
          <div className="h-2 w-full rounded-full bg-blue-200/30 overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300 ease-out"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>

          {!isSending && (
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="rounded-lg bg-emerald-500/10 px-3 py-1.5 border border-emerald-500/20 text-xs font-bold text-emerald-600">
                ✅ SUCCESS: {progress.success}
              </div>
              <div className="rounded-lg bg-red-500/10 px-3 py-1.5 border border-red-500/20 text-xs font-bold text-red-600">
                ❌ FAILED: {progress.failed}
              </div>

              {failedLeads.length > 0 && (
                <div className="flex gap-2">
                  <button 
                    onClick={downloadFailureReport}
                    className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-red-500/20 hover:bg-red-500 transition-all"
                  >
                    <Download className="h-3 w-3" /> Report
                  </button>
                  <button 
                    onClick={retryFailed}
                    className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all"
                  >
                    <RefreshCcw className="h-3 w-3" /> Retry Failed
                  </button>
                </div>
              )}

              <button 
                onClick={() => {
                    setShowProgressUI(false);
                    if (progress.failed === 0) setLeads([]);
                }}
                className="ml-auto text-xs font-bold text-muted-foreground hover:text-foreground"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* Left Column: Import (5 cols) */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
            <div className="border-b border-border bg-muted/30 px-6 py-4">
              <h3 className="flex items-center gap-2 font-bold text-foreground">
                <Upload className="h-4 w-4 text-emerald-500" /> Lead Import
              </h3>
            </div>
            
            <div className="p-6">
              <div className="mb-6 flex gap-2 rounded-xl bg-muted/50 p-1">
                <button
                  onClick={() => setImportMode('manual')}
                  className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition-all ${importMode === 'manual' ? "bg-white text-blue-600 shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Manual Entry
                </button>
                <button
                  onClick={() => setImportMode('csv')}
                  className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition-all ${importMode === 'csv' ? "bg-white text-emerald-600 shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  CSV Upload
                </button>
              </div>

              {importMode === 'manual' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="manual-leads" className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider font-mono">
                      Format: email, first_name, company
                    </label>
                  </div>
                  <textarea
                    id="manual-leads"
                    name="manual-leads"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    placeholder="john@example.com, John, Google&#10;jane@company.com, Jane, Apple"
                    rows={8}
                    className="w-full rounded-xl border border-input bg-background p-4 text-xs font-mono text-foreground focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:opacity-50"
                  />
                  <button
                    onClick={handleManualImport}
                    className="w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/10"
                  >
                    Load manual list
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {!csvFile ? (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-12 transition-all hover:border-emerald-500/50 hover:bg-emerald-50/5 group"
                    >
                      <input type="file" ref={fileInputRef} onChange={handleCsvUpload} accept=".csv" className="hidden" />
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
                        <FileText className="h-8 w-8" />
                      </div>
                      <span className="text-sm font-bold text-foreground">Click to upload CSV</span>
                      <span className="mt-1 text-xs text-muted-foreground">Standard headers: email, first_name, company</span>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Mapping UI */}
                      <div className="grid grid-cols-2 gap-2">
                        {['email', 'first_name', 'company'].map(field => (
                          <div key={field} className="rounded-xl border border-border bg-muted/20 p-3">
                            <label className="mb-1 block text-[10px] font-bold text-muted-foreground uppercase">{field.replace('_', ' ')}</label>
                            <select 
                              value={mappedHeaders[field] || ""}
                              onChange={(e) => setMappedHeaders(prev => ({ ...prev, [field]: e.target.value }))}
                              className="w-full bg-transparent text-xs font-semibold outline-none"
                            >
                              <option value="">Select Column...</option>
                              {availableHeaders.map(h => (
                                <option key={h} value={h}>{h}</option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>

                      {/* Preview Table */}
                      <div className="max-h-[300px] overflow-auto rounded-xl border border-border bg-background shadow-inner">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead className="sticky top-0 bg-muted/50 backdrop-blur-md z-10 border-b border-border">
                            <tr>
                              <th className="p-2 font-bold uppercase tracking-widest text-muted-foreground scale-90">#</th>
                              <th className="p-2 font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                              {Object.values(mappedHeaders).filter(h => !!h).map(h => (
                                <th key={h} className="p-2 font-bold uppercase tracking-widest text-muted-foreground">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {rawParsedData.slice(0, 50).map((row, idx) => (
                              <tr key={idx} className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${invalidRows.has(idx) ? "bg-red-500/5" : ""}`}>
                                <td className="p-2 text-muted-foreground font-mono">{idx + 1}</td>
                                <td className="p-2">
                                  {invalidRows.has(idx) ? 
                                    <AlertCircle className="h-3.5 w-3.5 text-red-500" /> : 
                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                  }
                                </td>
                                {Object.values(mappedHeaders).filter(h => !!h).map(h => (
                                  <td key={h} className={`p-2 truncate max-w-[120px] ${h === mappedHeaders['email'] && !validateEmail(row[h]) ? "text-red-500 font-bold" : ""}`}>
                                    {row[h] || "—"}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={applyImport}
                          className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-sm font-bold text-white hover:bg-emerald-500 transition-all"
                        >
                          Apply Import
                        </button>
                        <button 
                          onClick={resetImport}
                          className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {leads.length > 0 && !csvFile && (
                <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" /> {leads.length} leads ready to blast
                  </div>
                  <button onClick={() => setLeads([])} className="text-[10px] font-bold text-muted-foreground hover:text-red-500 underline uppercase">Reset</button>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h4 className="mb-3 flex items-center gap-2 text-xs font-bold text-foreground">
              <Info className="h-3.5 w-3.5 text-blue-500" /> Tips for High Deliverability
            </h4>
            <ul className="space-y-3">
              <li className="flex gap-3 text-xs text-muted-foreground">
                <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-500" />
                Wait 2-3 minutes between large blasts to avoid spam filters.
              </li>
              <li className="flex gap-3 text-xs text-muted-foreground">
                <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-500" />
                Use {'{{first_name}}'} at least once to increase open rates by 22%.
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Template (7 cols) */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-6">
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
            <div className="border-b border-border bg-muted/30 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="flex items-center gap-2 font-bold text-foreground">
                <Type className="h-4 w-4 text-purple-500" /> Email Template
              </h3>
              <div className="flex flex-wrap gap-2">
                <VariableChip label="First Name" onClick={() => insertVariable('first_name')} />
                <VariableChip label="Company" onClick={() => insertVariable('company')} />
                <VariableChip label="Email" onClick={() => insertVariable('email')} />
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label htmlFor="email-subject" className="mb-2 block text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-mono">Subject Line</label>
                <input
                  type="text"
                  id="email-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm font-semibold text-foreground focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label htmlFor="email-body" className="mb-2 block text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-mono">Email Body</label>
                <textarea
                  id="email-body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={10}
                  className="w-full rounded-xl border border-input bg-background p-4 text-sm leading-relaxed text-foreground focus:ring-2 focus:ring-blue-500/20 transition-all resize-none font-medium"
                />
              </div>

              {/* Preview Card */}
              <div className="rounded-2xl border border-border bg-muted/5 p-6 relative overflow-hidden group shadow-inner">
                <div className="absolute top-0 right-0 p-4 flex items-center gap-2">
                  {leads.length > 1 && (
                    <div className="flex items-center gap-1 mr-4 bg-background px-2 py-1 rounded-lg border border-border">
                      <button 
                        onClick={() => setPreviewIndex(prev => Math.max(0, prev - 1))}
                        disabled={previewIndex === 0}
                        className="p-1 rounded hover:bg-muted disabled:opacity-30 transition-colors"
                      >
                        <ChevronLeft className="h-3 w-3" />
                      </button>
                      <span className="text-[10px] font-mono font-bold px-2 text-foreground">
                        {previewIndex + 1} / {leads.length}
                      </span>
                      <button 
                        onClick={() => setPreviewIndex(prev => Math.min(leads.length - 1, prev + 1))}
                        disabled={previewIndex === leads.length - 1}
                        className="p-1 rounded hover:bg-muted disabled:opacity-30 transition-colors"
                      >
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  <Sparkles className="h-4 w-4 text-blue-500 opacity-20 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <h4 className="mb-4 text-[10px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2">
                  <FileText className="h-3 w-3" /> Live Preview
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">To:</span>
                    <span className="text-xs font-mono font-medium text-foreground bg-muted/50 px-2 py-0.5 rounded-md">{leads[previewIndex]?.email || "prospect@example.com"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Subject:</span>
                    <span className="text-sm font-bold text-foreground">
                      {subject
                        .replace(/\{\{company\}\}/g, leads[previewIndex]?.company || 'Your Company')
                        .replace(/\{\{first_name\}\}/g, leads[previewIndex]?.first_name || 'there')}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-5 border border-border/50 shadow-sm">
                    <p className="whitespace-pre-wrap text-sm text-foreground/80 leading-relaxed italic">
                      {body
                        .replace(/\{\{company\}\}/g, leads[previewIndex]?.company || 'your company')
                        .replace(/\{\{first_name\}\}/g, leads[previewIndex]?.first_name || 'friend')
                        .replace(/\{\{email\}\}/g, leads[previewIndex]?.email || "prospect@example.com")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function VariableChip({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 rounded-lg bg-blue-600/10 px-3 py-1.5 text-[10px] font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all transform active:scale-95 border border-blue-600/20"
    >
      <Hash className="h-2.5 w-2.5" /> {label}
    </button>
  );
}
