import { useState } from 'react';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

import AuthCard from '../components/AuthCard';
import TextInput from '../components/TextInput';
import PrimaryButton from '../components/PrimaryButton';
import FormErrorText from '../components/FormErrorText';
import { supabase } from '../lib/supabaseClient';

const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, '이메일을 입력해주세요.')
      .email('유효한 이메일 주소가 아닙니다.'),
    password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
    nickname: z
      .string()
      .min(2, '닉네임은 최소 2자 이상이어야 합니다.')
      .max(20, '닉네임은 20자 이하로 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

type SignupFormValues = z.infer<typeof signupSchema>;
type SignupFieldErrors = Partial<Record<keyof SignupFormValues, string>>;

export default function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<SignupFormValues>({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  });

  const [fieldErrors, setFieldErrors] = useState<SignupFieldErrors>({});
  const [formError, setFormError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange =
    (field: keyof SignupFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
      setFormError('');
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // 1) 클라이언트 검증
    const result = signupSchema.safeParse(form);

    if (!result.success) {
      const fieldErr: SignupFieldErrors = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof SignupFormValues;
        if (!fieldErr[fieldName]) {
          fieldErr[fieldName] = issue.message;
        }
      });
      setFieldErrors(fieldErr);
      setFormError('입력한 내용을 다시 확인해주세요.');
      setLoading(false);
      return;
    }

    // 2) Supabase 회원가입
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          nickname: form.nickname, // 유저 메타데이터에 닉네임 저장
        },
      },
    });

    if (error) {
      setFormError(error.message || '회원가입에 실패했습니다.');
      setLoading(false);
      return;
    }

    console.log('회원가입 성공:', data);
    setLoading(false);

    // Supabase 설정에 따라 이메일 인증 필요할 수 있음
    // 여기서는 일단 로그인 페이지로 보내기
    navigate('/login', { replace: true });
  };

  return (
    <AuthCard
      title="Create your account ✨"
      subtitle="커뮤니티에 참여할 계정을 만들어보세요."
      icon={<UserPlus className="h-5 w-5" />}
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
          id="nickname"
          label="Nickname"
          type="text"
          value={form.nickname}
          onChange={handleChange('nickname')}
          placeholder="닉네임을 입력해주세요"
          error={fieldErrors.nickname}
        />
        <TextInput
          id="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={handleChange('password')}
          placeholder="최소 8자 이상"
          error={fieldErrors.password}
        />
        <TextInput
          id="passwordConfirm"
          label="Password Confirm"
          type="password"
          value={form.passwordConfirm}
          onChange={handleChange('passwordConfirm')}
          placeholder="다시 한 번 입력해주세요"
          error={fieldErrors.passwordConfirm}
        />

        <FormErrorText message={formError} />

        <PrimaryButton type="submit" loading={loading}>
          회원가입
        </PrimaryButton>

        <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
          이미 계정이 있다면?{' '}
          <Link
            to="/login"
            className="font-medium text-slate-900 underline-offset-2 hover:underline dark:text-slate-100"
          >
            로그인 하기
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
