import { Resend } from "resend";
import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import ContactEmail from "../../components/email-template";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    const emailHtml = await render(
      ContactEmail({
        name,
        email,
        phone,
        message,
      }),
    );

    const { data, error } = await resend.emails.send({
      from: "Maxirain <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL!],
      subject: `New Contact Message from ${name}`,
      html: emailHtml,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
