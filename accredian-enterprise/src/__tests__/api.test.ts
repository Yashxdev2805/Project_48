/**
 * API Route Tests — /api/enterprise-data & /api/leads
 *
 * Run: npx tsx src/__tests__/api.test.ts
 *
 * Direct handler testing & HTTP server fallback verification
 */

import { GET as getEnterpriseData } from "../app/api/enterprise-data/route";
import { GET as getLeads, POST as postLeads } from "../app/api/leads/route";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:8080";

interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
}

const results: TestResult[] = [];

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(message);
}

async function test(name: string, fn: () => Promise<void>): Promise<void> {
  try {
    await fn();
    results.push({ name, passed: true });
    console.log(`  ✅ ${name}`);
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    results.push({ name, passed: false, error });
    console.log(`  ❌ ${name} — ${error}`);
  }
}

// Helper to request route handler directly or via fetch fallback
async function callApi(path: string, options?: RequestInit) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, options);
    return {
      status: res.status,
      json: await res.json(),
    };
  } catch {
    // Fallback to direct Route Handler execution
    if (path === "/api/enterprise-data" && (!options || options.method === "GET")) {
      const response = await getEnterpriseData();
      return {
        status: response.status,
        json: await response.json(),
      };
    }

    if (path === "/api/leads") {
      if (!options || options.method === "GET") {
        const response = await getLeads();
        return {
          status: response.status,
          json: await response.json(),
        };
      }
      if (options?.method === "POST") {
        const req = new Request(`${BASE_URL}/api/leads`, {
          method: "POST",
          headers: options.headers || { "Content-Type": "application/json" },
          body: options.body,
        });
        const response = await postLeads(req);
        return {
          status: response.status,
          json: await response.json(),
        };
      }
    }
    throw new Error(`Unsupported route for direct execution: ${path}`);
  }
}

// ─── Test Suite ──────────────────────────────────────────

async function runTests() {
  console.log("\n🧪 API Route Test Suite\n");
  console.log("━".repeat(50));

  // ── GET /api/enterprise-data ──

  console.log("\n📡 GET /api/enterprise-data\n");

  await test("returns 200 status", async () => {
    const { status } = await callApi("/api/enterprise-data");
    assert(status === 200, `Expected 200, got ${status}`);
  });

  await test("returns valid JSON with success: true", async () => {
    const { json } = await callApi("/api/enterprise-data");
    assert(json.success === true, `Expected success: true, got ${json.success}`);
  });

  await test("contains all required data keys", async () => {
    const { json } = await callApi("/api/enterprise-data");
    const requiredKeys = [
      "navLinks", "hero", "stats", "clients", "edge", "domains",
      "segmentation", "audience", "catFramework", "howItWorks",
      "faqs", "testimonials", "contact",
    ];
    for (const key of requiredKeys) {
      assert(key in json.data, `Missing key: ${key}`);
    }
  });

  await test("navLinks is an array with 9 navigation items", async () => {
    const { json } = await callApi("/api/enterprise-data");
    assert(Array.isArray(json.data.navLinks), "navLinks is not an array");
    assert(json.data.navLinks.length === 9, `Expected 9 navLinks, got ${json.data.navLinks.length}`);
  });

  await test("stats contains 4 metric items", async () => {
    const { json } = await callApi("/api/enterprise-data");
    assert(json.data.stats.length === 4, `Expected 4 stats, got ${json.data.stats.length}`);
  });

  // ── POST /api/leads — Validation Tests ──

  console.log("\n📡 POST /api/leads (Validation)\n");

  await test("rejects empty body with 400", async () => {
    const { status, json } = await callApi("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    assert(status === 400, `Expected 400, got ${status}`);
    assert(json.success === false, "Expected success: false");
  });

  await test("rejects invalid email format", async () => {
    const { status, json } = await callApi("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "not-an-email",
        phone: "+91 98765 43210",
        company: "Test Corp",
      }),
    });
    assert(status === 400, `Expected 400, got ${status}`);
    assert(json.error.toLowerCase().includes("email"), `Expected email error, got: ${json.error}`);
  });

  await test("rejects short phone number", async () => {
    const { status } = await callApi("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "test@company.com",
        phone: "123",
        company: "Test Corp",
      }),
    });
    assert(status === 400, `Expected 400, got ${status}`);
  });

  await test("rejects missing company name", async () => {
    const { status } = await callApi("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "test@company.com",
        phone: "+91 98765 43210",
        company: "",
      }),
    });
    assert(status === 400, `Expected 400, got ${status}`);
  });

  // ── POST /api/leads — Success Test ──

  console.log("\n📡 POST /api/leads (Success Flow)\n");

  await test("accepts valid lead and returns 201 with leadId", async () => {
    const { status, json } = await callApi("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Jane Doe",
        email: "jane.doe@testcorp.com",
        phone: "+91 98765 43210",
        company: "Test Corp Industries",
        designation: "VP of Engineering",
        teamSize: "25-50 learners",
        message: "Interested in GenAI enterprise training cohort.",
      }),
    });
    assert(status === 201, `Expected 201, got ${status}`);
    assert(json.success === true, "Expected success: true");
    assert(typeof json.leadId === "string", "Expected leadId to be a string");
    assert(json.leadId.startsWith("lead_"), `Expected leadId to start with 'lead_', got: ${json.leadId}`);
  });

  // ── GET /api/leads — Count Verification ──

  console.log("\n📡 GET /api/leads (Count Verification)\n");

  await test("returns totalLeads >= 1 after submission", async () => {
    const { status, json } = await callApi("/api/leads");
    assert(status === 200, `Expected 200, got ${status}`);
    assert(json.totalLeads >= 1, `Expected totalLeads >= 1, got ${json.totalLeads}`);
  });

  // ── Summary ──

  console.log("\n" + "━".repeat(50));
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;
  console.log(`\n🏁 Results: ${passed} passed, ${failed} failed, ${results.length} total\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
