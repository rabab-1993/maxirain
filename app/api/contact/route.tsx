// import { Resend } from "resend";
// import { NextResponse } from "next/server";
// import { render } from "@react-email/render";

// import ContactEmail from "../../components/email-template";

// export const runtime = "nodejs";

// // const resend = new Resend(process.env.RESEND_API_KEY);

// const resend = new Resend("re_VSWPfg6U_DCTkCUtcS6meVhNbwEyS7SoH");
// export async function POST(req: Request) {
//   try {
//     const { name, email, phone, message } = await req.json();
//     const emailHtml = await render(
//       ContactEmail({
//         name,
//         email,
//         phone,
//         message,
//       }),
//     );

//     const data = await resend.emails.send({
//       from: "Maxirain <onboarding@resend.dev>",
//       to: ['rababyousef1414@gmail.com'],
//       subject: `New Contact Message from ${name}`,
//       html: emailHtml,
//     });

//     return NextResponse.json({ success: true, data });
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json({ error: "Email failed" }, { status: 500 });
//   }
// }

import { Resend } from "resend";
import { NextResponse } from "next/server";
import { render } from "@react-email/render";

import ContactEmail from "../../components/email-template";
import { log } from "console";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);
log(resend);
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
