import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { message } = await request.json();
  const response = await fetch("http://cb-be:8000/recognize-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: message }),
  });
  const data = await response.json();

  return NextResponse.json({
    intent: data.recognized_intent,
    reply: data.message,
  });
}
