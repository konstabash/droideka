(() => {
  if (document.getElementById("qn-host")) return;

  const host = document.createElement("div");
  host.id = "qn-host";

  const iframe = document.createElement("iframe");
  iframe.id = "qn-iframe";
  iframe.src =
    chrome.runtime.getURL("src/panel/panel.html") +
    `?origin=${encodeURIComponent(location.origin)}`;

  const grip = document.createElement("div");
  grip.id = "qn-grip";

  host.appendChild(iframe);
  host.appendChild(grip);
  document.documentElement.appendChild(host);

  const root = document.documentElement;
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  let dragging = false;

  const onPointerMove = (e) => {
    if (!dragging) return;
    const w = clamp(e.clientX, 240, Math.round(window.innerWidth * 0.7));
    root.style.setProperty("--qn-width", `${w}px`); // drives host width + body padding
  };

  const stop = () => {
    if (!dragging) return;
    dragging = false;
    host.classList.remove("dragging");
    root.classList.remove("dragging");
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", stop);
    window.removeEventListener("pointercancel", stop);
  };

  grip.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    dragging = true;
    host.classList.add("dragging");
    root.classList.add("dragging");
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
  });
})();
