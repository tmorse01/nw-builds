const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;
const BUILD_API_URL = `${BASE_API_URL}/builds`;

export interface Build {
  _id: string;
  name: string;
  thumbnail: string;
  tags: string[];
  weapons: string[];
}

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
