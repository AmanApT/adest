import React from "react";
import "@/components/landingpage/About.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const AboutUs = () => {
  const iconStyle = {
    fontSize: "68px",
  };
  return (
    <div id="contact" className="about-us-container">
      <div className="about-us-left">
        <h1 className="about-us-heading">What is Adest ? </h1>
        <p>
          Adest is a product developed by Credhill, a company founded by Aman
          Pathak and Anupreet Srivastava. This innovative product is a result of
          their collaborative efforts, expertise, and vision. We
          have brought their unique skills and perspectives together to
          conceptualize, design, and create Adest, aiming to provide a solution
          that meets the needs of its users.
        </p>
      </div>
      <div className="about-us-right">
        <div className="about-us-profiles">
          <AccountCircleIcon style={iconStyle} />
          <p>Aman Pathak</p>
          Email: amanasstudent@gmail.com
          <div className="socials">
            <a href="https://twitter.com/Aman__Ap">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="https://github.com/AmanApT">
              <GitHubIcon fontSize="large" />
            </a>
            <a
              href="https://www.linkedin.com/in/aman-pathak-original/
            "
            >
              <LinkedInIcon fontSize="large" />
            </a>
          </div>
        </div>
        <div className="about-us-profiles">
          <AccountCircleIcon style={iconStyle} />
          <p>Anupreet Srivastava</p>
          Email : anupreet.2003@gmail.com
          <div className="socials">
            <a href="https://twitter.com/Aman__Ap">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="https://github.com/AmanApT">
              <GitHubIcon fontSize="large" />
            </a>
            <a
              href="https://www.linkedin.com/in/aman-pathak-original/
            "
            >
              <LinkedInIcon fontSize="large" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
