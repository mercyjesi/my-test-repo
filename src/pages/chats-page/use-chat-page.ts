import { useAppDispatch } from "../../use-app-dispatch";
import { setAuth } from "../../store/authSlice";
import { api, ChatbotApiArg } from "../../api/chatbotApi.generated";
import { useEffect, useState } from "react";
import {
  addChat,
  clearContactQuestions,
  setContactQuestionResponse,
  setContactQuestions,
  setCustomerId,
} from "../../store/chatbotSlice";
import { isDefined } from "../../utils";
import { IFormInput } from "./contact-form";
import { toast } from "react-toastify";

export const useChatPage = () => {
  const dispatch = useAppDispatch();
  const { data } = api.useGetAccessTokenQuery();
  const [userVerification, setUserVerification] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>();
  const [
    getChatResponse,
    { data: chatResponseData, isFetching: chatResponseIsLoading },
  ] = api.useLazyGetChatGptResponseQuery();

  useEffect(() => {
    if (data) dispatch(setAuth(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (isDefined(chatResponseData)) {
      if (userVerification) {
        setUserVerification(false);
        dispatch(clearContactQuestions());
        toast.success(chatResponseData.chatGptResponse);
      } else {
        dispatch(
          addChat({
            chatGptResponse: chatResponseData.chatGptResponse,
            chatType: 2,
          })
        );
        if (isDefined(chatResponseData.contactQuestions)) {
          setUserVerification(true);
          dispatch(setContactQuestions(chatResponseData.contactQuestions));
        } else {
          if (isDefined(chatResponseData?.customerId)) {
            if (!userId) {
              setUserId(chatResponseData?.customerId);
              dispatch(setCustomerId(chatResponseData.customerId));
            }
          }
        }
      }
    }
  }, [chatResponseData]);

  const getGptReponse = ({ question }: ChatbotApiArg) => {
    dispatch(addChat({ question, chatType: 1 }));
    getChatResponse({ question, customerId: userId });
  };

  const contactSubmit = (data: IFormInput) => {
    const contactResponse = {
      companyName: data.companyName,
      name: data.userName,
      email: data.email,
    };
    dispatch(setContactQuestionResponse(contactResponse));
    getChatResponse({
      customerId: userId,
      contactQuestionResponse: contactResponse,
    });
  };
  return {
    getGptReponse,
    chatResponseIsLoading,
    userVerification,
    contactSubmit,
  };
};
