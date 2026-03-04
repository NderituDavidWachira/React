// ─────────────────────────────────────────────────────────────────────────────
// Props.jsx  —  Page 03: Props and Reusable Components
//
// This page teaches props — the mechanism for passing data into a component
// from outside. Props are what make components reusable: the same component
// can render differently depending on what data it receives.
//
// The page contains two demos:
//   1. ProfileCard — shows the same component rendered three times with
//      different prop values (name, role, level)
//   2. TodoList — shows how to pass functions as props so a child component
//      can trigger changes in the parent's state
// ─────────────────────────────────────────────────────────────────────────────

// useState is needed here because the TodoList keeps its list in state.
// The ProfileCard demo does not need state — it is purely prop-driven.
import { useState } from "react";

// Import the shared building blocks.
import { CodeBlock, ExplainTable } from "./Globals.jsx";


// ── Code sample ───────────────────────────────────────────────────────────────
const CODE_PROFILE = [
  "// Props are received as an object. We destructure the ones we need",
  "// right inside the function signature — { name, role } instead of props.",
  "function ProfileCard({ name, role }) {",
  "  return (",
  "    <div>",
  "      {/* {name} and {role} display whatever the parent passed in */}",
  "      <h2>{name}</h2>",
  "      <p>{role}</p>",
  "    </div>",
  "  );",
  "}",
  "",
  "// The same component is used three times with different prop values.",
  "// Each instance is completely independent — changing one does not",
  "// affect the others.",
  "function App() {",
  "  return (",
  "    <div>",
  "      <ProfileCard name='Alice' role='Dev'      />",
  "      <ProfileCard name='Bob'   role='Designer' />",
  "      <ProfileCard name='Sam'   role='Manager'  />",
  "    </div>",
  "  );",
  "}",
].join("\n");


// ── ProfileCard — a reusable component driven entirely by props ───────────────
// This component does not have any state of its own.
// Everything it shows comes from the props passed by its parent.
//
// Props:
//   name   (string) — person's full name, also used to get the initial letter
//   role   (string) — job title shown in italic below the name
//   level  (string) — "Expert", "Learner", or "Intermediate" — controls badge colour
function ProfileCard({ name, role, level }) {
  // Work out which CSS class to use for the badge based on the level prop.
  // "exp" → orange border, "lrn" → blue border, "mid" → grey border
  const badgeClass = level === "Expert" ? "exp" : level === "Learner" ? "lrn" : "mid";

  return (
    <div className="pcard">
      {/* Show the first letter of the name as an avatar square.
          name[0] grabs the first character of the name string. */}
      <div className="pcard-initial">{name[0]}</div>
      <div className="pcard-name">{name}</div>
      <div className="pcard-role">{role}</div>
      {/* The badge colour changes based on badgeClass — set above */}
      <span className={"plevel " + badgeClass}>{level}</span>
    </div>
  );
}


// ── TodoItem — a single row in the todo list ──────────────────────────────────
// This component does not manage its own state either.
// The parent (Props component below) owns the list data.
// TodoItem receives functions as props so it can tell the parent
// when the user clicks toggle or delete.
//
// Props:
//   text      (string)   — the task text to display
//   done      (boolean)  — whether the task is ticked off
//   onToggle  (function) — call this when the user clicks the row
//   onDelete  (function) — call this when the user clicks the x button
function TodoItem({ text, done, onToggle, onDelete }) {
  return (
    // Clicking anywhere on the row fires onToggle (marks done / undone).
    // The "done" class triggers a line-through style via CSS.
    <div className={"todo-item " + (done ? "done" : "")} onClick={onToggle}>
      {/* Small square checkbox — shows "x" when done */}
      <div className="todo-box">{done ? "x" : ""}</div>
      <span className="todo-text">{text}</span>
      {/* The delete button stops the click from also triggering onToggle
          by calling e.stopPropagation() before calling onDelete() */}
      <button
        className="todo-x"
        onClick={e => {
          e.stopPropagation(); // prevent the row's onClick from also firing
          onDelete();
        }}
      >x</button>
    </div>
  );
}


