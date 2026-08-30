import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectRoot = process.cwd();
const sections = [
  { folder: path.join(projectRoot, 'docs'), routeBase: '/docs', sectionName: 'documentation' },
  { folder: path.join(projectRoot, 'sops'), routeBase: '/sops', sectionName: 'sop' },
  { folder: path.join(projectRoot, 'troubleshooting'), routeBase: '/troubleshooting', sectionName: 'troubleshooting' },
];

function createSlug(text) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function stripNumberPrefix(segment) {
  return segment.replace(/^\d+-/, '');
}

function walk(dir, section, articles) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, section, articles);
      continue;
    }

    if (!entry.name.endsWith('.md')) {
      continue;
    }

    const raw = fs.readFileSync(fullPath, 'utf-8');
    const { data } = matter(raw);

    if (!data.title) {
      continue;
    }

    const relativePath = path
      .relative(section.folder, fullPath)
      .replace(/\.md$/, '')
      .split(path.sep)
      .map(stripNumberPrefix);

    const directories = relativePath.slice(0, -1);
    const fileName = relativePath[relativePath.length - 1];

 const cleanDirectories = directories
  .filter((segment) => segment.toLowerCase() !== 'intro')
  .map((segment) => stripNumberPrefix(segment));

    const fileSlug = createSlug(fileName);

    const slugParts = [...cleanDirectories, fileSlug].filter(Boolean);

    let articlePath = section.routeBase;

    if (slugParts.length > 0) {
      articlePath = section.routeBase + '/' + slugParts.join('/');
    }

    articles.push({
      title: data.title,
      date: data.date || data.updated || new Date().toISOString(),
      author: data.author || '',
      image: data.image || '',
      category: data.category || 'General',
      type: data.type || '',
      tag: data.tag || '',
      description: data.description || '',
      section: data.section || section.sectionName,
      path: articlePath,
      link: articlePath,
    });
  }
}

const articles = [];

for (const section of sections) {
  if (fs.existsSync(section.folder)) {
    walk(section.folder, section, articles);
  }
}

articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const staticPath = path.join(projectRoot, 'static');

fs.mkdirSync(staticPath, { recursive: true });

fs.writeFileSync(
  path.join(staticPath, 'articles.json'),
  JSON.stringify(articles, null, 2),
  'utf-8'
);

console.log(`Generated ${articles.length} articles.`);
