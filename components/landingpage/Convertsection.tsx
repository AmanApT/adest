import Link from "next/link";
import CardContent from "./Cardcontent";
import Eachconvertcard from "./Eachconvertcard";
import "@/components/landingpage/Convertsection.css";

const Convertsection = () => {
  return (
    <section className="convert-section">
      {CardContent.map((i, id) => (
        <Link
          href={`/convert/${i.title.split(" ").join("").toLowerCase()}`}
          key={id}
          style={{ textDecoration: "none" }}
        >
          <Eachconvertcard
            title={i.title}
            description={i.description}
            img={i.img}
            svgLink={i.svgLink}
          />
        </Link>
      ))}
    </section>
  );
};

export default Convertsection;
