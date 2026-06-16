import NetworkForm from '../components/NetworkForm';
import PageHeader from '../components/PageHeader';

export default function AddNetwork({ editingNetwork, onSubmit, onCancel }) {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Maǵlıwmat modeli"
        title="Tarmoq maǵlıwmatların kirgiziw"
        description="Forma optik kabel parametrleri, qurılma jaǵdayları hám sırtqı qáwip belgilerin jıynap, isenimlilik algoritmi ushın birden-bir monitoring modeli jasaydı."
      />
      <NetworkForm initialData={editingNetwork} onSubmit={onSubmit} onCancel={editingNetwork ? onCancel : null} />
    </div>
  );
}
