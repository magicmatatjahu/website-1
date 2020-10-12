import { useContext } from 'react'
import Head from 'next/head'
import AppContext from '../context/AppContext'
import ReactGA from 'react-ga'
import TagManager from 'react-gtm-module'

export default function HeadComponent({
  title,
  description = 'Open source tools to easily build and maintain your event-driven architecture. All powered by the AsyncAPI specification, the industry standard for defining asynchronous APIs.',
  image = '/img/social/card.png',
}) {
  const url = process.env.DEPLOY_PRIME_URL || process.env.DEPLOY_URL
  const { path = '' } = useContext(AppContext)
  const permalink = `${url}${path}`
  let type = 'website'
  if (path.startsWith('/docs') || path.startsWith('/blog')) type = 'article'
  if (!image.startsWith('http') && !image.startsWith('https')) image = `${url}${image}`
  const permTitle = 'AsyncAPI Initiative for event-driven APIs'
  title = title ? `${title} | ${permTitle}` : permTitle

  //enable google analytics
  if (typeof window !== 'undefined') {
    TagManager.initialize({gtmId: 'GTM-T58BTVQ'})
    ReactGA.initialize('UA-109278936-1')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="description" content={description} />
      <link rel="alternate" type="application/rss+xml" title="RSS Feed for AsyncAPI Initiative Blog" href="/rss.xml" />

      {/* Icons and webmanifest */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="194x194" href="/favicon-194x194.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#5bbbd5" />
      <meta name="msapplication-TileImage" content="/mstile-150x150.png" />
      <meta name="theme-color" content="#2b5797" />
      
      {/* Google / Search Engine Tags */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={image} />
      
      {/* Twitter Card data */}
      <meta name="twitter:card" value="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Open Graph data */}
      <meta property="og:title" content={title} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={permalink} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />

      <title>{title}</title>
    </Head>
  )
}
