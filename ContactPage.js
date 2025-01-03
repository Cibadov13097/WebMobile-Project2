import React, { useState } from "react";
import "./ContactPage.css"; // Import the CSS file here
import Navbar from "./Navbar";

const ContactPage = () => {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { subject, email, message };

    try {
      const response = await fetch("http://localhost:5000/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setResponseMessage(`Thank you for your message, ${email}! We will get back to you soon.`);
        setErrorMessage("");
        setSubject("");
        setEmail("");
        setMessage("");
      } else {
        setErrorMessage("Failed to send the message. Please try again.");
        setResponseMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while sending the message.");
      setResponseMessage("");
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <form id="contactForm" onSubmit={handleSubmit}>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <button type="submit">Send Message</button>
      </form>

      {responseMessage && <p id="responseMessage">{responseMessage}</p>}
      {errorMessage && <p id="errorMessage" style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default ContactPage;
