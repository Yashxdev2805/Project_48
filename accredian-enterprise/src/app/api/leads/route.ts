import { NextResponse } from "next/server";
import { LeadPayload } from "@/lib/types";
import { saveLead, getLeads, getLeadCount } from "@/lib/db";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    // Validate Content-Type
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        { success: false, error: "Invalid Content-Type. Expected application/json." },
        { status: 400 }
      );
    }

    const body: LeadPayload = await request.json();
    const { name, email, phone, company } = body || {};

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid full name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid business email address." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 7) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid phone number." },
        { status: 400 }
      );
    }

    if (!company || typeof company !== "string" || company.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide your company or organization name." },
        { status: 400 }
      );
    }

    // Save lead record into persistent database
    const savedRecord = saveLead(body);

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully! Our enterprise consultant will get in touch shortly.",
        leadId: savedRecord.id,
        storedAt: savedRecord.createdAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { success: false, error: "Invalid JSON format or server error processing enquiry." },
      { status: 400 }
    );
  }
}

export async function GET() {
  const totalLeads = getLeadCount();
  const recentLeads = getLeads().slice(0, 10); // Return top 10 most recent leads for inspection in testing phase

  return NextResponse.json({
    success: true,
    totalLeads,
    databaseStatus: "Operational (Persistent JSON DB)",
    recentInquiries: recentLeads,
  });
}
