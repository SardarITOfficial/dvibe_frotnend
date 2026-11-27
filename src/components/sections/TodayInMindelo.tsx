import { Fragment } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { WEATHER_CONFIG } from "@/mocks/weather";
import type { WeatherIcon } from "@/mocks/weather";

function MetricIcon({ icon }: { icon: WeatherIcon }) {
  if (icon.type === "image") {
    return (
      <Image src={icon.src} alt="" width={icon.width} height={icon.height} />
    );
  }

  const Icon = icon.component;

  return <Icon size={40} className={icon.className} />;
}

export default function TodayInMindelo() {
  const t = useTranslations("Weather");

  const { image, metrics } = WEATHER_CONFIG;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-background sm:rounded-xl sm:border-0 sm:bg-cream xl:flex xl:h-38.5 xl:items-center">
      <svg aria-hidden focusable="false" className="absolute size-0">
        <defs>
          <clipPath id="weather-panel-clip" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H0.985 C0.945,0.25 0.925,0.75 0.9,1 H0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="relative flex items-center px-5 pb-5 pt-6 sm:px-6 sm:py-8 xl:w-[38%] xl:max-w-125.25 xl:shrink-0 xl:self-stretch xl:py-0 xl:pl-9.5 xl:pr-0 xl:[clip-path:url(#weather-panel-clip)]">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1280px) 501px, 100vw"
          className="hidden object-cover sm:block"
        />
        <span
          aria-hidden
          className="absolute inset-0 hidden bg-linear-to-l from-accent/50 to-accent sm:block"
        />

        <div className="relative flex max-w-74.25 flex-col gap-1">
          <h3 className="font-hero text-3xl font-bold leading-[1.2] text-charcoal sm:font-display sm:font-normal sm:italic sm:leading-[1.35] sm:text-background xl:text-[40px]">
            {t("title")}
          </h3>
          <p className="text-sm leading-[1.6] text-muted sm:text-base sm:text-background">
            {t("description")}
          </p>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 px-5 py-6 sm:gap-5 sm:px-6 sm:grid-cols-2 lg:grid-cols-4 xl:flex xl:min-w-0 xl:flex-1 xl:items-center xl:gap-6 xl:py-0 xl:pl-5.25 xl:pr-9 2xl:gap-9">
        {metrics.map((metric, index) => (
          <Fragment key={metric.id}>
            {index > 0 && (
              <li
                aria-hidden
                className="hidden h-12 w-[0.5px] shrink-0 bg-subtle xl:block"
              />
            )}
            <li className="flex items-center gap-3 sm:gap-4">
              <span className="shrink-0">
                <MetricIcon icon={metric.icon} />
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="text-lg font-semibold leading-6 text-charcoal sm:text-xl sm:leading-6.25">
                  {metric.value}
                </span>
                <span className="text-sm leading-5 text-muted sm:text-base sm:text-subtle">
                  {t(`metrics.${metric.id}`)}
                </span>
              </div>
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
