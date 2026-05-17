import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppSettingsProvider } from './Shared/Contexts/ConfigContext.tsx'
import { api } from './App/Config/Api.ts';
import { LoadingProvider } from './Shared/Contexts/Loading/LoadingContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationProvider } from './Shared/Contexts/Notification/NotificationContext.tsx';
import { socket } from './App/WebSocket/Socket.ts';

async function initApp() {
  try {
    const response = await fetch(
      `/appsettings.json?v=${Date.now()}`,
      {
        cache: "no-cache",
      }
    );

    const settings = await response.json();
    api.defaults.baseURL = settings.apiBaseUrl;
    // @ts-ignore - access internal manager to update URL dynamically before connection
    socket.io.uri = settings.apiBaseUrl;
    console.log('API Base URL:', api.defaults.baseURL);
  } catch (error) {
    console.error('Failed to load settings:', error);
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  createRoot(document.getElementById('root')!).render(
    <AppSettingsProvider>
      <NotificationProvider>
        <QueryClientProvider client={queryClient}>
          <LoadingProvider>
            <App />
          </LoadingProvider>
        </QueryClientProvider>
      </NotificationProvider>
    </AppSettingsProvider>
  );
}

initApp();
