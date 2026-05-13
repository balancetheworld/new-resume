'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/site/language-switcher'
import { useI18n } from '@/lib/i18n/context'
import { ArrowLeft, Download, Eye, GripVertical, Menu, X } from 'lucide-react'
import  { useFloatingNavFirstNavigationContext } from '../../context/floating-nav-first-navigation'
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
  variant?: 'site' | 'editor' | 'preview'
}

const FLOATING_MENU_SIZE = 268

export function FloatingWorkspaceMenu({ resumeId, variant = 'site' }: FloatingWorkspaceMenuProps) {
  const { dictionary } = useI18n()
  const pathname = usePathname()
  const {isOpen, setIsOpen} = useFloatingNavFirstNavigationContext()
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
  ] as const

  const handleDownload = () => {
    window.print()
  }

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const isEditorArea = pathname === '/' || pathname.startsWith('/editor') || pathname.startsWith('/preview')
  const isEditorVariant = variant === 'editor'

  const isActive = (href: string) => {
    if (href === '/') {
      return isEditorArea
    }

    return pathname === href || pathname.startsWith(`${href}/`)
  }

  useEffect(() => {
    const savedPosition = window.localStorage.getItem(FLOATING_MENU_POSITION_KEY)

    if (!savedPosition) {
      setPosition({
        x: window.innerWidth - FLOATING_MENU_SIZE - 16,
        y: 16,
      })
      return
    }

    try {
      const parsed = JSON.parse(savedPosition) as Position
      const maxX = Math.max(16, window.innerWidth - FLOATING_MENU_SIZE - 16)
      const maxY = Math.max(16, window.innerHeight - FLOATING_MENU_SIZE - 16)

      setPosition({
        x: Math.min(maxX, Math.max(16, parsed.x)),
        y: Math.min(maxY, Math.max(16, parsed.y)),
      })
    } catch {
      setPosition({
        x: window.innerWidth - FLOATING_MENU_SIZE - 16,
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

        const maxX = Math.max(16, window.innerWidth - FLOATING_MENU_SIZE - 16)
        const maxY = Math.max(16, window.innerHeight - FLOATING_MENU_SIZE - 16)

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

      const maxX = Math.max(16, window.innerWidth - FLOATING_MENU_SIZE - 16)
      const maxY = Math.max(16, window.innerHeight - FLOATING_MENU_SIZE - 16)

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

  const handleHeaderClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false
      return
    }
  }

  const handleBallClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false
      return
    }

    handleOpen()
  }

  return (
    <div
      className="no-print fixed z-50"
      style={position ? { left: position.x, top: position.y } : { right: 0, top: 0 }}
    >
      <div className={`relative ${isEditorVariant ? 'h-[245px] w-[252px]' : 'h-[220px] w-[236px]'}`}>
        <div
          className={`absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-[rgba(79,134,223,0.24)] bg-card/92 shadow-[0_14px_28px_rgba(59,87,133,0.16),0_0_0_1px_rgba(79,134,223,0.06)] backdrop-blur-md transition-all duration-300 ease-out ${
            isOpen ? 'pointer-events-auto translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-2 scale-95 opacity-0'
          }`}
        >
          <div className="flex h-9 items-center justify-between border-b border-white/60 px-3">
            <button
              type="button"
              className="flex items-center gap-1 text-[11px] font-medium text-primary"
              onPointerDown={handlePointerDown}
            >
              <GripVertical className="size-3.5" />
              <span>移动</span>
            </button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-7 rounded-full text-primary hover:bg-primary/10 hover:text-primary"
              onClick={handleClose}
            >
              <X className="size-4" />
            </Button>
          </div>

          <div className={`flex flex-1 flex-col gap-2 ${isEditorVariant ? 'p-2' : 'p-2.5'}`}>
            <div className='grid gap-2 grid-cols-2 '>
              {navItems.map((item, index) => {
                const active = isActive(item.href)

                return (
                  <Button
                    key={item.href}
                    variant={active ? 'default' : 'outline'}
                    asChild
                    className={`h-11 justify-start rounded-2xl px-3 py-2 text-left shadow-none ${
                      active ? 'bg-primary text-primary-foreground hover:bg-primary' : ''
                    }`}
                  >
                    <Link href={item.href}>
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/15 text-[10px] font-semibold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] font-medium leading-none">{item.label}</span>
                    </Link>
                  </Button>
                )
              })}
            </div>

            <div className={`mt-auto ${isEditorVariant ? 'space-y-3' : 'space-y-1'}`}>
              <div className={`rounded-2xl border border-dashed border-[rgba(79,134,223,0.2)] bg-background/70 ${isEditorVariant ? 'p-1' : 'p-2'}`}>
                <LanguageSwitcher />
              </div>

              {variant !== 'site' && resumeId && (
                <div className='grid gap-2 grid-cols-2 '>
                  {variant === 'editor' ? (
                    <Button variant="outline" asChild className="h-7 rounded-xl px-2 text-[11px] shadow-none">
                      <Link href={`/preview/${resumeId}`}>
                        <Eye className="size-3.5" />
                        {dictionary.common.preview}
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="outline" asChild className="h-8 rounded-xl text-[12px] shadow-none">
                      <Link href={`/editor/${resumeId}`}>
                        <ArrowLeft className="size-3" />
                        {dictionary.editor.backToEditor}
                      </Link>
                    </Button>
                  )}

                  <Button
                    type="button"
                    variant="outline"
                    className={`h-7 rounded-xl px-2 text-[11px] shadow-none ${variant === 'editor' ? '' : ''}`}
                    onClick={handleDownload}
                  >
                    <Download className="size-3" />
                    {dictionary.common.exportPdf}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out ${
            isOpen ? 'pointer-events-none translate-y-2 scale-75 opacity-0' : 'pointer-events-auto translate-y-0 scale-100 opacity-100'
          }`}
        >
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-12 rounded-full border-primary bg-primary text-white shadow-[0_14px_28px_rgba(59,87,133,0.16),0_0_0_1px_rgba(79,134,223,0.08)] backdrop-blur-md transition-transform duration-300 ease-out hover:scale-105 hover:bg-primary hover:text-white"
            onPointerDown={handlePointerDown}
            onClick={handleBallClick}
          >
            <Menu className="size-5 text-white" />
          </Button>
        </div>
      </div>
    </div>
  )
}
