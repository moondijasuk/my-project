import { useState } from 'react';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

import AuthCard from '../components/AuthCard';
import TextInput from '../components/TextInput';
import PrimaryButton from '../components/PrimaryButton';
import FormErrorText from '../components/FormErrorText';
import { supabase } from '../lib/supabaseClient';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('유효한 이메일 주소가 아닙니다.'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type LoginFieldErrors = Partial<Record<keyof LoginFormValues, string>>;

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginFormValues>({
    email: '',
    password: '',
  });

  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [formError, setFormError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange =
    (field: keyof LoginFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
      setFormError('');
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // 1) Zod로 클라이언트 측 검증
    const result = loginSchema.safeParse(form);

    if (!result.success) {
      const fieldErr: LoginFieldErrors = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof LoginFormValues;
        if (!fieldErr[fieldName]) {
          fieldErr[fieldName] = issue.message;
        }
      });
      setFieldErrors(fieldErr);
      setFormError('입력한 내용을 다시 확인해주세요.');
      setLoading(false);
      return;
    }

    // 2) Supabase 로그인 요청
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setFormError(error.message || '로그인에 실패했습니다.');
      setLoading(false);
      return;
    }

    console.log('로그인 성공:', data);
    setLoading(false);

    // 로그인 성공 시 메인 페이지로 이동 (원하는 경로로 수정 가능)
    navigate('/', { replace: true });
  };

  return (
    <AuthCard
      title="Welcome back 👋"
      subtitle="로그인하고 커뮤니티에 참여해보세요."
      icon={<LogIn className="h-5 w-5" />}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <TextInput
          id="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange('email')}
          placeholder="you@example.com"
          error={fieldErrors.email}
        />
        <TextInput
          id="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={handleChange('password')}
          placeholder="••••••••"
          error={fieldErrors.password}
        />

        <FormErrorText message={formError} />

        <PrimaryButton type="submit" loading={loading}>
          로그인
        </PrimaryButton>

        <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
          아직 계정이 없나요?{' '}
          <Link
            to="/signup"
            className="font-medium text-slate-900 underline-offset-2 hover:underline dark:text-slate-100"
          >
            회원가입 하기
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
