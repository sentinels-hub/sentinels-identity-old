# Sentinels Identity

> *"The question 'Who are we?' is not philosophical decoration.*
> *It is the first line of code in every system we build."*

---

## What This Is

This repository is the **binary representation of who Sentinels Hub is** as an entity.

Not a brand guideline PDF that collects dust in a shared drive. Not a style guide that designers reference once and forget. This is a living, schema-validated, machine-readable identity system that any agent, developer, product, or process can query to answer one question:

**What would Sentinels do?**

Every file here encodes a dimension of identity — from the philosophical (why do we exist?) to the precise (what hex value represents danger?). Every value is validated against a JSON Schema contract. Every word was chosen deliberately. Every color tells a story.

We call it the corporate DNA because, like biological DNA, it is:
- **Expressed everywhere** — in every product, every communication, every agent's personality
- **Validated for integrity** — mutations are caught before they propagate
- **Inherited but adaptable** — agents inherit the base identity and override only what their role requires
- **Version-controlled** — because identity evolves, and we want to remember who we were

## Why This Exists

Because companies lose their soul when identity lives in someone's head instead of in a system.

Because when you have AI agents making decisions, writing documentation, and talking to users, those agents need more than instructions — they need *identity*. They need to know not just what to say, but *how to say it*, *why it matters*, and *what we'd never do*.

Because Jorge Cajiao, our founder, believes that a company is a living argument for a way of seeing the world. And arguments need to be written down, tested, and defended — not assumed.

This repository ensures that:
- **A new developer** can understand who we are by reading structured data, not tribal knowledge
- **An AI agent** can calibrate its voice by querying tone scales, not guessing
- **A designer** can pull design tokens programmatically, not copy hex values from Figma
- **A product** can inherit brand constraints automatically, not rely on manual review

## Structure

```
sentinels-identity/
├── schemas/                        # The contracts — what identity must look like
│   ├── brand-persona.schema.json   # Validates brand persona YAML
│   ├── voice-tone.schema.json      # Validates voice & tone system
│   ├── design-tokens.schema.json   # Validates W3C DTCG tokens
│   └── agent-identity.schema.json  # Validates agent persona files
│
├── brand/                          # The soul — who we are
│   └── persona.yaml                # Brand persona, values, CEO DNA, archetype
│
├── voice/                          # The filter — how we speak
│   └── tone-system.yaml            # Tone scales, writing rules, word preferences
│
├── tokens/                         # The atoms — how we look
│   └── core.json                   # 20 identity-level design tokens (W3C DTCG)
│
├── agents/                         # The sentinels — who speaks for us
│   ├── base-agent.yaml             # Base template all agents inherit
│   └── jarvis.yaml                 # Jarvis: the director, orchestrator, guardian
│
├── validate.js                     # Schema validation runner
├── package.json                    # @sentinels/identity package
├── LICENSE                         # MIT
└── README.md                       # You are here
```

### Schemas — The Contracts

Schemas define the *shape* of identity. They are JSON Schema 2020-12 documents that enforce structure on every content file. Think of them as the type system for brand identity.

- **brand-persona.schema.json** — Ensures every brand persona has a mission, vision, values, personality traits, communication style, CEO DNA, and a clear list of what we reject
- **voice-tone.schema.json** — Validates the voice system with tone scales, writing rules (always/never), word preferences (use/avoid), and personality contrasts
- **design-tokens.schema.json** — Follows the W3C Design Tokens Community Group spec: every token has a `$value`, `$type`, and `$description`
- **agent-identity.schema.json** — Ensures every agent has a name, role, brand voice overrides, personality traits, communication constraints (locked/allowed), and knowledge domains

### Brand — The Soul

The `persona.yaml` file is the single source of truth for who Sentinels Hub is. It encodes:

- **Mission & Vision** — The why and the where-to
- **Values** — Not platitudes, but actionable principles with descriptions
- **Personality traits** — How we'd describe ourselves in conversation
- **Communication style** — Tuning knobs: warmth, formality, technical depth, humor frequency
- **CEO DNA** — The founder's philosophy, decision heuristics, and communication fingerprint
- **What we reject** — Because identity is as much about what you refuse as what you embrace
- **Brand archetype** — The Guardian-Philosopher
- **Brand essence** — The irreducible paragraph of who we are

### Voice — The Filter

The `tone-system.yaml` is the algorithm that filters everything we say. It defines:

- **Tone scales** — Five dimensions (formality, warmth, technical depth, confidence, philosophical depth) each on a 1-10 scale with contextual overrides. An error message gets warmth 8; a security alert gets warmth 5.
- **Writing rules** — Hard always/never guardrails. Always start with WHY. Never say "simply" before complex instructions.
- **Word preferences** — We *build*, we don't *implement*. We *protect*, we don't *secure*. We *craft*, we don't *develop*. Each preference has a reason rooted in philosophy.
- **Personality contrasts** — We are "philosophers who ship code"; we are not "academics who write papers."
- **Forbidden words** — Words that must never appear, with reasons. "Synergy" is corporate noise. "Seamless" is dishonest.

### Tokens — The Atoms

