import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description }) => {
    const siteTitle = 'Arvind Natarajan | AI Engineer & Full Stack Developer';
    const defaultDescription = 'Portfolio of Arvind Natarajan, an AI Engineer and Full Stack Developer.';

    return (
        <Helmet>
            <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta property="og:title" content={title || siteTitle} />
            <meta property="og:description" content={description || defaultDescription} />
        </Helmet>
    );
};

export default SEO;
