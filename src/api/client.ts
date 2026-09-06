import type { Claim, Item, User } from "../types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export type NewItem = Omit<Item, "id" | "reportedAt" | "isClaimed">;
export type NewClaim = Omit<Claim, "id" | "requestedAt">;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export function getItems(): Promise<Item[]> {
  return request<Item[]>("/items");
}

export function getItem(id: number): Promise<Item> {
  return request<Item>(`/items/${id}`);
}

export function getClaims(): Promise<Claim[]> {
  return request<Claim[]>("/claims");
}

export function getUsers(): Promise<User[]> {
  return request<User[]>("/users");
}

export function createItem(item: NewItem): Promise<Item> {
  return request<Item>("/items", {
    method: "POST",
    body: JSON.stringify({
      ...item,
      reportedAt: new Date().toISOString().slice(0, 10),
      isClaimed: false,
    }),
  });
}

export function createClaim(claim: NewClaim): Promise<Claim> {
  return request<Claim>("/claims", {
    method: "POST",
    body: JSON.stringify({
      ...claim,
      requestedAt: new Date().toISOString().slice(0, 10),
    }),
  });
}

export function markItemClaimed(item: Item): Promise<Item> {
  return request<Item>(`/items/${item.id}`, {
    method: "PATCH",
    body: JSON.stringify({ isClaimed: true }),
  });
}