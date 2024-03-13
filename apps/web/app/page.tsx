import Button from '@imgeozi/design-system/components/Button/Button';
import styles from './page.module.css';

const LINKS = [
  {
    title: 'Docs',
    href: 'https://turbo.build/repo/docs',
    description: 'Find in-depth information about Turborepo features and API.',
  },
  {
    title: 'Learn',
    href: 'https://turbo.build/repo/docs/handbook',
    description: 'Learn more about monorepos with our handbook.',
  },
  {
    title: 'Templates',
    href: 'https://turbo.build/repo/docs/getting-started/from-example',
    description: 'Choose from over 15 examples and deploy with a single click.',
  },
  {
    title: 'Deploy',
    href: 'https://vercel.com/new',
    description:
      'Instantly deploy your Turborepo to a shareable URL with Vercel.',
  },
];

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <Button />
      <div className={styles.grid}>
        {LINKS.map(({ description }) => (
          <p>{description}</p>
        ))}
      </div>
    </main>
  );
}
