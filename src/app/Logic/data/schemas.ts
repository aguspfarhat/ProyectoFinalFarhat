import { z } from "zod";

//LOGIN
export const loginFormSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password should have at least 8 characters."),
});




//SIGNUP
export const userFormSchema = z.object({
    name: z.string().min(2, "Please enter a valid name."),
    surname: z.string().min(2, "Please enter a valid surname."),
    userName: z.string().min(2, "Please enter a valid user name."),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password should have at least 8 characters."),
    confirmPassword: z.string(), // Campo para confirmación
})
    .refine(
        (data) => data.password === data.confirmPassword, // Compara los campos
        {
            path: ["confirmPassword"], // Error asociado a este campo
            message: "Passwords must match.", // Mensaje de error
        }
    );