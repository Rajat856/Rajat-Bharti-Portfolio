import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPost, posts, type Block } from "@/lib/data/posts";
import { Aurora, Badge, GridLines } from "@/components/ui/Primitives";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { PostCard } from "@/components/ui/PostCard";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { CallToAction } from "@/components/sections/CallToAction";
import { profile } from "@/lib/data/profile";
import { absoluteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: absoluteUrl(`/blog/${post.slug}`),
      publishedTime: post.dateISO,
      authors: [profile.name],
      tags: [...post.tags],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.dateISO,
    author: { "@type": "Person", name: profile.name, url: absoluteUrl("/") },
    publisher: { "@type": "Person", name: profile.name },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ReadingProgress />

      <article>
        {/* Header */}
        <header className="relative overflow-hidden pb-12 pt-36 sm:pt-44">
          <Aurora intensity={0.65} />
          <GridLines />

          <div className="container-page">
            <Reveal direction="none" duration={0.5}>
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
              >
                <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
                All posts
              </Link>
            </Reveal>

            <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[11px] text-faint">
              <Badge tone="brand">{post.category}</Badge>
              <time dateTime={post.dateISO}>{post.date}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </div>

            <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[1.05] tracking-[-0.03em]">
              <RevealText text={post.title} />
            </h1>

            <Reveal delay={0.15}>
              <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
                {post.excerpt}
              </p>
            </Reveal>
          </div>
        </header>

        {/* Cover strip */}
        <div className="container-page">
          <Reveal direction="none" duration={0.9}>
            <div className="relative aspect-[21/7] overflow-hidden rounded-4xl border border-line">
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${post.cover.from}, ${post.cover.to})`,
                }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.3),transparent_58%)]" />
            </div>
          </Reveal>
        </div>

        {/* Body */}
        <div className="container-page py-16 sm:py-20">
          <div className="mx-auto max-w-2xl">
            {post.body.map((block, i) => (
              <Reveal key={i} amount={0.1} duration={0.6}>
                <BlockRenderer block={block} />
              </Reveal>
            ))}

            <div className="mt-14 flex flex-wrap gap-2 border-t border-line pt-8">
              {post.tags.map((tag) => (
                <Badge key={tag}>#{tag}</Badge>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-4 rounded-3xl border border-line bg-surface/50 p-6">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--color-brand-500),var(--color-cyan-glow))] text-sm font-semibold text-white">
                RB
              </span>
              <div>
                <p className="text-sm font-medium">{profile.name}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">
                  {profile.role} in {profile.locationShort}. Writes about performance, automation
                  and the parts of client work nobody documents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="relative py-12">
        <div className="container-page">
          <h2 className="font-display text-3xl tracking-tight">Keep reading</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CallToAction />
    </>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-12 font-display text-3xl leading-tight tracking-tight sm:text-4xl">
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="mt-9 text-xl font-medium tracking-tight">{block.text}</h3>;
    case "p":
      return (
        <p className="mt-5 text-pretty text-base leading-[1.75] text-muted sm:text-[17px]">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-4 text-base leading-[1.7] text-muted">
              <span className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={item} className="flex gap-4 text-base leading-[1.7] text-muted">
              <span className="mt-0.5 font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item}
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="my-10 border-l-2 border-accent pl-6 font-display text-xl leading-snug tracking-tight text-ink sm:text-2xl">
          {block.text}
        </blockquote>
      );
    case "code":
      return (
        <pre className="mt-6 overflow-x-auto rounded-2xl border border-line bg-surface-2 p-5 font-mono text-[13px] leading-relaxed">
          <code>{block.code}</code>
        </pre>
      );
    default:
      return null;
  }
}
