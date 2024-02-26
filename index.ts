import { watch } from "fs";

import { throttle } from "./src/utils";
import { PATH_ENTRY_DIR, PORT } from './constants'
import { compileAll, ROUTES } from "./src/build"; 

await compileAll();

const isLocalServer = Bun.argv.includes('--local-server');

if (isLocalServer) {
  const throttledCompileAll = 
      throttle(compileAll, 10000);

  const watcher = watch(
    PATH_ENTRY_DIR,
    { recursive: true },
    (event, filename): void => {
      if (typeof filename === 'string' && !filename.startsWith('dist/')) {
        throttledCompileAll()
      }
    },
  );
  
  console.log(`Server is listening at PORT: ${PORT}`)
  Bun.serve({
    port: PORT,
    fetch: function (request: Request): Response {
      const { pathname } = new URL(request.url)
      if (request.method === 'GET' && ROUTES[pathname]) {
        return new Response(Bun.file(ROUTES[pathname]))
      }
      return new Response(Bun.file(ROUTES['/404']))
    },
    error: function (): Response {
      return new Response(Bun.file(ROUTES['/404']))
    },
  })

  process.on("SIGINT", () => {
    console.log("Closing watcher...");
    watcher.close();

    process.exit(0);
  });
}