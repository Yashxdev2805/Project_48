import { NextResponse } from "next/server";
import { enterpriseData } from "@/lib/data/enterprise";

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      timestamp: new Date().toISOString(),
      data: enterpriseData,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=3600",
      },
    }
  );
}
