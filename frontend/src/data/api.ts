import axios from "axios";
import { Build } from "./types";

type Image = {
  _id: string;
  buildId: string;
  sectionId: string;
  data: string;
};

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;
const BUILD_API_URL = `${BASE_API_URL}/api/builds`;
const IMAGE_API_URL = `${BASE_API_URL}/api/images`;

export const fetchBuilds = async (): Promise<Build[]> => {
  const response = await axios.get<Build[]>(BUILD_API_URL);
  return response.data;
};

export const fetchBuildById = async (id: string): Promise<Build> => {
  const response = await axios.get<Build>(`${BUILD_API_URL}/${id}`);
  return response.data;
};

export const createBuild = async (build: Build): Promise<Build> => {
  const response = await axios.post<Build>(BUILD_API_URL, build);
  return response.data;
};

export const updateBuild = async (id: string, updatedBuild: Build): Promise<Build> => {
  const response = await axios.put<Build>(`${BUILD_API_URL}/${id}`, updatedBuild);
  return response.data;
};

export const deleteBuild = async (id: string): Promise<{ message: string }> => {
  const response = await axios.delete<{ message: string }>(`${BUILD_API_URL}/${id}`);
  return response.data;
};

export const fetchImagesByBuild = async (buildId: string): Promise<Image[]> => {
  const response = await axios.get<Image[]>(`${IMAGE_API_URL}/build/${buildId}`);
  return response.data;
};

export const fetchImagesBySection = async (
  buildId: string,
  sectionId: string
): Promise<Image[]> => {
  const response = await axios.get<Image[]>(
    `${IMAGE_API_URL}/build/${buildId}/section/${sectionId}`
  );
  return response.data;
};

export const uploadImage = async (
  buildId: string,
  sectionId: string,
  image: string
): Promise<Image> => {
  const response = await axios.post<Image>(`${IMAGE_API_URL}/upload`, {
    buildId,
    sectionId,
    image,
  });
  return response.data;
};

export const deleteImage = async (id: string): Promise<{ message: string }> => {
  const response = await axios.delete<{ message: string }>(`${IMAGE_API_URL}/${id}`);
  return response.data;
};
