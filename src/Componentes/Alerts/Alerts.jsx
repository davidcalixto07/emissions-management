import { Alert } from "react-bootstrap";

const Alerts = ({ status, message, show, setShowAlert }) => {
  return (
    <>
      {status == 200 ? (
        <Alert
          show={show}
          key={"success"}
          variant={"success"}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {message}
        </Alert>
      ) : (
        <Alert
          show={show}
          key={"danger"}
          variant={"danger"}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          The DataPoint <strong> wasn't created :</strong> {message}
        </Alert>
      )}
    </>
  );
};

export default Alerts;
