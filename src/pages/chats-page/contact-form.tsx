import { useForm } from "react-hook-form";
import { useAppSelector } from "../../use-app-dispatch";
import { getContactQuestions } from "../../store/chatbotSlice";

export interface IFormInput {
  companyName: string;
  userName: string;
  email: string;
}
interface IContactProps {
  contactSubmit: (data: IFormInput) => void;
}

export const ContactForm = ({ contactSubmit }: IContactProps) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const contactQuestions = useAppSelector(getContactQuestions);

  return (
    <div className="popup-box">
      <form className="form-container" onSubmit={handleSubmit(contactSubmit)}>
        {contactQuestions?.map((q, index) => (
          <div key={index}>
            <label className="form-label">
              {q?.companyName}
              <span className="error">*</span>
            </label>
            <input
              className="form-input"
              type="text"
              {...register("companyName")}
              required
            />
            <label className="form-label">
              {q?.name}
              <span className="error">*</span>
            </label>
            <input
              className="form-input"
              type="text"
              {...register("userName")}
              required
            />
            <label className="form-label">
              {q?.email}
              <span className="error">*</span>
            </label>
            <input
              className="form-input"
              type="email"
              {...register("email")}
              required
            />
            <button className="btn-submit" type="submit">
              Submit
            </button>
          </div>
        ))}
      </form>
    </div>
  );
};
