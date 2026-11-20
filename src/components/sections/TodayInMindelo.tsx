import { Fragment } from "react";
import Image from "next/image";

import { WEATHER_CONFIG } from "@/mocks/weather";
import type { WeatherIcon } from "@/mocks/weather";

function MetricIcon({ icon }: { icon: WeatherIcon }) {
  if (icon.type === "image") {
    return <Image src={icon.src} alt="" width={40} height={40} />;
  }

  const Icon = icon.component;

  return <Icon size={40} className={icon.className} />;
}

export default function TodayInMindelo() {
  const { title, description, image, metrics } = WEATHER_CONFIG;

  return (
    <div className="relative overflow-hidden rounded-xl bg-cream xl:flex xl:h-38.5 xl:items-center">
      <svg aria-hidden focusable="false" className="absolute size-0">
        <defs>
          <clipPath id="weather-panel-clip" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H0.985 C0.945,0.25 0.925,0.75 0.9,1 H0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="relative flex items-center px-6 py-8 xl:w-[38%] xl:max-w-125.25 xl:shrink-0 xl:self-stretch xl:py-0 xl:pl-9.5 xl:pr-0 xl:[clip-path:url(#weather-panel-clip)]">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1280px) 501px, 100vw"
          className="object-cover"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-linear-to-l from-accent/50 to-accent"
        />

        <div className="relative flex max-w-74.25 flex-col gap-1">
          <h3 className="font-display text-3xl font-normal italic leading-[1.35] text-background xl:text-[40px]">
            {title}
          </h3>
          <p className="text-base leading-[1.6] text-background">
            {description}
          </p>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-5 px-6 py-6 sm:grid-cols-2 lg:grid-cols-4 xl:flex xl:min-w-0 xl:flex-1 xl:items-center xl:gap-6 xl:py-0 xl:pl-5.25 xl:pr-9 2xl:gap-9">
        {metrics.map((metric, index) => (
          <Fragment key={metric.id}>
            {index > 0 && (
              <li
                aria-hidden
                className="hidden h-12 w-[0.5px] shrink-0 bg-subtle xl:block"
              />
            )}
            <li className="flex items-center gap-4">
              <MetricIcon icon={metric.icon} />
              <div className="flex flex-col">
                <span className="text-xl font-semibold leading-6.25 text-charcoal">
                  {metric.value}
                </span>
                <span className="text-base leading-5 text-subtle">
                  {metric.label}
                </span>
              </div>
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
}