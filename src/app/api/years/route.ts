import { NextResponse } from "next/server";

export async function GET() {
  // mocked data
  const data = ["2023", "2024", "2025"];

  return NextResponse.json({ data });
}
