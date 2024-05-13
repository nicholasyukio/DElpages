import React, { useState, useEffect } from 'react';
import {getSession} from './greeting';
import Cookies from 'js-cookie';

let eventsArray = [];

export async function getCurrentTimeFromWorldTimeAPI() {
  try {
      const response = await fetch('https://worldtimeapi.org/api/ip');
      const data = await response.json();
      return data.utc_datetime;
  } catch (error) {
      console.error('Error fetching current time from WorldTimeAPI:', error);
      return null;
  }
}

export const logEvent = (eventName, eventData) => {
    eventsArray.push({ eventName, eventData});
    // console.log(eventsArray);
};

export const SectionTracker = ({ sectionId }) => {
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
        if (timeSpent < 31000000000) {
            logEvent('TimeSpent', `${timeSpent} milliseconds spent in ${sectionId}`);
        }
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

// Function to send events to API
export const sendEventsToAPI = async () => {
    // Log endTime before sending
    const endDate = await getCurrentTimeFromWorldTimeAPI();
    logEvent('endTime', endDate);
    // Send eventsArray to API via POST request
    let response = await fetch('https://api.dominioeletrico.com.br/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(eventsArray),
    });
    let result = await response.json();
    /* if (result.status === 'success') {
        console.log("Send Events to API Success");
    } else if (result.status === 'fail') {
        console.log("Send Events to API Fail");
    } */
};

export const saveDesiteEventInDB = (event_name, video_id) => {
  const cookie_id = Cookies.get('uid');
  const currentURL = window.location.href;
  getSession()
    .then((session) => {
        const eventData = {
          event_name: event_name,
          user_id: "",
          cookie_id: cookie_id,
          page_full_url: currentURL,
          video_id: video_id
        };
      if (session) {
        const { accessToken } = session;
        eventData.user_id = accessToken.payload.username;
      }
      fetch('https://api.dominioeletrico.com.br/desiteevent/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // console.log('Saved event in DB:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    })
    .catch(error => {
      console.error('Error:', error);
    });
};