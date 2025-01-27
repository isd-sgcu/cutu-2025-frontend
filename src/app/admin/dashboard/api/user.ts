import { apiClient } from '@/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export async function getUsers(accessToken: string, name?: string) {
  const query = name ? `?name=${name}` : '';
  const resp = await apiClient.get(`/users${query}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return resp.data;
}

export function useGetUsers(accessToken: string, name?: string) {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(accessToken, name),
  });
}

export async function deleteUser(id: string, accessToken: string) {
  return await apiClient.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function useDeleteUser(id: string, accessToken: string) {
  const queryClient = useQueryClient();
  let toastId: string;
  return useMutation({
    mutationFn: () => deleteUser(id, accessToken),
    onMutate: () => {
      toastId = toast.loading('Deleting user...');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      toast.error('Failed to delete user');
    },
    onSettled: () => {
      toast.dismiss(toastId);
    },
  });
}
