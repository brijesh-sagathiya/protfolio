import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface EmailRecord {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
}

const EmailDashboard = () => {
  const [emails, setEmails] = useState<EmailRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const { data, error } = await supabase
          .from('contact_emails')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setEmails(data || []);
      } catch (error) {
        console.error('Error fetching emails:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();

    // Set up real-time subscription
    const subscription = supabase
      .channel('contact_emails_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contact_emails',
        },
        payload => {
          fetchEmails();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold">Contact Form Submissions</h2>
      <div className="space-y-4">
        {emails.map(email => (
          <div key={email.id} className="rounded-lg border bg-white/5 p-4 backdrop-blur-sm">
            <div className="mb-2 flex items-start justify-between">
              <h3 className="font-semibold">{email.name}</h3>
              <span
                className={`rounded px-2 py-1 text-sm ${
                  email.status === 'SENT' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                }`}
              >
                {email.status}
              </span>
            </div>
            <p className="text-sm text-gray-400">{email.email}</p>
            <p className="mt-2">{email.message}</p>
            <p className="mt-2 text-sm text-gray-400">
              {new Date(email.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailDashboard;
