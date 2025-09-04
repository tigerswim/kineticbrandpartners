'use client'

import { useState, useRef, useCallback, useEffect, ReactNode } from 'react'
import { ChevronUp, ChevronDown, X } from 'lucide-react'

interface BottomSheetProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  title?: string
  className?: string
  snapPoints?: number[] // Heights in pixels
  defaultSnap?: number // Index of snapPoints
  showHandle?: boolean
}

type SheetState = 'closed' | 'peek' | 'half' | 'full'

export default function BottomSheet({
  children,
  isOpen,
  onClose,
  title,
  className = '',
  snapPoints = [100, 300, 600], // Default: peek, half, full
  defaultSnap = 1, // Default to half
  showHandle = true
}: BottomSheetProps) {
  const [sheetState, setSheetState] = useState<SheetState>('closed')
  const [currentHeight, setCurrentHeight] = useState(snapPoints[defaultSnap])
  const [isDragging, setIsDragging] = useState(false)
  const sheetRef = useRef<HTMLDivElement>(null)
  const startYRef = useRef<number>(0)
  const startHeightRef = useRef<number>(0)

  // Handle open/close state changes
  useEffect(() => {
    if (isOpen) {
      setSheetState(defaultSnap === 0 ? 'peek' : defaultSnap === 1 ? 'half' : 'full')
      setCurrentHeight(snapPoints[defaultSnap])
    } else {
      setSheetState('closed')
    }
  }, [isOpen, defaultSnap, snapPoints])

  // Handle drag start
  const startDrag = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    startYRef.current = clientY
    startHeightRef.current = currentHeight
  }, [currentHeight])

  // Handle drag move
  const handleDrag = useCallback((e: TouchEvent | MouseEvent) => {
    if (!isDragging) return

    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    const deltaY = startYRef.current - clientY // Negative when dragging up
    const newHeight = Math.max(0, startHeightRef.current + deltaY)
    
    setCurrentHeight(newHeight)
  }, [isDragging])

  // Handle drag end - snap to nearest point
  const stopDrag = useCallback(() => {
    if (!isDragging) return
    
    setIsDragging(false)

    // Find closest snap point
    let closestSnapIndex = 0
    let minDistance = Math.abs(currentHeight - snapPoints[0])
    
    snapPoints.forEach((snap, index) => {
      const distance = Math.abs(currentHeight - snap)
      if (distance < minDistance) {
        minDistance = distance
        closestSnapIndex = index
      }
    })

    // Snap to closest point or close if dragged down enough
    if (closestSnapIndex === 0 && currentHeight < snapPoints[0] * 0.5) {
      onClose()
    } else {
      setCurrentHeight(snapPoints[closestSnapIndex])
      setSheetState(closestSnapIndex === 0 ? 'peek' : closestSnapIndex === 1 ? 'half' : 'full')
    }
  }, [isDragging, currentHeight, snapPoints, onClose])

  // Touch event handlers
  useEffect(() => {
    if (isDragging) {
      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault() // Prevent scroll
        handleDrag(e)
      }
      
      const handleMouseMove = (e: MouseEvent) => {
        handleDrag(e)
      }

      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('touchend', stopDrag)
      document.addEventListener('mouseup', stopDrag)

      return () => {
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('touchend', stopDrag)
        document.removeEventListener('mouseup', stopDrag)
      }
    }
  }, [isDragging, handleDrag, stopDrag])

  // Handle backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }, [onClose])

  // Quick action handlers
  const expandToFull = useCallback(() => {
    setCurrentHeight(snapPoints[snapPoints.length - 1])
    setSheetState('full')
  }, [snapPoints])

  const collapseToHalf = useCallback(() => {
    setCurrentHeight(snapPoints[1] || snapPoints[0])
    setSheetState(snapPoints[1] ? 'half' : 'peek')
  }, [snapPoints])

  if (!isOpen && sheetState === 'closed') return null

  const maxHeight = window.innerHeight * 0.9
  const clampedHeight = Math.min(currentHeight, maxHeight)

  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={handleBackdropClick}
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className={`
          fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50
          transition-all duration-300 ease-out
          ${isDragging ? 'transition-none' : ''}
          ${className}
        `}
        style={{
          height: `${clampedHeight}px`,
          transform: isOpen ? 'translateY(0)' : `translateY(100%)`,
        }}
      >
        {/* Drag Handle */}
        {showHandle && (
          <div
            className="flex flex-col items-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
            onTouchStart={startDrag}
            onMouseDown={startDrag}
          >
            {/* Visual handle */}
            <div className="w-12 h-1 bg-slate-300 rounded-full mb-2" />
            
            {/* Quick action buttons */}
            <div className="flex items-center space-x-4 text-slate-400">
              {sheetState !== 'full' && (
                <button
                  onClick={expandToFull}
                  className="p-1 hover:text-slate-600 transition-colors"
                  title="Expand to full"
                >
                  <ChevronUp size={16} />
                </button>
              )}
              {sheetState === 'full' && (
                <button
                  onClick={collapseToHalf}
                  className="p-1 hover:text-slate-600 transition-colors"
                  title="Collapse"
                >
                  <ChevronDown size={16} />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1 hover:text-slate-600 transition-colors"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        {title && (
          <div className="px-4 py-2 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
              {!showHandle && (
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-auto px-4 py-4" style={{ 
          maxHeight: `${clampedHeight - (showHandle ? 60 : 0) - (title ? 60 : 0)}px` 
        }}>
          <div className="min-h-full">
            {children}
          </div>
        </div>

        {/* Safe area spacer for devices with home indicator */}
        <div className="pb-safe" />
      </div>
    </>
  )
}