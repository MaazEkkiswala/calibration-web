export default class AppUtils {
  static classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }
}
