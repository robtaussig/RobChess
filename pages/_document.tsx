import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
        <Html lang="en">
            <Head>
              <meta name='application-name' content='RobChess' />
              <meta name='apple-mobile-web-app-capable' content='yes' />
              <meta name='apple-mobile-web-app-status-bar-style' content='default' />
              <meta name='apple-mobile-web-app-title' content='RobChess' />
              <meta name='description' content='Best Chess app in the world' />
              <meta name='format-detection' content='telephone=no' />
              <meta name='mobile-web-app-capable' content='yes' />
              <meta name='msapplication-config' content='/static/icons/browserconfig.xml' />
              <meta name='msapplication-TileColor' content='#2B5797' />
              <meta name='msapplication-tap-highlight' content='no' />
              <meta name='theme-color' content='#000000' />
                        
              <link rel='apple-touch-icon' sizes='180x180' href='/static/icons/apple-touch-icon.png' />
              <link rel='icon' type='image/png' sizes='32x32' href='/static/icons/favicon-32x32.png' />
              <link rel='icon' type='image/png' sizes='16x16' href='/static/icons/favicon-16x16.png' />
              <link rel='manifest' href='/static/manifest.json' />
              <link rel='mask-icon' href='/static/icons/safari-pinned-tab.svg' color='#5bbad5' />
              <link rel='shortcut icon' href='/static/icons/favicon.ico' />

              <meta property='og:type' content='website' />
              <meta property='og:title' content='RobChess' />
              <meta property='og:description' content='Best Chess app in the world' />
              <meta property='og:site_name' content='RobChess' />
              <meta property='og:url' content='https://robtaussig.com' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
  }
}

export default MyDocument
