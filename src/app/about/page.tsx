import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { timeline, lectures } from "@/data/timeline";
import { Timeline } from "@/components/about/Timeline";
import { siteConfig } from "@/lib/constants";
import { JsonLdScript } from "@/components/seo/JsonLdScript";

export const metadata: Metadata = {
  title: "소개",
  description: `${profile.name} - ${profile.role}. ${profile.bio}`,
  alternates: {
    canonical: "/about",
  },
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
    <div className="mx-auto max-w-3xl px-6 py-16">
      {/* 프로필 카드 */}
      <section className="mb-12 rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-card-foreground">
          {profile.name}
        </h1>
        <p className="mb-4 text-lg text-muted-foreground">{profile.role}</p>
        <p className="leading-relaxed text-muted-foreground">{profile.bio}</p>
      </section>

      {/* 기술 스택 */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">
          기술 스택
        </h2>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-card-foreground shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* 이력 타임라인 */}
      <section>
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground">
          이력
        </h2>
        <Timeline items={timeline} />
      </section>

      {/* 강의 경력 */}
      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">
          강의 경력
        </h2>
        <div className="flex flex-col gap-3">
          {lectures.map((item, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-card px-4 py-3 shadow-sm"
            >
              <p className="font-medium text-card-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <JsonLdScript data={jsonLd} />
    </div>
  );
}
