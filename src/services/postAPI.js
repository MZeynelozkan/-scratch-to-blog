import { store } from "../store";
import { supabase } from "../supabase/supabase";
import { getUserToken } from "./userSlice";

// tek bir deger guncellenecegi icin newPostu direk icine yazdik obje olarak

export async function postNewBlogText(newPost) {
  const { img, id, user_id, ...newPosts } = newPost;

  // newPosttu ayirdik eger img var ise sql komutlarini calistirdik newPosts.imagePath = imageData.path; yaptik ikiside baglantili olsun diye

  if (img) {
    const { data: imageData, error: imageError } = await supabase.storage
      .from("avatars")
      .upload(`public/${img.name}.png`, img, {
        cacheControl: "3600",
        upsert: false,
      });

    if (imageError) {
      console.error("Image upload error:", imageError.message);
      return { data: null, error: imageError.message };
    }

    newPosts.imagePath = imageData.path;
  }

  const { data, error } = await supabase
    .from("blogsTexts")
    .insert([{ ...newPosts, user_id }])
    .select();

  if (error) {
    console.error("Error inserting post:", error.message);
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
  let { data: blogData } = await supabase
    .from("blogsTexts")
    .select("imagePath");
  const { imagePath } = blogData[0];
  console.log(imagePath);

  const { data, error: err } = await supabase.storage
    .from("avatars")
    .remove([`${imagePath}`]);

  console.log(data);

  const { error } = await supabase.from("blogsTexts").delete().eq("id", id);
  return error;
}
