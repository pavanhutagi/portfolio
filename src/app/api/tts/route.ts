import { NextRequest, NextResponse } from "next/server";

const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1/text-to-speech";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing or invalid 'text' field" }, { status: 400 });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    const voiceId = process.env.ELEVENLABS_VOICE_ID;
    const modelId = process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2";

    if (!apiKey || !voiceId) {
      return NextResponse.json(
        { error: "ElevenLabs API key or voice ID not configured" },
        { status: 500 }
      );
    }

    const elevenResponse = await fetch(`${ELEVENLABS_API_URL}/${voiceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
      }),
    });

    if (!elevenResponse.ok) {
      const errorText = await elevenResponse.text();
      console.error("ElevenLabs TTS error:", errorText);
      return NextResponse.json(
        { error: "Failed to generate speech from ElevenLabs" },
        { status: 502 }
      );
    }

    const audioBuffer = await elevenResponse.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("TTS API error:", error);
    return NextResponse.json(
      { error: "Failed to process TTS request. Please try again." },
      { status: 500 }
    );
  }
}

