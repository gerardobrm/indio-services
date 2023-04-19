export type GalleryPayload = {
  id: string;
  url: string;
  fileName: string;
  fileDate: string;
  dimensions: string;
  title: string;
  description: string;
  tags: string[];

  // createdAt: string;
  // updatedAt: string;
};

type Keys = keyof GalleryPayload;
export const GalleryPayloadAttributes: Keys[] = [
  'url', 'fileName'
];
