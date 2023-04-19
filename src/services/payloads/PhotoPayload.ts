export type PhotoPayload = {
  id: string
  parkId: string
  fileUrl: string
  fileDataUri: string
  name: string
  description: string
  originalFilename: string
  fileMetadata: {
    filename: string,
    size: number,
    mime_type: string,
    width: string,
    height: string,
  },
  tagNames: string[]
  createdAt: string
  updatedAt: string
}

type Keys = keyof PhotoPayload;
export const PhotoPayloadAttributes: Keys[] = [
  'id', 'parkId', 'fileDataUri', 'name', 'description', 'originalFilename', 'tagNames'
];
