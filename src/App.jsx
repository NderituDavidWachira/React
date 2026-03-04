// ─────────────────────────────────────────────────────────────────────────────
// App.jsx  —  The Root Component
//
// This is the entry point of the whole application. It is the only component
// that React mounts directly into the HTML page (in main.jsx / index.html).
//
// App.jsx is responsible for three things:
//
//   1. Injecting the global CSS (imported from globals.js) into the page
//      using a <style> tag. This means every page automatically gets the
//      same fonts, colours, and layout rules.
//
//   2. Rendering the persistent shell — the top bar, the navigation tabs,
//      and the footer — which stay on screen no matter which page is active.
//
//   3. Tracking which page the user has selected (using useState) and
//      rendering the matching page component inside the shell.
//
// How page switching works:
//   - PAGES is an array that pairs a page id with its label and its component.
//   - `page` (state) holds the id of the currently visible page.
//   - When the user clicks a nav button, setPage() updates the id.
//   - React re-renders App, finds the matching entry in PAGES, and renders
//     that component in place of the previous one.
//   - The `key={page}` prop on the active component forces React to unmount
//     the old page and mount the new one fresh — this replays the fade-in
//     CSS animation and resets any local state inside the page.
// ─────────────────────────────────────────────────────────────────────────────

// useState — we use this to remember which page tab is currently active.
import { useState } from "react";

// css — the global stylesheet written as a JS string.
// We inject it with <style>{css}</style> so all pages share one set of rules
// without needing a separate .css file import chain.
import { css } from "./Globals.jsx";

// ── Page components ──────────────────────────────────────────────────────────
// Each page lives in its own file. We import them here so App can render
// whichever one matches the active tab. Adding a new page only requires:
//   1. Create the .jsx file in src/
//   2. Import it here
//   3. Add an entry to the PAGES array below
import Intro     from "./Intro.jsx";     // Page 01 — what React is, first component, Vite setup
import UseState  from "./UseState.jsx";  // Page 02 — useState hook, counter demo, events
import Props     from "./Props.jsx";     // Page 03 — props, reusable components, callback pattern
import Concepts  from "./Concepts.jsx";  // Page 04 — useEffect, rules of hooks, learning path


// ── Page registry ────────────────────────────────────────────────────────────
// PAGES is a plain array of objects.
// Each object has:
//   id        — a unique string used as the state value and as the React key
//   label     — the text shown on the nav button
//   Component — the actual React component to render when this page is active
//
// To add a new page: add a new object here (and import the component above).
const PAGES = [
  { id: "home",     label: "01  Intro",    Component: Intro     },
  { id: "usestate", label: "02  useState",  Component: UseState  },
  { id: "props",    label: "03  Props",     Component: Props     },
  { id: "concepts", label: "04  Concepts",  Component: Concepts  },
];


// ── App — the root component ──────────────────────────────────────────────────
export default function App() {

  // `page` holds the id of whichever page the user is currently viewing.
  // It starts on "home" (the Intro page).
  // setPage() is called by the nav buttons to switch pages.
  const [page, setPage] = useState("home");

  // Look up the page object whose id matches the current `page` state.
  // We destructure Component straight away so we can write <Component /> below.
  // (Component must start with a capital letter for JSX to treat it as a component.)
  const { Component } = PAGES.find(p => p.id === page);

  return (
    <>
      {/*
        Inject the global CSS once at the root level.
        <style> is a valid HTML element — React renders it into <head>.
        Because it is inside the root component it is always present,
        so every page always has access to the same CSS variables and classes.
      */}
      <style>{css}</style>

      <div>

        {/* ── Top bar ──────────────────────────────────────────────────────
            A thin blue strip at the very top of the page.
            Left side: project title in monospace.
            Right side: author credit — "Prepared by Wachira" in light blue.
        */}
        <div className="topbar">
          <span>Ryantech Solution LTD</span>
          <span className="topbar-right">Driving Impact with Data& ICT</span>
        </div>

        {/* ── Navigation ───────────────────────────────────────────────────
            A sticky tab bar that stays at the top as the user scrolls.
            It contains:
              - The brand name on the left
              - One button per page from the PAGES array

            The active button gets the "active" class which adds an orange
            underline (defined in globals.css as .nav-btn.active).

            onClick calls setPage(p.id) which updates the `page` state,
            causes App to re-render, and swaps in the new page component.
        */}
        <nav>
          <div className="nav-brand">React<span>.guide</span></div>

          {PAGES.map(p => (
            <button
              key={p.id}
              // Add "active" class only for the currently selected page
              className={"nav-btn " + (page === p.id ? "active" : "")}
              onClick={() => setPage(p.id)}
            >
              {p.label}
            </button>
          ))}
        </nav>

        {/* ── Active page ───────────────────────────────────────────────────
            Render whichever page component the user has selected.

            key={page} is important: it gives React a unique identity for this
            element. When the key changes (i.e. the user clicks a different tab)
            React unmounts the old component and mounts a fresh copy of the new
            one. This has two useful effects:
              1. The fade-in CSS animation (defined in globals.css as @keyframes
                 appear) plays again for the new page.
              2. Any local state inside the old page is thrown away cleanly,
                 so navigating back to a page always starts it fresh.
        */}
        <Component key={page} />

        {/* ── Footer ───────────────────────────────────────────────────────
            A simple credit line at the bottom of every page.
            Uses &mdash; (—) for the em dash separators.
        */}
        <footer>
          React Guide &mdash; prepared by <strong>Wachira (0758293706)</strong> &mdash; built with <span>React + Vite</span>
        </footer>

      </div>
    </>
  );
}