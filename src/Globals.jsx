// ─────────────────────────────────────────────────────────────────────────────
// globals.js
//
// This file holds two things that every page in this project shares:
//
//   1. css        — all the styles for the whole site in one string.
//                   We inject it once in App.jsx using <style>{css}</style>.
//                   Keeping styles here means we only write them once and every
//                   page automatically picks them up.
//
//   2. Shared UI components — CodeBlock, ConceptGrid, ExplainTable.
//                   These are small building blocks used on more than one page.
//                   Instead of copying the same code into every file we define
//                   them once here and import them where needed.
// ─────────────────────────────────────────────────────────────────────────────


// ── Global CSS ────────────────────────────────────────────────────────────────
// Written as a plain JS string so it can be dropped into a <style> tag.
// Uses CSS custom properties (variables) so colours and fonts are changed
// in one place and automatically update everywhere.
export const css = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&family=Newsreader:ital,wght@0,400;0,500;1,400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #f5f0e8;
  --paper: #faf7f2;
  --blue: #1a3a6b;
  --blue-mid: #2856a3;
  --blue-light: #dce8f5;
  --orange: #c45c00;
  --orange-light: #fff0e0;
  --ink: #1c1c1c;
  --ink-mid: #444;
  --ink-light: #888;
  --rule: #c8bfaa;
  --code-bg: #f0ece3;
  --mono: 'IBM Plex Mono', monospace;
  --serif: 'Newsreader', Georgia, serif;
}

html { font-size: 16px; }
body { background: var(--bg); color: var(--ink); font-family: var(--serif); line-height: 1.6; min-height: 100vh; }

/* top bar — the thin blue strip at the very top of the page */
.topbar {
  background: var(--blue);
  color: #fff;
  padding: 0.4rem 2rem;
  font-family: var(--mono);
  font-size: 0.72rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: 0.04em;
}
.topbar-right { color: #a8c4e8; }

/* nav — the sticky tab bar below the top strip */
nav {
  background: var(--paper);
  border-bottom: 2px solid var(--blue);
  padding: 0 2rem;
  display: flex;
  align-items: stretch;
  position: sticky;
  top: 0;
  z-index: 100;
}
.nav-brand {
  font-family: var(--mono);
  font-size: 1rem;
  font-weight: 700;
  color: var(--blue);
  padding: 0.9rem 1.5rem 0.9rem 0;
  border-right: 1px solid var(--rule);
  margin-right: 0.5rem;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}
.nav-brand span { color: var(--orange); }
.nav-btn {
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  color: var(--ink-mid);
  font-family: var(--mono);
  font-size: 0.78rem;
  padding: 0.9rem 1rem;
  cursor: pointer;
  letter-spacing: 0.02em;
  transition: color 0.15s, border-color 0.15s;
  text-transform: uppercase;
}
.nav-btn:hover { color: var(--blue); }
/* the active tab gets an orange underline so you know which page you are on */
.nav-btn.active { color: var(--blue); border-bottom-color: var(--orange); font-weight: 700; }

/* page — the main content wrapper, centred and padded */
.page {
  max-width: 820px;
  margin: 0 auto;
  padding: 3.5rem 2rem 6rem;
  animation: appear 0.2s ease;
}
@keyframes appear { from { opacity: 0; } to { opacity: 1; } }

/* page header pieces */
.pg-number {
  font-family: var(--mono);
  font-size: 0.7rem;
  color: var(--orange);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}
.pg-title {
  font-family: var(--serif);
  font-size: 2.6rem;
  font-weight: 500;
  line-height: 1.15;
  color: var(--blue);
  margin-bottom: 0.5rem;
  font-style: italic;
}
.pg-title span { font-style: normal; color: var(--orange); }
.pg-title em   { font-style: normal; }
.pg-desc {
  font-size: 1.05rem;
  color: var(--ink-mid);
  line-height: 1.75;
  max-width: 580px;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--rule);
}

