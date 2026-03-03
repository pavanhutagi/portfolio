import { NextRequest, NextResponse } from "next/server";

const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1/text-to-speech";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    const voiceId = process.env.ELEVENLABS_VOICE_ID!;
    const apiKey = process.env.ELEVENLABS_API_KEY!;

    const response = await fetch(`${ELEVENLABS_API_URL}/${voiceId}/stream`, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.0,
          use_speaker_boost: true,
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("ElevenLabs API error:", response.status, errorBody);
      return NextResponse.json(
        { error: "Failed to generate speech" },
        { status: 500 }
      );
    }

    return new NextResponse(response.body, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    console.error("TTS error:", error);
    return NextResponse.json(
      { error: "Failed to generate speech" },
      { status: 500 }
    );
  }
}
