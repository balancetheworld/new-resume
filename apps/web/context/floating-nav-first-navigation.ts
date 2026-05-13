"use client"

import { createContext, createElement, useContext, useMemo, useState, type ReactNode } from 'react'

export const FLOATING_NAV_FIRST_NAVIGATION_KEY = 'floating-nav-first-navigation'

export interface FloatingNavFirstNavigationState {
  isOpen: boolean
}

export const floatingNavFirstNavigationDefaultState: FloatingNavFirstNavigationState = {
   isOpen: true,
}

export interface FloatingNavFirstNavigationContextValue extends FloatingNavFirstNavigationState {
  setIsOpen: (value: boolean) => void
}

export const FloatingNavFirstNavigationContext = createContext<FloatingNavFirstNavigationContextValue | null>(null)

export function FloatingNavFirstNavigationProvider({ children }: { children: ReactNode }) {
  const [ isOpen, setIsOpen] = useState(floatingNavFirstNavigationDefaultState. isOpen)

  const value = useMemo(
    () => ({
       isOpen,
      setIsOpen,
    }),
    [isOpen]
  )

  return createElement(FloatingNavFirstNavigationContext.Provider, { value }, children)
}

export function useFloatingNavFirstNavigationContext() {
  const context = useContext(FloatingNavFirstNavigationContext)

  if (!context) {
    throw new Error('useFloatingNavFirstNavigationContext must be used within FloatingNavFirstNavigationProvider')
  }

  return context
}
