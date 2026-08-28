"use client";

import Link from "next/link";
import { useState } from "react";

type Experience = {
  slug: string;
  title: string;
  favicon?: string;
  dateRange?: string;
  date?: string;
  location?: string;
  type?: string;
  area?: string[];
};

type Props = {
  experiences: Experience[];
  lang: string;
  isEn: boolean;
  icon: React.ReactNode;
};

const ROW_H = "h-10"; // fixed row height to sync pinned & scrollable columns
const HEADER_H = "h-8";

export function ExperienceGrid({ experiences, lang, isEn, icon }: Props) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  return (
    <div
      className="flex text-sm md:text-base whitespace-nowrap"
      onMouseOver={(event) => {
        const cell = (event.target as HTMLElement).closest<HTMLElement>("[data-row]");
        if (cell?.dataset.row) setHoveredRow(cell.dataset.row);
      }}
      onMouseLeave={() => setHoveredRow(null)}
    >
      {/* ===== Pinned left column (outside scroll container) ===== */}
      <div className="flex-shrink-0 bg-white z-10">
        {/* Header */}
        <div className={`${HEADER_H} flex items-center pr-2 font-semibold text-neutral-500 border-b`}>
          {icon}
          <span className="hidden md:inline ml-1.5">{isEn ? "Name" : "名称"}</span>
        </div>
        {/* Rows */}
        {experiences.map((exp) => (
          <Link
            key={exp.slug}
            href={`/${lang}/experience/${exp.slug}`}
            data-row={exp.slug}
            className={`${ROW_H} flex cursor-pointer items-center border-b border-neutral-100 pr-2 font-semibold transition-colors duration-300 ${
              hoveredRow === exp.slug ? "bg-neutral-100" : "bg-white"
            }`}
          >
            {exp.favicon && (
              <img src={exp.favicon} alt="" className="w-4 h-4 flex-shrink-0" />
            )}
            <span className="hidden md:inline ml-1.5">{exp.title}</span>
          </Link>
        ))}
      </div>

      {/* ===== Scrollable right area ===== */}
      <div className="experience-scroll-region overflow-x-auto flex-1 min-w-0">
        <div className="exp-scroll-grid">
          {/* Header */}
          <div className={`${HEADER_H} flex items-center pr-4 font-semibold text-neutral-500 border-b md:hidden`}>
            {isEn ? "Name" : "名称"}
          </div>
          <div className={`${HEADER_H} flex items-center pr-4 font-semibold text-neutral-500 border-b`}>
            {isEn ? "Dates" : "时间"}
          </div>
          <div className={`${HEADER_H} flex items-center pr-4 font-semibold text-neutral-500 border-b`}>
            {isEn ? "Location" : "地点"}
          </div>
          <div className={`${HEADER_H} flex items-center pr-4 font-semibold text-neutral-500 border-b`}>
            {isEn ? "Type" : "类型"}
          </div>
          <div className={`${HEADER_H} flex items-center pr-2 font-semibold text-neutral-500 border-b`}>
            {isEn ? "Focus" : "领域"}
          </div>

          {/* Rows */}
          {experiences.map((exp) => {
            const href = `/${lang}/experience/${exp.slug}`;
            return [
              <Link
                key={`${exp.slug}-name`}
                href={href}
                data-row={exp.slug}
                className={`${ROW_H} flex cursor-pointer items-center border-b border-neutral-100 pr-4 font-semibold transition-colors duration-300 md:hidden ${
                  hoveredRow === exp.slug ? "bg-neutral-100" : ""
                }`}
              >
                {exp.title}
              </Link>,
              <Link
                key={`${exp.slug}-date`}
                href={href}
                data-row={exp.slug}
                className={`${ROW_H} flex cursor-pointer items-center border-b border-neutral-100 pr-4 text-neutral-600 transition-colors duration-300 ${
                  hoveredRow === exp.slug ? "bg-neutral-100" : ""
                }`}
              >
                {exp.dateRange || exp.date}
              </Link>,
              <Link
                key={`${exp.slug}-loc`}
                href={href}
                data-row={exp.slug}
                className={`${ROW_H} flex cursor-pointer items-center border-b border-neutral-100 pr-4 text-neutral-600 transition-colors duration-300 ${
                  hoveredRow === exp.slug ? "bg-neutral-100" : ""
                }`}
              >
                {exp.location}
              </Link>,
              <Link
                key={`${exp.slug}-type`}
                href={href}
                data-row={exp.slug}
                className={`${ROW_H} flex cursor-pointer items-center border-b border-neutral-100 pr-4 text-neutral-600 transition-colors duration-300 ${
                  hoveredRow === exp.slug ? "bg-neutral-100" : ""
                }`}
              >
                {exp.type}
              </Link>,
              <Link
                key={`${exp.slug}-area`}
                href={href}
                data-row={exp.slug}
                className={`${ROW_H} flex min-w-0 cursor-pointer items-center overflow-hidden border-b border-neutral-100 pr-2 transition-colors duration-300 ${
                  hoveredRow === exp.slug ? "bg-neutral-100" : ""
                }`}
              >
                {exp.area && exp.area.length > 0 && (
                  <div className="flex min-w-0 gap-1 overflow-hidden">
                    {exp.area.map((tag) => {
                      const isHighlighted = tag.startsWith("*");
                      const label = isHighlighted ? tag.slice(1) : tag;
                      return (
                        <span
                          key={tag}
                          className={`inline-block max-w-[11rem] shrink-0 truncate text-xs md:text-sm font-medium px-1.5 md:px-2 py-0.5 rounded-md md:rounded-lg ${
                            isHighlighted
                              ? "bg-neutral-800 text-white"
                              : "bg-neutral-200 text-neutral-600"
                          }`}
                        >
                          {label}
                        </span>
                      );
                    })}
                  </div>
                )}
              </Link>,
            ];
          })}
        </div>
      </div>
    </div>
  );
}
