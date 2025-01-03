'use client'
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from '@/hooks/use-toast';
import { signUpSchema, signUpTypes } from '@/schemas/signUpSchema';
import { signup } from '@/server/actions/sign-up';
import { zodResolver } from "@hookform/resolvers/zod";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";

const SignUp = () => {

  const form = useForm<signUpTypes>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  });

  const router = useRouter()

  const { formState: { errors, isSubmitting }} = form;

  const onSubmit = async (data: signUpTypes) => {

    console.log(data)

    try {
      const user = await signup(data);
      if (!user.success) {
        toast({
          title: "Signup failed",
          description: "Something went wrong!",
          duration: 2000
        })
        return;
      }

      toast({
        title: "Signup Successful!",
        description: user.message,
        duration: 2000
      })

      console.log(user)

      router.replace(`/verify/${user.username}`)

    } catch (e) {
      toast({
        title: "Signup failed",
        description: "Something went wrong!",
        duration: 2000
      })

      console.log(e)
    }
  }

  return (
    <>
      <main className='flex flex-col justify-center items-center h-screen gap-4 px-4 sm:px-0'>

        <div className='shadow-lg rounded-sm p-6 sm:p-10 w-full max-w-md'>
          <span className="scroll-m-20 text-xl font-semibold tracking-tight">
            Register Now
          </span>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6'>

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="someone" {...field} />
                    </FormControl>
                    {errors.username ? (
                      <FormDescription className="text-red-500">{errors.username.message}</FormDescription>
                    ) : (<FormDescription>
                      This is your public display name.
                    </FormDescription>)}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="someone@gmail.com" {...field} />
                    </FormControl>
                    {errors.email && (
                      <FormDescription className="text-red-500">{errors.email.message}</FormDescription>
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
                className="w-full" 
                disabled={isSubmitting}
                type="submit">{
                  isSubmitting ? "Loading..." : "Sign Up"
                }</Button>
            </form>
          </Form>
          <Link className='text-zinc-600 mt-4 block text-center'
            href={"/sign-in"}>Already have an account? <span className='underline text-zinc-800'>Login</span></Link>
        </div>
      </main>
    </>
  )
}

export default SignUp
