import React from 'react';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Here you could also log to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      const { isKazakh = false, fallback } = this.props;
      
      // Custom fallback UI if provided
      if (fallback) {
        return fallback(this.state.error, this.handleRetry);
      }

      // Default error UI
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {isKazakh ? 'Қате орын алды' : 'Произошла ошибка'}
          </h2>
          
          <p className="text-gray-600 mb-6 max-w-md">
            {isKazakh 
              ? 'Кешіріңіз, бір нәрсе дұрыс жұмыс істемеді. Қайталап көріңіз немесе бетті жаңартыңыз.'
              : 'Извините, что-то пошло не так. Попробуйте еще раз или обновите страницу.'
            }
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={this.handleRetry}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowPathIcon className="w-4 h-4 mr-2" />
              {isKazakh ? 'Қайталау' : 'Повторить'}
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {isKazakh ? 'Бетті жаңарту' : 'Обновить страницу'}
            </button>
          </div>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-6 text-left w-full max-w-2xl">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                {isKazakh ? 'Техникалық мәліметтер' : 'Техническая информация'}
              </summary>
              <div className="mt-2 p-4 bg-gray-100 rounded-lg text-xs text-gray-700 font-mono overflow-auto">
                <div className="mb-2">
                  <strong>Error:</strong> {this.state.error.toString()}
                </div>
                <div>
                  <strong>Stack trace:</strong>
                  <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                </div>
              </div>
            </details>
          )}
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
