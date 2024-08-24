import { store } from "../store";
import { supabase } from "../supabase/supabase";
import { getUserToken } from "./userSlice";

// tek bir deger guncellenecegi icin newPostu direk icine yazdik obje olarak

export async function postNewBlogText(newPost) {
  const { id, user_id, ...newPosts } = newPost;

  const { data, error } = await supabase
    .from("blogsTexts")
    .insert([{ ...newPosts, user_id }])
    .select();

  if (error) {
    console.error("Error:", error.message);
    return { data: null, error: error.message };
  }

  return { data, error };
}

export async function updateCurrentPost(post) {
  const { id, userId, ...updatedFields } = post;

  const { data, error } = await supabase
    .from("blogsTexts")
    .update(updatedFields)
    .eq("id", id)
    .eq("userId", userId)
    .select();

  return { data, error };
}

export async function createNewUser(userData) {
  const { email, password } = userData;

  console.log(email, password);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return { data, error };
}

export async function loginUser(userData) {
  const { email, password } = userData;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  store.dispatch(getUserToken(data.user.id, data.user.aud));

  return { data, error };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  return error;
}

export async function deletePost(id) {
  const { error } = await supabase.from("blogsTexts").delete().eq("id", id);
  return error;
}
