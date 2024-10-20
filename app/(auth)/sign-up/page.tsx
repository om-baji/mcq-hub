'use client'
import { signUpSchema, signUpTypes } from '@/schemas/signUpSchema'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signup } from '@/server/actions/sign-up';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

  const { formState : { errors, isSubmitting}} = form;

  const onSubmit = async (data: signUpTypes) => {
  
    console.log(data)

    try {
      const user = await signup(data);
      if(!user.success) {
        toast({
          title : "Signup failed",
          description : "Something went wrong!",
          duration : 2000
        })
        return;
      }

      toast({
        title : "Signup Successfull!",
        description : user.message,
        duration : 2000
      })

      console.log(user)

      router.replace(`/verify/${user.username}`)

    } catch (e) {
      toast({
        title : "Signup failed",
        description : "Something went wrong!",
        duration : 2000
      })

      console.log(e)
    }
  }

  return (
    <>
      <main className='flex flex-col justify-center items-center h-screen gap-4'>

        <div className='shadow-lg rounded-sm p-10 min-w-[400px]'>
        <span className="scroll-m-20 text-xl font-semibold tracking-tight">
          Register Now</span>
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
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    
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
                  </FormItem>
                )}
              />
              <Button disabled={isSubmitting}
              type="submit">{
                isSubmitting ? "Loading..." : "Sign Up"
              }</Button>
            </form>

          </Form>
          <Link className='text-zinc-600'
          href={"/sign-in"}>Already have an account? <span className='underline text-zinc-800'>Login</span></Link>
        </div>
          
      </main>
    </>
  )
}

export default SignUp
