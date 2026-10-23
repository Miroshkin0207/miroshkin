Deno.serve(req => 
{
    const url = new URL(req.url);
    if (url == "/")
      return Responce.redirect("/main/", 301);
});
