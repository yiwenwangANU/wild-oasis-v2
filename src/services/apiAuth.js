import supabase from "../supabase";
const BUCKET_URL =
  "https://kyjkvmtqkfvbenttjrma.supabase.co/storage/v1/object/public/avatars/";

export async function signup({ email, password, username }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });
  if (error) {
    console.error(error.message);
    throw Error(error.message);
  }
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error(error.message);
    throw Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    throw Error(error.message);
  }
  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw Error(error.message);
  }
}

export async function updateUserData({ username, avatar }) {
  let updateData;
  if (avatar) {
    const avatarName = `${Math.random()}_${avatar.name}`;
    const avatarUrl = `${BUCKET_URL}${avatarName}`;

    const { error: storageError } = await supabase.storage
      .from("avatars")
      .upload(avatarName, avatar, {
        cacheControl: "3600",
        upsert: false,
      });
    if (storageError) {
      console.error(storageError);
      throw new Error("Avatars could not be uploaded!");
    }
    updateData = { username, avatarUrl };
  } else updateData = { username };

  const { data, error: userDataError } = await supabase.auth.updateUser({
    data: updateData,
  });
  if (userDataError) {
    throw Error(userDataError.message);
  }
  return data;
}
