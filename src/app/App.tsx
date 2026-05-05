// src/app/App.tsx
import type React from "react";
import { useEffect, useMemo, useState } from "react";

import logo from "../assets/wingslogo.png";
import jumpsIcon from "../assets/jumpsicon.png";
import agesIcon from "../assets/ages.png";
import lessonIcon from "../assets/lesson.png";
import etiquetteIcon from "../assets/etiquette.png";
import heroImage1 from "../assets/hero/hero-1.jpg";
import heroImage2 from "../assets/hero/hero-2.jpg";
import heroImage3 from "../assets/hero/hero-3.jpg";
import heroImage4 from "../assets/hero/hero-4.jpg";
import safetyDiagram from "../assets/safety-diagram.png";

import { HeroCarousel } from "@/app/components/HeroCarousel";
import { InfoBox } from "@/app/components/InfoBox";
import { PriceCard } from "@/app/components/PriceCard";
import { ScheduleTable } from "@/app/components/ScheduleTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

export default function App() {
  const heroImages = [
    { url: heroImage3, alt: "Wings Arena seating area" },
    { url: heroImage1, alt: "Wings Arena ice rink facility" },
    { url: heroImage2, alt: "Wings Arena ice rink view" },
    { url: heroImage4, alt: "Ice skates" },
  ];

  // Track breakpoints in JS so we can (a) scroll correctly and (b) remount schedule when layout changes.
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : false
  );

  const [isUnder1000, setIsUnder1000] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 1000px)").matches
      : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const mq1000 = window.matchMedia("(max-width: 1000px)");

    const onDesktopChange = () => setIsDesktop(mqDesktop.matches);
    const on1000Change = () => setIsUnder1000(mq1000.matches);

    // Safari fallback support
    if (mqDesktop.addEventListener)
      mqDesktop.addEventListener("change", onDesktopChange);
    else mqDesktop.addListener(onDesktopChange);

    if (mq1000.addEventListener)
      mq1000.addEventListener("change", on1000Change);
    else mq1000.addListener(on1000Change);

    // Initialize
    onDesktopChange();
    on1000Change();

    return () => {
      if (mqDesktop.removeEventListener)
        mqDesktop.removeEventListener("change", onDesktopChange);
      else mqDesktop.removeListener(onDesktopChange);

      if (mq1000.removeEventListener)
        mq1000.removeEventListener("change", on1000Change);
      else mq1000.removeListener(on1000Change);
    };
  }, []);

  // Remount ScheduleTable when the <=1000 layout mode changes
  const scheduleKey = useMemo(
    () => (isUnder1000 ? "schedule-under-1000" : "schedule-over-1000"),
    [isUnder1000]
  );

  const smoothScrollToEl = (el: HTMLElement, id?: string) => {
    if (id) {
      try {
        window.history.replaceState(null, "", `#${id}`);
      } catch {
        // ignore
      }
    }

    const offset = 12;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;

    window.requestAnimationFrame(() => {
      window.scrollTo({ top, behavior: "smooth" });
    });
  };

  const scrollToId =
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;
      smoothScrollToEl(el, id);
    };

  const scrollToPricing = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = isDesktop ? "pricing-desktop" : "pricing-mobile";
    const el = document.getElementById(targetId);
    if (!el) return;
    smoothScrollToEl(el, targetId);
  };

  // ✅ One shadow token you can reuse everywhere (cards/images/buttons/schedule wrappers)
  const SHADOW = "shadow-[0_8px_20px_rgba(0,0,0,0.45)]";

  // ✅ Keep these referenced so TS doesn't flag them as unused
  void scrollToId;
  void scrollToPricing;

  return (
    <div className="min-h-screen bg-[#00adab] flex flex-col sm:block">
      {/* Header */}
      <header className="bg-[#00adab] border-b border-[#b2dbd7]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 py-4">
          <nav className="flex items-center justify-between"></nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#00adab] border-b border-[#b2dbd7]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 xl:px-0 py-12">
          <div className="grid lg:grid-cols-12 gap-y-8 lg:gap-y-8 lg:gap-x-16 xl:gap-x-30 items-center">
            {/* LEFT (text) */}
            <div className="lg:col-span-7 lg:-ml-[60px] min-[1001px]:max-[1325px]:ml-0 min-[1001px]:max-[1325px]:pr-5">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={logo}
                  alt="Wings Arena"
                  className="w-[85.03px] mt-[-65px] mb-[10px]"
                />

                <h1 className="text-4xl lg:text-5xl text-[#1e2a3a] text-center">
                  Freestyle Figure Skating
                </h1>

                <div className="mt-[15px] -mb-[10px] h-px w-full max-w-[52rem] bg-gradient-to-r from-transparent via-[#b2dbd7]/50 to-transparent" />
              </div>

              <div className="text-[#1e2a3a] mb-4 space-y-5 text-center text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed mx-auto max-w-[52rem]">
                <p>
                  Designated ice time for figure skaters only, providing a focused environment for individual
                  practice and private lessons. These sessions are open to all levels—unless otherwise
                  noted—and are ideal for skaters looking to improve jumps, spins, and moves in the field.
                </p>

                <p>
                  Skaters must be familiar with standard ice patterns and etiquette to ensure a safe and
                  productive experience for everyone. If your skater is new to Freestyle and unsure about
                  the proper ice patterns, please ask a coach for a quick overview.
                </p>
              </div>
            </div>

            {/* RIGHT (carousel) */}
            <div className="lg:col-span-5">
              {/* ✅ Add mobile padding so the carousel never kisses the edges */}
              <div className="max-[640px]:px-3 max-[640px]:box-border">
                <div
                  className={`
                    relative h-64 sm:h-80 lg:h-96
                    ml-[0px] lg:ml-0
                    min-[1001px]:max-[1325px]:h-[320px]
                    min-[1001px]:max-[1325px]:ml-0
                    min-[1001px]:max-[1325px]:scale-[0.93]
                    min-[1001px]:max-[1325px]:origin-top-left
                    ${SHADOW}
                    rounded-lg overflow-hidden
                  `}
                >
                  <HeroCarousel images={heroImages} interval={3000} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reorder Schedule before Info Boxes ONLY at widths <= 1000px */}
      <div className="max-[1000px]:flex max-[1000px]:flex-col">
        {/* Info Boxes */}
        <section className="max-w-[calc(80rem*0.97+200px)] mx-auto px-0 sm:px-6 xl:px-8 py-8 max-[1000px]:order-2 max-[1000px]:pt-0 max-[1000px]:-mt-[18px] lg:mt-[25px]">
          {/* ✅ Mobile padding wrapper for the whole grid */}
          <div className="max-[640px]:px-3 max-[640px]:box-border">
            <div className="grid w-full grid-cols-2 lg:grid-cols-4 gap-x-[20px] gap-y-[calc(1rem*1.0356)] justify-items-stretch">
              <div className={`w-full [&>*]:!w-full [&>*]:${SHADOW}`}>
                <InfoBox
                  iconImage={agesIcon}
                  title="All Levels Welcome"
                  description="Sessions are open to skaters of all skill levels unless otherwise noted."
                  iconSize="w-[35px] h-[35px]"
                  iconOffset="-mt-[5px]"
                  titleClassName="text-[16px] sm:text-[16px]"
                  descriptionClassName="text-[11px] sm:text-[13px] leading-tight"
                />
              </div>

              <div className={`w-full [&>*]:!w-full [&>*]:${SHADOW}`}>
                <InfoBox
                  iconImage={jumpsIcon}
                  title="Jumps & Spins"
                  description="Ideal for improving jumps, spins, and moves in the field at your own pace"
                  iconSize="w-[35.35px] h-[35.35px]"
                  iconOffset="-mt-[10px]"
                  textOffset="-mt-[1.5px]"
                  titleClassName="text-[15px] sm:text-[16px]"
                  descriptionClassName="text-[11px] sm:text-[13px] leading-snug"
                />
              </div>

              <div className={`w-full [&>*]:!w-full [&>*]:${SHADOW}`}>
                <InfoBox
                  iconImage={lessonIcon}
                  title="Private Lessons"
                  description="A focused environment for individual practice and private lessons with coaches"
                  titleClassName="text-[16px] sm:text-[16px]"
                  descriptionClassName="text-[11px] sm:text-[13px] leading-tight"
                  iconOffset="-mt-[0px]"
                  textOffset="-mt-[3.5px]"
                />
              </div>

              <div className={`w-full [&>*]:!w-full [&>*]:${SHADOW}`}>
                <InfoBox
                  iconImage={etiquetteIcon}
                  title="Ice Etiquette"
                  description="Skaters must know standard ice patterns to keep sessions safe and productive"
                  titleClassName="text-[16px] sm:text-[16px]"
                  descriptionClassName="text-[11px] sm:text-[13px] leading-tight"
                  iconOffset="-mt-[6px]"
                  textOffset="-mt-[3.5px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section id="schedule" className="bg-[#00adab] py-12 max-[1000px]:order-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
            {/* ✅ Add a mobile-only padding wrapper for the schedule card */}
            <div className="max-[640px]:px-0">
              <div className="flex flex-col gap-6 sm:gap-8 min-[1001px]:items-center">
                <div
                  className={[
                    "order-1 w-full",
                    "max-[1000px]:-mt-[47px] max-[1000px]:mx-0",
                    "min-[1001px]:mx-auto",
                    "min-[1001px]:w-[clamp(760px,72vw,1240px)]",
                    "min-[1001px]:-mt-[30px]",
                  ].join(" ")}
                >
                  <h2 className="text-[1.50125rem] sm:text-4xl mb-7 mt-7 min-[1001px]:mb-11 text-[#1e2a3a] text-center">
                    Upcoming Freestyle Figure Skating Sessions
                  </h2>
                  <div className="mb-[20px] -mt-[12px] h-px w-full bg-gradient-to-r from-transparent via-[#b2dbd7]/50 to-transparent" />

                  {/* ✅ Mobile padding so schedule container doesn't feel edge-to-edge */}
                  <div className="max-[640px]:px-3 max-[640px]:box-border">
                    <div
                      className={`bg-gray-800 rounded-lg border border-gray-700 p-4 sm:p-6 w-full min-w-0 overflow-visible ${SHADOW}`}
                    >
                      <ScheduleTable key={scheduleKey} />
                    </div>
                  </div>
                </div>

                {/* Pricing Section - mobile */}
                <div className="order-2 lg:hidden mt-0">
                  <h2
                    id="pricing-mobile"
                    className="text-[1.7rem] sm:text-[2.15625rem] mb-2 sm:mb-8 text-[#1e2a3a] text-center mt-[0px] sm:mt-0"
                  ></h2>

                  {/* ✅ Mobile padding wrapper so pricing cards never hit the edges */}
                  <div className="max-[640px]:px-3 max-[640px]:box-border">
                    <div
                      className="flex justify-center w-full"
                      style={{
                        ["--pc-w" as any]: "clamp(140px, 56vw, 163px)",
                        ["--pc-gap" as any]: "clamp(8px, 3.2vw, 28px)",
                        ["--pc-title" as any]: "clamp(14px, 2.2vw, 20px)",
                        ["--pc-price" as any]: "clamp(24px, 4.6vw, 42px)",
                        ["--pc-desc" as any]: "clamp(12px, 1.8vw, 14px)",
                        ["--pc-feat" as any]: "clamp(12px, 1.7vw, 14px)",
                      }}
                    >
                      <div className="grid grid-flow-col items-stretch justify-center gap-x-[var(--pc-gap)] auto-cols-[clamp(132px,56vw,200px)] max-[450px]:auto-cols-[clamp(108px,46vw,150px)] min-[601px]:max-[1000px]:auto-cols-[clamp(220px,35vw,340px)]">
                        <div className={`h-full flex [&>*]:h-full [&>*]:w-full [&>*]:mx-0 [&>*]:${SHADOW}`}>
                          <PriceCard title="Skaters" price="$25" description="Per session" />
                        </div>

                        <div className={`h-full flex [&>*]:h-full [&>*]:w-full [&>*]:mx-0 [&>*]:${SHADOW}`}>
                          <PriceCard title="Coaches" price="$10" description="With student" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Pricing Section - desktop */}
      <section
        id="pricing-desktop"
        className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 py-20 lg:-mt-[75px]"
      >
        <h2 className="text-[2rem] sm:text-[2.15625rem] mb-1 text-[#1e2a3a] text-center"></h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-[856px] mx-auto gap-8 sm:gap-12 lg:gap-[72px]">
          <div className={`[&>*]:${SHADOW}`}>
            <PriceCard
              title="Skaters"
              price="$25"
              description="Per session"
              features={[
                "All levels welcome",
                "Private lessons permitted",
                "Check our calendar for dates & times!",
              ]}
            />
          </div>

          <div className={`[&>*]:${SHADOW}`}>
            <PriceCard
              title="Coaches"
              price="$10"
              description="With student"
              features={[
                "Must accompany a registered skater",
                "Private lesson ice time available",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Practice Patterns Section */}
      <section className="bg-[#00adab] py-12 sm:py-12 pt-0 sm:pt-12 order-1 sm:order-none mt-[35px] sm:mt-0 -translate-y-[15px]">
        <div className="max-w-[58.08rem] mx-auto px-4 sm:px-6 xl:px-8">
          <h2 className="text-2xl sm:text-3xl mb-4 sm:mb-6 text-[#1e2a3a] text-center">
            Practice Patterns
          </h2>
          <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-[#b2dbd7]/50 to-transparent" />

          <p className="text-[#1e2a3a] text-center text-[15px] sm:text-[16px] mb-6">
            Please note the <strong className="text-[#1e2a3a]">Rink Safety Diagram</strong> to understand the
            flow of traffic on freestyle practice sessions.
          </p>

          <div className="flex justify-center mb-8">
            <img src={safetyDiagram} alt="Rink Safety Diagram" className="max-w-sm w-full rounded-lg" />
          </div>

          <div className="text-[#1e2a3a] text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed mx-auto max-w-[72rem] columns-1 sm:columns-2 gap-x-10 [&>p]:mb-5 [&>p]:break-inside-avoid">
            <p>
              Spins are best practiced at center ice. Standstill jump practice is best placed on the goal
              lines in the corners opposite the Lutz corners. Edge jumps are generally practiced on a
              continuum just outside of center ice.
            </p>
            <p>
              Practicing the Lutz presents particular safety issues. Try to be especially aware of your
              surroundings when you are in the Lutz corners. Remember that the approach to a Lutz is long
              and blind. The skater doing the Lutz is not likely to see you.
            </p>
            <p>
              Remember, skaters may jump and spin in either direction. Take note of these skaters and again,
              be particularly mindful of both Lutz corners.
            </p>
            <p>
              Dance and moves in the field patterns utilize the perimeter of the rink (using the
              continuous/perimeter axis). These patterns vary and, depending on the level of the skater,
              may fully utilize the ice surface.
            </p>
            <p>
              <strong className="text-[#1e2a3a]">Teaching Area</strong> – Coaches teach from the sides, away
              from the center of the ice so skaters can go by.
            </p>
            <p>
              <strong className="text-[#1e2a3a]">Edge Jumps and Maneuvers</strong> – Edge jumps and other
              maneuvers are practiced around the center of the ice.
            </p>
            <p>
              <strong className="text-[#1e2a3a]">Spinning Center</strong> – Spins should be practiced in the
              center of the ice away from jumping and edge patterns.
            </p>
            <p>
              <strong className="text-[#1e2a3a]">Jumping Corners</strong> – Jumpers have the right of way in
              the four corners of the ice, mainly for Lutz Jumps. Toe jumps go down the middle-end of the
              ice as well. Avoid spinning or standing in these areas.
            </p>
            <p>
              <strong className="text-[#1e2a3a]">Standing, Talking, Stretching, Etc.</strong> – Those standing
              still, talking, or stretching should get off the ice. Stopping in the middle of the ice is a
              hazard especially near jumping areas. Keep moving while you are on the ice.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#00adab] py-12 sm:py-12 pt-0 sm:pt-12 order-1 sm:order-none -translate-y-[15px]">
        <div className="max-w-[58.08rem] mx-auto px-4 sm:px-6 xl:px-8">
          <h2 className="text-2xl sm:text-3xl mb-4 sm:mb-6 text-[#1e2a3a] text-center">
            Frequently Asked Questions
          </h2>
          <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-[#b2dbd7]/50 to-transparent" />

          <Accordion
            type="single"
            collapsible
            className={`bg-[#1e2a3a] rounded-lg border border-gray-700 px-4 sm:px-6 text-white ${SHADOW}`}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-white">
                What is Freestyle Figure Skating?
              </AccordionTrigger>
              <AccordionContent className="text-white">
                Freestyle is designated ice time for figure skaters only, providing a focused environment for
                individual practice and private lessons. Sessions are open to all levels—unless otherwise
                noted—and are ideal for skaters looking to improve jumps, spins, and moves in the field.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-white">
                Who can participate?
              </AccordionTrigger>
              <AccordionContent className="text-white">
                Sessions are open to skaters of all levels unless otherwise noted on the schedule. Skaters
                must be familiar with standard ice patterns and etiquette to ensure a safe and productive
                experience for everyone.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-white">
                Can coaches be on the ice?
              </AccordionTrigger>
              <AccordionContent className="text-white">
                Yes—coaches may access the ice for $10 when accompanying a registered skater. Freestyle
                sessions are an ideal setting for private lessons and individual instruction.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-white">
                What if my skater is new to Freestyle?
              </AccordionTrigger>
              <AccordionContent className="text-white">
                If your skater is new to Freestyle and unsure about the proper ice patterns, please ask a
                coach for a quick overview before getting on the ice.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-white">
                When are Freestyle sessions held?
              </AccordionTrigger>
              <AccordionContent className="text-white">
                Check our calendar for current dates and times. Session availability varies throughout the
                season.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
