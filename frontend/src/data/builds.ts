import { fetchImages } from "@/data/images";
import { Build } from "./types";

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;
const BUILD_API_URL = `${BASE_API_URL}/builds`;

/**
 * Fetches all builds
 */
export const fetchBuilds = async (): Promise<Build[]> => {
  try {
    const response = await fetch(BUILD_API_URL);
    if (!response.ok) throw new Error("Failed to fetch builds");
    return response.json();
  } catch (error) {
    throw new Error("Failed to fetch builds");
  }
};

/**
 * Response structure for the build list endpoint
 */
export interface BuildListResponse {
  builds: Build[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

/**
 * Fetches list of builds with pagination and filtering options
 * @param options - Options for filtering and pagination
 */
export const fetchBuildList = async (
  options: {
    page?: number;
    limit?: number;
    tags?: string[];
    search?: string;
    status?: string;
    sort?: string;
  } = {}
): Promise<BuildListResponse> => {
  try {
    const params = new URLSearchParams();

    // Add pagination params
    if (options.page) params.append("page", options.page.toString());
    if (options.limit) params.append("limit", options.limit.toString());

    // Add filtering params
    if (options.tags && options.tags.length > 0) {
      options.tags.forEach((tag) => params.append("tags", tag));
    }
    if (options.search) params.append("search", options.search);
    if (options.status) params.append("status", options.status);
    if (options.sort) params.append("sort", options.sort);

    const queryString = params.toString() ? `?${params.toString()}` : "";

    const response = await fetch(`${BUILD_API_URL}/list${queryString}`);
    if (!response.ok) throw new Error("Failed to fetch build list");
    return response.json();
  } catch (error) {
    console.error("Error fetching build list:", error);
    throw new Error("Failed to fetch build list");
  }
};

/**
 * Fetches a build by its ID
 */
export const fetchBuildById = async (id: string): Promise<Build> => {
  try {
    const response = await fetch(`${BUILD_API_URL}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch build");
    return response.json();
  } catch (error) {
    throw new Error("Failed to fetch build");
  }
};

/**
 * Creates a new build
 */
export const createBuild = async (build: Build): Promise<Build> => {
  try {
    const response = await fetch(BUILD_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(build),
    });
    if (!response.ok) throw new Error("Failed to create build");
    return response.json();
  } catch (error) {
    throw new Error("Failed to create build");
  }
};

/**
 * Updates an existing build
 */
export const updateBuild = async (id: string, updatedBuild: Build): Promise<Build> => {
  try {
    const response = await fetch(`${BUILD_API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBuild),
    });
    if (!response.ok) throw new Error("Failed to update build");
    return response.json();
  } catch (error) {
    throw new Error("Failed to update build");
  }
};

/**
 * Deletes a build by its ID
 */
export const deleteBuild = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${BUILD_API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete build");
    return response.json();
  } catch (error) {
    throw new Error("Failed to delete build");
  }
};

/**
 * Fetches the thumbnail image for a specific build.
 */
export const fetchBuildThumbnail = async (buildId: string): Promise<string> => {
  try {
    const images = await fetchImages(buildId, "thumbnail");
    return images.length > 0
      ? images[0].cloudinaryUrl
      : "https://placehold.co/600x400?text=Placeholder";
  } catch (error) {
    return "https://placehold.co/600x400?text=Placeholder"; // Fallback placeholder
  }
};
