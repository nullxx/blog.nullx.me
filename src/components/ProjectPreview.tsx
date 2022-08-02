import "../styles/blog.css";

export interface Project {
  date: string;
  title: string;
  external?: string;
  github?: string;
  cover: string;
  tech: string[];
  url: string;
  content: string;
}

export default function ({
  title,
  date,
  external,
  github,
  cover,
  tech,
  url,
  content,
}: Project) {
  const publishDateFormated = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div class="w-full rounded-md overflow-hidden mb-2.5 border-solid border-2 bg-white">
      <div class="px-6 py-4">
        <div class="flex items-center">
          <p class="font-bold text-xl mr-1">{title}</p>

          {external && (
            <a href={external} target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}

          {github && (
            <a href={github} target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}
        </div>
        <p class="text-gray-400 z-[1]">{publishDateFormated}</p>
        <img loading="lazy" src={cover} />
        <p class="text-gray-700 text-base z-[1] mt-3">{content}</p>
      </div>
      <div class="px-6 pt-4 pb-2">
        {tech.map((tag) => (
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 z-[1]">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
