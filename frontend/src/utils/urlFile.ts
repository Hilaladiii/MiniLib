export async function urlToFile(
  imageUrl: string,
  fileName: string
): Promise<File> {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const fileType = blob.type || "image/jpeg";

    return new File([blob], fileName, { type: fileType });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export type FileOrString = File | string;

export function isFile(value: FileOrString): value is File {
  return value instanceof File;
}
