// Types for image operations
export interface ImageUploadResponse {
  _id: string; // MongoDB ID
  buildId: string;
  sectionId: string;
  cloudinaryUrl: string; // Use this for displaying images
  publicId: string; // Cloudinary image identifier (needed for deletion)
  originalName: string;
}

interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number; // Cloudinary supports 1-100
  fit?: "scale" | "fit" | "fill" | "limit" | "crop" | "pad"; // Adjusted for Cloudinary
  format?: "webp" | "jpg" | "png" | "auto";
  dpr?: number; // Device Pixel Ratio (for high-res screens)
  sharpen?: boolean; // Apply sharpening filter
  blur?: number; // Apply blur effect (0-200)
}

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

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
 * Generates an optimized Cloudinary image URL with transformations.
 * @param imageUrl - The original Cloudinary URL
 * @param options - Transform options for the image
 * @returns Optimized image URL with Cloudinary transformations
 */
export const getOptimizedImageUrl = (imageUrl: string, options: ImageTransformOptions): string => {
  if (!imageUrl) return "";

  // Extract Cloudinary public ID from the URL
  const urlParts = imageUrl.split("/upload/");
  if (urlParts.length < 2) return imageUrl; // Return original if not a Cloudinary URL

  const baseUrl = urlParts[0]; // Cloudinary base URL
  const publicId = urlParts[1]; // Image identifier

  const transforms: string[] = [];

  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) transforms.push(`h_${options.height}`);
  if (options.quality) transforms.push(`q_${options.quality || 100}`); // Default to max quality
  if (options.fit) transforms.push(`c_limit`); // Limit resize instead of hard crop
  if (options.format) transforms.push(`f_${options.format}`);

  // Force sharpening to enhance clarity
  transforms.push("e_sharpen");

  // Construct the transformed URL
  return `${baseUrl}/upload/${transforms.join(",")}/${publicId}`;
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
