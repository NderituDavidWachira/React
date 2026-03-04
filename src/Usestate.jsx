// ─────────────────────────────────────────────────────────────────────────────
// UseState.jsx  —  Page 02: The useState Hook
//
// This page teaches the most important React concept for beginners: state.
// State is data that belongs to a component and can change over time.
// When state changes, React automatically re-draws the component.
//
// The page includes two live demos so the learner can see state working
// before reading the explanation:
//   1. A counter (number state)
//   2. A greeting that swaps names (string state)
// ─────────────────────────────────────────────────────────────────────────────

// useState is the hook that lets a component remember a value between renders.
// Without useState, variables reset to their original value every time React
// re-draws the component — so changes would be lost immediately.
import { useState } from "react";

// Import shared UI building blocks from globals.
// We only need CodeBlock and ExplainTable on this page.
import { CodeBlock, ExplainTable } from "./Globals.jsx";


// ── Code sample ───────────────────────────────────────────────────────────────
// This is the Counter code we show and explain on this page.
// It is kept as a plain string array (joined with "\n") so JSX does not
// misread any characters inside it as JSX syntax.
const CODE_COUNTER = [
  'import { useState } from "react";',
  "",
  "function Counter() {",
  "  // useState(0) creates a piece of state with a starting value of 0.",
  "  // It gives back two things wrapped in square brackets:",
  "  //   count    — the current value (read this to display it)",
  "  //   setCount — a function to update the value (call this to change it)",
  "  const [count, setCount] = useState(0);",
  "",
  "  return (",
  "    <div>",
  "      {/* Curly braces {} inside JSX evaluate any JavaScript expression.",
  "          {count} reads the current value of count and shows it. */}",
  "      <p>Count: {count}</p>",
  "",
  "      {/* onClick is an event handler.",
  "          The arrow function () => setCount(count + 1) runs when clicked.",
  "          setCount tells React the value changed — React then re-renders. */}",
  "      <button onClick={() => setCount(count + 1)}>",
  "        Increase",
  "      </button>",
  "",
  "      <button onClick={() => setCount(count - 1)}>",
  "        Decrease",
  "      </button>",
  "",
  "      <button onClick={() => setCount(0)}>",
  "        Reset",
  "      </button>",
  "    </div>",
  "  );",
  "}",
].join("\n");


// ── UseState Page Component ───────────────────────────────────────────────────
export default function UseState() {

  // ── State for Demo 1: counter ──
  // count starts at 0. setCount is the only correct way to change it.
  const [count, setCount] = useState(0);

  // ── State for Demo 2: greeting name ──
  // name starts as "World". setName changes it when a button is clicked.
  const [name, setName] = useState("World");

  return (
    <div className="page">

      <p className="pg-number">02 / Interactivity</p>
      <h1 className="pg-title"><span>useState</span> <em>Hook</em></h1>

      <p className="pg-desc">
        State is data that lives inside a component and can change over time.
        The key idea is simple: when state changes, React automatically
        re-draws the component you never have to touch the HTML yourself.
        The <strong>useState</strong> hook is how you create and update state
        in a function component.
      </p>


      {/* ── Demo 1: Counter ── */}
      <div className="section">
        <div className="section-head">Counter demo</div>

        {/* The demo box is styled with a "LIVE DEMO" label (via CSS ::before).
            The three buttons each call setCount with a new value.
            Every call to setCount triggers a re-render, so {count} updates. */}
        <div className="demo">
          {/* {count} reads the current state and displays it */}
          <div className="counter-num">{count}</div>
          <div className="btn-row">
            <button className="btn"        onClick={() => setCount(count - 1)}>Decrease</button>
            <button className="btn orange"  onClick={() => setCount(0)}>Reset</button>
            <button className="btn"        onClick={() => setCount(count + 1)}>Increase</button>
          </div>
        </div>
      </div>


      {/* ── Code walkthrough ── */}
      <div className="section">
        <div className="section-head">The counter code — line by line</div>

        <CodeBlock title="Counter.jsx" code={CODE_COUNTER} />

        {/* ExplainTable breaks down the four most important parts of the code */}
        <ExplainTable rows={[
          {
            key:   "useState(0)",
            title: "Creating State with a Starting Value",
            desc:  "The number (or value) you pass to useState() is where the state begins. Here we start at 0. It could be any value: a string, an array, an object, a boolean whatever your component needs to remember.",
          },
          {
            key:   "[count, setCount]",
            title: "Array Destructuring, Grabbing Two Things at Once",
            desc:  "useState always hands back exactly two things: the current value and a function to update it. The square brackets let us name both in one line. By convention the updater is named set + the state name, e.g. setCount, setName, setIsOpen.",
          },
          {
            key:   "setCount(count + 1)",
            title: "The Only Correct Way to Update State",
            desc:  "Writing count = count + 1 directly will not work. React does not watch variables — it only knows state changed when you call the setter function. Calling setCount() schedules a re-render so the screen stays in sync with the data.",
          },
          {
            key:   "onClick={() => ...}",
            title: "Handling User Events",
            desc:  "onClick is a JSX event listener it runs the arrow function when the button is clicked. The same pattern works for any browser event: onChange (text input), onSubmit (form), onKeyDown (keyboard), onMouseEnter (hover), and many more.",
          },
        ]} />
      </div>


      {/* ── Demo 2: String state ── */}
      <div className="section">
        <div className="section-head">State is not just numbers</div>

        {/* Clicking any button calls setName() with a different string.
            React re-renders and {name} shows the new value. */}
        <div className="demo">
          <p style={{ fontFamily: "var(--mono)", fontSize: "1.1rem", marginBottom: "1.2rem", color: "var(--blue)" }}>
            Hello, {name}
          </p>
          <div className="btn-row">
            {/* We map over an array of names to create a button for each one.
                The key prop is required whenever you render a list — React uses
                it to track which button is which between re-renders. */}
            {["World", "React", "Developer", "Wachira"].map(n => (
              <button
                key={n}
                // The button for the currently active name gets the orange style
                className={"btn " + (name === n ? "orange" : "")}
                onClick={() => setName(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="note">
          <span className="note-label">Key rule — state is local to each component</span>
          If you put two Counter components on the same page they each have their
          own separate count. They do not share state. If you need two components
          to share the same value, you move (lift) the state up to their nearest
          common parent component and pass it down as a prop this is called
          "lifting state up" and is covered on the Props page.
        </div>
      </div>

    </div>
  );
}