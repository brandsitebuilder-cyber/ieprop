import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { property_id, property_title, name, email, phone, message } = body;

    // Validation
    const errors: string[] = [];

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      errors.push("Name is required");
    }
    if (
      !email ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      errors.push("A valid email is required");
    }
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      errors.push("Message is required");
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
    }

    // Insert into ieprop_inquiries
    const { error } = await supabase.from("ieprop_inquiries").insert({
      property_id: property_id || null,
      property_title: property_title || null,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      message: message.trim(),
    });

    if (error) {
      console.error("Failed to insert inquiry:", error.message);
      return NextResponse.json(
        { error: "Failed to submit enquiry. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Enquiry submitted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
