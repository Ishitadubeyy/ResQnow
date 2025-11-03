import React, { useState, useEffect, useRef } from "react";
// import useSocket from "../hooks/useSocket"; // Uncomment when socket is ready

function LiveChatModal({ service, emergency, onClose, userType = "responder" }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  // const socket = useSocket(); // Uncomment when socket is ready
  const socket = null; // Temporary placeholder
  
  // Support both citizen (service) and responder (emergency) modes
  const chatData = emergency || service;
  const chatRoom = emergency ? `emergency_${emergency._id}` : `service_${service.id}`;
  const bottomRef = useRef();

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.emit("joinRoom", chatRoom);
    socket.on("chatMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off("chatMessage");
    };
    // eslint-disable-next-line
  }, [socket, chatRoom]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      const msg = { 
        sender: userType === "responder" 
          ? "Responder" 
          : (emergency ? (emergency.citizenId?.name || "Citizen") : (service?.name || "You")),
        text: input, 
        time: new Date().toLocaleTimeString() 
      };
      setMessages((prev) => [...prev, msg]);
      if (socket) {
        socket.emit("chatMessage", { 
          room: chatRoom, 
          message: msg,
          emergencyId: emergency?._id,
          serviceId: service?.id
        });
      }
      setInput("");
    }
  };

  return (
    <div className="chat-modal-overlay" onClick={onClose}>
      <div className="chat-modal" onClick={(e) => e.stopPropagation()}>
        <button className="chat-close-btn" onClick={onClose}>×</button>
        
        {/* Responder view - Emergency details */}
        {emergency ? (
          <>
            <h2 style={{ 
              marginBottom: '0.5rem', 
              color: '#1e293b',
              fontSize: '1.5rem',
              fontWeight: '700'
            }}>
              Chat - {emergency.severity} Emergency
            </h2>
            <p style={{ 
              marginBottom: '0.5rem', 
              color: '#64748b',
              fontSize: '0.95rem'
            }}>
              <strong>Location:</strong> {emergency.location}
            </p>
            <p style={{ 
              marginBottom: '1.5rem', 
              color: '#64748b',
              fontSize: '0.9rem'
            }}>
              <strong>Citizen:</strong> {emergency.citizenId?.name || "Unknown"} • 
              <strong> Contact:</strong> {emergency.citizenId?.phone || "N/A"}
            </p>
          </>
        ) : null}
        
        {/* Citizen view - Service details */}
        {service ? (
          <>
            <h2 style={{ 
              marginBottom: '0.5rem', 
              color: '#1e293b',
              fontSize: '1.5rem',
              fontWeight: '700'
            }}>
              Live Chat with {service.name}
            </h2>
            <p style={{ 
              marginBottom: '1.5rem', 
              color: '#64748b',
              fontSize: '0.95rem'
            }}>
              {service.field || 'Medical Professional'}
            </p>
          </>
        ) : null}
        
        <div className="chat-messages">
          {messages.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              color: '#94a3b8', 
              padding: '3rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
              <p style={{ 
                fontSize: '1.1rem', 
                fontWeight: '600',
                color: '#64748b',
                marginBottom: '0.5rem'
              }}>
                {emergency 
                  ? `Start communicating with ${emergency.citizenId?.name || "the citizen"}`
                  : `Start a conversation with ${service?.name || "the responder"}`
                }
              </p>
              <p style={{ 
                fontSize: '0.9rem', 
                color: '#94a3b8'
              }}>
                Type a message below to {emergency ? "provide updates or ask questions" : "begin chatting"}
              </p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className="chat-msg">
                <b>{msg.sender}:</b> {msg.text} 
                <span className="chat-time">{msg.time}</span>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>
        
        <div className="chat-input-row">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default LiveChatModal;