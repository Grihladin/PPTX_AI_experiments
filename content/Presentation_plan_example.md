`
> **Topic:** AI-Powered PPTX Generation — From Personal Hack to Product Vision
> **Presenter:** Michael Ratke
> **Context:** IPAI AI-Circle

---

## Slide 1 — Introduction

This project is not related to any internal Exyte project. It's a side project that grew out of a real daily need.

> **Notes:** Since I joined Exyte, I've had to create a lot of PowerPoint presentations — for architecture reviews, technical reviews, and various other meetings. Having a well-structured PPTX helps me stay on track and not forget anything during the meeting.

---

## Slide 2 — The Problem: I've Never Used PowerPoint

I've never used PowerPoint in my life. I've done plenty of presentations — but always in Canva or Google Slides. And now I have to use PPTX.

> **Notes:** Here's the thing: I was born after PowerPoint had its peak popularity. That doesn't mean I haven't done presentations — I've done plenty — but always in Canva or Google Slides. I never touched PPTX.

---

## Slide 3 — Research: python-pptx

**python-pptx** by Steve Canny (MIT license)
- Deep control over the underlying XML structure
- Can both **read and write** PPTX files

> **Notes:** Provides deep control over the underlying XML structure. Lets you define slide design entirely in Python. The ability to both read and write PPTX files is a major advantage — it means we can inspect and modify existing presentations, not just create new ones.

---

## Slide 4 — Research: pptxgenjs

**pptxgenjs** by Brent Ely (1.7M npm downloads)
- Strong capabilities for tables and charts
- Popular in the JavaScript ecosystem
- **Can only create** PPTX — cannot read or edit existing files

> **Notes:** Keep this limitation in mind — it becomes relevant later when we discuss the architecture decision. Despite the read limitation, its npm ecosystem integration and chart/table capabilities make it compelling for a different reason.

---

## Slide 5 — Building It: Proof of Concept

Fed the AI the python-pptx docs and asked it to create a 5-slide PPTX about dogs. It worked perfectly.

> **Notes:** I chose Python because I needed a working PPTX in 2 hours — I had to move fast. I read the python-pptx docs, set up a Python environment, and ran an AI coding assistant. I fed it the library documentation and the result was a working presentation on the first try.

---

## Slide 6 — Building It: Real Content

Gave the AI my Markdown notes — including an architecture diagram — and it built the PPTX brilliantly.

*(Demo: show the generated example here)*

> **Notes:** I took my Markdown file containing my actual notes — including an architecture diagram — described what I wanted to focus on, and the AI built the PPTX. This was the moment I realised this approach had real potential beyond a quick hack.

---

## Slide 7 — Building It: Branding

Hardcoded header and footer with the Exyte logo and branding. Let the AI handle the rest of the layout.

> **Notes:** We have about 20 example slides with different designs. I considered coding all 20 templates and having the AI pick the right one — but realised that's the wrong approach. The AI can build far better layouts than rigid templates allow. Instead, I hardcoded just the footer and header with the Exyte logo and branding, and let the AI handle the rest.

---

## Slide 8 — Building It: Constraints & Reliability

Defined a bounding box with exact coordinates — a safe area where the AI can place elements without breaking the layout.

**Result:** The system started generating great presentations on the first try.

> **Notes:** After studying common mistakes in the docs, I found several techniques to improve reliability: methods that don't just insert text but also centre it automatically — removing guesswork; deterministic positioning helpers that prevent text from overflowing boxes; and other small tricks that reduce the need for manual adjustments.

---

## Slide 9 — The Accessibility Gap

For me, this is easy — I'm a software developer. But for an ordinary user? It's way too much.

> **Notes:** Using the terminal, configuring a Python environment, running an AI coding assistant through my working Azure API — that's all second nature to me. But for an ordinary user, it's way too much. And yet, I believe AI-powered PPTX creation is a genuine productivity booster — not just for engineers, but for everyone who has to build presentations regularly.

---

## Slide 10 — Market Research: What's Already Out There?

Exyte is not a software company. The default approach is: **buy it or do nothing.** So I went to the market.

| Problem     | Details                              |
| ----------- | ------------------------------------ |
| **Privacy** | SaaS tools send your data to their servers |
| **Quality** | HTML-first → broken PPTX conversion |
| **Price**   | Shockingly expensive                 |

> **Notes:** Almost all presentation tools are SaaS — your data goes to their servers. For most German companies, this is unacceptable. PPTX files can contain sensitive information that cannot be handed to a third party, especially under strict GDPR regulations. Nearly all of them generate presentations as HTML first, then convert to other formats. When converted to PowerPoint, the output often breaks apart — because of PowerPoint's very "special" internal XML structure. And they are shockingly expensive — priced as if they're providing engineering-grade calculation services, not slide generation.

---

## Slide 11 — Vision: Desktop-First

A native app, not a web app. Users shouldn't need a Computer Science degree to generate a presentation.

> **Notes:** All the SaaS tools on the market are web apps. A desktop-first approach means users double-click and it works — no browser, no account creation, no cloud dependency.

---

## Slide 12 — Vision: Private

The company owns its data. Nothing leaves the machine unless the user decides it should.

> **Notes:** Data privacy is non-negotiable for most German enterprises. A local-first architecture means sensitive presentation content never touches third-party servers.

---

## Slide 13 — Vision: PPTX-First

Build PowerPoint natively — not HTML converted to PPTX.

> **Notes:** Let me be honest: HTML is far superior for building presentations. With React, TailwindCSS, shadcn, and countless other tools, an AI agent could build unbelievably beautiful slides. But they'd be HTML, not PPTX — and the conversion is never smooth. The reality is that most companies use PowerPoint. It does the job. People aren't looking for alternatives. They'll keep using it for a spectrum of reasons — whether I like it or not. So the tool must build PowerPoint natively.

---

## Slide 14 — Vision: Good Enough

Ready to use right away — saving people hours of manual formatting every day.

> **Notes:** It doesn't need to win design awards. It needs to deliver presentations that are ready to use right away. The goal is practical time savings, not pixel-perfect design.

---

## Slide 15 — Transition to Architecture

The gap exists. I'm building it as an open-source side project.

> **Notes:** AI can already generate solid PowerPoint presentations from plain text or Markdown — but the tooling to make this accessible, private, and enterprise-ready doesn't exist yet. That's the gap I'm working to fill. I'm currently figuring out the architecture and technical setup. One important decision: even though I like the Python framework more, Python isn't designed for building desktop applications. It's amazing for backend work, AI, data science — but for building a user-facing application, it's not the best fit.

---

## Slide 16 — Architecture Overview

```
Electron App
├── UI Layer (React)
└── Pi Agent Core (embedded via SDK)
    ├── pi-ai → any LLM API (Azure OpenAI, Anthropic, local models, etc.)
    ├── Corporate Template Skill (layout, colors, logo, boundaries)
    └── Custom Tools
        ├── plan_presentation()
        ├── add_slide()
        ├── edit_slide(n)
        ├── redesign_slide(n)
        ├── read_state()
        └── save_presentation()
