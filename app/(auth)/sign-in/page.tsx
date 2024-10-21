'use client'
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema, signinTypes } from '@/schemas/signInSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";

const SignUp = () => {

  const form = useForm<signinTypes>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })

  const onSubmit = async (data: signinTypes) => {
    const result = await signIn("credentials", {
      identifier: data.identifier,
      password: data.password,
      redirect: false,  
    });

    if (result?.error) {
    
      console.error("Login failed:", result.error);
    } else {
     
      router.push("/home");
    }
  }

  const router = useRouter()

  const { formState: { errors, isSubmitting } } = form;

  return (
    <>
      <main className='flex flex-col justify-center items-center h-screen gap-4'>

        <div className='shadow-lg rounded-sm p-10 min-w-[400px]'>
          <span className="scroll-m-20 text-xl font-semibold tracking-tight">
            Login</span>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6'>

              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="someone@gmail.com" {...field} />
                    </FormControl>
                    {errors.identifier && (
                      <FormDescription className="text-red-500">{errors.identifier.message}</FormDescription>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} type='password' />
                    </FormControl>
                    {errors.password && (
                      <FormDescription className="text-red-500">{errors.password.message}</FormDescription>
                    )}
                  </FormItem>
                )}
              />
              <Button 
                className="space-y-4"
                disabled={isSubmitting}
                type="submit">{
                  isSubmitting ? "Loading..." : "Sign In"
                }</Button>
            </form>

          </Form>
          <Link className='text-zinc-600 space-y-4'
          href={"/sign-up"}>Dont have an account? <span className='underline text-zinc-800'>Register</span></Link>
        </div>

      </main>
    </>
  )
}

export default SignUp