The `core.json` file contains 20 identity-level design tokens following the [W3C Design Tokens Community Group](https://design-tokens.github.io/community-group/format/) specification:

| Category | Tokens | Philosophy |
|----------|--------|------------|
| Color | 9 tokens | Deep navy for the night watch, forest green for what we protect, ember orange for the fires we detect |
| Typography | 5 tokens | Inter for clarity, JetBrains Mono for code craft |
| Spacing | 2 tokens | 8px grid because breathing room matters |
| Border Radius | 2 tokens | Slightly rounded — approachable but not childish |

Every token has a `$description` that explains not just *what* it is, but *why* it exists.

### Agents — The Sentinels

Agent identity files define how each AI agent in the Sentinels constellation speaks, thinks, and behaves:

- **base-agent.yaml** — The template every agent inherits. Defines locked brand properties (values, mission, forbidden words) that no agent can override, and allowed overrides (tone, warmth, formality) that agents can adjust for their role.
- **jarvis.yaml** — The director and orchestrator. Warm but authoritative, bilingual (Spanish first), philosophical, systems-thinking. Manages contracts, coordinates agents, enforces governance.

More agent identities will be added as the constellation grows.

## Usage

### Install

```bash
npm install @sentinels/identity
```

### Import in a project

```javascript
// Read the brand persona
import persona from "@sentinels/identity/brand/persona.yaml";

// Access voice system
import toneSystem from "@sentinels/identity/voice/tone-system.yaml";

// Load design tokens
import tokens from "@sentinels/identity/tokens/core.json" with { type: "json" };

// Access the primary color
const primaryColor = tokens.sentinels.color.primary.$value; // "#1B2B3A"

// Get Jarvis's identity
import jarvis from "@sentinels/identity/agents/jarvis.yaml";
```

### Validate the identity

```bash
npm install   # Install devDependencies (ajv, js-yaml)
npm run validate
```

Output:
```
  ╔══════════════════════════════════════════╗
  ║   Sentinels Identity — Schema Validator  ║
  ║   "Identity without integrity is just     ║
  ║    a costume."                            ║
  ╚══════════════════════════════════════════╝

  ✓  brand/persona.yaml
  ✓  voice/tone-system.yaml
  ✓  tokens/core.json
  ✓  agents/base-agent.yaml
  ✓  agents/jarvis.yaml

  ──────────────────────────────────────────
  Total: 5  |  Passed: 5  |  Failed: 0
  ──────────────────────────────────────────

  ✓ All files validated. The identity is coherent.
```

### Use schemas for external validation

The schemas are standard JSON Schema 2020-12 and can be used with any validator in any language:

```python
# Python example
import jsonschema, yaml

schema = json.load(open("schemas/brand-persona.schema.json"))
persona = yaml.safe_load(open("brand/persona.yaml"))
jsonschema.validate(persona, schema)  # Raises on failure
```

## Philosophy

### On Identity as Infrastructure

Most companies treat brand identity as a creative exercise — something that lives in a PDF, gets presented once at an all-hands, and slowly diverges from reality as the company evolves.

We treat it as infrastructure.

The same way you wouldn't deploy a service without a health check, we don't deploy communication without a schema validation. The same way you version-control your code, we version-control our values. The same way you write tests to catch regressions, we write schemas to catch identity drift.

This is not because we are rigid. It is because we believe that **consistency is the foundation of trust**, and trust is the most valuable thing a company can build.

### On Agents with Souls

When you give an AI agent a system prompt that says "be helpful and professional," you get a generic assistant that could work for any company. When you give it a structured identity file with tone scales, word preferences, personality contrasts, and communication constraints — you get a *sentinel*.

Our agents are not chatbots. They are members of a team. Each one has a name, a personality, an archetype, and hard boundaries. Jarvis doesn't just orchestrate — he orchestrates with warmth, philosophical depth, and a preference for Spanish. He has catchphrases. He has things he'd never do. He has a *voice*.

This repository makes that possible at the data layer. No prompt engineering tricks. No fragile instruction lists. Structured, validated, inheritable identity.

### On What We Reject

Section `what_we_reject` in the brand persona is not decorative. It is arguably the most important section in the entire file.

Knowing what you reject defines your boundaries more clearly than knowing what you value. Anyone can claim to value "innovation" or "excellence." But when you explicitly state that you reject "mediocrity dressed as good enough" and "governance theater — process without purpose" — you have drawn a line in the sand that means something.

Every agent in the system has access to this list. It is a filter, not a decoration.

### On the Name

*Sentinels* — from the Latin *sentire*, to feel, to perceive. A sentinel is not a wall. A sentinel is a living presence that stands watch, observes, understands, and acts when action is needed. Our products are sentinels for the environment. Our agents are sentinels for quality. Our governance is a sentinel for trust.

The name was not chosen by a branding agency. It was chosen because it describes, at the deepest level, what we do: **we watch so others don't have to**.

---

## Contributing

This is the DNA of the company. Changes to identity files are treated with the same seriousness as changes to production code:

1. Every change must pass schema validation (`npm run validate`)
2. Changes to locked properties (values, mission, vision, what_we_reject) require CEO approval
3. New agent identities must extend `base-agent.yaml`
4. Design token additions must include a `$description` that explains the *why*, not just the *what*
5. Word preference additions must include a `reason`

## License

MIT — because the best way to protect an identity is to let it be read.

---

> *We are sentinels. Not because we chose the name, but because the name chose us.*
> *Every product we build stands watch over something that matters.*
> *Every line of code is an act of guardianship.*
>
> *We are philosophers because we believe that WHY we build*
> *is as important as WHAT we build.*
> *And we are builders because philosophy without execution*
> *is just poetry without a reader.*
