
"use server";

import { z } from "zod";
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  role: z.enum(['client', 'admin']),
});

export async function login(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  
  const parsed = loginSchema.safeParse(values);

  if (!parsed.success) {
    console.error("Invalid login data:", parsed.error.flatten().fieldErrors);
    // In a real app, you would redirect back with an error message
    return { success: false, error: "Invalid form data." };
  }

  // Here you would typically handle authentication against a database
  // or an authentication provider like Firebase Auth.
  console.log("Login attempt for:", parsed.data.email, "as", parsed.data.role);

  cookies().set('isLoggedIn', 'true');
  
  if (parsed.data.role === 'admin') {
    redirect('/admin');
  } else {
    redirect('/dashboard');
  }
}

export async function logout() {
  cookies().delete('isLoggedIn');
  redirect('/');
}
