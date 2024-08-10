import supabase from "../supabase";

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

export async function createCabin(newCabin) {
  const { name, maxCapacity, regularPrice, discount, description } = newCabin;
  const { error } = await supabase
    .from("cabins")
    .insert([
      {
        name: name,
        maxCapacity: maxCapacity,
        regularPrice: regularPrice,
        discount: discount,
        description: description,
      },
    ])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created!");
  }
}
