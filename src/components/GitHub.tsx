import { useState, useEffect } from "preact/hooks";
import "../styles/global.css";
import { AstroBuiltinProps } from "astro";
const API_BASE = "https://api.github.com";
const username = "nullxx";

interface Props extends AstroBuiltinProps {}

interface GitHubProfile {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company?: any;
  blog: string;
  location: string;
  email?: any;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
}

export default function GitHub({}: Props) {
  const [profile, setProfile] = useState<GitHubProfile>();
  const [loadingProfile, setLoadingProfile] = useState(false);

  async function fetchGithubProfile() {
    setLoadingProfile(true);
    fetch(`${API_BASE}/users/${username}`)
      .then((r) => r.json())
      .then((profile) => setProfile(profile))
      .finally(() => setLoadingProfile(false));
  }

  useEffect(() => {
    fetchGithubProfile();
  }, []);

  const loading = loadingProfile;

  if (loading) {
    return (
      <div class="justify-center flex">
        <svg
          class="w-5 h-5 mr-3 -ml-1 text-green-500 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div class="text-center mb-3 dark:text-dark-text-color">
      <img
        class="rounded-full h-32 w-32 mx-auto	 align-self"
        src={profile.avatar_url}
        alt={profile.login}
      />
      <div class="flex justify-center items-center">
        <h1 class="text-2xl font-bold mr-2">{profile.name}</h1>

        <a href={profile.html_url} target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </div>
      <p class="text-gray-600 dark:text-dark-text-color">{profile.bio}</p>
    </div>
  );
}