// ── Props Page Component ──────────────────────────────────────────────────────
export default function Props() {

  // The todo list is state owned by this parent component.
  // TodoItem does not own the data — it only receives it as props.
  const [todos, setTodos] = useState([
    { id: 1, text: "Understand what props are",            done: true  },
    { id: 2, text: "Build a component that accepts props", done: false },
    { id: 3, text: "Pass functions as props (callbacks)",  done: false },
  ]);

  // The text currently typed in the input box
  const [input, setInput] = useState("");

  // add — creates a new todo item and appends it to the list.
  // We spread the existing todos (...todos) to keep them all,
  // then add the new item at the end.
  const add = () => {
    if (!input.trim()) return; // do nothing if the input is blank
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput(""); // clear the input field after adding
  };

  // toggle — flips the done value of a single todo by its id.
  // We map over the list: when we find the matching id we return a new
  // object with done flipped (!t.done); all other items are unchanged.
  const toggle = id =>
    setTodos(todos.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));

  // remove — returns a new list with the chosen item filtered out.
  const remove = id =>
    setTodos(todos.filter(t => t.id !== id));

  return (
    <div className="page">

      <p className="pg-number">03 / Props and Components</p>
      <h1 className="pg-title"><span>Props</span> <em>* Passing Data Down</em></h1>

      <p className="pg-desc">
        Props (short for properties) are how you pass data into a component from
        outside. They work exactly like arguments to a JavaScript function or
        like attributes on an HTML tag. The same component can look and behave
        completely differently depending on what props it receives, which is what
        makes components reusable. Props always flow in one direction: from parent
        down to child. A child component can never change its own props.
      </p>


      {/* ── Demo 1: ProfileCard ── */}
      <div className="section">
        <div className="section-head">One component, three different instances</div>

        {/* We use ProfileCard three times. Each time we pass different prop values.
            React renders each one independently. */}
        <div className="pcgrid">
          <ProfileCard name="Alice"  role="Frontend Dev"  level="Expert"       />
          <ProfileCard name="Bob"  role="UI Designer"   level="Learner"      />
          <ProfileCard name="Sam"    role="Full Stack"    level="Intermediate" />
        </div>
      </div>


      {/* ── Code walkthrough ── */}
      <div className="section">
        <div className="section-head">The ProfileCard code explained</div>

        <CodeBlock title="ProfileCard.jsx" code={CODE_PROFILE} />

        <ExplainTable rows={[
          {
            key:   "{ name, role }",
            title: "Destructuring Props in the Signature",
            desc:  "React passes all props as a single object. Instead of writing props.name and props.role everywhere, we unpack the values we need right in the function signature. This is called destructuring and it makes the code shorter and easier to read.",
          },
          {
            key:   "name='Alice'",
            title: "Passing a Prop It Looks Like an HTML Attribute",
            desc:  "Plain text strings use regular quotes. Any other JavaScript value a number, a variable, a boolean, an array, a function goes inside curly braces: count={42} or isActive={true} or onClick={handleClick}.",
          },
          {
            key:   "{name} in JSX",
            title: "Rendering a Prop Value",
            desc:  "Inside JSX, curly braces {} evaluate any JavaScript expression and render the result as text. {name} outputs whatever string was passed in. You can also put calculations, ternary expressions, or function calls inside {}.",
          },
          {
            key:   "read-only rule",
            title: "Props Flow Down and Are Read-Only",
            desc:  "A component must never modify its own props they belong to the parent. If a child needs to send something back up, the parent passes a function as a prop and the child calls it. This is the callback pattern shown in the todo list below.",
          },
        ]} />
      </div>


      {/* ── Demo 2: TodoList with function props ── */}
      <div className="section">
        <div className="section-head">Passing functions as props — the callback pattern</div>

        <div className="demo" style={{ textAlign: "left", paddingTop: "2.5rem" }}>

          {/* Input row — the text field and Add button */}
          <div className="todo-row">
            <input
              className="todo-input"
              placeholder="Type a task and press Enter"
              value={input}
              // onChange fires on every keystroke and updates the input state
              onChange={e => setInput(e.target.value)}
              // onKeyDown lets the user press Enter instead of clicking Add
              onKeyDown={e => e.key === "Enter" && add()}
            />
            <button className="btn" style={{ whiteSpace: "nowrap" }} onClick={add}>
              Add
            </button>
          </div>

          {/* Render one TodoItem for each todo in the list.
              key={t.id} is required — React uses it to track each item.
              We pass functions (not values) as onToggle and onDelete.
              The child calls them; the parent (here) updates the state. */}
          {todos.map(t => (
            <TodoItem
              key={t.id}
              text={t.text}
              done={t.done}
              onToggle={() => toggle(t.id)} // arrow function so we can pass t.id
              onDelete={() => remove(t.id)}
            />
          ))}

          {/* Progress summary at the bottom */}
          <p style={{ fontFamily: "var(--mono)", fontSize: "0.72rem", color: "var(--ink-light)", marginTop: "0.8rem" }}>
            {todos.filter(t => t.done).length} of {todos.length} done
          </p>
        </div>

        <div className="note">
          <span className="note-label">The callback pattern — how children talk to parents</span>
          TodoItem does not own the list. This component (Props) does. So when
          the user clicks a todo row, TodoItem calls the onToggle function that
          was passed to it as a prop. That function lives here in the parent and
          calls setTodos() to update the list. Data flows down as props;
          user events bubble back up through callback functions. This one pattern
          covers most of the communication between components in a React app.
        </div>
      </div>

    </div>
  );
}