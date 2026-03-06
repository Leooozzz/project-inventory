import { configDotenv } from "dotenv";
import { Resend } from "resend";
configDotenv()
const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendOtpEmail = async (email: string, code: string) => {
  await resend.emails.send({
    from: "Auth <onboarding@resend.dev>",
    to: email,
    subject: "Seu código de login",
    html: `
    <div style="font-family: Arial, sans-serif; background-color:#f4f4f4; padding:40px;">
      
      <div style="
        max-width:500px;
        margin:auto;
        background:white;
        padding:30px;
        border-radius:10px;
        text-align:center;
        box-shadow:0 4px 10px rgba(0,0,0,0.1);
      ">
        
        <h2 style="color:#111; margin-bottom:20px;">
          🔐 Login Seguro
        </h2>

        <p style="color:#555; font-size:16px;">
          Use o código abaixo para acessar sua conta
        </p>

        <div style="
          margin:30px 0;
          padding:20px;
          background:#f1f5f9;
          border-radius:8px;
          font-size:32px;
          letter-spacing:6px;
          font-weight:bold;
          color:#111;
        ">
          ${code}
        </div>

        <p style="color:#666; font-size:14px;">
          Este código expira em <b>10 minutos</b>.
        </p>

        <p style="color:#999; font-size:12px; margin-top:30px;">
          Se você não solicitou este login, ignore este email.
        </p>

      </div>

    </div>
    `,
  });
};