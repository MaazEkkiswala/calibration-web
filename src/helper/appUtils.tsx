import ILabelValue from "@/lib/appInterface/iLabelValue";
import { first, get, map, upperCase } from "lodash";

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

  static formatString(stringToFormat: string, ...args: any[]) {
    return stringToFormat.replace(
      /{(\d+)}/g,
      (match: any, index: number) => args[index]
    );
  }

  static convertObjectsToLabelValue(
    objects: any[],
    label: string,
    value: string
  ) {
    const labelValues: ILabelValue[] = map(objects, (obj) => ({
      label: get(obj, label),
      value: get(obj, value),
    })) as any[];

    return labelValues;
  }

  static getDisplayURL(storageKey: string): string {
    return `${
      process.env.NEXT_PUBLIC_FIREBASE_BASE_URL_V2
    }${this.encodeStorageKey(storageKey)}?alt=media`;
  }
}
