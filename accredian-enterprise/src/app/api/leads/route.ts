import { NextResponse } from "next/server";
import { LeadPayload } from "@/lib/types";

// In-memory leads storage array for demonstration
const leadsDb: Array<LeadPayload & { id: string; createdAt: string }> = [];

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
    const { name, email, phone, company, designation, teamSize, message } = body || {};

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

    // Create lead record with sanitized values
    const newLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 100),
      phone: phone.trim().slice(0, 30),
      company: company.trim().slice(0, 100),
      designation: designation ? String(designation).trim().slice(0, 100) : "",
      teamSize: teamSize ? String(teamSize).trim().slice(0, 50) : "",
      message: message ? String(message).trim().slice(0, 1000) : "",
      createdAt: new Date().toISOString(),
    };

    leadsDb.push(newLead);

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully! Our enterprise consultant will get in touch shortly.",
        leadId: newLead.id,
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
  return NextResponse.json({
    success: true,
    totalLeads: leadsDb.length,
    message: "Lead storage system operational.",
  });
}
