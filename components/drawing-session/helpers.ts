import { ImageSourceResponse, Pin } from "@/app/types";

export function getImagesFromResponse(
  response: ImageSourceResponse<Pin>,
): Array<string> {
  const images = response.items.map((item) => {
    const vals = Object.values(item.media.images);
    return vals[vals.length - 1].url;
  });

  return images;
}
