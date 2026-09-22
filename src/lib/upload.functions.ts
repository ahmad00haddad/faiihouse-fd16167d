import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { z } from "zod";

const schema = z.object({
  token: z.string().min(10).max(200),
  filename: z.string().min(1).max(200),
  contentType: z.string().min(1).max(100),
  base64: z.string().min(1).max(14000000),
});

export const uploadImage = createServerFn({ method: "POST" })
  .inputValidator((input) => schema.parse(input))
  .handler(async ({ data }) => {
    const { data: session, error: sErr } = await supabaseAdmin
      .from("admin_sessions")
      .select("expires_at")
      .eq("token", data.token)
      .maybeSingle();
    if (sErr || !session) throw new Error("Unauthorized");
    if (new Date(session.expires_at).getTime() < Date.now()) {
      throw new Error("Session expired");
    }

    const buf = Buffer.from(data.base64, "base64");
    const extension = data.filename.split('.').pop() || "bin";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;

    const { error } = await supabaseAdmin.storage
      .from("site-images")
      .upload(path, buf, { contentType: data.contentType, upsert: false });
    if (error) throw new Error(error.message);

    const { data: signed, error: signErr } = await supabaseAdmin.storage
      .from("site-images")
      .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    if (signErr || !signed) throw new Error(signErr?.message ?? "Could not create image URL");
    return { url: signed.signedUrl };

  });
