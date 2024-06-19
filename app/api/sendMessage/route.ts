// app/api/sendMessage/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  const { message } = await request.json();

  // Here, you would send the message to your external service.
  // For demonstration purposes, we'll just echo the message back.

  const reply = `You said: ${message}`; // Replace this with the actual response from your external service

  return NextResponse.json({ reply });
}
