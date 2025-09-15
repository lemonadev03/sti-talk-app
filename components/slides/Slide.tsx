"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { Slide } from "@/content/slides"
import Image from "next/image"
import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/nightOwl"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"

function renderInline(text?: string) {
  if (!text) return null
  const parts = text.split(/(`[^`]+`)/g)
  return parts.map((part, i) => {
    const match = part.match(/^`(.+)`$/)
    if (match) {
      return (
        <code
          key={i}
          className="rounded-md bg-secondary/50 px-1.5 py-0.5 font-mono text-[0.95em] text-foreground/90"
        >
          {match[1]}
        </code>
      )
    }
    return <React.Fragment key={i}>{part}</React.Fragment>
  })
}

function FancyTitle({ title, subtitle }: { title?: string; subtitle?: string }) {
  if (!title && !subtitle) return null
  return (
    <div className="mb-8 text-center">
      {title && (
        <div className="inline-block">
          <h1 className="font-outfit text-white text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight">
            {title}
          </h1>
          <motion.span
            className="mt-3 block h-1.5 w-full bg-primary/90"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      )}
      {subtitle && (
        <p className="mt-5 text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto">
          {renderInline(subtitle)}
        </p>
      )}
    </div>
  )
}

function BulletList({ bullets }: { bullets?: string[] }) {
  if (!bullets?.length) return null
  return (
    <ul className="mt-8 space-y-5 text-2xl md:text-3xl leading-relaxed">
      {bullets.map((b, i) => (
        <li key={i} className="flex items-start gap-4">
          <span className="mt-3 block h-2 w-2 rounded-full bg-primary/90" />
          <span>{renderInline(b)}</span>
        </li>
      ))}
    </ul>
  )
}

function CodeBlock({ code, language = "python" }: { code?: string; language?: string }) {
  if (!code) return null
  return (
    <div className="mt-6 w-full overflow-hidden rounded-xl border border-border/60 bg-muted/10">
      <Highlight
        {...defaultProps}
        code={code.trim()}
        language={language as any}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} m-0 p-5 text-left text-base md:text-lg leading-relaxed font-mono`}
            style={{ ...style, background: "transparent" }}
          >
            {tokens.map((line, i) => {
              const lineProps: any = getLineProps({ line })
              const { key: _lineKey, ...restLineProps } = lineProps || {}
              return (
                <div key={i} {...restLineProps}>
                  {line.map((token, j) => {
                    const tokenProps: any = getTokenProps({ token })
                    const { key: _tokenKey, ...restTokenProps } = tokenProps || {}
                    return <span key={j} {...restTokenProps} />
                  })}
                </div>
              )
            })}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

function CodeWithEditor({ code, storageKey }: { code?: string; storageKey: string }) {
  const [open, setOpen] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    const raw = window.localStorage.getItem(`${storageKey}:isOpen`)
    return raw === '1'
  })

  const handleOpen = () => {
    setOpen(true)
    try { if (typeof window !== 'undefined') window.localStorage.setItem(`${storageKey}:isOpen`, '1') } catch {}
  }
  const handleClose = () => {
    setOpen(false)
    try { if (typeof window !== 'undefined') window.localStorage.setItem(`${storageKey}:isOpen`, '0') } catch {}
  }

  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm md:text-base text-muted-foreground">Example</div>
        {!open ? (
          <Button size="sm" onClick={handleOpen}>Open in Editor</Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" onClick={handleClose}>Close</Button>
          </div>
        )}
      </div>

      {!open ? (
        <CodeBlock code={code} language="python" />
      ) : (
        <EditorPanel
          starter={code}
          storageKey={storageKey}
          onResetClose={handleClose}
        />
      )}
    </div>
  )
}

function QrGrid({ items }: { items?: { label: string; image?: string; url?: string }[] }) {
  if (!items?.length) return null
  return (
    <div className="mt-10 grid grid-cols-2 gap-8 md:gap-10 max-w-4xl mx-auto">
      {items.map((it, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="relative aspect-square w-40 md:w-56 rounded-lg border border-border/60 bg-background/60">
            {it.image ? (
              <Image src={it.image} alt={it.label} fill className="object-contain p-3" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                QR Placeholder
              </div>
            )}
          </div>
          <div className="mt-3 text-lg md:text-xl text-muted-foreground">{it.label}</div>
        </div>
      ))}
    </div>
  )
}

function ImageGrid({ images }: { images?: (string | null | undefined)[] }) {
  const list = images && images.length ? images.slice(0, 2) : [null, null]
  return (
    <div className="mt-10 flex items-center justify-center gap-6">
      {list.map((src, i) => (
        <div key={i} className="relative h-56 w-56 md:h-72 md:w-72 rounded-lg border border-border/60 bg-background/60">
          {src ? (
            <Image src={src} alt={`Photo ${i + 1}`} fill className="object-cover rounded-lg" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">Photo {i + 1}</div>
          )}
        </div>
      ))}
    </div>
  )
}

