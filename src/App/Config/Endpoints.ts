import type { LoginReq } from "../../Shared/Types/Request/LoginReq";
import type { ApiResponse } from "../../Shared/Types/Response/ApiRes";
import { api } from "./Api";

async function GET_METHOD<T>(url: string): Promise<ApiResponse<T>> {
    const { data } = await api.get<ApiResponse<T>>(url);
    return data;
}
async function POST_METHOD<T>(url: string,body?: unknown): Promise<ApiResponse<T>> {
  const { data } = await api.post<ApiResponse<T>>(url, body);
  return data;
}
async function PUT_METHOD<T>(url: string,body?: unknown): Promise<ApiResponse<T>> {
    const { data } = await api.put<ApiResponse<T>>(url, body);
    return data;
}
async function DELETE_METHOD<T>(url: string): Promise<ApiResponse<T>> {
    const { data } = await api.delete<ApiResponse<T>>(url);
    return data;
}

export const endpoints = {
    login: {
        autenticar: (data: LoginReq) => POST_METHOD<{name: string}>(`/login`, data)
    }
}