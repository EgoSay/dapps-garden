import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from "~~/components/ui/button";
import { cn } from "~~/lib/utils";

type PaginationButtonProps = {
  currentPage: number;
  totalItems: number;
  setCurrentPage: (page: number) => void;
};

const ITEMS_PER_PAGE = 20;

export const PaginationButton = ({ currentPage, totalItems, setCurrentPage }: PaginationButtonProps) => {
  const isPrevButtonDisabled = currentPage === 0;
  const isNextButtonDisabled = currentPage + 1 >= Math.ceil(totalItems / ITEMS_PER_PAGE);

  if (isNextButtonDisabled && isPrevButtonDisabled) return null;

  return (
    <div className="mt-5 justify-end flex gap-3 mx-5">
      <Button
        variant="default"
        size="sm"
        disabled={isPrevButtonDisabled}
        onClick={() => setCurrentPage(currentPage - 1)}
        className={cn(isPrevButtonDisabled && "bg-muted hover:bg-muted cursor-default")}
      >
        <ArrowLeftIcon className="h-4 w-4" />
      </Button>
      <span className="self-center font-medium">Page {currentPage + 1}</span>
      <Button
        variant="default"
        size="sm"
        disabled={isNextButtonDisabled}
        onClick={() => setCurrentPage(currentPage + 1)}
        className={cn(isNextButtonDisabled && "bg-muted hover:bg-muted cursor-default")}
      >
        <ArrowRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
