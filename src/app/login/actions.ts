// "use server"; // <--- COMMENTED OUT

import { z } from "zod";
// import { redirect } from 'next/navigation' // <--- COMMENTED OUT
// import { cookies } from 'next/headers'     // <--- COMMENTED OUT

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  role: z.enum(['client', 'admin']),
});

export async function login(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  
  // validation still works fine on the client!
  const parsed = loginSchema.safeParse(values);

  if (!parsed.success) {
    console.error("Invalid login data:", parsed.error.flatten().fieldErrors);
    return { success: false, error: "Invalid form data." };
  }

  // --- SERVER LOGIC REMOVED FOR STATIC EXPORT ---
  // cookies().set('isLoggedIn', 'true');
  
  console.log("Mock Login attempt for:", parsed.data.email, "as", parsed.data.role);

  // In a real static app, you handle redirect inside the Component (using useRouter), 
  // not here in the action. We return success so the component knows to redirect.
  return { success: true, role: parsed.data.role };
}

export async function logout() {
  // cookies().delete('isLoggedIn');
  // redirect('/');
  console.log("Mock Logout");
  return { success: true };
}