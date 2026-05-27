import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <section className="success-screen">
      <div className="success-container">
        <h1 className="success-title">Thank you for completing the survey!</h1>

        <button className="done-button" onClick={() => navigate("/")}>
          Back to Start
        </button>
      </div>
    </section>
  );
};

export default SuccessPage;
