import { ConversationContainer, QueryContainer } from "./chats-page.styled";
import { IChat } from "../../store/chatbotSlice";

interface IChatProps {
  chat: IChat;
}

const decodeHtmlEntities = (input: string): string => {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent || "";
};

export const Chats = ({ chat }: IChatProps) => (
  <ConversationContainer>
    {chat.chatType === 1 && (
      <QueryContainer>
        <div className="response">&nbsp;</div>
        <div className="user-query">
          <div className="user-query-label">
            <p>{chat.question}</p>
          </div>
          <div className="user-query-rect"></div>
        </div>
      </QueryContainer>
    )}
    {chat.chatType === 2 && (
      <QueryContainer>
        <div className="response">
          <div className="response-label">
            <p>
              {decodeHtmlEntities(
                chat.chatGptResponse?.replace("<br />", "&#10;") ?? ""
              )}
            </p>
          </div>
          <div className="response-rect"></div>
        </div>
      </QueryContainer>
    )}
  </ConversationContainer>
);
