import axios from "axios";
import { Build } from "./types";

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;
const BUILD_API_URL = `${BASE_API_URL}/builds`;

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
