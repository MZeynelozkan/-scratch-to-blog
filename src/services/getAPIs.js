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

export async function getBlogTextId() {
  const { data: blogsTexts, error } = await supabase
    .from("blogsTexts")
    .select("userId");

  if (error) {
    console.log(error.message);
  }

  return { blogsTexts, error };
}
