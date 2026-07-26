/**
 * API Route Tests — /api/enterprise-data & /api/leads
 *
 * Run: npx tsx src/__tests__/api.test.ts
 *
 * These tests verify:
 * 1. GET /api/enterprise-data returns structured JSON with all section keys
 * 2. POST /api/leads validates required fields and rejects bad input
 * 3. POST /api/leads accepts valid submissions and returns a leadId
 * 4. GET /api/leads returns total lead count
 */

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

// ─── Test Suite ──────────────────────────────────────────

async function runTests() {
  console.log("\n🧪 API Route Test Suite\n");
  console.log("━".repeat(50));

  // ── GET /api/enterprise-data ──

  console.log("\n📡 GET /api/enterprise-data\n");

  await test("returns 200 status", async () => {
    const res = await fetch(`${BASE_URL}/api/enterprise-data`);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  });

  await test("returns valid JSON with success: true", async () => {
    const res = await fetch(`${BASE_URL}/api/enterprise-data`);
    const json = await res.json();
    assert(json.success === true, `Expected success: true, got ${json.success}`);
  });

  await test("contains all required data keys", async () => {
    const res = await fetch(`${BASE_URL}/api/enterprise-data`);
    const json = await res.json();
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
    const res = await fetch(`${BASE_URL}/api/enterprise-data`);
    const json = await res.json();
    assert(Array.isArray(json.data.navLinks), "navLinks is not an array");
    assert(json.data.navLinks.length === 9, `Expected 9 navLinks, got ${json.data.navLinks.length}`);
  });

  await test("stats contains 4 metric items", async () => {
    const res = await fetch(`${BASE_URL}/api/enterprise-data`);
    const json = await res.json();
    assert(json.data.stats.length === 4, `Expected 4 stats, got ${json.data.stats.length}`);
  });

  // ── POST /api/leads — Validation Tests ──

  console.log("\n📡 POST /api/leads (Validation)\n");

  await test("rejects empty body with 400", async () => {
    const res = await fetch(`${BASE_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    assert(res.status === 400, `Expected 400, got ${res.status}`);
    const json = await res.json();
    assert(json.success === false, "Expected success: false");
  });

  await test("rejects invalid email format", async () => {
    const res = await fetch(`${BASE_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "not-an-email",
        phone: "+91 98765 43210",
        company: "Test Corp",
      }),
    });
    assert(res.status === 400, `Expected 400, got ${res.status}`);
    const json = await res.json();
    assert(json.error.toLowerCase().includes("email"), `Expected email error, got: ${json.error}`);
  });

  await test("rejects short phone number", async () => {
    const res = await fetch(`${BASE_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "test@company.com",
        phone: "123",
        company: "Test Corp",
      }),
    });
    assert(res.status === 400, `Expected 400, got ${res.status}`);
  });

  await test("rejects missing company name", async () => {
    const res = await fetch(`${BASE_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "test@company.com",
        phone: "+91 98765 43210",
        company: "",
      }),
    });
    assert(res.status === 400, `Expected 400, got ${res.status}`);
  });

  // ── POST /api/leads — Success Test ──

  console.log("\n📡 POST /api/leads (Success Flow)\n");

  await test("accepts valid lead and returns 201 with leadId", async () => {
    const res = await fetch(`${BASE_URL}/api/leads`, {
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
    assert(res.status === 201, `Expected 201, got ${res.status}`);
    const json = await res.json();
    assert(json.success === true, "Expected success: true");
    assert(typeof json.leadId === "string", "Expected leadId to be a string");
    assert(json.leadId.startsWith("lead_"), `Expected leadId to start with 'lead_', got: ${json.leadId}`);
  });

  // ── GET /api/leads — Count Verification ──

  console.log("\n📡 GET /api/leads (Count Verification)\n");

  await test("returns totalLeads >= 1 after submission", async () => {
    const res = await fetch(`${BASE_URL}/api/leads`);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const json = await res.json();
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
