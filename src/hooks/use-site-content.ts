import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { defaultContent, type SiteContent } from "@/data/site";
import { resolveAsset } from "@/lib/resolve-asset";

const KEY = ["site-content"];
const LS_KEY = "faii_site_content_cache_v1";
const TS_KEY = "faii_site_content_updated_at";
// Polling interval: check Supabase every 4s for updated_at changes.
// This guarantees Admin changes appear on public pages even if WebSocket is blocked.
const POLL_MS = 4000;

function mergeContent(remote: Partial<SiteContent> | null | undefined): SiteContent {
  if (!remote) return defaultContent;
  return {
    hero: { ...defaultContent.hero, ...(remote.hero ?? {}) },
    about: { ...defaultContent.about, ...(remote.about ?? {}) },
    contact: { ...defaultContent.contact, ...(remote.contact ?? {}) },
    showreelUrl: remote.showreelUrl || defaultContent.showreelUrl,
    stats: remote.stats?.length ? remote.stats : defaultContent.stats,
    services: remote.services?.length ? remote.services : defaultContent.services,
    portfolio: remote.portfolio?.length
      ? remote.portfolio.map((p) => ({ ...p, image: resolveAsset(p.image) }))
      : defaultContent.portfolio,
    clients: remote.clients?.length
      ? remote.clients.map((c) => ({ ...c, image: resolveAsset(c.image) }))
      : defaultContent.clients,
  };
}

function readCache(): SiteContent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return mergeContent(JSON.parse(raw) as Partial<SiteContent>);
  } catch {
    return null;
  }
}

function writeCache(c: SiteContent) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(LS_KEY, JSON.stringify(c)); } catch { /* noop */ }
}

function readCachedUpdatedAt(): string | null {
  if (typeof window === "undefined") return null;
  try { return localStorage.getItem(TS_KEY); } catch { return null; }
}

function writeCachedUpdatedAt(ts: string) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(TS_KEY, ts); } catch { /* noop */ }
}

async function fetchSiteContent(): Promise<SiteContent> {
  const { data, error } = await supabase
    .from("site_content")
    .select("data, updated_at")
    .eq("id", 1)
    .maybeSingle();
  if (error) {
    console.error("[site-content] fetch error", error);
    return readCache() ?? defaultContent;
  }
  const merged = mergeContent(data?.data as Partial<SiteContent> | null);
  writeCache(merged);
  if (data?.updated_at) writeCachedUpdatedAt(data.updated_at);
  return merged;
}

export function useSiteContent(): SiteContent {
  const qc = useQueryClient();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);

  const { data } = useQuery({
    queryKey: KEY,
    queryFn: fetchSiteContent,
    staleTime: 3_000,
    enabled: hydrated,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    placeholderData: hydrated ? (readCache() ?? defaultContent) : defaultContent,
    initialData: undefined,
  });

  // Strategy 1: Supabase Realtime WebSocket (instant when it works)
  useEffect(() => {
    if (!hydrated) return;
    let channel: ReturnType<typeof supabase.channel> | null = null;
    try {
      channel = supabase
        .channel(`site-content-${Math.random().toString(36).slice(2)}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "site_content" },
          () => qc.invalidateQueries({ queryKey: KEY })
        )
        .subscribe();
    } catch { /* WebSocket may be blocked in iframe environments */ }
    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [qc, hydrated]);

  // Strategy 2: Polling fallback — check updated_at every 4s.
  // Ensures Admin saves appear even when WebSocket is blocked (e.g. Lovable preview).
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (!hydrated) return;
    const checkForUpdates = async () => {
      try {
        const { data: row } = await supabase
          .from("site_content")
          .select("updated_at")
          .eq("id", 1)
          .maybeSingle();
        if (!row?.updated_at) return;
        const cachedTs = readCachedUpdatedAt();
        if (!cachedTs || row.updated_at !== cachedTs) {
          // Server has newer data — refetch full content
          await qc.invalidateQueries({ queryKey: KEY });
        }
      } catch { /* ignore poll errors */ }
    };
    pollRef.current = setInterval(checkForUpdates, POLL_MS);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [qc, hydrated]);

  return (hydrated ? (data ?? defaultContent) : defaultContent);
}
