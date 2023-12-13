import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypePrettyCode from "rehype-pretty-code";

type Post = {
  title: string;
  tags: string[];
  publishDate: string;
  updatedDate: string;
  description: string;
  slug: string;
};

// 一覧取得
export function getPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), "contents");
  const fileNames = fs.readdirSync(postsDirectory, { withFileTypes: true });

  const posts = fileNames.map(({ name }) => {
    const file = fs.readFileSync(`${postsDirectory}/${name}`, "utf8");
    const {
      data: { title, tags, publishDate, updatedDate, description },
    } = matter(file);

    const checkTagsType = (tags: any): tags is string[] => {
      if (Array.isArray(tags)) {
        return tags.every((tag) => typeof tag === "string");
      }
      return false;
    };

    return {
      title: typeof title === "string" ? title : "",
      tags: checkTagsType(tags) ? tags : [],
      publishDate: typeof publishDate === "string" ? publishDate : "",
      updatedDate: typeof updatedDate === "string" ? updatedDate : "",
      description: typeof description === "string" ? description : "",
      slug: name.split(".").at(-2) || "",
    };
  });

  return posts;
}

// 記事詳細取得
export function getPostDitails(fileName: string): Post {
  const file = fs.readFileSync(
    path.join(process.cwd(), `contents/${fileName}.mdx`),
    "utf8",
  );

  const {
    data: { title, tags, publishDate, updatedDate, description },
  } = matter(file);

  const checkTagsType = (tags: any): tags is string[] => {
    if (Array.isArray(tags)) {
      return tags.every((tag) => typeof tag === "string");
    }
    return false;
  };

  return {
    title: typeof title === "string" ? title : "",
    tags: checkTagsType(tags) ? tags : [],
    publishDate: typeof publishDate === "string" ? publishDate : "",
    updatedDate: typeof updatedDate === "string" ? updatedDate : "",
    description: typeof description === "string" ? description : "",
    slug: fileName.split(".").at(-2) || "",
  };
}

// 記事コンテンツ取得
export async function getPostContent(fileName: string) {
  const filePath = path.join(process.cwd(), `contents/${fileName}.mdx`);
  const file = fs.readFileSync(filePath, "utf8");
  const { content } = matter(file);

  return await unified()
    .use(remarkParse) // Convert into markdown AST
    .use(remarkGfm) // Support GFM (tables, autolinks, tasklists, strikethrough).
    .use(remarkRehype) // Transform to HTML AST
    .use(rehypeSanitize) // Sanitize HTML input
    .use(rehypePrettyCode, {
      theme: "material-theme-darker",
    })
    .use(rehypeStringify) // Convert AST into serialized HTML
    .process(String(content));
}
