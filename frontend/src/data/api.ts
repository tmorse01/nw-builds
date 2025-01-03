import axios from "axios";
import { Build } from "./types";

const API_URL = "http://localhost:5000/api/builds"; // Replace with your backend URL

export const fetchBuilds = async (): Promise<Build[]> => {
  const response = await axios.get<Build[]>(API_URL);
  return response.data;
};

export const fetchBuildById = async (id: string): Promise<Build> => {
  const response = await axios.get<Build>(`${API_URL}/${id}`);
  return response.data;
};

export const createBuild = async (build: Build): Promise<Build> => {
  const response = await axios.post<Build>(API_URL, build);
  return response.data;
};

export const updateBuild = async (id: string, updatedBuild: Build): Promise<Build> => {
  const response = await axios.put<Build>(`${API_URL}/${id}`, updatedBuild);
  return response.data;
};

export const deleteBuild = async (id: string): Promise<{ message: string }> => {
  const response = await axios.delete<{ message: string }>(`${API_URL}/${id}`);
  return response.data;
};
