# smithers-go-review

> Harsh Go code review workflow for [smithers](https://smithers.sh).

A smithers workflow that reads your Go code against the official [Go Code Review Comments](https://go.dev/wiki/CodeReviewComments) and Effective Go, then delivers a brutally honest grading with specific file/function/line references.

## Installation

In your smithers project:

```bash
smithers workflow install github.com/SamuelLHuber/smithers-go-review
```

Or clone into `.smithers/workflows/`:

```bash
cd .smithers/workflows && \
  curl -L -o go-review.tsx https://raw.githubusercontent.com/SamuelLHuber/smithers-go-review/main/workflows/go-review.tsx
```

## Usage

```bash
smithers workflow run go-review \
  --prompt "Review the Go code in this repo" \
  --root . \
  --allow-network
```

## What it Reviews

- **Package Structure** — Is `main.go` a thin orchestrator or a monolith?
- **Interfaces** — Small consumer-defined interfaces? No god interfaces?
- **Error Handling** — Wrapped errors, sentinel errors, correct HTTP codes
- **Naming** — Godoc sentences, package names, receiver consistency
- **Testing** — Table-driven, subtests, benchmarks
- **Comments** — WHY not WHAT, clean godoc
- **Security** — URL validation, auth middleware, secret handling
- **Performance** — Connection pooling, goroutine safety

## Output

A JSON report with:
- `overallGrade` — F to A+
- `criticalIssues[]` — Must fix before merge
- `majorIssues[]` — Significant problems
- `minorIssues[]` — Style, naming, comments
- `testingGaps[]` — Missing coverage
- `architectureConcerns[]` — Structural problems

## License

MIT
