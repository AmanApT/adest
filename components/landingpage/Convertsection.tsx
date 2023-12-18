import CardContent from "./Cardcontent";
import Eachconvertcard from "./Eachconvertcard";
import "@/components/landingpage/Convertsection.css";

const Convertsection = () => {
  return (
    <section className="convert-section">
      {CardContent.map((i, id) => (
        <Eachconvertcard
          key={id}
          title={i.title}
          description={i.description}
          img={i.img}
          svgLink={i.svgLink}
        />
      ))}
    </section>
  );
};

export default Convertsection;
