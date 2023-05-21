import type { JSX } from "solid-js/jsx-runtime";
import "./Notification.scss";

interface NotificationProps {
  fail?: boolean;
  success?: boolean;
  children?: JSX.Element;
}
export function Notification(props: NotificationProps) {
  return (
    <div
      class="notification"
      classList={{
        notification_success: props.success,
        notification_fail: props.fail,
      }}
    >
      {props.children}
    </div>
  );
}
