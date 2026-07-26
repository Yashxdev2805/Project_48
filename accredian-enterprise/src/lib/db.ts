import fs from "fs";
import path from "path";
import { LeadPayload } from "@/lib/types";

export interface StoredLead extends LeadPayload {
  id: string;
  createdAt: string;
  status: "new" | "contacted" | "qualified";
  source: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "leads.json");

let cachedLeads: StoredLead[] | null = null;

// Ensure data directory and leads.json file exist
function ensureDbExists() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Database initialization error:", err);
  }
}

/**
 * Reads all stored leads with in-memory caching for zero-latency retrieval.
 */
export function getLeads(): StoredLead[] {
  if (cachedLeads !== null) {
    return cachedLeads;
  }

  ensureDbExists();
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, "utf-8");
      cachedLeads = JSON.parse(content || "[]");
      return cachedLeads || [];
    }
  } catch (err) {
    console.warn("Filesystem read failed, using memory store:", err);
  }
  cachedLeads = [];
  return cachedLeads;
}

/**
 * Saves a new lead inquiry record to persistent storage and updates cache.
 */
export function saveLead(payload: LeadPayload, source = "website_lead_form"): StoredLead {
  ensureDbExists();

  const newLead: StoredLead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: payload.name.trim().slice(0, 100),
    email: payload.email.trim().toLowerCase().slice(0, 100),
    phone: payload.phone.trim().slice(0, 30),
    company: payload.company.trim().slice(0, 100),
    designation: payload.designation ? String(payload.designation).trim().slice(0, 100) : "",
    teamSize: payload.teamSize ? String(payload.teamSize).trim().slice(0, 50) : "",
    message: payload.message ? String(payload.message).trim().slice(0, 1000) : "",
    createdAt: new Date().toISOString(),
    status: "new",
    source,
  };

  try {
    const leads = getLeads();
    leads.unshift(newLead);
    cachedLeads = leads;

    if (fs.existsSync(DATA_DIR)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(leads, null, 2), "utf-8");
    }
  } catch (err) {
    console.warn("Filesystem write failed, using memory store:", err);
    if (!cachedLeads) cachedLeads = [];
    cachedLeads.unshift(newLead);
  }

  return newLead;
}

/**
 * Returns total count of saved inquiries.
 */
export function getLeadCount(): number {
  return getLeads().length;
}
