// ─────────────────────────────────────────────────────────────────────────────
// Concepts.jsx  —  Page 04: Core React Concepts Reference
//
// This is a reference page — it does not have any live demos.
// It pulls together everything from the other pages into one summary:
//   - How React works end-to-end (the render flow)
//   - Eight concepts every React developer must know
//   - useEffect — the second most important hook after useState
//   - The rules of hooks (break these and React will break)
//   - A suggested learning path for what to study next
//
// No state is needed here — all content is static.
// ─────────────────────────────────────────────────────────────────────────────

// Import the shared building blocks — all three are used on this page.
import { CodeBlock, ConceptGrid, ExplainTable } from "./Globals.jsx";


// ── Code sample: useEffect ────────────────────────────────────────────────────
// This shows the three common patterns for useEffect's dependency array.
const CODE_EFFECT = [
  'import { useState, useEffect } from "react";',
  "",
  "// Pattern 1 — run ONCE when the component first appears on screen.",
  "// Use this for: fetching initial data, setting up subscriptions.",
  "useEffect(() => {",
  '  console.log("Component mounted — this runs once.");',
  "}, []); // the empty [] means: no dependencies, run once only",
  "",
  "// Pattern 2 — run every time a specific value changes.",
  "// Use this for: syncing state to a title, URL, or external system.",
  "useEffect(() => {",
  '  document.title = "Count: " + count; // updates the browser tab title',
  "}, [count]); // re-run whenever count changes",
  "",
  "// Pattern 3 — run after every single render (no array at all).",
  "// This is rarely what you want — use it with care.",
  "useEffect(() => {",
  '  console.log("Component just re-rendered.");',
  "}); // no array = runs always",
  "",
  "// Optional: return a cleanup function.",
  "// React calls it before the component is removed from the screen.",
  "useEffect(() => {",
  "  const timer = setInterval(() => console.log('tick'), 1000);",
  "  return () => clearInterval(timer); // stop the timer on unmount",
  "}, []);",
].join("\n");


