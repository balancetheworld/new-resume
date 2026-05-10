'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/site/language-switcher'
import { useI18n } from '@/lib/i18n/context'
import { Download, Eye, Menu, X } from 'lucide-react'

interface Position {
  x: number
  y: number
}

interface DragState {
  pointerId: number | null
  startX: number
  startY: number
  origin: Position | null
  moved: boolean
}

const FLOATING_MENU_POSITION_KEY = 'floating-workspace-menu-position'

interface FloatingWorkspaceMenuProps {
  resumeId?: string
}

export function FloatingWorkspaceMenu({ resumeId }: FloatingWorkspaceMenuProps) {
  const { dictionary } = useI18n()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<Position | null>(null)
  const dragStateRef = useRef<DragState>({
    pointerId: null,
    startX: 0,
    startY: 0,
    origin: null,
    moved: false,
  })
  const suppressClickRef = useRef(false)

  const navItems = [
    { href: '/', label: dictionary.nav.editor },
    { href: '/templates', label: dictionary.nav.templates },
    { href: '/builder', label: dictionary.nav.builder },
    { href: '/resumes', label: dictionary.nav.resumes },
  ]

  const handleDownload = () => {
    window.print()
    setIsOpen(false)
  }

  useEffect(() => {
    const savedPosition = window.localStorage.getItem(FLOATING_MENU_POSITION_KEY)

    if (!savedPosition) {
      setPosition({
        x: window.innerWidth - 56,
        y: 16,
      })
      return
    }

    try {
      const parsed = JSON.parse(savedPosition) as Position
      const maxX = Math.max(16, window.innerWidth - 56)
      const maxY = Math.max(16, window.innerHeight - 56)

      setPosition({
        x: Math.min(maxX, Math.max(16, parsed.x)),
        y: Math.min(maxY, Math.max(16, parsed.y)),
      })
    } catch {
      setPosition({
        x: window.innerWidth - 56,
        y: 16,
      })
    }
  }, [])

  useEffect(() => {
    if (!position) {
      return
    }

    window.localStorage.setItem(FLOATING_MENU_POSITION_KEY, JSON.stringify(position))
  }, [position])

  useEffect(() => {
    const handleResize = () => {
      setPosition((currentPosition) => {
        if (!currentPosition) {
          return currentPosition
        }

        const maxX = Math.max(16, window.innerWidth - 56)
        const maxY = Math.max(16, window.innerHeight - 56)

        return {
          x: Math.min(maxX, Math.max(16, currentPosition.x)),
          y: Math.min(maxY, Math.max(16, currentPosition.y)),
        }
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const resetDragState = () => {
      dragStateRef.current = {
        pointerId: null,
        startX: 0,
        startY: 0,
        origin: null,
        moved: false,
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      const dragState = dragStateRef.current

      if (dragState.pointerId !== event.pointerId || !dragState.origin) {
        return
      }

      const deltaX = event.clientX - dragState.startX
      const deltaY = event.clientY - dragState.startY

      if (!dragState.moved && Math.hypot(deltaX, deltaY) > 6) {
        dragState.moved = true
        suppressClickRef.current = true
      }

      if (!dragState.moved) {
        return
      }

      const maxX = Math.max(16, window.innerWidth - 56)
      const maxY = Math.max(16, window.innerHeight - 56)

      setPosition({
        x: Math.min(maxX, Math.max(16, dragState.origin.x + deltaX)),
        y: Math.min(maxY, Math.max(16, dragState.origin.y + deltaY)),
      })
    }

    const handlePointerUp = (event: PointerEvent) => {
      if (dragStateRef.current.pointerId !== event.pointerId) {
        return
      }

      resetDragState()
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
    }
  }, [])

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!position) {
      return
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: position,
      moved: false,
    }
  }

  const handleToggle = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false
      return
    }

    setIsOpen((value) => !value)
  }

  return (
    <div
      className="no-print fixed z-50"
      style={position ? { left: position.x, top: position.y } : { right: 16, top: 16 }}
    >
      {isOpen && (
        <div className="absolute right-full top-0 mr-2 w-[220px] rounded-2xl border-1 border-[rgba(79,134,223,0.4)] bg-card/92 p-3 shadow-[0_16px_28px_rgba(59,87,133,0.12)] backdrop-blur-md">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg border px-3 py-2 text-[12px] font-medium transition-colors ${
                  pathname === item.href
                    ? 'border-primary bg-primary/8 text-primary'
                    : 'border-transparent text-foreground hover:bg-accent'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="my-3 h-px bg-border" />
          {resumeId && (
            <Button
              variant="outline"
              className="mb-2 w-full justify-start text-[12px]"
              asChild
            >
              <Link href={`/preview/${resumeId}`} onClick={() => setIsOpen(false)}>
                <Eye className="size-4" />
                {dictionary.common.preview}
              </Link>
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            className="mb-3 w-full justify-start text-[12px]"
            onClick={handleDownload}
          >
            <Download className="size-4" />
            {dictionary.common.exportPdf}
          </Button>
          <LanguageSwitcher />
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        size="icon"
        className="relative size-11 touch-none rounded-full border-[rgba(79,134,223,0.24)] bg-white/96 text-primary shadow-[0_16px_30px_rgba(59,87,133,0.16),0_0_0_1px_rgba(79,134,223,0.08)] backdrop-blur-md transition-[transform,box-shadow,background-color] duration-200 ease-out hover:scale-[1.04] hover:bg-white hover:text-primary hover:shadow-[0_20px_36px_rgba(59,87,133,0.2),0_0_0_1px_rgba(79,134,223,0.12)]"
        onPointerDown={handlePointerDown}
        onClick={handleToggle}
      >
        <span className={`absolute inset-0 rounded-full ${isOpen ? '' : 'animate-pulse bg-[radial-gradient(circle,rgba(79,134,223,0.12)_0%,rgba(79,134,223,0.05)_45%,transparent_72%)]'}`} />
        <span className="relative z-10">
          {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </span>
        {!isOpen && <span className="absolute right-2 top-2 z-10 size-2 rounded-full bg-primary ring-2 ring-white" />}
      </Button>
    </div>
  )
}
