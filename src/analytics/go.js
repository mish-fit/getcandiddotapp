export const initOptimize = (callback) => {
  const script = document.createElement("script");
  script.src = `https://www.googleoptimize.com/optimize.js?id=OPT-NKWNRBH`;
  script.id = "google-optimize";
  script.onload = callback;
  document.body.appendChild(script);
};
