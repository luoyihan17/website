import { PostTitle } from "@/app/_components/post-title";
import DateFormatter from "@/app/_components/date-formatter";

type Props = {
  title: string;
  date: string;
  favicon?: string;
  skill?: string[];
  area?: string[];
  type?: string;
  typeBadge?: boolean;
  dateRange?: string;
  location?: string;
  showDate?: boolean;
  lang?: string;
};

const tagClass =
  "inline-block rounded-lg border border-[var(--project-content-border)] bg-[var(--project-content-surface)] px-2 py-0.5 text-sm font-medium text-[var(--project-content-text)]";
const metaClass = "text-base text-[var(--project-content-text)]";

export function PostHeader({ title, date, favicon, skill, area, type, typeBadge = true, dateRange, location, showDate, lang }: Props) {
  const hasMeta = (skill && skill.length > 0) || (area && area.length > 0) || type || dateRange || location || showDate;

  return (
    <div className="mt-8 mb-8 md:mb-10">
      <PostTitle favicon={favicon}>{title}</PostTitle>
      {hasMeta ? (
        <div className="mt-3 flex flex-col gap-1.5">
          {(type || dateRange || location || showDate || (skill && skill.length > 0)) && (
            <div className="flex flex-wrap items-center gap-1.5">
              {type && (
                typeBadge ? (
                  <span className={tagClass}>
                    {type}
                  </span>
                ) : (
                  <span className={metaClass}>
                    {type}
                  </span>
                )
              )}
              {skill && skill.map((tag) => (
                <span
                  key={tag}
                  className={tagClass}
                >
                  {tag}
                </span>
              ))}
              {(dateRange || location) && (
                <span className={metaClass}>
                  {[dateRange, location].filter(Boolean).join(", ")}
                </span>
              )}
              {showDate && (
                <span className={metaClass}>
                  <DateFormatter dateString={date} lang={lang} />
                </span>
              )}
            </div>
          )}
          {area && area.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {area.map((tag) => {
                const isHighlighted = tag.startsWith("*");
                const label = isHighlighted ? tag.slice(1) : tag;
                return (
                  <span
                    key={tag}
                    className={`inline-block text-sm font-medium px-2 py-0.5 rounded-lg ${
                      isHighlighted
                        ? "bg-[var(--project-content-heading)] text-white"
                        : "border border-[var(--project-content-border)] bg-[var(--project-content-surface)] text-[var(--project-content-text)]"
                    }`}
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
