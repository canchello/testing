import React from 'react'
import CustomButton from './CustomButton'
import AppLogo from './Logo'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.component = props.componentName || ''
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    console.info(`NKS Logs error static :>> `, error)
    return { hasError: true }
  }
  componentDidCatch(error, info) {
    // Handle the error, e.g., log it or display a user-friendly message
    this.setState({ hasError: true })
  }
  render() {
    if (this.state.hasError) {
      // Display a user-friendly error message
      return (
        <div className='flex flex-col items-center justify-center h-screen w-screen'>
          <div>
            <AppLogo className='invert-1' />
          </div>
          <div className='my-4'>Something Went Wrong. Please try again.</div>
          <div className='my-4'>Error in component: {this.component}</div>
          <CustomButton outline className='px-5' onClick={() => this.setState({ hasError: false })} title='Try Again' />
        </div>
      )
    }
    // Render the child components normally
    return this.props.children
  }
}

export default ErrorBoundary
