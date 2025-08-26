import { first, upperCase } from "lodash";

export default class AppUtils {
  static classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };

  static getTwoLatterFromName(name: any): string {
    return `${upperCase(first(name.first))}${upperCase(first(name.last))}`;
  }

  static encodeStorageKey(storageKey: string): string {
    return encodeURIComponent(storageKey);
  }

  static getDisplayURL(storageKey: string): string {
    return `${
      process.env.NEXT_PUBLIC_FIREBASE_BASE_URL_V2
    }${this.encodeStorageKey(storageKey)}?alt=media`;
  }
}
