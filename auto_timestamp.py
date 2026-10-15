
from pathlib import Path
from datetime import datetime
from threading import Timer, Lock
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import time
import re

# HITOP project paths
PROJECT = Path(r"C:\Users\HFCS\Desktop\hitop")
POSTS = PROJECT / "docs" / "blog" / "posts"

timers = {}
timer_lock = Lock()


def add_timestamp(path):
    try:
        if not path.exists() or path.suffix.lower() != ".md":
            return

        content = path.read_text(encoding="utf-8")

        timestamp = timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
)

        # Update only date.created; preserve other metadata
        if content.startswith("---"):
            parts = content.split("---", 2)

            if len(parts) >= 3:
                frontmatter = parts[1]
                body = parts[2]

                date_pattern = r"(?ms)^date\s*:.*?(?=^[\w-]+\s*:|\Z)"

                if re.search(date_pattern, frontmatter):
                    replacement = f"date:\n  created: {timestamp}\n"
                    frontmatter = re.sub(
                        date_pattern,
                        lambda _: replacement,
                        frontmatter,
                        count=1
                    )
                else:
                   frontmatter = (
   			 "---\n"
   			 f"date: {timestamp}\n"
  			  "---\n\n"
			)

                updated = f"---{frontmatter}---{body}"

            else:
                updated = (
                    f"---\ndate:\n  created: '{timestamp}'\n"
                    f"---\n\n{content}"
                )
        else:
            updated = (
                f"---\ndate:\n  created: '{timestamp}'\n"
                f"---\n\n{content}"
            )

        path.write_text(updated, encoding="utf-8")
        print(f"Timestamp added: {path.name}")

    except (PermissionError, OSError) as error:
        print(f"Could not update {path.name}: {error}")


def schedule_timestamp(filename):
    path = Path(filename)

    if path.suffix.lower() != ".md":
        return

    key = str(path)

    with timer_lock:
        old_timer = timers.pop(key, None)

        if old_timer:
            old_timer.cancel()

        timer = Timer(3.0, add_timestamp, args=[path])
        timer.daemon = True
        timers[key] = timer
        timer.start()


class ArticleHandler(FileSystemEventHandler):
    def on_created(self, event):
        if not event.is_directory:
            schedule_timestamp(event.src_path)

    def on_moved(self, event):
        if not event.is_directory:
            schedule_timestamp(event.dest_path)


if __name__ == "__main__":
    if not POSTS.is_dir():
        raise SystemExit(
            f"ERROR: Articles folder not found:\n{POSTS}\n"
            "Please correct the POSTS path in this script."
        )

    observer = Observer()
    observer.schedule(ArticleHandler(), str(POSTS), recursive=True)
    observer.start()

    print(f"Watching HITOP articles: {POSTS}")
    print("Create a NEW .md file inside this folder to test.")
    print("Press Ctrl+C to stop.")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()

        with timer_lock:
            for timer in timers.values():
                timer.cancel()

    observer.join()
    print("Watcher stopped.")
