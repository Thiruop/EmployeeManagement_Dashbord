import { FC } from "react";

type StatusType =
  | "Permanent"
  | "Contract"
  | "Part-time"
  | "On Leave"
  | "Terminated"
  | string;

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge: FC<StatusBadgeProps> = ({ status, className = "" }) => {
  // Define status styling
  const getStatusStyle = (status: StatusType) => {
    switch (status) {
      case "Permanent":
        return "bg-green-100 text-green-800 border border-green-200";
      case "Contract":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "Part-time":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "On Leave":
        return "bg-orange-100 text-orange-800 border border-orange-200";
      case "Terminated":
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-sm ${getStatusStyle(
        status
      )} ${className}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
