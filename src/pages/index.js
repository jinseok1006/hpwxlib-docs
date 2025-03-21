import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/getting-started/introduction">
            문서 보기
          </Link>
          <Link
            className="button button--secondary button--lg"
            href="https://github.com/your-org/hwpxlib">
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--12">
            <div className={styles.features}>
              <div className="container">
                <div className="row">
                  <div className="col col--12">
                    <h2>HWPXLib 소개</h2>
                    <p>
                      HWPXLib는 한글과컴퓨터의 HWPX 파일을 다루는 Java 라이브러리입니다.
                      이 라이브러리를 사용하면 HWPX 파일의 읽기, 쓰기, 수정이 가능하며,
                      다양한 문서 처리 기능을 제공합니다.
                    </p>
                    <div className={styles.buttons}>
                      <Link
                        className="button button--primary"
                        to="/getting-started/introduction">
                        자세히 알아보기
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
