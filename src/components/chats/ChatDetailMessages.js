import React, { useRef, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from 'src/services/firebase';
import ChatBubble from 'src/components/chats/ChatBubble';

function ChatDetailMessages() {
  const { uid } = auth.currentUser;
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });
  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {messages && messages.map((msg) => (
        <ChatBubble
          key={msg.id}
          message={msg}
          myUid={uid}
        />
      ))}
      <span ref={dummy} />
    </>
  );
}

export default ChatDetailMessages;
