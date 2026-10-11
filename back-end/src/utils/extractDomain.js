/**
 * Extracts clean domain name from a URL or link string.
 * Examples:
 *   "https://facebook.com"        -> "facebook.com"
 *   "facebook.com"                -> "facebook.com"
 *   "https://www.facebook.com/x"  -> "facebook.com"
 *   "http://sub.domain.com?q=1"   -> "sub.domain.com"
 */
export const extractDomain = (url) => {
    if (!url || typeof url !== 'string') return '';
    try {
        const trimmed = url.trim();
        const formattedUrl = trimmed.includes('://') ? trimmed : `https://${trimmed}`;
        const parsed = new URL(formattedUrl);
        let hostname = parsed.hostname.toLowerCase();
        if (hostname.startsWith('www.')) {
            hostname = hostname.slice(4);
        }
        return hostname;
    } catch {
        return url
            .replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
            .split('/')[0]
            .split('?')[0]
            .split('#')[0]
            .toLowerCase()
            .trim();
    }
};
