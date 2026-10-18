import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import { I18nProvider } from './i18n';
import './styles/globals.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find root element with id "root"');
}

createRoot(rootElement).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
);
