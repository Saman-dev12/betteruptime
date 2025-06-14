"use server";

import { requireUser } from "@/actions/users"; 
import axios from "axios";
import { revalidatePath } from 'next/cache';


interface AddMonitor {
  name: string;
  url: string;
  frequency: string;
}

export const addMonitor = async (values: AddMonitor) => {
  const {userId,token} = await requireUser(); 
  const data = {name:values.name,url:values.url,frequency:Number(values.frequency)}

  const res = await fetch("http://localhost:8000/api/monitor/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    throw new Error("Failed to create monitor");
  }
  revalidatePath("/dashboard")
  return await res.json();
};



export const deleteMonitor = async (id:string) => {
  const {userId,token} = await requireUser(); 

  const res = await fetch(`http://localhost:8000/api/monitor/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });

  if (!res.ok) {
    throw new Error("Failed to create monitor");
  }
  revalidatePath("/dashboard")
  return await res.json();
};



export const getMonitor = async (id: string) => {
	const {userId,token} = await requireUser(); 
  	const res = await fetch(`http://localhost:8000/api/monitor/summary/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });

  if (!res.ok) {
    throw new Error("Failed to get monitor");
  }

  const response = await res.json()

  return response;
};

export const getAllMonitors = async () => {
  const {userId,token} = await requireUser(); 
  	const res = await fetch(`http://localhost:8000/api/monitor/get-all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch monitors");
  }

  const {monitors} = await res.json()
  console.log(monitors)

  return monitors;
};
