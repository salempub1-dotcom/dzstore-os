import { Bot, MessageCircle, Package, ShoppingBag, TrendingUp, Users } from 'lucide-react';

const stats = [
  { label: 'المحادثات اليوم', value: '24', icon: MessageCircle },
  { label: 'طلبات جديدة', value: '8', icon: ShoppingBag },
  { label: 'المنتجات', value: '36', icon: Package },
  { label: 'نسبة التحويل', value: '18%', icon: TrendingUp },
];

const conversations = [
  { name: 'سارة', channel: 'WhatsApp', message: 'هل التوصيل متوفر إلى الجزائر العاصمة؟', status: 'AI جاهز للرد' },
  { name: 'أمين', channel: 'Instagram', message: 'شحال سعر الباك؟', status: 'يحتاج تأكيد السعر' },
  { name: 'ليلى', channel: 'WhatsApp', message: 'نحب نأكد الطلب', status: 'طلب محتمل' },
];

export default function Home() {
  return (
    <main style={{ maxWidth: 1180, margin: '0 auto', padding: '28px 20px 60px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', marginBottom: 26 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Bot size={34} />
            <h1 style={{ margin: 0, fontSize: 30 }}>DZStore OS</h1>
          </div>
          <p style={{ margin: '8px 0 0', color: '#687086' }}>موظف المبيعات الذكي لمتجرك</p>
        </div>
        <button style={{ border: 0, borderRadius: 12, padding: '12px 18px', background: '#172033', color: '#fff', fontWeight: 700 }}>
          إعداد المتجر
        </button>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 16, marginBottom: 22 }}>
        {stats.map(({ label, value, icon: Icon }) => (
          <article className="card" key={label} style={{ padding: 20 }}>
            <Icon size={22} />
            <div style={{ fontSize: 30, fontWeight: 800, marginTop: 14 }}>{value}</div>
            <div style={{ color: '#71798d', marginTop: 4 }}>{label}</div>
          </article>
        ))}
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(280px,1fr)', gap: 18 }}>
        <article className="card" style={{ padding: 22 }}>
          <h2 style={{ marginTop: 0 }}>آخر المحادثات</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {conversations.map((c) => (
              <div key={c.name} style={{ padding: 16, border: '1px solid #eceef3', borderRadius: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                  <strong>{c.name} · {c.channel}</strong>
                  <span style={{ fontSize: 12, background: '#eef7f1', padding: '5px 8px', borderRadius: 999 }}>{c.status}</span>
                </div>
                <p style={{ marginBottom: 0, color: '#535c70' }}>{c.message}</p>
              </div>
            ))}
          </div>
        </article>

        <aside className="card" style={{ padding: 22 }}>
          <Users size={24} />
          <h2>الـ AI اليوم</h2>
          <p style={{ color: '#687086', lineHeight: 1.8 }}>
            يقرأ سؤال العميل، يبحث عن المنتج والسعر وسياسة التوصيل، ثم يقترح ردًا مناسبًا قبل الإرسال الآلي.
          </p>
          <div style={{ background: '#f3f5f9', borderRadius: 14, padding: 16, marginTop: 18 }}>
            <strong>المرحلة الحالية</strong>
            <p style={{ marginBottom: 0, color: '#687086' }}>نسخة MVP مستقلة — قبل ربط WhatsApp وInstagram رسميًا.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