function InteractiveExample({ before, after }: { before?: string; after?: string }) {
  const [revealed, setRevealed] = React.useState(false)
  const afterRef = React.useRef<HTMLDivElement | null>(null)

  return (
    <div className="mt-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm md:text-base text-muted-foreground">Interactive Example</div>
        <div className="flex items-center gap-2">
          {!revealed ? (
            <Button size="sm" onClick={() => setRevealed(true)}>Simplify</Button>
          ) : (
            <Button size="sm" variant="secondary" onClick={() => setRevealed(false)}>Reset</Button>
          )}
        </div>
      </div>
      <div>
        <div className="mb-2 text-sm md:text-base text-muted-foreground">Before</div>
        <CodeBlock code={before} language="python" />
      </div>

      <AnimatePresence initial={false}>
        {revealed && (
          <motion.div
            key="after"
            ref={afterRef}
            initial={{ height: 0, opacity: 0, scale: 0.98 }}
            animate={{ height: "auto", opacity: 1, scale: 1 }}
            exit={{ height: 0, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
            className="mt-6 pb-6"
            onAnimationComplete={() => {
              // After expansion finishes, scroll the bottom of the section into view
              afterRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
            }}
          >
            <div className="mb-2 text-sm md:text-base text-muted-foreground">After</div>
            <CodeBlock code={after} language="python" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

function EditorPanel({ starter, storageKey = "editor:default", onResetClose }: { starter?: string; storageKey?: string; onResetClose?: () => void }) {
  const [code, setCode] = React.useState<string>(starter || "")
  const [output, setOutput] = React.useState<string>("")
  const [running, setRunning] = React.useState(false)
  const [error, setError] = React.useState<string>("")
  const lastCodeKey = `${storageKey}:lastCode`
  const lastOutputKey = `${storageKey}:lastOutput`
  const lastErrorKey = `${storageKey}:lastError`

  // Load saved code from localStorage on mount
  React.useEffect(() => {
    try {
      const saved = typeof window !== 'undefined' ? window.localStorage.getItem(storageKey) : null
      if (saved !== null) {
        setCode(saved)
      }
      // Restore cached output if matches last code
      const lastCode = typeof window !== 'undefined' ? window.localStorage.getItem(lastCodeKey) : null
      const lastOut = typeof window !== 'undefined' ? window.localStorage.getItem(lastOutputKey) : null
      const lastErr = typeof window !== 'undefined' ? window.localStorage.getItem(lastErrorKey) : null
      const currentCode = saved !== null ? saved : (starter || "")
      if (lastCode !== null && lastCode === currentCode) {
        if (lastOut) setOutput(lastOut)
        if (lastErr) setError(lastErr)
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey])

  // Persist code to localStorage (debounced)
  React.useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(storageKey, code)
        }
      } catch {}
    }, 400)
    return () => window.clearTimeout(id)
  }, [code, storageKey])

  const handleRun = async () => {
    setRunning(true)
    setError("")
    setOutput("")
    try {
      // If code matches last successful run, return cached output
      const cachedCode = typeof window !== 'undefined' ? window.localStorage.getItem(lastCodeKey) : null
      const cachedOut = typeof window !== 'undefined' ? window.localStorage.getItem(lastOutputKey) : null
      const cachedErr = typeof window !== 'undefined' ? window.localStorage.getItem(lastErrorKey) : null
      if (cachedCode !== null && cachedCode === code) {
        if (cachedOut) setOutput(cachedOut)
        if (cachedErr) setError(cachedErr)
        return
      }
      const res = await fetch("https://sti-talk-api-production.up.railway.app/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
      const text = await res.text()
      // Try parse JSON first; otherwise show raw text
      try {
        const json = JSON.parse(text)
        const combined = [json.stdout, json.stderr, json.output, json.error].filter(Boolean).join("\n")
        const finalOut = combined || text
        setOutput(finalOut)
        // Cache output with the code
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(lastCodeKey, code)
          window.localStorage.setItem(lastOutputKey, finalOut)
          window.localStorage.removeItem(lastErrorKey)
        }
      } catch {
        setOutput(text)
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(lastCodeKey, code)
          window.localStorage.setItem(lastOutputKey, text)
          window.localStorage.removeItem(lastErrorKey)
        }
      }
    } catch (e: any) {
      setError(e?.message || "Failed to execute")
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(lastCodeKey, code)
          window.localStorage.setItem(lastErrorKey, e?.message || "Failed to execute")
        }
      } catch {}
    } finally {
      setRunning(false)
    }
  }

  const handleReset = () => {
    const next = starter || ""
    setCode(next)
    setOutput("")
    setError("")
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(storageKey, next)
        window.localStorage.removeItem(lastCodeKey)
        window.localStorage.removeItem(lastOutputKey)
        window.localStorage.removeItem(lastErrorKey)
      }
    } catch {}
    // Notify parent to optionally close the editor view after reset
    if (typeof onResetClose === 'function') {
      onResetClose()
    }
  }

  const onMount = (editor: any, monaco: any) => {
    // Basic helpful completions/snippets for Python
    monaco.languages.registerCompletionItemProvider("python", {
      provideCompletionItems: () => {
        const suggestions = [
          {
            label: "def",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "def ${1:name}(${2:args}):\n    ${3:pass}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: "for",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "for ${1:i} in range(${2:10}):\n    ${3:print(i)}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: "if",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "if ${1:condition}:\n    ${2:pass}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: "avg3",
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "Compute average of three variables",
            insertText: "average = (${1:test1} + ${2:test2} + ${3:test3}) / 3",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
        ]
        return { suggestions }
      },
    })
  }

  return (
    <div className="mt-4">
      <div className="rounded-xl border border-border/60 bg-muted/10">
        <div className="flex items-center justify-between border-b border-border/60 px-3 py-2">
          <div className="text-sm md:text-base text-muted-foreground">Python Editor</div>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={handleRun} disabled={running}>
              {running ? "Running..." : "Run"}
            </Button>
            <Button size="sm" variant="secondary" onClick={handleReset} disabled={running}>
              Reset
            </Button>
          </div>
        </div>
        <div className="h-[320px] md:h-[420px]">
          {/* @ts-ignore - MonacoEditor dynamic import type */}
          <MonacoEditor
            height="100%"
            defaultLanguage="python"
            theme="vs-dark"
            value={code}
            onChange={(val: string | undefined) => setCode(val ?? "")}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: "on",
              cursorSmoothCaretAnimation: "on",
              automaticLayout: true,
            }}
            onMount={onMount}
          />
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-border/60 bg-muted/10">
        <div className="border-b border-border/60 px-3 py-2 text-sm md:text-base text-muted-foreground">Output</div>
        <pre className="m-0 max-h-56 overflow-auto p-4 text-left text-sm md:text-base">
{output ? output : error ? `Error: ${error}` : ""}
        </pre>
      </div>
    </div>
  )
}

