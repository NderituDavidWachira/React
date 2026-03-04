// ─────────────────────────────────────────────────────────────────────────────
// Intro.jsx  —  Page 01: Introduction
//
// This is the first page the user sees. It covers:
//   - What React actually is (in plain English)
//   - The concept of a component
//   - How to write your very first component
//   - How to set up a project with Vite
//
// It imports CodeBlock, ConceptGrid, and ExplainTable from globals.js
// so it does not have to re-define those building blocks itself.
// ─────────────────────────────────────────────────────────────────────────────

// Import the shared UI components from our globals file.
// CodeBlock   → renders a titled, highlighted code sample
// ConceptGrid → two-column grid of definition boxes
// ExplainTable → key / explanation table shown under code samples
import { CodeBlock, ConceptGrid, ExplainTable } from "./Globals.jsx";


// ── Code samples ─────────────────────────────────────────────────────────────
// We write each code sample as an array of lines joined with "\n".
// This avoids any backtick / template-literal confusion inside JSX.

// The very first component a beginner would write
const CODE_FIRST = [
  "// Every React component is a plain JavaScript function.",
  "// The name MUST start with a Capital letter — React needs this",
  "// to tell components apart from ordinary HTML tags like <div>.",
  'import { useState } from "react";',
  "",
  "function MyFirstComponent() {",
  "",
  "  // return() holds JSX — it looks like HTML but it is JavaScript.",
  "  // React reads this and draws it on the screen.",
  "  return (",
  "    <div>",
  "      <h1>Hello, World!</h1>",
  "      <p>I am a React component.</p>",
  "    </div>",
  "  );",
  "}",
  "",
  "// export default makes this component available to other files.",
  "// Without this line, nothing outside this file can use it.",
  "export default MyFirstComponent;",
].join("\n");

// The four terminal commands needed to start a Vite + React project
const CODE_VITE = [
  "# Step 1 — create the project folder and files",
  "npm create vite@latest my-app -- --template react",
  "",
  "# Step 2 — move into the project folder",
  "cd my-app",
  "",
  "# Step 3 — download all the packages the project needs",
  "npm install",
  "",
  "# Step 4 — start the local dev server (opens at http://localhost:5173)",
  "npm run dev",
].join("\n");


// ── Intro Page Component ──────────────────────────────────────────────────────
// This is the default export — the component App.jsx renders for page "home".
// It does not need any state (useState) because nothing on this page changes.
export default function Intro() {
  return (
    <div className="page">

      {/* page number label — small orange text above the title */}
      <p className="pg-number">01 / Introduction</p>

      {/* page title — italic serif + orange accent word */}
      <h1 className="pg-title"><em>Learning</em> <span>React</span></h1>

      {/* intro paragraph — explains what React is before diving into code */}
      <p className="pg-desc">
        React is a JavaScript library for building user interfaces. Instead of
        writing step by step instructions like "find that button and change its
        text", you simply describe what the screen <em>should look like</em> for
        a given set of data and React works out what actually needs to change.
        You build the UI as a collection of small, reusable pieces called{" "}
        <strong>components</strong>. Each component is just a JavaScript function
        that returns HTML like code. When your data changes, React re-draws only
        the affected parts of the page not the whole thing making apps fast
        and predictable.
      </p>


      {/* ── Section 1: What is React ── */}
      <div className="section">
        <div className="section-head">What is React</div>

        {/* ConceptGrid renders a 2-column grid of definition boxes.
            Each item needs a { title, body } pair. */}
        <ConceptGrid items={[
          {
            title: "UI Library",
            body:  "React helps you build interfaces by breaking them into small, reusable pieces called components. It handles updating the screen you just describe the result.",
          },
          {
            title: "Made by Meta",
            body:  "Facebook built React in 2013 to handle frequent data updates in large apps without reloading the whole page every time something changed.",
          },
          {
            title: "Reactive Updates",
            body:  "When your data changes, React figures out which parts of the UI depend on that data and updates only those parts, the rest stays untouched.",
          },
          {
            title: "Widely Used",
            body:  "Netflix, Twitter and thousands of companies use React. It has the largest ecosystem of any UI library.",
          },
        ]} />
      </div>


      {/* ── Section 2: First component ── */}
      <div className="section">
        <div className="section-head">Your first component</div>

        {/* CodeBlock renders the code with syntax highlighting.
            title = the filename shown in the dark header bar
            code  = the raw code string defined above */}
        <CodeBlock title="MyFirstComponent.jsx" code={CODE_FIRST} />

        {/* ExplainTable breaks down each important part of the code above.
            key   = the code term shown in the left column (monospace)
            title = a short human label in the right column
            desc  = the plain-English explanation */}
        <ExplainTable rows={[
          {
            key:   "import",
            title: "Borrowing Tools",
            desc:  "import lets you pull in code from another file or library. Here we borrow useState from React's library like picking a tool from a shared toolbox. You only import what you actually need.",
          },
          {
            key:   "function Name()",
            title: "A Component Is a Function",
            desc:  "Every React component is a plain JavaScript function. The capital letter at the start is required React uses it to tell your component apart from a built-in HTML tag like <div> or <p>.",
          },
          {
            key:   "return ( JSX )",
            title: "What Gets Drawn on Screen",
            desc:  "The code inside return() is JSX. It looks like HTML but it lives inside JavaScript. React reads your JSX and converts it into real browser elements. Whatever you return is what the user sees.",
          },
          {
            key:   "export default",
            title: "Making the Component Available",
            desc:  "export default lets other files import this component. Without it the component is private to this file. App.jsx imports it by name and renders it inside the page layout.",
          },
        ]} />
      </div>


      {/* ── Section 3: Vite setup ── */}
      <div className="section">
        <div className="section-head">Project setup with Vite</div>

        <CodeBlock title="Terminal" code={CODE_VITE} />

        {/* note — an orange-left-border callout for extra context */}
        <div className="note">
          <span className="note-label">Why Vite and not Create React App?</span>
          Vite starts your development server in under a second and automatically
          refreshes the browser the moment you save any file. Create React App
          (the old way) could take 30+ seconds to start. Vite is now the standard
          tool for new React projects.
        </div>
      </div>

    </div>
  );
}