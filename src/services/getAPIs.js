import { supabase } from "../supabase/supabase";

export async function getBlogText() {
  const { data: blogsTexts, error } = await supabase
    .from("blogsTexts")
    .select("*");

  if (error) {
    console.error(error);
    throw new Error("blog gönderileri çekilemedi");
  }

  return blogsTexts;
}
