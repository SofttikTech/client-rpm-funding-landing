// Reason: single place to swap the client lead form link and contact details.
export const FORM_URL = 'https://app.sellagent.ai/f/fa9674dbd3406c74';
export const PHONE_DISPLAY = '(786) 778-0347';
export const PHONE_HREF = 'tel:+17867780347';
export const WEBSITE_URL = 'https://rpmfundingco.com/';
export const DISCLAIMER_URL = 'https://rpmfundingco.com/disclaimer';

// Auto-open popup: opens once after the delay, then stays quiet for the cooldown. Add ?popup=always to the URL to test it on every load.
export const AUTO_OPEN_DELAY_MS = 8000;
export const AUTO_OPEN_COOLDOWN_MS = 24 * 60 * 60 * 1000;
export const AUTO_OPEN_ON_MOBILE = false;
export const AUTO_OPEN_STORAGE_KEY = 'rpm-popup-shown-at';

// Popup form preload: the form frame loads in the background this long after the page loads, so the popup opens instantly.
export const PRELOAD_DELAY_MS = 1200;
