import { useEffect, useState } from "react";
import { Chats } from "./chats";
import { useChatPage } from "./use-chat-page";
import { useAppSelector } from "../../use-app-dispatch";
import { getChats } from "../../store/chatbotSlice";
import { ChatPageContainer, PopupContainer } from "./chats-page.styled";
import { ContactForm } from "./contact-form";

export const ChatsPage = () => {
  const {
    getGptReponse,
    chatResponseIsLoading,
    userVerification,
    contactSubmit,
  } = useChatPage();
  const chats = useAppSelector(getChats);
  const [userQuestion, setUserQuestion] = useState<string>();
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [showPopup, setShowPopup] = useState<boolean>(userVerification);
  const handleTextChange = (inputData: string) => {
    setUserQuestion(inputData);
    if (inputData && !showPopup) setDisableButton(false);
    else setDisableButton(true);
  };
  const handleSubmit = () => {
    getGptReponse({ question: userQuestion });
    handleTextChange("");
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !disableButton) {
      event.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (userVerification) {
      setShowPopup(true);
      setDisableButton(true);
      document.body.style.overflow = "hidden";
    } else {
      setShowPopup(false);
      document.body.style.overflow = "auto";
    }
  }, [userVerification]);

  return (
    <ChatPageContainer>
      <div className="chats">
        {chats.map((chat, index) => (
          <Chats chat={chat} key={index} />
        ))}
        {chatResponseIsLoading && (
          <div className="loader">
            <div className="chat-loader"></div>
          </div>
        )}
      </div>
      <div className="text-area">
        <textarea
          placeholder="Chat with us to know more about AURAS &amp; Composable Commerce"
          rows={5}
          onChange={(e) => handleTextChange(e.target.value)}
          value={userQuestion}
          onKeyDown={handleKeyDown}
        ></textarea>
        <button
          type="button"
          className="styled-button"
          onClick={() => handleSubmit()}
          disabled={disableButton}
        >
          Send
        </button>
      </div>
      <PopupContainer
        style={{
          display: showPopup ? "flex" : "none",
          opacity: showPopup ? 1 : 0,
        }}
      >
        <ContactForm contactSubmit={contactSubmit} />
      </PopupContainer>
    </ChatPageContainer>
  );
};
