import { watch } from "fs";

import { debounce } from "./src/utils";
import { 
  PATH_ENTRY_DIR, 
  PORT,
} from './constants'
import { compileDistribution, ROUTES } from "./src/build"; 

await compileDistribution();

const debouncedCompileDistribution = 
  debounce(compileDistribution, 1000)

watch(
  PATH_ENTRY_DIR,
  { recursive: true },
  (_event, filename): void => {
    if (typeof filename === 'string' && !filename.startsWith('dist/')) {
      debouncedCompileDistribution()
    }
  },
);

console.log(`Server is listening at port ${PORT}`)
Bun.serve({
  port: PORT,
  fetch: function (request: Request): Response {
    const { pathname } = new URL(request.url)
    if (request.method === 'GET' && ROUTES[pathname]) {
      return new Response(Bun.file(ROUTES[pathname]))
    }
    return new Response('No Route')
  },
  error: function (): Response {
    return new Response('404')
  },
})