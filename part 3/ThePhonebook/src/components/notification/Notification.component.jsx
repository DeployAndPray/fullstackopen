import "./Notification.style.css";

export function Notification({ msg, msgType }) {
  const prefix = () => {
    switch (msgType) {
      case "error":
        return "Error:";
      case "success":
        return "Success:";
      default:
        return "Info:";
    }
  };

  return msgType ? (
    <div className={`notificationContainer ${msgType} `}>
      {prefix()} {msg}
    </div>
  ) : (
    ""
  );
}
