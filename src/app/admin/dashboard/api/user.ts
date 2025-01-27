import { Role } from '@/const/role';
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

export function useDeleteUser(accessToken: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteUser(id, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted');
    },
    onError: error => {
      console.error('Failed to update user role:', error);
    },
  });
}

export function updateUserRole(id: string, role: Role, accessToken: string) {
  return apiClient.patch(
    `/users/${id}`,
    { role },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
}

export function useUpdateUserRole(accessToken: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: Role }) =>
      updateUserRole(id, role, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: error => {
      console.error('Failed to update user role:', error);
    },
  });
}

export function addStaff(phone: string, accessToken: string) {
  return apiClient.patch(
    `/users/addstaff/${phone}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
}

export function useAddStaff(accessToken: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ phone }: { phone: string }) => addStaff(phone, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: error => {
      console.error('Failed to add staff:', error);
    },
  });
}
