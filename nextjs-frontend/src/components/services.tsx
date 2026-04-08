type ServicesProps = {
  jobTypes?: string[];
};

const fallbackJobTypes = [
  "Plumbing fixes",
  "Electrical repairs",
  "Furniture assembly",
  "Yard work",
  "Painting",
  "General Maintenance",
];

export default function Services({ jobTypes }: ServicesProps) {
  const items = jobTypes && jobTypes.length > 0 ? jobTypes : fallbackJobTypes;

  return (
    <section className="box">
      <div className="box-header">Popular Job Types</div>
      <div className="box-content">
        <ul className="services-grid">
          {items.map((type) => (
            <li key={type}>{type}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
