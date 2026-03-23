import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import api from '../utils/api/api';

const useApi = () => {
  const queryClient = useQueryClient();

  // GET Request Hook
  const useFetchData = <T>(endpoint: string,enabled?: boolean): UseQueryResult<T, Error> => {
    return useQuery<T, Error>({
      queryKey: [endpoint],  
      
      queryFn: async () => {
        const { data } = await api.get<T>(`${endpoint}`);
        return data;
      },
      enabled
    });
  };

    // GET Request Hook
const useFetchWithoutBaseUrl = <T>(endpoint: string, enabled?: boolean): UseQueryResult<T, Error> => {
  return useQuery<T, Error>({
    queryKey: [endpoint, ], // Unique key for the query
    queryFn: async () => {
      const { data } = await axios.get<T>(endpoint); // no withCredentials
      return data;
    },
    enabled,  
    
  });
};


  // DELETE Request Hook
  const useDeleteData = (endpoint: string) => {
    return useMutation({
      mutationFn: async (id: string) => {
        const { data } = await api.delete(`${endpoint}`, { data: { id } });
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [endpoint] }); 
      },
    });
  };

  // POST Request Hook
  const usePostData = (endpoint: string) => {
    return useMutation({
      mutationFn: async (newData: any) => {
        const isFormData = newData instanceof FormData;

        const { data } = await api.post(`${endpoint}`, newData, {
          headers: isFormData ? { "Content-Type": "multipart/form-data" } : { "Content-Type": "application/json" },
        });

        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [endpoint] });
      },
    });
  };

   // PUT Request Hook
  const usePutData = (endpoint: string) => {
    return useMutation({
      mutationFn: async (newData: any) => {
        const isFormData = newData instanceof FormData;

        const { data } = await api.post(`${endpoint}`, newData, {
          headers: isFormData ? { "Content-Type": "multipart/form-data" } : { "Content-Type": "application/json" },
        });

        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [endpoint] });
      },
    });
  };

  // UPDATE Request Hook
  const useUpdateData = (endpoint: string) => {
    return useMutation({
      mutationFn: async (updatedData: any) => {
        const isFormData = updatedData instanceof FormData;

        const { data } = await api.put(`${endpoint}`, updatedData, {
          headers: isFormData ? { "Content-Type": "multipart/form-data" } : { "Content-Type": "application/json" },
        });

        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [endpoint] });
      },
    });
  };

  return { useFetchData, usePostData, useDeleteData, useUpdateData, useFetchWithoutBaseUrl, usePutData };
};

export default useApi;
