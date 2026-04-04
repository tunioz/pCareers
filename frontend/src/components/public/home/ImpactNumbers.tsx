import styles from './ImpactNumbers.module.scss';

const stats = [
  { number: '24 M +', label: 'Users worldwide' },
  { number: '500 +', label: 'Petabytes stored' },
  { number: '13 +', label: 'Years of excellence' },
  { number: '99.9%', label: 'Uptime' },
  { number: '175 +', label: 'Countries' },
];

export function ImpactNumbers() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.item}>
            <div className={styles.number}>{stat.number}</div>
            <div className={styles.label}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
