import React, { useState } from 'react';

import {
    QueryClient,
    QueryClientProvider,
    QueryCache,
    MutationCache,
} from '@tanstack/react-query';

import { useNotification }
    from './Notification/Hooks/useNotification';

import { type ApiResponse }
    from '../Types/Response/ApiRes';
import { NotificationType } from '../Constants/NotificationEnum';

interface QueryProviderProps {
    children: React.ReactNode;
}

/*
|--------------------------------------------------------------------------
| React Query Meta
|--------------------------------------------------------------------------
*/

declare module '@tanstack/react-query' {

    interface Register {
        queryMeta: {
            showError?: boolean;
            showEmptyNotify?: boolean;
        };
        mutationMeta: {
            showError?: boolean;
            showEmptyNotify?: boolean;
        };
    }
}

function getErrorMessage(
    error: unknown
) {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === 'string') {
        return error;
    }
    return 'Erro inesperado.';
}

function isEmptyData(data: unknown) {
    const response = data as ApiResponse<unknown>;

    const result = response?.data;

    if (!result) {
        return true;
    }

    if (Array.isArray(result) && result.length === 0) {
        return true;
    }

    if (typeof result === 'object' && Object.keys(result).length === 0) {
        return true;
    }

    return false;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {

    const { notify } = useNotification();

    const [queryClient] =
        useState(() => {
            return new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: false,
                        refetchOnWindowFocus: false,
                    },
                    mutations: {
                        retry: false
                    }
                },
                queryCache: new QueryCache({
                    onSuccess: (data, query) => {
                        if (query.meta?.showEmptyNotify && isEmptyData(data)) {
                            notify(NotificationType.INFO, "Informação", "Nenhum registro encontrado.");
                        }
                    },
                    onError: (error, query) => {
                        if (query.meta?.showError === false) {
                            return;
                        }
                        notify(NotificationType.ERROR, "Erro", getErrorMessage(error));
                    },
                }),
                mutationCache: new MutationCache({
                    onError: (error, _variables, _context, mutation) => {
                        if (mutation.meta?.showError === false) {
                            return;
                        }
                        notify(NotificationType.ERROR, "Erro", getErrorMessage(error));
                    },
                })
            });
        });

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};