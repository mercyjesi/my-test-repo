import { useEffect, useState } from "react";
import { Chats } from "./chats";
import { useChatPage } from "./use-chat-page";
import { useAppSelector } from "../../use-app-dispatch";
import { getChats } from "../../store/chatbotSlice";
import { ChatPageContainer } from "./chats-page.styled";
import { isDefined } from "../../utils";

export const ChatsPage = () => {
  const {
    getGptReponse,
    chatResponseIsLoading,
    contactField,
    sendContact,
    displayError,
  } = useChatPage();
  const chats = useAppSelector(getChats);
  const [userQuestion, setUserQuestion] = useState<string>();
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [contactKey, setContactKey] = useState<string | null>();

  useEffect(() => {
    setContactKey(contactField);
  }, [contactField]);
  const handleTextChange = (inputData: string) => {
    setUserQuestion(inputData);
    if (inputData) setDisableButton(false);
    else setDisableButton(true);
  };
  const validateName = (name: string): boolean => {
    const regex = /^[A-Za-z\s]+$/; // Regular expression to match alphabets and spaces only
    return regex.test(name);
  };
  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };
  const handleSubmit = () => {
    if (contactKey) {
      if (contactKey === "name" && isDefined(userQuestion)) {
        if (validateName(userQuestion)) {
          sendContact({ name: userQuestion }, userQuestion);
        } else {
          displayError({
            userData: userQuestion,
            msg: "Name can include only alphabets and space",
          });
        }
      }
      if (contactKey === "email" && isDefined(userQuestion)) {
        if (validateEmail(userQuestion)) {
          sendContact({ email: userQuestion }, userQuestion);
        } else {
          displayError({
            userData: userQuestion,
            msg: "Please enter valid email id",
          });
        }
      }
      if (contactKey === "companyName") {
        if (isDefined(userQuestion)) {
          sendContact({ companyName: userQuestion }, userQuestion);
        }
      }
      if (contactKey === "designation") {
        if (isDefined(userQuestion)) {
          sendContact({ designation: userQuestion }, userQuestion);
        }
      }
    } else {
      getGptReponse({ question: userQuestion });
    }
    handleTextChange("");
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !disableButton) {
      event.preventDefault();
      handleSubmit();
    }
  };

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
    </ChatPageContainer>
  );
};
