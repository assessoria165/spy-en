import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';

// Definição do esquema para o tipo PhoneProfile
export const phoneProfileSchema = z.object({
  id: z.string().uuid().optional(),
  phoneNumber: z.string().min(8).max(20),
  countryCode: z.string().min(1).max(4),
  countryName: z.string().min(2).max(100),
  hasWhatsApp: z.boolean().default(false),
  whatsappPhotoUrl: z.string().url().nullable().optional(),
  isPhotoPrivate: z.boolean().default(true),
  createdAt: z.date().optional()
});

// Esquema para inserção (omitindo campos automáticos)
export const insertPhoneProfileSchema = phoneProfileSchema.omit({
  id: true,
  createdAt: true
});

// Tipos para uso no código
export type PhoneProfile = z.infer<typeof phoneProfileSchema>;
export type InsertPhoneProfile = z.infer<typeof insertPhoneProfileSchema>;