```

> **Notes:** I see this application as four distinct parts: Electron as the foundation, Pi Agent as the AI harness, the Corporate Template Skill for branding, and Custom Tools for composable operations. Let me walk through each.

---

## Slide 17 — Architecture: Electron + Pi Agent

**Electron** — Cross-platform desktop app. Single installer. Users double-click and it works.

**Pi Agent** — The AI harness. Open-source, TypeScript/Node.js, fits perfectly into the Electron stack.

> **Notes:** Electron is currently one of the best solutions for building cross-platform desktop applications. It runs on Node.js and TypeScript — which means the entire stack shares one runtime. Pi Agent is like tools such as Claude Code, Codex, Gemini CLI, or OpenCode. I chose Pi because it's open-source, well-documented, and because OpenClaw is built on top of it, it's actively and nicely maintained. It's modular and flexible — I can define exactly how and what the AI should do.

---

## Slide 18 — Architecture: Template Skill + Custom Tools

**Corporate Template Skill** — A system prompt that teaches the agent a specific corporate style: colours, fonts, logo, boundaries.

**Custom Tools** — Not one giant "generate everything" call, but precise, composable operations: `plan`, `add`, `edit`, `redesign`, `read`, `save`.

> **Notes:** The Corporate Template Skill is the actual product — the rest is packaging. It's a structured system prompt that defines how to build in a specific corporate style. The Custom Tools are the actions the agent can take. Each tool does one thing well, and the agent composes them into a full workflow.

---

## Slide 19 — The Agent Loop

1. **User provides** topic, context, and optional references
2. **Agent calls** `plan_presentation()` — writes a Markdown outline
3. **User reviews** and edits the plan in the UI
4. **Agent calls** `add_slide()` for each slide
5. **Agent calls** `read_state()` to verify, then `edit_slide()` to fix
6. **`save_presentation()`** — saved locally, never leaves the machine

> **Notes:** This is the key differentiator — it's not a one-shot generation. It's an iterative agent loop. The planning step acts as a review checkpoint before generation. It gives users control and catches mistakes early — before any slides are built.

---

## Slide 20 — Why Not One-Shot Generation?

Tool-based agent loop lets the agent inspect and fix individual slides — without touching the rest.

> **Notes:** Asking the LLM to generate all the code in one response is fragile. If slide 7 is wrong, you have to regenerate everything. The tool-based agent loop lets the agent inspect, fix specific slides, and iterate — without touching the rest. The Markdown outline acts as a review checkpoint before generation. It gives users control and catches mistakes early.

---

## Slide 21 — Why This Stack?

| Choice | Reason |
|--------|--------|
| **Pi Agent** | Same TypeScript/Node.js runtime as Electron. API-agnostic. |
| **pptxgenjs** | Native npm package. Runs inside Electron with zero extra setup. |
| **Electron** | Cross-platform. Single installer. No terminal or dependencies. |

> **Notes:** Pi Agent: no bridging or separate processes needed. Supports Azure OpenAI, Anthropic, local models — plug in whatever the company already has. Skills system makes the corporate template shareable via npm or git. Full observability into every model call. pptxgenjs: no Python runtime, no bundling complexity, no IT approval for a second runtime. Covers all standard corporate slide needs. Electron: users double-click and it works — no terminal, no environment setup.

---

## Slide 22 — Strengths

- **Compliance by design** — data goes only where the company's API points
- **Zero runtime friction** — pure Node.js/Electron stack
- **Format correctness** — generates real .pptx files
- **Intelligent editing** — agent can fix individual slides
- **API-agnostic** — plug in any LLM endpoint
- **Open source** — trust signal for enterprise IT

> **Notes:** These six strengths collectively address the three market gaps identified earlier: privacy (compliance by design, API-agnostic), quality (format correctness, intelligent editing), and accessibility (zero friction, open source).

---

## Slide 23 — Why This Is Actually Feasible

Every component already exists as a mature open-source project — the work is integration, not invention.

> **Notes:** If I had to build all of this from scratch, the project would be impossible to even imagine. But after my research, I drafted an architecture where every component already exists as a mature, well-maintained open-source project — and they complement each other perfectly. Electron, Pi Agent, pptxgenjs — they all share the same TypeScript/Node.js runtime and fit together naturally. It's a relatively straightforward project to execute — roughly two months of coding in my free time. Which I'm going to do.

---

## Slide 24 — One-Line Pitch

> **A local-first, API-agnostic presentation generator that produces real PPTX — built for enterprises where data privacy isn't optional.**

---

## Slide 25 — Let's Connect

If this topic sparked your interest — or if you're working on something similar — I'd love to connect on LinkedIn.

And on a personal note: I'm an AI engineer who enjoys building things like this. If you or your team are looking for someone with this kind of profile, I'm always open to a conversation.
