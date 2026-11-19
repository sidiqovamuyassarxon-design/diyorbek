import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "galactic-journey",
    timestamp: new Date().toISOString()
  });
}
