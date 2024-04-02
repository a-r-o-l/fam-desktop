import { MantineProvider } from "@mantine/core";
import { MemoryRouter } from "react-router-dom";
import { AppTemplate } from "./layouts/AppTemplate";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AppTemplate />
        </MemoryRouter>
        <Toaster richColors visibleToasts={1} />
      </QueryClientProvider>
    </MantineProvider>
  );
}
export default App;
