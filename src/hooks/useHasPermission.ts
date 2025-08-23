import { get } from 'lodash';
import useAuthStore from '../store/auth';

export default function useHasPermission(permission: string) {
  const { permissions } = useAuthStore();

  return get(permissions, permission);
}