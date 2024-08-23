import { supabase } from "../supabase/supabase";

// tek bir deger guncellenecegi icin newPostu direk icine yazdik obje olarak

export async function postNewBlogText(newPost) {
  const { data, error } = await supabase
    .from("blogsTexts")
    .insert([newPost])
    .select();

  return { data, error };
}

export async function updateCurrentPost(post) {
  const { id, ...updatadedFields } = post;

  const { data, error } = await supabase
    .from("blogsTexts")
    .update(updatadedFields)
    .eq("id", id)
    .select();

  return { data, error };
}
