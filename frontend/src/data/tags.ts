const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

export interface Tag {
  name: string;
  color: string; // New color property
}

// Custom error class for tag operations
export class TagError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TagError";
  }
}

/**
 * Fetches all available tags from the server
 * @returns Promise resolving to an array of tag objects
 */
export const fetchTags = async (): Promise<Tag[]> => {
  try {
    const response = await fetch(`${BASE_API_URL}/tags`);
    if (!response.ok) throw new TagError("Failed to fetch tags");
    return response.json();
  } catch (error) {
    throw new TagError("Failed to fetch tags");
  }
};

/**
 * Adds a new tag with a color
 * @param name - Name of the tag to add
 * @param color - Color of the tag
 * @returns Promise resolving to the added tag
 */
export const addTag = async (name: string, color: string): Promise<Tag> => {
  if (!name.trim()) throw new TagError("Tag name cannot be empty");
  if (!color.trim()) throw new TagError("Tag color cannot be empty");

  try {
    const response = await fetch(`${BASE_API_URL}/tags`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, color }),
    });

    const data = await response.json();
    if (!response.ok) throw new TagError(data.error || "Failed to add tag");

    return data.tag;
  } catch (error) {
    throw new TagError("Failed to add tag");
  }
};

/**
 * Updates an existing tag's name and color
 * @param oldName - Current name of the tag
 * @param newName - New name for the tag
 * @param color - New color for the tag
 * @returns Promise resolving to the updated tag
 */
export const updateTag = async (oldName: string, newName: string, color: string): Promise<Tag> => {
  if (!newName.trim()) throw new TagError("New tag name cannot be empty");
  if (!color.trim()) throw new TagError("Tag color cannot be empty");

  try {
    const response = await fetch(`${BASE_API_URL}/tags/${oldName}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newName, color }),
    });

    const data = await response.json();
    if (!response.ok) throw new TagError(data.error || "Failed to update tag");

    return data.tag;
  } catch (error) {
    throw new TagError("Failed to update tag");
  }
};

/**
 * Deletes a tag
 * @param name - Name of the tag to delete
 * @returns Promise resolving when deletion is successful
 */
export const deleteTag = async (name: string): Promise<void> => {
  try {
    const response = await fetch(`${BASE_API_URL}/tags/${name}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new TagError("Failed to delete tag");
  } catch (error) {
    throw new TagError("Failed to delete tag");
  }
};
