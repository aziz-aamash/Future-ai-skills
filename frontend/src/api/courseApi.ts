import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export async function getCourses() {
  const res = await fetch("http://localhost:5000/api/courses", {
    credentials: "include",
  });

  return res.json();
}

export const createCourse = async (course: any) => {
  const res = await API.post("/admin/courses", course);
  return res.data;
};

export const updateCourse = async (id: number, course: any) => {
  const res = await API.put(`/admin/courses/${id}`, course);
  return res.data;
};

export const deleteCourse = async (id: number) => {
  await API.delete(`/admin/courses/${id}`);
};