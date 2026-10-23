import { serveDir } from "jsr:@std/http/file-server";
Deno.serve(req => 
{
    const url = new URL(req.url);
    if (url.pathname == "/")
      return Responce.redirect(new URL("/main/", req.url), 301);
});
