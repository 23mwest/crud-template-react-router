import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../supabase'

export function ForgotPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<'request' | 'verify'>('request')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) throw error
      setStep('verify')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCodeAndReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: 'recovery',
      })
      if (verifyError) throw verifyError

      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword })
      if (updateError) throw updateError

      navigate('/protected', { replace: true })
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      {step === 'verify' ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Enter Verification Code</CardTitle>
            <CardDescription>
              Enter the one-time code sent to <span className="font-medium">{email}</span>, then
              set your new password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyCodeAndReset}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="otp-code">One-time code</Label>
                  <Input
                    id="otp-code"
                    type="text"
                    placeholder="123456"
                    required
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-password">New password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Resetting...' : 'Verify code and reset password'}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                <button
                  type="button"
                  className="underline underline-offset-4"
                  onClick={() => {
                    setStep('request')
                    setOtpCode('')
                    setNewPassword('')
                    setError(null)
                  }}
                >
                  Use a different email
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Reset Your Password</CardTitle>
            <CardDescription>
              Enter your email and we&apos;ll send a one-time code to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSendCode}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send one-time code'}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{' '}
                <Link to="/auth/sign-in" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