// ── Concepts Page Component ───────────────────────────────────────────────────
export default function Concepts() {
  return (
    <div className="page">

      <p className="pg-number">04 / Core Concepts</p>
      <h1 className="pg-title"><em>React</em> <span>Reference</span></h1>

      <p className="pg-desc">
        A one page summary of the ideas that appear in every React codebase.
        The first three pages showed you components, state, and props with live
        demos. This page puts it all into context and fills in the gaps how
        React actually works behind the scenes.
      </p>


      {/* ── Section 1: The render flow ── */}
      <div className="section">
        <div className="section-head">How React works — the full flow</div>

        {/* A numbered diagram showing the journey from data to screen.
            Each row has a step number (blue left column) and a title + description. */}
        <div className="flow">
          {[
            [
              "01",
              "Your Data",
              "State (owned by a component) and props (passed in from a parent) these are the source of truth. The UI is always a reflection of this data.",
            ],
            [
              "02",
              "Component Function",
              "React calls your component function and passes in the current props. The function reads state and props, then returns JSX describing what the screen should look like.",
            ],
            [
              "03",
              "JSX",
              "JSX is the HTML like code your component returns. Vite compiles it into plain JavaScript calls (React.createElement) before the browser ever sees it.",
            ],
            [
              "04",
              "Virtual DOM",
              "React builds a lightweight JavaScript object tree (the Virtual DOM) from your JSX. This is much faster to work with than the real browser DOM.",
            ],
            [
              "05",
              "Reconciliation",
              "When state or props change React re-runs your component, builds a new Virtual DOM, and compares it to the previous one. It finds only what changed.",
            ],
            [
              "06",
              "Real DOM Update",
              "React applies the minimum number of changes to the real browser DOM only the parts that actually changed. This is why React is fast.",
            ],
          ].map(([n, title, desc]) => (
            <div className="flow-row" key={n}>
              <div className="flow-n">{n}</div>
              <div className="flow-content">
                <strong>{title}</strong>
                <span>{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* ── Section 2: Essential concepts ── */}
      <div className="section">
        <div className="section-head">Eight concepts every React developer must know</div>

        {/* ConceptGrid renders a 2-column grid.
            Each item needs { title, body }. */}
        <ConceptGrid items={[
          {
            title: "Component",
            body:  "A plain JavaScript function that returns JSX. It is the smallest reusable unit of a React UI. Components can be as small as a single button or as large as an entire page.",
          },
          {
            title: "State",
            body:  "Data that lives inside a component and can change. Managed with useState(). When state changes React re-draws the component. Never mutate state directly always use the setter.",
          },
          {
            title: "Props",
            body:  "Data passed into a component from its parent, like arguments to a function. Always read-only inside the child. To send data back up, the parent passes a callback function as a prop.",
          },
          {
            title: "Hook",
            body:  "A function whose name starts with 'use'. Hooks let function components do powerful things: hold state (useState), run side effects (useEffect), access DOM nodes (useRef), and more.",
          },
          {
            title: "Re-render",
            body:  "React re-calls your component function whenever its state or props change. Each re-render produces fresh JSX. React compares it to the previous output and updates only what changed.",
          },
          {
            title: "JSX",
            body:  "The HTML-like syntax you write inside return(). Vite compiles it to JavaScript before the browser runs it. One rule: a component must return a single root element wrap siblings in a <div> or <>.",
          },
          {
            title: "key prop",
            body:  "A special prop required on every item when you render a list with .map(). React uses the key to track which items were added, removed, or moved without it React cannot update lists efficiently.",
          },
          {
            title: "Lifting State",
            body:  "When two sibling components need to share the same piece of data, move (lift) the state up to their nearest common parent. The parent holds the state and passes it down as props to both children.",
          },
        ]} />
      </div>


      {/* ── Section 3: useEffect ── */}
      <div className="section">
        <div className="section-head">useEffect — running code outside the render</div>

        <p style={{ fontSize: "0.95rem", color: "var(--ink-mid)", lineHeight: 1.7, marginBottom: "1rem" }}>
          React's render cycle is pure: given the same state and props a component
          always returns the same JSX. But some things cannot happen inside a render
          fetching data from a server, starting a timer, or manually touching the DOM.
          These are called <strong>side effects</strong> and they belong in useEffect.
        </p>

        <CodeBlock title="useEffect patterns" code={CODE_EFFECT} />

        <ExplainTable rows={[
          {
            key:   "useEffect",
            title: "What It Is For",
            desc:  "Any code that reaches outside React's render cycle: API calls, setting timers, subscribing to events, reading from localStorage, updating document.title. Keeping side effects in useEffect keeps your component functions predictable.",
          },
          {
            key:   "[ ] empty array",
            title: "Run Once on Mount",
            desc:  "Passing an empty array [] tells React: run this effect once, when the component first appears on screen. This is the right place to fetch initial data or set up a one-time subscription.",
          },
          {
            key:   "[count] with value",
            title: "Run When a Value Changes",
            desc:  "Listing a variable in the array tells React: re-run this effect every time that variable changes. You can list multiple dependencies: [count, userId]. React runs the effect again whenever any of them change.",
          },
          {
            key:   "return () => {}",
            title: "Cleanup Prevent Memory Leaks",
            desc:  "If your effect starts something a timer, an event listener, a WebSocket you must stop it when the component is removed. Return a cleanup function from useEffect and React will call it automatically on unmount.",
          },
        ]} />
      </div>


      {/* ── Section 4: Rules of hooks ── */}
      <div className="section">
        <div className="section-head">Rules of hooks break these and React breaks</div>

        <ExplainTable rows={[
          {
            key:   "Top level only",
            title: "Never Call Hooks Inside Conditions or Loops",
            desc:  "React tracks hooks by the order they are called. If you put a hook inside an if-statement or loop the order can change between renders, confusing React. Always call every hook at the top level of your component before any early returns.",
          },
          {
            key:   "React functions only",
            title: "Only Call Hooks Inside React Functions",
            desc:  "Hooks only work inside React function components or inside other custom hooks. They do not work in plain JavaScript functions, class components, or event handler callbacks defined outside a component.",
          },
          {
            key:   "use prefix",
            title: "Custom Hook Names Must Start With 'use'",
            desc:  "When you extract stateful logic into your own function, its name must start with 'use' e.g. useFetch, useLocalStorage, useAuth. React and its linting tools use this convention to identify hooks and apply the rules above.",
          },
        ]} />

        <div className="note">
          <span className="note-label">How to remember this</span>
          Think of hooks as rules for a game: the game only works if everyone
          follows the rules in the same order every round. React "plays" your
          component function on every render and it expects the hooks to appear
          in exactly the same sequence each time. Conditions and loops break that
          sequence.
        </div>
      </div>


      {/* ── Section 5: Learning path ── */}
      <div className="section">
        <div className="section-head">Assignment to students — Reaserch on:</div>

        <ExplainTable rows={[
          {
            key:   "01 React Router",
            title: "Multiple Pages Without Reloading",
            desc:  "React Router lets you show different components for different URLs: /home, /about, /user/42 — without the browser doing a full page reload. It is the standard way to add navigation to a React app.",
          },
          {
            key:   "02 Tailwind CSS",
            title: "Styling Components with Utility Classes",
            desc:  "Tailwind lets you style components by adding short class names directly in JSX className='text-blue-600 font-bold p-4'. No separate CSS files needed. It is now the most popular way to style React apps.",
          },
          {
            key:   "03 React Query",
            title: "Fetching and Caching Server Data",
            desc:  "React Query (also called TanStack Query) handles loading states, error states, caching, and background refresh for API calls. It replaces most of the useEffect-for-fetching patterns you would otherwise write by hand.",
          },
        ]} />
      </div>

    </div>
  );
}