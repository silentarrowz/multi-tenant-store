import { useNavigate } from 'react-router-dom';
import type { Tenant } from '../../types/mockData';
import { Card, Button } from 'antd';
import { useTenantStore } from '../../stores/useTenantStore';

interface TenantCardProps {
  tenant: Tenant;
}

const TenantCard = ({ tenant }: TenantCardProps) => {
  const selectTenant = useTenantStore((state) => state.selectTenant);
  const navigate = useNavigate();

  const handleVisitStore = () => {
    selectTenant(tenant);
    navigate(`/store/${tenant.slug}`);
  };

  return (
    <Card
      className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
      cover={
        <img
          src={tenant.logo}
          alt={tenant.name}
          className="w-full h-48 object-cover"
        />
      }
    >
      <Card.Meta
        title={<h3 className="text-lg font-semibold text-gray-900">{tenant.name}</h3>}
      />
      <div className="mt-4 flex justify-end">
        <Button type="primary" onClick={handleVisitStore}>
          Visit Store
        </Button>
      </div>
    </Card>
  );
};

export default TenantCard;