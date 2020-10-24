import { FC } from 'react';
import Head from 'next/head';
import styles from './styles.module.scss';
import cn from 'classnames';

export interface LayoutProps {
  children: React.ReactNode;
  home?: boolean;
  title: string;
  className?: string;
};

export const Layout: FC<LayoutProps> = ({
  children,
  home,
  className,
  title = 'Rob Taussig',
}) => {
  return (
    <div className={cn(styles.container, className)}>
      <Head>
        <meta name="robots" content="NOODP"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, minimal-ui"/>
        <meta name="theme-color" content="#000000"/>
        <meta name="Description" content="Author: Rob Taussig, Occupation: Software Engineer, Location: New York City"/>
        <link rel="shortcut icon" href="favicon.ico"/>
        <link href='https://fonts.googleapis.com/css2?family=Oxanium:wght@400;600;800&display=swap' rel="stylesheet"/>
        <title>Rob Taussig</title>
        <script src='https://kit.fontawesome.com/a076d05399.js'/>
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: `{
            "@context": "http://schema.org",
            "@type": "Person",
            "url": "https://robtaussig.com",
            "name": "Robert Taussig",
            "jobTitle": "Assistant Vice President, Programmer, Global Markets",
            "worksFor": "Bank of America",
            "description": "Fullstack Web Developer, with a focus on React/Redux",
            "nationality": "United States"
          }` }}
        />
          <title>{title}</title>
        </Head>
        {children}
    </div>
  )
}

export default Layout;
