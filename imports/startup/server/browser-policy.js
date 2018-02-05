/**
 * Browser Policy
 * Set security-related policies to be enforced by newer browsers.
 * These policies help prevent and mitigate common attacks like cross-site scripting and clickjacking.
 */

// allowed scripts (add urls and uncomment)
let allowScriptOrigin = [''];
// allowScriptOrigin.forEach(o => BrowserPolicy.content.allowScriptOrigin(o));

// // allowed styles (add urls and uncomment)
let allowStyleOrigin = [''];
// allowStyleOrigin.forEach(o => BrowserPolicy.content.allowStyleOrigin(o));

// allowed images
let allowImageOrigin = ['via.placeholder.com'];
allowImageOrigin.forEach(o => BrowserPolicy.content.allowImageOrigin(o));
