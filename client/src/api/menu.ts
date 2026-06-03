import type { MenuItem } from "../types";
import { api } from "./client";

export const getMenu = async(): Promise<MenuItem[]> => {
    const {data } = await api.get("/menu");

    return data;
}