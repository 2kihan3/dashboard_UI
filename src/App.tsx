import { useEffect, useState } from 'react'
import './App.css'
import Landing from './Landing'
import AppShell from './AppShell'

// 兼容 Landing 上现有的「数据看板」链接 (#workbench)，进入 AppShell 后默认显示 chatbot
const appEntryHashes = new Set(['#chatbot', '#dashboard', '#tasks', '#skills', '#provenance', '#admin', '#merchant', '#workbench'])

function isAppHash() {
  return appEntryHashes.has(window.location.hash)
}

function App() {
  const [inApp, setInApp] = useState(isAppHash)

  useEffect(() => {
    const handleHashChange = () => setInApp(isAppHash())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return inApp ? <AppShell /> : <Landing />
}

export default App
