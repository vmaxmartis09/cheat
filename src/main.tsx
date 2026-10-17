import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

class RootErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; errorMsg: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, errorMsg: '' }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMsg: error?.message || 'Lỗi hiển thị giao diện' }
  }

  componentDidCatch(error: Error) {
    // Auto-reload once if Vite HMR or stale module error happens during live editing
    if (!sessionStorage.getItem('toeic_hmr_reloaded')) {
      sessionStorage.setItem('toeic_hmr_reloaded', '1')
      window.location.reload()
    } else {
      console.error('RootErrorBoundary caught error:', error)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-dvh flex flex-col items-center justify-center p-6 bg-[#FAF7F2] text-[#262320] text-center">
          <div className="max-w-sm bg-white p-5 rounded-2xl border border-[#E8DFD3] shadow-sm">
            <h2 className="text-sm font-black text-amber-900 mb-1.5">
              Giao diện vừa được cập nhật
            </h2>
            <p className="text-xs text-[#6B635B] mb-4">
              {this.state.errorMsg}
            </p>
            <button
              onClick={() => {
                sessionStorage.removeItem('toeic_hmr_reloaded')
                window.location.reload()
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer"
            >
              Tải lại trang
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

sessionStorage.removeItem('toeic_hmr_reloaded')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </React.StrictMode>,
)
