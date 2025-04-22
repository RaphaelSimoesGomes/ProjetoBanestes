export interface DetailsProps {
    detailedEmployee: Record<string, string> | null;
    setDetailedEmployee: (employee: Record<string, string> | null) => void;
  }