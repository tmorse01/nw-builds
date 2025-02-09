/* eslint-disable curly */
// Types for image operations
export interface ImageUploadResponse {
  _id: string;
  buildId: string;
  sectionId: string;
  imagePath: string;
  originalName: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  fit?: "cover" | "contain" | "fill" | "inside" | "outside";
  format?: "webp" | "jpg" | "png" | "auto";
}

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;
const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:8888";

// Error class for image operations
export class ImageUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImageUploadError";
  }
}

/**
 * Uploads an image to the server
 * @param file - The image file to upload
 * @param buildId - The ID of the build
 * @param sectionId - The ID of the section
 * @returns Promise with the uploaded image data
 */
export const uploadImage = async (
  file: File,
  buildId: string,
  sectionId: string
): Promise<ImageUploadResponse> => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("buildId", buildId);
  formData.append("sectionId", sectionId);

  try {
    const response = await fetch(`${BASE_API_URL}/images`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ImageUploadError(data.error || "Failed to upload image");
    }

    return data.image;
  } catch (error) {
    if (error instanceof ImageUploadError) {
      throw error;
    }
    throw new ImageUploadError("Failed to upload image: Network error");
  }
};

/**
 * Generates an optimized image URL using Netlify Image CDN
 * @param imageUrl - The original image URL
 * @param options - Transform options for the image
 * @returns Optimized image URL with transform parameters
 */
export const getOptimizedImageUrl = (imageUrl: string, options: ImageTransformOptions): string => {
  const params = new URLSearchParams();

  if (options.width) params.append("w", options.width.toString());
  if (options.height) params.append("h", options.height.toString());
  if (options.quality) params.append("q", options.quality.toString());
  if (options.fit) params.append("fit", options.fit);
  if (options.format) params.append("fm", options.format);

  // If imageUrl starts with '/', it's a relative path and needs the server URL
  const fullUrl = imageUrl.startsWith("/") ? `${SERVER_URL}${imageUrl}` : imageUrl;

  return `${fullUrl}?${params.toString()}`;
};

/**
 * Deletes an image from the server
 * @param imageId - The ID of the image to delete
 * @returns Promise indicating success
 */
export const deleteImage = async (imageId: string): Promise<void> => {
  try {
    const response = await fetch(`${BASE_API_URL}/images?id=${imageId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ImageUploadError(data.error || "Failed to delete image");
    }
  } catch (error) {
    if (error instanceof ImageUploadError) {
      throw error;
    }
    throw new ImageUploadError("Failed to delete image: Network error");
  }
};

/**
 * Fetches images for a specific build and/or section
 * @param buildId - Optional build ID to filter by
 * @param sectionId - Optional section ID to filter by
 * @returns Promise with array of image data
 */
export const fetchImages = async (
  buildId?: string,
  sectionId?: string
): Promise<ImageUploadResponse[]> => {
  try {
    const params = new URLSearchParams();
    if (buildId) params.append("buildId", buildId);
    if (sectionId) params.append("sectionId", sectionId);

    const response = await fetch(`${BASE_API_URL}/images?${params.toString()}`);
    const data = await response.json();

    if (!response.ok) {
      throw new ImageUploadError(data.error || "Failed to fetch images");
    }

    return data;
  } catch (error) {
    if (error instanceof ImageUploadError) {
      throw error;
    }
    throw new ImageUploadError("Failed to fetch images: Network error");
  }
};
