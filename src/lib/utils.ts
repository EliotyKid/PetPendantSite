import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function UploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "PetPendant");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/drxbzygmb/image/upload`,
      { method: "POST", body: formData },
    );
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Erro no upload:", error);
    return null;
  }
}
