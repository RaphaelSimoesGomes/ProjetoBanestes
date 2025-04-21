import Box from "../../Box";

interface DetailsProps {
  detailedEmployee: Record<string, string> | null;
  setDetailedEmployee: (employee: Record<string, string> | null) => void;
}

export default function Details({
  detailedEmployee,
  setDetailedEmployee
}: DetailsProps) {
  if (!detailedEmployee) return null; // Don't render if no employee is selected

  return (
    <Box>
      <div className="modal-overlay">
        <div className="modal-container">
          <button
            onClick={() => setDetailedEmployee(null)}
            className="btn-close"
          >
            X
          </button>
          <div className="modal-header">
            <h3>Employee Details</h3>
          </div>
          <div className="modal-body">
            {Object.entries(detailedEmployee).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
}
