import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { timeline } from "@/data/timeline";
import { Timeline } from "@/components/about/Timeline";
import { siteConfig } from "@/lib/constants";
import { JsonLdScript } from "@/components/seo/JsonLdScript";

export const metadata: Metadata = {
  title: "소개",
  description: `${profile.name} - ${profile.role}. ${profile.bio}`,
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.nameEn,
    jobTitle: profile.role,
    description: profile.bio,
    url: siteConfig.url,
    knowsAbout: [...profile.skills],
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* 프로필 섹션 */}
      <section className="mb-12">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {profile.name}
        </h1>
        <p className="mb-4 text-lg text-zinc-600 dark:text-zinc-400">
          {profile.role}
        </p>
        <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
          {profile.bio}
        </p>
      </section>

      {/* 기술 스택 */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          기술 스택
        </h2>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-md bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* 이력 타임라인 */}
      <section>
        <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          이력
        </h2>
        <Timeline items={timeline} />
      </section>

      <JsonLdScript data={jsonLd} />
    </div>
  );
}