/* section — a labelled group of content inside a page */
.section { margin-bottom: 3rem; }
.section-head {
  font-family: var(--mono);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--blue-mid);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}
/* the ::after pseudo-element draws the horizontal rule after the heading */
.section-head::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--rule);
}

/* concept grid — 2-column grid of definition boxes */
.cgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--rule); border: 1px solid var(--rule); margin-bottom: 1rem; }
@media(max-width:600px){ .cgrid { grid-template-columns: 1fr; } }
.citem { background: var(--paper); padding: 1.4rem; }
.citem-title { font-family: var(--mono); font-size: 0.8rem; font-weight: 700; color: var(--blue); margin-bottom: 0.4rem; text-transform: uppercase; letter-spacing: 0.04em; }
.citem-body  { font-size: 0.9rem; color: var(--ink-mid); line-height: 1.6; }

/* code block — shows syntax-highlighted code samples */
.cb { border: 1px solid var(--rule); margin: 1.2rem 0; overflow: hidden; }
.cb-title {
  background: var(--blue);
  color: #c8ddf5;
  font-family: var(--mono);
  font-size: 0.68rem;
  padding: 0.4rem 1rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.cb-body { background: var(--code-bg); padding: 1.2rem 1.4rem; overflow-x: auto; }
.cb-body pre { font-family: var(--mono); font-size: 0.8rem; line-height: 1.85; white-space: pre; }
/* syntax highlight colour classes */
.kw  { color: var(--blue); font-weight: 700; }   /* keywords: import, const, return … */
.fn  { color: #1060a0; }                          /* function names: useState, useEffect … */
.str { color: var(--orange); }                    /* strings: "text", 'text' */
.cmt { color: var(--ink-light); font-style: italic; } /* comments: // … */
.num { color: var(--blue-mid); }                  /* numbers */
.tag { color: var(--orange); }                    /* JSX tags: <div>, </div> */
.atr { color: #1060a0; }                          /* JSX attributes: onClick, className */

/* explain table — a key / explanation table used under code samples */
.xlist { display: grid; gap: 0; border: 1px solid var(--rule); }
.xrow { display: flex; align-items: stretch; border-bottom: 1px solid var(--rule); background: var(--paper); }
.xrow:last-child { border-bottom: none; }
.xkey {
  background: var(--blue-light);
  font-family: var(--mono);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--blue);
  padding: 0.9rem 1rem;
  min-width: 150px;
  max-width: 150px;
  border-right: 1px solid var(--rule);
  display: flex;
  align-items: flex-start;
  word-break: break-word;
}
.xval { padding: 0.9rem 1.2rem; flex: 1; }
.xval strong { display: block; font-family: var(--mono); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--orange); margin-bottom: 0.2rem; }
.xval p { font-size: 0.88rem; color: var(--ink-mid); line-height: 1.6; }

/* demo box — a bordered live-demo area used on interactive pages */
.demo {
  border: 2px solid var(--blue);
  background: var(--paper);
  padding: 2rem;
  text-align: center;
  margin: 1rem 0;
  position: relative;
}
/* "LIVE DEMO" label floats above the top-left corner */
.demo::before {
  content: 'LIVE DEMO';
  position: absolute;
  top: -0.6rem;
  left: 1rem;
  background: var(--orange);
  color: #fff;
  font-family: var(--mono);
  font-size: 0.62rem;
  font-weight: 700;
  padding: 0.1rem 0.6rem;
  letter-spacing: 0.08em;
}
.counter-num {
  font-family: var(--mono);
  font-size: 5rem;
  font-weight: 700;
  color: var(--blue);
  line-height: 1;
  margin-bottom: 1.5rem;
}
.btn-row { display: flex; gap: 0.6rem; justify-content: center; flex-wrap: wrap; }
.btn {
  background: var(--paper);
  border: 1px solid var(--blue);
  color: var(--blue);
  font-family: var(--mono);
  font-size: 0.78rem;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: all 0.1s;
}
.btn:hover { background: var(--blue); color: #fff; }
.btn.orange { border-color: var(--orange); color: var(--orange); }
.btn.orange:hover { background: var(--orange); color: #fff; }

/* todo — input and list items used on the Props page */
.todo-row { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.todo-input {
  flex: 1;
  background: var(--paper);
  border: 1px solid var(--rule);
  border-bottom: 2px solid var(--blue);
  color: var(--ink);
  font-family: var(--mono);
  font-size: 0.82rem;
  padding: 0.55rem 0.8rem;
  outline: none;
}
.todo-input:focus { border-bottom-color: var(--orange); }
.todo-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.7rem 0.8rem;
  border-bottom: 1px solid var(--rule);
  cursor: pointer;
  font-size: 0.9rem;
}
.todo-item:hover { background: var(--orange-light); }
.todo-item.done .todo-text { text-decoration: line-through; color: var(--ink-light); }
.todo-box {
  width: 14px; height: 14px;
  border: 1px solid var(--ink-mid);
  flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.65rem; font-family: var(--mono);
}
.todo-item.done .todo-box { background: var(--blue); border-color: var(--blue); color: #fff; }
.todo-text { flex: 1; }
.todo-x { background: none; border: none; color: var(--ink-light); cursor: pointer; font-size: 0.9rem; font-family: var(--mono); }
.todo-x:hover { color: var(--orange); }

/* profile cards — used on the Props page to show reusable components */
.pcgrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--rule); border: 1px solid var(--rule); }
@media(max-width:600px){ .pcgrid { grid-template-columns: 1fr; } }
.pcard { background: var(--paper); padding: 1.4rem; text-align: center; }
.pcard-initial {
  width: 52px; height: 52px;
  background: var(--blue); color: #fff;
  font-family: var(--mono); font-size: 1.4rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 0.8rem;
}
.pcard-name { font-family: var(--mono); font-size: 0.85rem; font-weight: 700; color: var(--ink); text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.2rem; }
.pcard-role { font-size: 0.82rem; color: var(--ink-mid); font-style: italic; margin-bottom: 0.5rem; }
.plevel { font-family: var(--mono); font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.06em; padding: 0.15rem 0.6rem; border: 1px solid; display: inline-block; }
.plevel.exp { color: var(--orange); border-color: var(--orange); }
.plevel.lrn { color: var(--blue);   border-color: var(--blue);   }
.plevel.mid { color: var(--ink-mid);border-color: var(--ink-mid);}

/* flow diagram — numbered rows used on the Concepts page */
.flow { border: 1px solid var(--rule); overflow: hidden; margin: 1rem 0; }
.flow-row { display: flex; align-items: center; border-bottom: 1px solid var(--rule); background: var(--paper); }
.flow-row:last-child { border-bottom: none; }
.flow-n {
  font-family: var(--mono); font-size: 0.68rem; font-weight: 700;
  color: #fff; background: var(--blue);
  padding: 1rem 0.8rem; min-width: 36px; text-align: center;
  align-self: stretch; display: flex; align-items: center;
}
.flow-content { padding: 0.8rem 1.2rem; }
.flow-content strong { font-family: var(--mono); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--blue); display: block; margin-bottom: 0.1rem; }
.flow-content span { font-size: 0.85rem; color: var(--ink-mid); }

/* note — an orange-accented callout box for tips and rules */
.note {
  border-left: 3px solid var(--orange);
  background: var(--orange-light);
  padding: 0.9rem 1.2rem;
  font-size: 0.88rem;
  color: var(--ink);
  line-height: 1.65;
  margin-top: 1rem;
}
.note-label {
  font-family: var(--mono);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--orange);
  font-weight: 700;
  display: block;
  margin-bottom: 0.3rem;
}

