"use server";

import * as z from "zod";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string(),
});

export async function submitContactForm(values: z.infer<typeof formSchema>) {
  // Here you would typically send an email, save to a database, etc.
  // For this example, we'll just log it to the console.
  console.log("New contact form submission:", values);

  // You can add error handling here if the email sending or DB save fails
  // For now, we'll assume it's always successful.
  return { success: true };
}
