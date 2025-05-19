import TenantCard from '../../components/TenantCard';
import { Typography } from 'antd';
import { useTenantStore } from '../../stores/useTenantStore';

const { Title } = Typography;

const LandingPage = () => {
  const { tenants, isLoading, error } = useTenantStore();

  if (isLoading) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">Loading...</div>;
  if (error || !tenants.length) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-red-600">{error || 'No tenants found'}</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Title className="!text-3xl sm:!text-4xl font-extrabold text-gray-900 mb-8">
          Our Stores
        </Title>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenants.map((tenant) => (
            <TenantCard key={tenant.slug} tenant={tenant} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;