/* footer — sits at the very bottom of every page */
footer {
  border-top: 2px solid var(--blue);
  background: var(--paper);
  padding: 1.5rem 2rem;
  text-align: center;
  font-family: var(--mono);
  font-size: 0.72rem;
  color: var(--ink-light);
  letter-spacing: 0.04em;
}
footer strong { color: var(--blue); }
footer span   { color: var(--orange); }
`;


// ── Syntax Highlighter ────────────────────────────────────────────────────────
// hl() takes a plain code string and wraps recognised tokens in <span> tags
// so the browser can colour them. We escape <, >, & first so the raw code
// is treated as text, not HTML. Then we layer on the colour spans using
// regular expressions.
export function hl(raw) {
  let s = raw
    .replace(/&/g, "&amp;")  // & → &amp;   (must be first to avoid double-escaping)
    .replace(/</g, "&lt;")   // < → &lt;
    .replace(/>/g, "&gt;");  // > → &gt;

  s = s
    // comments — everything after // on a line
    .replace(/(\/\/[^\n]*)/g, '<span class="cmt">$1</span>')
    // shell comments — everything after # on a line (for terminal code)
    .replace(/(#[^\n]*)/g, '<span class="cmt">$1</span>')
    // strings — "double quoted" or 'single quoted'
    .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, '<span class="str">$1</span>')
    // JSX tags — <ComponentName or </ComponentName or />
    .replace(/(&lt;\/?[\w.]+|\/&gt;)/g, '<span class="tag">$1</span>')
    // JS keywords
    .replace(/\b(import|export|default|from|const|let|var|function|return|if|else|true|false|null)\b/g, '<span class="kw">$1</span>')
    // React function names
    .replace(/\b(useState|useEffect|useRef|console\.log|document\.title)\b/g, '<span class="fn">$1</span>')
    // JSX attribute names (only when followed by =)
    .replace(/\b(onClick|onChange|onKeyDown|className|key|value|placeholder)\b(?=\s*=)/g, '<span class="atr">$1</span>')
    // numbers
    .replace(/\b(\d+)\b/g, '<span class="num">$1</span>');

  return s;
}


// ── Shared UI Components ──────────────────────────────────────────────────────
// These three components are used on multiple pages.
// Defining them here avoids copying the same JSX into every file.


// CodeBlock — renders a titled, syntax-highlighted code sample.
// Props:
//   title  (string) — label shown in the dark header bar, e.g. "Counter.jsx"
//   code   (string) — the raw code to highlight and display
export function CodeBlock({ title, code }) {
  return (
    <div className="cb">
      {/* dark header strip with the filename */}
      <div className="cb-title">{title}</div>
      {/* dangerouslySetInnerHTML is safe here because WE build the HTML
          string inside hl() — no user input is ever passed in */}
      <div className="cb-body">
        <pre dangerouslySetInnerHTML={{ __html: hl(code) }} />
      </div>
    </div>
  );
}


// ConceptGrid — a two-column grid of titled definition boxes.
// Props:
//   items  (array) — each item needs { title, body }
export function ConceptGrid({ items }) {
  return (
    <div className="cgrid">
      {items.map(({ title, body }) => (
        <div className="citem" key={title}>
          <div className="citem-title">{title}</div>
          <div className="citem-body">{body}</div>
        </div>
      ))}
    </div>
  );
}


// ExplainTable — a table where each row has a code-key on the left
// and a plain-English explanation on the right.
// Props:
//   rows  (array) — each row needs { key, title, desc }
export function ExplainTable({ rows }) {
  return (
    <div className="xlist">
      {rows.map(({ key, title, desc }) => (
        <div className="xrow" key={key}>
          {/* monospace key shown in blue on the left */}
          <div className="xkey">{key}</div>
          <div className="xval">
            {/* orange label above the explanation */}
            <strong>{title}</strong>
            <p>{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}