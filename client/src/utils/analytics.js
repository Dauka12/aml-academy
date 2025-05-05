import ReactGA from 'react-ga4';

// Track custom events
export const trackEvent = (category, action, label, value) => {
    ReactGA.event({
        category,
        action,
        label,
        value
    });
};

// Track user interactions
export const trackUserInteraction = (action, label = null) => {
    trackEvent('User Interaction', action, label);
};

// Track content views beyond page views
export const trackContentView = (contentName, contentType) => {
    trackEvent('Content View', contentType, contentName);
};

// Track form submissions
export const trackFormSubmission = (formName, success = true) => {
    trackEvent('Form', success ? 'Submit Success' : 'Submit Failure', formName);
};

// Track errors
export const trackError = (errorMessage, errorContext) => {
    trackEvent('Error', errorContext, errorMessage);
};

export default {
    trackEvent,
    trackUserInteraction,
    trackContentView,
    trackFormSubmission,
    trackError
};
