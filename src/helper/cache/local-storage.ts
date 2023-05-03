export class LocalStorage {
  set(key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): object {
    return JSON.parse(localStorage.getItem(key));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
