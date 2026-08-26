import type { Metadata } from "next";
import XianxiaExperience, { type PublicXianxiaStory } from "./XianxiaExperience";
import { getXianxiaStory, type XianxiaStory } from "./story-packages";
import "./xianxia.css";

export const metadata: Metadata = {
  title: "与雪同归 · 神仙姐姐篇",
  description: "你将以宗门天才的身份，亲手走过一场仙门诬陷与人间重生。",
};

function toPublicStory(story: XianxiaStory): PublicXianxiaStory {
  return {
    id: story.id,
    title: story.title,
    subtitle: story.subtitle,
    logline: story.logline,
    accent: story.accent,
    playerRole: story.playerRole,
    introduction: story.introduction,
    threeAct: story.threeAct,
    chapters: story.chapters,
    characters: story.characters.map(({ id, name, role, shortBio, portrait, featured }) => ({
      id,
      name,
      role,
      shortBio,
      portrait,
      featured,
    })),
    opening: { events: story.opening.events, choices: story.opening.choices },
    chapterBackgrounds: story.chapterBackgrounds,
    chapterEndPreviews: story.chapterEndPreviews,
    backgroundMusic: story.backgroundMusic,
  };
}

export default async function XianxiaPage({ searchParams }: { searchParams?: Promise<{ story?: string }> }) {
  const params = searchParams ? await searchParams : undefined;
  const selected = getXianxiaStory(params?.story ?? "immortal-sister");
  if (!selected) return null;
  return <XianxiaExperience story={toPublicStory(selected)} />;
}
