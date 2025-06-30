import { HeroSection } from '@/components/sections/hero-section';
import { UpdatesSection } from '@/components/sections/updates-section';
import { StatsSection } from '@/components/sections/stats-section';
import { FeaturedGamesSection } from '@/components/sections/featured-games-section';
import { CommunitySection } from '@/components/sections/community-section';
import { CTASection } from '@/components/sections/cta-section';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <HeroSection />
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Updates - Large */}
          <div className="lg:col-span-4">
            <UpdatesSection />
          </div>

          {/* Featured Games - Medium */}
          <div className="md:col-span-2 lg:col-span-2">
            <FeaturedGamesSection />
          </div>

          {/* Stats - Small */}
          <div>
            <StatsSection />
          </div>

          {/* Community - Medium */}
          <div className="md:col-span-2 lg:col-span-2">
            <CommunitySection />
          </div>

          {/* CTA - Small */}
          <div>
            <CTASection />
          </div>
        </div>
      </section>
    </main>
  );
}