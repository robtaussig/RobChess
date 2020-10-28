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
              <meta name='msapplication-TileColor' content='#2B5797' />
              <meta name='msapplication-tap-highlight' content='no' />
              <meta name='theme-color' content='#000000' />
                        
              <link rel='manifest' href='/manifest.json' />

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
