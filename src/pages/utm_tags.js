const extractUTMTags = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const utmTags = {};
    utmTags.utm_source = urlParams.get('utm_source') || '';
    utmTags.utm_medium = urlParams.get('utm_medium') || '';
    utmTags.utm_campaign = urlParams.get('utm_campaign') || '';
    utmTags.utm_term = urlParams.get('utm_term') || '';
    utmTags.utm_content = urlParams.get('utm_content') || '';
    utmTags.email = urlParams.get('email') || '';
    utmTags.redirect = urlParams.get('redirect') || '';
    utmTags.nam = urlParams.get('nam') || '';
    return utmTags;
  };

export { extractUTMTags };