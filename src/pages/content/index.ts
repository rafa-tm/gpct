console.log('GPCT: content script loaded');

/**
 * @description
 * Chrome extensions don't support modules in content scripts.
 */
import('@pages/content/components/MeetButton');
import('@pages/content/components/MeetPanel');