export default function Slide({ slide }: { slide: Slide }) {
  return (
    <motion.div
      key={slide.id}
      initial={{ opacity: 0, y: 10, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.995 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative mx-auto max-w-6xl"
    >
      {slide.kind === "title" ? (
        <div className="flex min-h-[60vh] flex-col items-center justify-center">
          <FancyTitle title={slide.title} subtitle={slide.subtitle} />
          {slide.images?.length ? (
            <div className="relative w-full max-w-4xl aspect-[16/9]">
              <Image
                src={slide.images[0] as string}
                alt={slide.title || "Slide image"}
                fill
                className="object-contain rounded-lg border border-border/60 bg-background/60"
                priority
              />
            </div>
          ) : null}
          {slide.visual && (
            <div className="mt-6 text-center text-muted-foreground text-xl md:text-2xl">{slide.visual}</div>
          )}
        </div>
      ) : (
        <>
          <FancyTitle title={slide.title} subtitle={slide.subtitle} />

          {slide.kind === "bullets" && !slide.code && (
            <>
              {slide.images && slide.imageFirst && <ImageGrid images={slide.images} />}
              <BulletList bullets={slide.bullets} />
              {slide.images && !slide.imageFirst && <ImageGrid images={slide.images} />}
            </>
          )}

          {slide.kind === "intro" && (
            <>
              {slide.imageFirst ? (
                <>
                  <ImageGrid images={slide.images} />
                  <BulletList bullets={slide.bullets} />
                </>
              ) : (
                <>
                  <BulletList bullets={slide.bullets} />
                  <ImageGrid images={slide.images} />
                </>
              )}
            </>
          )}

          {(slide.kind === "code" || (!!slide.code && slide.kind !== "qr" && slide.kind !== "image" && slide.kind !== "finale")) && (
            <>
              <BulletList bullets={slide.bullets} />
              <CodeWithEditor code={slide.code} storageKey={`editor:${slide.id}`} />
            </>
          )}

          {slide.kind === "image" && !slide.code && (
            <div className="mt-10 text-center text-muted-foreground text-xl md:text-2xl">
              {slide.visual || "[visual placeholder]"}
            </div>
          )}

          {slide.kind === "interactive" && (
            <>
              <BulletList bullets={slide.bullets} />
              <InteractiveExample before={slide.beforeCode} after={slide.afterCode} />
            </>
          )}

          {slide.kind === "editor" && (
            <>
              <BulletList bullets={slide.bullets} />
              <EditorPanel starter={slide.starterCode} storageKey={`editor:${slide.id}`} />
            </>
          )}

          {slide.kind === "finale" && (
            <>
              <BulletList bullets={slide.bullets} />
              <CodeBlock code={slide.code} language="python" />
            </>
          )}

          {slide.kind === "qr" && <QrGrid items={slide.qrs} />}
        </>
      )}
    </motion.div>
  )
}
