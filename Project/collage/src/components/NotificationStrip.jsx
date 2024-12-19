import React, { useState, useEffect } from "react";

const NotificationStrip = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentNotification, setCurrentNotification] = useState(0);

  // Fetch notifications from the backend every 5 seconds
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://localhost:5000/notifications");
        const data = await response.json();
        setNotifications(data);  // Update state with the fetched notifications
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();  // Initial fetch when the component mounts

    // Set up polling every 5 seconds to check for updates
    const interval = setInterval(fetchNotifications, 5000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotification((prev) => (prev + 1) % notifications.length);
    }, 5000); // Change notification every 5 seconds
    return () => clearInterval(interval);
  }, [notifications.length]);

  return (
    <div className="w-full bg-orange-500 text-white text-center py-2 font-medium">
      {notifications.length > 0
        ? notifications[currentNotification]
        : "Loading notifications..."}
    </div>
  );
};

export default NotificationStrip;