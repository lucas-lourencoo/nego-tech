import styles from "./styles.module.css";

type SectionHeadingProps = {
  id: string;
  index: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  id,
  index,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className={styles.sectionHeading}>
      <p className={styles.sectionIndex}>{index}</p>
      <div>
        <h1 id={id}>{title}</h1>
        {description && <span>{description}</span>}
      </div>
    </div>
  );
}
