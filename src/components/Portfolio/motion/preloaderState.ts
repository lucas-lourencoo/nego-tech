export const preloaderStorageKey = "ll-preloader";
export const preloaderDoneEvent = "preloader:done";

/**
 * Runs before first paint. Marks <html data-preloader> as "active" only on the
 * first visit of the tab session (and never for reduced-motion visitors), so the
 * overlay neither flashes for returning visitors nor blocks visitors without JS.
 */
export const preloaderBootScript = `try{var d=document.documentElement;var seen=sessionStorage.getItem("${preloaderStorageKey}")==="seen";var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;d.dataset.preloader=seen||reduce?"skip":"active"}catch(e){document.documentElement.dataset.preloader="skip"}`;

export const isPreloaderActive = () =>
  document.documentElement.dataset.preloader === "active";

export const finishPreloader = () => {
  try {
    window.sessionStorage.setItem(preloaderStorageKey, "seen");
  } catch {}
  document.documentElement.dataset.preloader = "done";
  window.dispatchEvent(new Event(preloaderDoneEvent));
};
