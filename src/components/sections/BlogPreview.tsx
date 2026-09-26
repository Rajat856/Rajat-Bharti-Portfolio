import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { posts } from "@/lib/data/posts";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PostCard } from "@/components/ui/PostCard";

export function BlogPreview() {
  const latest = posts.slice(0, 3);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Writing"
            title="Notes on the craft"
            description="Field notes from client work — performance, automation reliability, migrations and the occasional opinion about 3D on the web."
            className="max-w-2xl"
          />
          <div className="hidden sm:block">
            <Button href="/blog" variant="outline" arrow>
              All posts
            </Button>
          </div>
        </div>

        <RevealGroup className="mt-14 grid gap-4 md:grid-cols-3" stagger={0.08}>
          {latest.map((post) => (
            <RevealItem key={post.slug}>
              <PostCard post={post} />
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-10 sm:hidden">
          <Button href="/blog" variant="outline" arrow>
            All posts
          </Button>
        </div>
      </div>
    </section>
  );
}
