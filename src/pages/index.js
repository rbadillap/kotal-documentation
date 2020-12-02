import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Cloud Native</>,
    // imageUrl: 'img/cloud_native.svg',
    description: (
      <>
        Kotal is built from the ground up using cloud native technologies to make it run on all clouds out of the box.
      </>
    ),
  },
  {
    title: <>Protocol Agnostic</>,
    // imageUrl: 'img/protocol_agnostic.svg',
    description: (
      <>
      Kotal supports both Ethereum and IPFS and will continue to support other Blockchain protocols like Ethereum 2.0 and Filecoin.
      </>
    ),
  },
  {
    title: <>Multi Client</>,
    // imageUrl: 'img/multi_client.svg',
    description: (
      <>
        Kotal starts with protocol reference clients and continue to support other clients to make it easy for Blockchain node operators to run multi-client Blockchain infrastructure.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={siteConfig.tagline}
      description="Opensource multi-client cloud-agnostic blockchain infrastructure deployer that makes it easy to deploy highly available, self-managing, self-healing Blockchain infrastructure like networks, nodes, beacon nodes, validator nodes on any cloud.">
      <header className={clsx('hero', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--success button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>

            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to="https://calendly.com/kotal/30min">
              Schedule a Call
            </Link>
          </div>
          <div className="hero__subtitle backing">
            <span className="backed">Backed by <a href="https://consensys.net/">ConsenSys</a>, <a href="https://protocol.ai/">Protocol Labs</a> and <a href="https://filecoin.io/">FileCoin</a> </span>
            <img className="backers" src='img/backed_by.svg' title="backed by" />
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
