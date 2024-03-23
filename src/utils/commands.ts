import { invoke } from "@tauri-apps/api/tauri";

export const greet = async (name: string): Promise<string> => {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    return await invoke("greet", { name });
}