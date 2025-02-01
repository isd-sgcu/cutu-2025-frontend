export const InfoRow = ({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit?: () => void;
}) => (
  <div 
    className="flex justify-between py-2 border-b border-light-gray last:border-0"
    onClick={onEdit}
    style={{ cursor: onEdit ? 'pointer' : 'default' }}
  >
    <span className="text-dark-gray">{label}</span>
    <span className="text-dark-blue font-medium">{value}</span>
  </div>
);