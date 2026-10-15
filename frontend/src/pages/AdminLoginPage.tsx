import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Shield, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { authService } from '../services/api';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@aurelleinteriors.com');
  const [password, setPassword] = useState('aurelle2026');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authService.login(email, password);
      localStorage.setItem('aurelle_admin_token', result.token);
      localStorage.setItem('aurelle_admin_user', JSON.stringify(result.user));
      navigate('/admin/dashboard');
    } catch (err: unknown) {
      const errorMsg = (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message;
      setError(errorMsg || 'Invalid credentials. Please verify your director email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-[85vh] w-full flex items-center justify-center p-4 sm:p-6 bg-[#FBF9F5]">
        <div className="w-full max-w-md bg-[#FFFFFF] border border-[#E7E2D8] p-8 sm:p-10 shadow-sm text-left">
          <div className="flex items-center justify-between pb-6 border-b border-[#E7E2D8] mb-6">
            <div>
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#5D6853] font-medium block">
                Internal Atelier Portal
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-light text-[#181716] mt-1">
                AURELLE Executive
              </h1>
            </div>
            <div className="p-2.5 bg-[#F2EDE4] text-[#181716]">
              <Shield className="w-5 h-5" />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-sans mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              label="Director Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="director@aurelleinteriors.com"
            />

            <Input
              label="Passphrase"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
            />

            <div className="bg-[#FAF8F5] border border-[#E7E2D8] p-3 text-[11px] font-sans text-[#757069] space-y-1">
              <p className="font-medium text-[#181716]">Preconfigured Demonstration Access:</p>
              <p>Email: <code className="text-[#181716]">admin@aurelleinteriors.com</code></p>
              <p>Passphrase: <code className="text-[#181716]">aurelle2026</code></p>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={loading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Authenticate Portal
            </Button>
          </form>

          <div className="pt-6 border-t border-[#E7E2D8] mt-6 flex items-center justify-between text-xs font-sans text-[#757069]">
            <Link to="/" className="inline-flex items-center hover:text-[#181716] transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>Public Website</span>
            </Link>
            <span className="flex items-center text-[10px] uppercase tracking-wider text-[#847262]">
              <Lock className="w-3 h-3 mr-1" />
              256-bit Encrypted
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

