import http from "http";
import fs from "fs";
import path from "path";

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "..", "public");

const server = http.createServer((req, res) => {
  const filePath = path.join(PUBLIC_DIR, req.url === "/" ? "index.html" : req.url!);
  const ext = path.extname(filePath);
  const contentType: Record<string, string> = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
  };

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": contentType[ext] || "text/plain" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Weather Station GUI running at http://localhost:${PORT}`);
});
