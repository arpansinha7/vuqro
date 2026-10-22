import { useState } from "react";
function App() 
{
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleUrl(e) 
  {
    e.preventDefault();

    setError("");
    setShortUrl("");
    setCopied(false);

    if(!url.trim()) 
    {
      setError("Please enter a URL.");
      return;
    }

    let parsedUrl;

    try 
    {
      
      parsedUrl = new URL(url.trim());

    } 
    catch 
    {
      setError("Please enter a valid URL.");
      return;
    }

    if(!["http:", "https:"].includes(parsedUrl.protocol)) 
    {
      setError("Only HTTP and HTTPS URLs are supported.");
      return;
    }

    setLoading(true);

    try 
    {
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/urls`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl: url.trim() }),
      });

      const data = await response.json();

      if(!response.ok) 
      {
        if(response.status === 429)
        {
          setError("Too many requests. Please wait a moment before trying again.");
          return;
        }
        setError(typeof data.error === "string" ? data.error
            : data.error?.message || data.message || "Couldn't shorten this URL. Please try again."
        );
        return;
      }

      if(!data.shortUrl) 
      {
        setError("The server didn't return a shortened URL.");
        return;
      }

      setShortUrl(data.shortUrl);
      setUrl("");

    } 
    catch 
    {
      setError("Couldn't connect to the server. Please try again.");
    }
    finally 
    {
      setLoading(false);
    }
  }

  async function copyUrl() 
  {
    try 
    {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);

    } 
    catch 
    {
      setError("Couldn't copy the URL. Please copy it manually.");
    }
  }

  return (
    <div className="min-h-screen bg-[#050807] text-emerald-50">
      <nav className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-12">
        <a href="/" className="text-2xl font-bold tracking-tight">
          vuqro<span className="text-emerald-400">.</span>
        </a>
        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 text-sm text-emerald-300">
          Simple. Short. Shareable.
        </span>
      </nav>

      <main className="mx-auto flex max-w-5xl flex-col items-center px-5 pb-20 pt-24 text-center md:pt-32">
        <div className="mb-6 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
          ✦ Your links, simplified
        </div>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl">
          Long links.
          <br />
          <span className="text-emerald-400">Short stories.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-[#82958A] md:text-lg">
          Turn long, messy URLs into clean, shareable links in seconds.
          No clutter. Just simplicity.
        </p>

        <div className="mt-12 w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0B120F] p-3 shadow-2xl shadow-emerald-950/20 sm:p-5">
          <form onSubmit={handleUrl} className="flex flex-col gap-4">
            <label
              htmlFor="destination-url"
              className="text-left text-sm font-medium text-emerald-100"
            >
              Your destination URL
            </label>

            <input
              id="destination-url"
              type="url"
              placeholder="Paste your long URL here"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#050807] px-4 py-4 text-sm text-white outline-none transition placeholder:text-[#52645A] focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10"
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-4 font-semibold text-[#04110B] transition hover:bg-emerald-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Shortening..." : "Shorten URL"}
              {!loading && <span aria-hidden="true">↗</span>}
            </button>
          </form>

          {error && (
            <p role="alert" className="mt-4 rounded-lg border border-red-400/20 bg-red-400/5 p-3 text-left text-sm text-red-300">
              {error}
            </p>
          )}

          {shortUrl && (
            <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4 text-left">
              <p className="mb-2 text-sm text-[#82958A]">
                Your shortened URL is ready!
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="min-w-0 flex-1 break-all py-2 font-medium text-emerald-300 hover:text-emerald-200"
                >
                  {shortUrl}
                </a>

                <button
                  type="button"
                  onClick={copyUrl}
                  className="shrink-0 rounded-lg bg-emerald-400 px-4 py-2 font-semibold text-[#04110B] transition hover:bg-emerald-300"
                >
                  {copied ? "Copied ✓" : "Copy link"}
                </button>
              </div>
            </div>
          )}

          <p className="mt-4 text-xs leading-5 text-[#82958A]">
            Paste your long URL above and get a shorter link, ready to share.
          </p>
        </div>

        <div className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-4 text-left sm:grid-cols-3">
          {[
            {
              icon: "⚡",
              title: "Fast & simple",
              description: "Create short links with just one click.",
            },
            {
              icon: "🔗",
              title: "Easy to share",
              description: "Clean links that are easy to copy and send.",
            },
            {
              icon: "🛡️",
              title: "Reliable redirects",
              description: "Get people to the destination you intended.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
            >
              <span className="text-xl">{feature.icon}</span>
              <h2 className="mt-3 font-semibold">{feature.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#82958A]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-white/10 px-6 py-6 text-center text-sm text-[#82958A]">
        Made with care by{" "}
        <span className="font-semibold text-emerald-300">Vuqro</span>
        <span className="mx-2">·</span>
        Shorten the distance.
      </footer>
    </div>
  );
}

export default App;
