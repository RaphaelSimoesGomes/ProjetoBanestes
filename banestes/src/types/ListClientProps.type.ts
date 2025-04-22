export interface ListClientProps {
    data: Record<string, string>[];
    searchTerm: string;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    setDetailedEmployee: (employee: Record<string, string>) => void;
    setData: (data: Record<string, string>[]) => void;
  }
  