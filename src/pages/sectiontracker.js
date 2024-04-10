import React, { useState, useEffect } from 'react';

const SectionTracker = ({ sectionId }) => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setStartTime(new Date());
        } else {
          setEndTime(new Date());
        }
      });
    });

    const section = document.querySelector(`#${sectionId}`);
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [sectionId]);

  useEffect(() => {
    if (endTime) {
      const timeSpent = endTime - startTime;
      console.log(`Time spent in section ${sectionId}: ${timeSpent} milliseconds`);
      // Perform any other actions with the time spent
      // setStartTime(null); 
      // setEndTime(null); 
    }
  }, [endTime, sectionId]);

  return (
    <section id={sectionId}>
      {/* Section content */}
    </section>
  );
};

export default SectionTracker;
