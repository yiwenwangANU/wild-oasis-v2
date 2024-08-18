import supabase from "../supabase";
const BUCKET_URL =
  "https://kyjkvmtqkfvbenttjrma.supabase.co/storage/v1/object/public/cabin-images/";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be loaded!");
  }
  return cabins;
}

export async function deleteCabin(cabinId) {
  const { error } = await supabase.from("cabins").delete().eq("id", cabinId);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted!");
  }
}

export async function duplicateCabin(cabin) {
  const { name, image, discount, maxCapacity, regularPrice, description } =
    cabin;
  const { error } = await supabase
    .from("cabins")
    .insert([
      {
        name: `copy of ${name}`,
        maxCapacity: maxCapacity,
        regularPrice: regularPrice,
        discount: discount,
        description: description,
        image: image,
      },
    ])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created!");
  }
}
export async function createCabin(newCabin) {
  // Create unique image name and url for uploaded image
  const image = newCabin.image[0];
  const imageName = `${Math.random()}_${image.name}`;
  const imageUrl = `${BUCKET_URL}${imageName}`;

  const { name, maxCapacity, regularPrice, discount, description } = newCabin;
  const { error, data } = await supabase
    .from("cabins")
    .insert([
      {
        name: name,
        maxCapacity: maxCapacity,
        regularPrice: regularPrice,
        discount: discount,
        description: description,
        image: imageUrl,
      },
    ])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created!");
  }

  // upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, image, {
      cacheControl: "3600",
      upsert: false,
    });
  if (storageError) {
    console.error(storageError);
    await supabase.from("cabins").delete().eq("id", data[0].id);
    throw new Error("Cabin image could not be uploaded!");
  }
}

export async function editCabin(data) {
  const { id, data: cabinData } = data;
  const hasImg = cabinData.image instanceof FileList;
  if (hasImg) {
    const image = cabinData.image[0];
    const imageName = `${Math.random()}_${image.name}`;
    const imageUrl = `${BUCKET_URL}${imageName}`;

    const { name, maxCapacity, regularPrice, discount, description } =
      cabinData;

    const { data, error } = await supabase
      .from("cabins")
      .update({
        name: name,
        maxCapacity: maxCapacity,
        regularPrice: regularPrice,
        discount: discount,
        description: description,
        image: imageUrl,
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error(error);
      throw new Error("Cabin could not be updated!");
    }

    // upload image
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, image, {
        cacheControl: "3600",
        upsert: false,
      });
    if (storageError) {
      console.error(storageError);
      await supabase.from("cabins").delete().eq("id", data[0].id);
      throw new Error("Cabin image could not be uploaded!");
    }
  } else {
    const { name, maxCapacity, regularPrice, discount, description } =
      cabinData;

    const { error } = await supabase
      .from("cabins")
      .update({
        name: name,
        maxCapacity: maxCapacity,
        regularPrice: regularPrice,
        discount: discount,
        description: description,
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error(error);
      throw new Error("Cabin could not be updated!");
    }
  }
}
