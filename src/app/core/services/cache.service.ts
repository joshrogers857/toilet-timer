import { Injectable } from "@angular/core";

/**
 * Service to provide access to a persistent storage mechanism intended to
 * support caching data, to improve performance.
 * 
 * Note: this should not be used to store sensitive information.
 */
@Injectable({
  providedIn: 'root',
})
export class CacheService {
    /**
     * Get the item stored under the specified key. Generic function,
     * allowing specification of type to be returned.
     * 
     * @param key of the item to retrieve
     * @returns the item corresponding to the specified key,
     * or null if not found
     */
    public getItem<T>(key: string): T | null {
        const item = localStorage.getItem(key)

        if (!item) {
            return null;
        }

        return JSON.parse(item);
    }

    /**
     * Store the specified item under the specified key.
     * 
     * @param key to store the provided item under
     * @param item to store
     */
    public setItem(key: string, item: any): void {
        const stringified = JSON.stringify(item);

        localStorage.setItem(key, stringified)
    }

    /**
     * Remove the item stored under the specified key,
     * if it exists.
     * 
     * @param key of the item to remove
     */
    public removeItem(key: string): void {
        localStorage.removeItem(key);
    }
}