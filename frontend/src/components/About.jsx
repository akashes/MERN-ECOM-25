import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../componentStyles/About.css";
import Navbar from "./Navbar";
import PageTitle from "./PageTitle";
import Footer from "./Footer";

export const About = () => {
  return (
   <>
   <Navbar/>
   <PageTitle title="About"/>
    <section className="about-section">
      <div className="about-container">
        {/* Header */}
        <div className="about-header">
          <h2>About Our Journey</h2>
          <p>
            We believe in creating meaningful experiences that connect people and drive innovation. 
            Our passion lies in building solutions that make a real difference in the world.
          </p>
        </div>

        {/* Main Content */}
        <div className="about-grid">
          {/* Left */}
          <div className="about-left">
            <div className="about-card">
              <h3>
                <PersonIcon className="icon" fontSize="medium" />
                Our Story
              </h3>
              <p>
                Founded with a vision to bridge the gap between technology and human needs, 
                we started as a small team of passionate individuals who believed that great 
                software should be both powerful and accessible.
              </p>
              <p>
                Today, we continue to push boundaries and challenge conventional thinking, 
                always keeping our users at the heart of everything we do.
              </p>
            </div>

            <div className="about-card">
              <h3>
                <TrackChangesIcon className="icon" fontSize="medium" />
                Our Mission
              </h3>
              <p>
                To empower individuals and organizations with innovative solutions that 
                simplify complex challenges, foster creativity, and drive sustainable growth 
                in an ever-evolving digital landscape.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="about-right">
            <div className="about-card">
              <h3>
                <FavoriteIcon className="icon" fontSize="medium" />
                Our Values
              </h3>
              <ul className="values-list">
                <li><span></span><strong>Innovation:</strong> Continuously pushing the boundaries of what's possible</li>
                <li><span></span><strong>Quality:</strong> Delivering excellence in every detail</li>
                <li><span></span><strong>Collaboration:</strong> Building stronger solutions together</li>
                <li><span></span><strong>Impact:</strong> Creating meaningful change in communities</li>
              </ul>
            </div>

            <div className="about-card">
              <h3>
                <EmojiEventsIcon className="icon" fontSize="medium" />
                By the Numbers
              </h3>
              <div className="stats-grid">
                <div className="stat">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Projects Completed</div>
                </div>
                <div className="stat">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Team Members</div>
                </div>
                <div className="stat">
                  <div className="stat-number">5</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="about-cta">
          <h3>Ready to Work Together?</h3>
          <p>
            Let's discuss how we can help bring your vision to life. 
            We're always excited to take on new challenges and create something amazing.
          </p>
          <button className="cta-button">Get In Touch</button>
        </div>
      </div>
    </section>
    <Footer/>
   </>
  );
};


export default About