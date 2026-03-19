import React, { createContext, useContext, useState, useCallback } from 'react'
import { MOCK_HISTORY, MOCK_USER, generateMockMinutes } from '../data/mockData'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [history, setHistory] = useState(MOCK_HISTORY)
  const [generatedResult, setGeneratedResult] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeModal, setActiveModal] = useState(null)

  const login = useCallback((email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 4) {
          setUser({ ...MOCK_USER, email })
          resolve(true)
        } else {
          reject(new Error('Invalid credentials'))
        }
      }, 1200)
    })
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setGeneratedResult(null)
  }, [])

  const generateMinutes = useCallback((input) => {
    return new Promise((resolve) => {
      setIsGenerating(true)
      setGeneratedResult(null)
      setTimeout(() => {
        const result = generateMockMinutes(input)
        setGeneratedResult(result)
        setHistory((prev) => [result, ...prev])
        setIsGenerating(false)
        resolve(result)
      }, 2800)
    })
  }, [])

  const openModal = useCallback((meeting) => {
    setActiveModal(meeting)
  }, [])

  const closeModal = useCallback(() => {
    setActiveModal(null)
  }, [])

  return (
    <AppContext.Provider
      value={{
        user,
        history,
        generatedResult,
        isGenerating,
        activeModal,
        login,
        logout,
        generateMinutes,
        openModal,
        closeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}