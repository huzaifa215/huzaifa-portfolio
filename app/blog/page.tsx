import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/blog-index";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllPosts, getCategories, formatDate } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Writing about cybersecurity, full stack development, and navigating tech in Canada — by Huzaifa Khalid.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts().map((p) => ({ ...p, dateLabel: formatDate(p.date) }));
  const categories = getCategories();

  return (
    <div className="pb-24 pt-32">
      <section className="container-page">
        <SectionHeading
          label="Writing"
          first="Thoughts &"
          second="Notes"
          subtext="Writing about cybersecurity, full stack development, and navigating tech in Canada."
        />
      </section>

      <section className="container-page mt-4">
        {posts.length > 0 ? (
          <BlogIndex posts={posts} categories={categories} />
        ) : (
          <p className="text-muted">No posts published yet — check back soon.</p>
        )}
      </section>
    </div>
  );
}
