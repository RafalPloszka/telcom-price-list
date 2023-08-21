import { NextResponse } from "next/server";

import { YearsData } from "../types";

export async function GET() {
  // mocked data
  const data: YearsData = ["2023", "2024", "2025"];

  return NextResponse.json({ data });
}
