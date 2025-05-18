import { FC, ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  backLink?: string;
  children?: ReactNode;
}

const PageHeader: FC<PageHeaderProps> = ({ title, backLink, children }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-2">
        {backLink && (
          <button
            onClick={() => navigate(backLink)}
            className="p-1 rounded-md hover:bg-gray-100 text-gray-600"
          >
            <ChevronLeft size={22} />
          </button>
        )}
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default PageHeader;
