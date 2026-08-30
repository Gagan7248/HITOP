import chokidar from "chokidar";
import { execFile } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const folders = [
  path.join(projectRoot, "docs"),
  path.join(projectRoot, "sops"),
  path.join(projectRoot, "troubleshooting"),
];

let timer;

function generateArticles() {
  console.log("\n🔄 Articles changed. Regenerating...");

  execFile(
    process.execPath,
    [path.join(projectRoot, "scripts", "generate-articles.mjs")],
    { cwd: projectRoot },
    (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Generation failed:", error.message);
        return;
      }

      console.log(stdout.trim());

      if (stderr) {
        console.error(stderr.trim());
      }

      // Touch generated file so Docusaurus detects a filesystem change
      const articlesFile = path.join(
        projectRoot,
        "static",
        "articles.json"
      );

      const now = new Date();
      fs.utimesSync(articlesFile, now, now);

      console.log("🔁 Docusaurus refresh signal sent.");
    }
  );
}

const watcher = chokidar.watch(
  folders.map((folder) => path.join(folder, "**", "*.md")),
  {
    ignoreInitial: true,
    persistent: true,
    usePolling: true,
    interval: 500,
    awaitWriteFinish: {
      stabilityThreshold: 500,
      pollInterval: 100,
    },
  }
);

watcher.on("all", (event, filePath) => {
  console.log(`📄 ${event}: ${filePath}`);

  clearTimeout(timer);

  timer = setTimeout(() => {
    generateArticles();
  }, 700);
});

watcher.on("error", (error) => {
  console.error("❌ Watcher error:", error);
});

console.log("👀 HITOP article watcher is running...");
console.log("Watching:");
folders.forEach((folder) => console.log(`  ${folder}`));