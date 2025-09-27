/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://apostolicstudy.org',
  generateRobotsTxt: true,        // also creates /robots.txt
  sitemapSize: 5000,              // keeps files a reasonable size
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin', '/api*'],   // adjust as needed
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
};
