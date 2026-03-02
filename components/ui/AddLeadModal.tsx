"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  UserPlus,
  Upload,
  X,
  FileText,
  Download,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const LEAD_SOURCES = [
  "Website",
  "Social Media",
  "Google Ads",
  "WhatsApp",
  "Upload",
  "Other",
];

export interface AddLeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddLead?: (lead: {
    fullName: string;
    email: string;
    phone: string;
    source: string;
    notes?: string;
  }) => void;
  onBulkUpload?: (file: File) => void;
  title?: string;
  addLabel?: string;
  className?: string;
}

export function AddLeadModal({
  open,
  onOpenChange,
  onAddLead,
  onBulkUpload,
  title = "Add New Leads",
  addLabel = "Add Lead",
  className,
}: AddLeadModalProps) {
  const [mode, setMode] = useState<"individual" | "bulk">("individual");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState("");
  const [notes, setNotes] = useState("");
  const [sourceOpen, setSourceOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const resetForm = useCallback(() => {
    setFullName("");
    setEmail("");
    setPhone("");
    setSource("");
    setNotes("");
    setFile(null);
  }, []);

  const handleClose = useCallback(() => {
    onOpenChange(false);
    resetForm();
  }, [onOpenChange, resetForm]);

  function handleAddLead(e: React.FormEvent) {
    e.preventDefault();
    onAddLead?.({ fullName, email, phone, source, notes: notes || undefined });
    handleClose();
  }

  function handleBulkSubmit() {
    if (file) {
      onBulkUpload?.(file);
      handleClose();
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files[0];
    if (f && /\.(csv|xlsx?)$/i.test(f.name)) setFile(f);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  }

  useEffect(() => {
    if (!open) return;
    modalRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, handleClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/40"
      onClick={() => handleClose()}
      data-node-id="139:2413"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={cn(
          "modal-slide-in-right ml-auto h-full max-h-screen w-full overflow-y-auto border-l border-[var(--border-dark)] bg-white shadow-[var(--shadow-modal)] sm:max-w-[85vw] md:max-w-[70vw] lg:max-w-[766px]",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        data-name="AddLeadModal"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-dark)] px-4 py-4 sm:px-6 sm:py-6">
          <div>
            <h2 className="text-2xl font-normal leading-8 text-[var(--primary)]">
              {title}
            </h2>
            <p className="text-sm text-[var(--primary-light)]">
              Add leads individually or upload in bulk
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="flex size-9 items-center justify-center rounded-[10px] bg-[#fae9e9] transition-colors hover:bg-[#f5d5d5]"
            aria-label="Close"
          >
            <X className="size-5 text-red-600" />
          </button>
        </div>

        {/* Mode selection */}
        <div className="flex gap-3 px-4 pt-4 sm:px-6 sm:pt-6">
          <button
            type="button"
            onClick={() => setMode("individual")}
            className={cn(
              "flex flex-1 flex-col items-center gap-2 rounded-[10px] border border-[var(--border-dark)] px-3 py-3 transition-colors sm:px-6 sm:py-4",
              mode === "individual"
                ? "bg-white"
                : "bg-white/50"
            )}
          >
            <UserPlus className="size-6 text-[var(--primary)]" />
            <span className="text-base font-medium text-[var(--primary)]">
              Individual Lead
            </span>
            <span className="text-xs text-[var(--primary)]">
              Add one lead at a time
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMode("bulk")}
            className={cn(
              "flex flex-1 flex-col items-center gap-2 rounded-[10px] border border-[var(--border-dark)] px-3 py-3 transition-colors sm:px-6 sm:py-4",
              mode === "bulk" ? "bg-white" : "bg-white/50"
            )}
          >
            <Upload className="size-6 text-[var(--primary)]" />
            <span className="text-base font-medium text-[var(--primary)]">
              Bulk Upload
            </span>
            <span className="text-xs text-[var(--primary)]">
              Upload CSV/Excel file
            </span>
          </button>
        </div>

        {mode === "individual" ? (
          /* Individual Lead Form - 139:2413 */
          <form onSubmit={handleAddLead} className="flex flex-col gap-5 px-4 pb-6 pt-6 sm:px-6 sm:pt-8">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-[var(--primary)]">
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="h-12 w-full rounded-[10px] border border-[var(--border-dark)] bg-white px-4 text-base text-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-[var(--primary)]">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 w-full rounded-[10px] border border-[var(--border-dark)] bg-white px-4 text-base text-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-[var(--primary)]">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="h-12 w-full rounded-[10px] border border-[var(--border-dark)] bg-white px-4 text-base text-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--primary)]">
                Lead Source *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSourceOpen(!sourceOpen)}
                  className="flex h-12 w-full items-center justify-between rounded-[10px] border border-[var(--border-dark)] bg-white px-4 text-base text-[var(--primary)]"
                >
                  <span>{source || "Select source"}</span>
                  <ChevronDown className="size-5" />
                </button>
                {sourceOpen && (
                  <div className="absolute top-full left-0 right-0 z-10 mt-1 max-h-48 overflow-auto rounded-[10px] border border-[var(--border-dark)] bg-white py-1 shadow-lg">
                    {LEAD_SOURCES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setSource(s);
                          setSourceOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-base text-[var(--primary)] hover:bg-[var(--primary)]/5"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--primary)]">
                Additional Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional information about this lead..."
                rows={4}
                className="w-full rounded-[10px] border-[1.067px] border-[var(--border-dark)] bg-white px-4 py-3 text-base text-[var(--primary)] placeholder:text-[var(--primary-light)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-[10px] border-[var(--primary)] px-6"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                leftIcon={<UserPlus className="size-5" />}
                className="h-10 rounded-[8px] px-6"
              >
                {addLabel}
              </Button>
            </div>
          </form>
        ) : (
          /* Bulk Upload Form */
          <div className="flex flex-col gap-6 px-4 pb-6 pt-6 sm:px-6 sm:pt-8" data-node-id="139:2491">
            <div className="rounded-[10px] border-[1.067px] border-[var(--border-dark)] bg-[rgba(255,255,255,0.08)] p-4">
              <div className="flex gap-3">
                <FileText className="mt-0.5 size-5 shrink-0 text-[var(--primary)]" />
                <div>
                  <h4 className="text-base font-normal text-[var(--primary)]">
                    File Format Instructions
                  </h4>
                  <ul className="mt-2 space-y-1 text-sm text-[var(--border-dark)]">
                    <li>• Supported formats: CSV, Excel (.xlsx, .xls)</li>
                    <li>• Required columns: Name, Email, Phone, Source</li>
                    <li>• Maximum file size: 5MB</li>
                    <li>• Maximum rows: 1000 leads per upload</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-[10px] border-[1.067px] border-[var(--border-dark)] bg-white p-4">
              <div>
                <p className="text-base text-[var(--primary)]">
                  Download Template
                </p>
                <p className="text-sm text-[var(--border-dark)]">
                  Use our template to ensure proper formatting
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                leftIcon={<Download className="size-4" />}
                className="h-10 rounded-[10px] border-[var(--primary)]"
              >
                Download CSV
              </Button>
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-[var(--primary)]">
                Upload File *
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={cn(
                  "flex flex-col items-center justify-center rounded-[10px] border-[1.067px] border-dashed border-[var(--border-dark)] py-12 transition-colors",
                  dragActive && "border-[var(--primary)] bg-[var(--primary)]/5"
                )}
              >
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                  className="hidden"
                  id="bulk-upload-input"
                />
                <label
                  htmlFor="bulk-upload-input"
                  className="flex cursor-pointer flex-col items-center gap-2"
                >
                  <Upload className="size-12 text-[var(--primary)]" />
                  <p className="text-base text-[var(--primary)]">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-[var(--primary)]">
                    CSV, XLSX or XLS (max. 5MB)
                  </p>
                  {file && (
                    <p className="text-sm font-medium text-[var(--success)]">
                      {file.name}
                    </p>
                  )}
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-[10px] border-[var(--primary)] px-6"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                leftIcon={<Upload className="size-4" />}
                className="h-10 rounded-[10px] px-6"
                disabled={!file}
                onClick={handleBulkSubmit}
              >
                Upload Leads
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
